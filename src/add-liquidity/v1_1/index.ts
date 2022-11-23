import algosdk from "algosdk";

import {ADD_LIQUIDITY_APP_CALL_ARGUMENTS} from "../constants";
import {CONTRACT_VERSION} from "../../contract/constants";
import {getAccountExcessWithinPool} from "../../util/account/accountUtils";
import {ALGO_ASSET_ID} from "../../util/asset/assetConstants";
import {
  SignerTransaction,
  InitiatorSigner,
  SupportedNetwork
} from "../../util/commonTypes";
import {MINIMUM_ADD_LIQUIDITY_AMOUNT, DEFAULT_FEE_TXN_NOTE} from "../../util/constant";
import TinymanError from "../../util/error/TinymanError";
import {PoolReserves, V1PoolInfo} from "../../util/pool/poolTypes";
import {
  applySlippageToAmount,
  sendAndWaitRawTransaction,
  sumUpTxnFees,
  getTxnGroupID
} from "../../util/util";
import {getValidatorAppID} from "../../validator";
import {V1_1AddLiquidityQuote, V1_1AddLiquidityExecution} from "./types";
import {V1_1AddLiquidityTxnIndices} from "./constants";
import {poolUtils} from "../../util/pool";

/**
 * Get a quote for how many liquidity tokens a deposit of asset1In and asset2In is worth at this
 * moment. This does not execute any transactions.
 *
 * @param params.pool Information for the pool.
 * @param params.reserves Pool reserves.
 * @param params.asset1In The quantity of the first asset being deposited.
 * @param params.asset2In The quantity of the second asset being deposited.
 */
export function getQuote({
  pool,
  reserves,
  asset1In,
  asset2In
}: {
  pool: V1PoolInfo;
  reserves: PoolReserves;
  asset1In: number | bigint;
  asset2In: number | bigint;
}): V1_1AddLiquidityQuote {
  if (reserves.issuedLiquidity === 0n) {
    // TODO: compute sqrt on bigints
    const geoMean = BigInt(Math.floor(Math.sqrt(Number(asset1In) * Number(asset2In))));

    if (geoMean <= BigInt(MINIMUM_ADD_LIQUIDITY_AMOUNT)) {
      throw new Error(
        `Initial liquidity amount is too small. The amount must be greater than ${MINIMUM_ADD_LIQUIDITY_AMOUNT}, this quote is for ${geoMean}.`
      );
    }

    return {
      round: reserves.round,
      asset1ID: pool.asset1ID,
      asset1In: BigInt(asset1In),
      asset2ID: pool.asset2ID,
      asset2In: BigInt(asset2In),
      liquidityID: pool.liquidityTokenID!,
      liquidityOut: geoMean - BigInt(MINIMUM_ADD_LIQUIDITY_AMOUNT),
      share: 1
    };
  }

  const asset1Ratio = (BigInt(asset1In) * reserves.issuedLiquidity) / reserves.asset1;
  const asset2Ratio = (BigInt(asset2In) * reserves.issuedLiquidity) / reserves.asset2;
  const liquidityOut = asset1Ratio < asset2Ratio ? asset1Ratio : asset2Ratio;

  return {
    round: reserves.round,
    asset1ID: pool.asset1ID,
    asset1In: BigInt(asset1In),
    asset2ID: pool.asset2ID,
    asset2In: BigInt(asset2In),
    liquidityID: pool.liquidityTokenID!,
    liquidityOut,
    share: poolUtils.getPoolShare(reserves.issuedLiquidity + liquidityOut, liquidityOut)
  };
}

export async function generateTxns({
  client,
  network,
  poolAddress,
  asset_1,
  asset_2,
  liquidityToken,
  slippage,
  initiatorAddr
}: {
  client: any;
  network: SupportedNetwork;
  poolAddress: string;
  asset_1: {id: number; amount: number | bigint};
  asset_2: {id: number; amount: number | bigint};
  liquidityToken: {id: number; amount: number | bigint};
  slippage: number;
  initiatorAddr: string;
}): Promise<SignerTransaction[]> {
  // apply slippage to liquidity out amount
  const liquidityOutAmount = applySlippageToAmount(
    "negative",
    slippage,
    liquidityToken.amount
  );
  const suggestedParams = await client.getTransactionParams().do();
  const validatorAppCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
    from: poolAddress,
    appIndex: getValidatorAppID(network, CONTRACT_VERSION.V1_1),
    appArgs: ADD_LIQUIDITY_APP_CALL_ARGUMENTS.v1_1,
    accounts: [initiatorAddr],
    foreignAssets:
      asset_2.id == ALGO_ASSET_ID
        ? [asset_1.id, <number>liquidityToken.id]
        : [asset_1.id, asset_2.id, <number>liquidityToken.id],
    suggestedParams
  });

  const asset1InTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: initiatorAddr,
    to: poolAddress,
    assetIndex: asset_1.id,
    amount: asset_1.amount,
    suggestedParams
  });

  let asset2InTxn;

  if (asset_2.id === ALGO_ASSET_ID) {
    asset2InTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: initiatorAddr,
      to: poolAddress,
      amount: asset_2.amount,
      suggestedParams
    });
  } else {
    asset2InTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: initiatorAddr,
      to: poolAddress,
      assetIndex: asset_2.id,
      amount: asset_2.amount,
      suggestedParams
    });
  }

  const liquidityOutTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: poolAddress,
    to: initiatorAddr,
    assetIndex: <number>liquidityToken.id,
    amount: liquidityOutAmount,
    suggestedParams
  });

  const feeTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: initiatorAddr,
    to: poolAddress,
    amount: validatorAppCallTxn.fee + liquidityOutTxn.fee,
    note: DEFAULT_FEE_TXN_NOTE, // just here to make this unique from asset1In if necessary
    suggestedParams
  });

  const txGroup = algosdk.assignGroupID([
    feeTxn,
    validatorAppCallTxn,
    asset1InTxn,
    asset2InTxn,
    liquidityOutTxn
  ]);

  return [
    {
      txn: txGroup[0],
      signers: [initiatorAddr]
    },
    {
      txn: txGroup[1],
      signers: [poolAddress]
    },
    {
      txn: txGroup[2],
      signers: [initiatorAddr]
    },
    {
      txn: txGroup[3],
      signers: [initiatorAddr]
    },
    {
      txn: txGroup[4],
      signers: [poolAddress]
    }
  ];
}

export async function signTxns({
  pool,
  txGroup,
  initiatorSigner
}: {
  pool: V1PoolInfo;
  txGroup: SignerTransaction[];
  initiatorSigner: InitiatorSigner;
}): Promise<Uint8Array[]> {
  const lsig = pool.account;
  const [signedFeeTxn, signedAsset1InTxn, signedAsset2InTxn] = await initiatorSigner([
    txGroup
  ]);

  const signedTxns = txGroup.map((txDetail, index) => {
    if (index === V1_1AddLiquidityTxnIndices.FEE_TXN) {
      return signedFeeTxn;
    }
    if (index === V1_1AddLiquidityTxnIndices.ASSET1_IN_TXN) {
      return signedAsset1InTxn;
    }
    if (index === V1_1AddLiquidityTxnIndices.ASSET2_IN_TXN) {
      return signedAsset2InTxn;
    }
    const {blob} = algosdk.signLogicSigTransactionObject(txDetail.txn, lsig);

    return blob;
  });

  return signedTxns;
}

/**
 * Execute adding liquidity operation with the desired quantities.
 *
 * @param params.client An Algodv2 client.
 * @param params.pool Information for the pool.
 * @param params.asset1In The quantity of the first asset being deposited.
 * @param params.asset2In The quantity of the second asset being deposited.
 * @param params.liquidityOut The quantity of liquidity tokens being withdrawn.
 * @param params.slippage The maximum acceptable slippage rate. Should be a number between 0 and 100
 *   and acts as a percentage of params.liquidityOut.
 * @param params.initiatorAddr The address of the account performing the add liquidity operation.
 * @param params.initiatorSigner A function that will sign transactions from the initiator's
 *   account.
 */
export async function execute({
  client,
  pool,
  txGroup,
  signedTxns,
  initiatorAddr
}: {
  client: any;
  pool: V1PoolInfo;
  txGroup: SignerTransaction[];
  signedTxns: Uint8Array[];
  initiatorAddr: string;
}): Promise<V1_1AddLiquidityExecution> {
  try {
    const liquidityOutAmount = BigInt(
      txGroup[V1_1AddLiquidityTxnIndices.LIQUDITY_OUT_TXN].txn.amount
    );

    const prevExcessAssets = await getAccountExcessWithinPool({
      client,
      pool,
      accountAddr: initiatorAddr
    });

    const [{confirmedRound, txnID}] = await sendAndWaitRawTransaction(client, [
      signedTxns
    ]);
    const fees = sumUpTxnFees(txGroup);
    const groupID = getTxnGroupID(txGroup);

    const excessAssets = await getAccountExcessWithinPool({
      client,
      pool,
      accountAddr: initiatorAddr
    });

    let excessAmountDelta =
      excessAssets.excessLiquidityTokens - prevExcessAssets.excessLiquidityTokens;

    if (excessAmountDelta < 0n) {
      excessAmountDelta = 0n;
    }

    return {
      round: confirmedRound,
      fees,
      liquidityID: pool.liquidityTokenID!,
      liquidityOut: liquidityOutAmount + excessAmountDelta,
      excessAmount: {
        excessAmountForAddingLiquidity: excessAmountDelta,
        totalExcessAmount: excessAssets.excessLiquidityTokens
      },
      txnID,
      groupID
    };
  } catch (error: any) {
    const parsedError = new TinymanError(
      error,
      "We encountered something unexpected while adding liquidity. Try again later."
    );

    if (parsedError.type === "SlippageTolerance") {
      parsedError.setMessage(
        "Adding liquidity failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."
      );
    }

    throw parsedError;
  }
}