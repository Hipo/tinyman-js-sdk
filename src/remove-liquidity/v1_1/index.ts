import algosdk, {Algodv2, Transaction} from "algosdk";

import {getAccountExcessWithinPool} from "../../util/account/accountUtils";
import {isAlgo} from "../../util/asset/assetUtils";
import {SignerTransaction, InitiatorSigner} from "../../util/commonTypes";
import {DEFAULT_FEE_TXN_NOTE} from "../../util/constant";
import TinymanError from "../../util/error/TinymanError";
import {PoolReserves, V1PoolInfo} from "../../util/pool/poolTypes";
import {
  encodeString,
  applySlippageToAmount,
  sendAndWaitRawTransaction,
  sumUpTxnFees,
  getTxnGroupID
} from "../../util/util";
import {V1_1RemoveLiquidityTxnIndices} from "./constants";
import {V1_1RemoveLiquidityQuote, V1_1RemoveLiquidityExecution} from "./types";

/**
 * Get a quote for how many of assets 1 and 2 a deposit of liquidityIn is worth at this moment. This
 * does not execute any transactions.
 */
export function getQuote({
  pool,
  reserves,
  liquidityIn
}: {
  pool: V1PoolInfo;
  reserves: PoolReserves;
  /**
   * The quantity of the liquidity being deposited.
   */
  liquidityIn: number | bigint;
}): V1_1RemoveLiquidityQuote {
  const liquidityIn_bigInt = BigInt(liquidityIn);

  const asset1Out =
    reserves.issuedLiquidity &&
    (liquidityIn_bigInt * reserves.asset1) / reserves.issuedLiquidity;
  const asset2Out =
    reserves.issuedLiquidity &&
    (liquidityIn_bigInt * reserves.asset2) / reserves.issuedLiquidity;

  return {
    round: reserves.round,
    liquidityID: pool.liquidityTokenID!,
    liquidityIn: liquidityIn_bigInt,
    asset1ID: pool.asset1ID,
    asset1Out,
    asset2ID: pool.asset2ID,
    asset2Out
  };
}

async function generateTxns({
  client,
  pool,
  liquidityIn,
  asset1Out,
  asset2Out,
  slippage,
  initiatorAddr
}: {
  client: Algodv2;
  pool: V1PoolInfo;
  liquidityIn: number | bigint;
  asset1Out: number | bigint;
  asset2Out: number | bigint;
  slippage: number;
  initiatorAddr: string;
}): Promise<SignerTransaction[]> {
  const suggestedParams = await client.getTransactionParams().do();
  const poolAddress = pool.account.address();
  const isAlgoPool = isAlgo(pool.asset2ID);

  const validatorAppCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
    from: poolAddress,
    appIndex: pool.validatorAppID,
    appArgs: [encodeString("burn")],
    accounts: [initiatorAddr],
    foreignAssets: isAlgoPool
      ? [pool.asset1ID, pool.liquidityTokenID as number]
      : [pool.asset1ID, pool.asset2ID, pool.liquidityTokenID as number],
    suggestedParams
  });

  const asset1OutAmount = applySlippageToAmount("negative", slippage, asset1Out);
  const asset1OutTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: poolAddress,
    to: initiatorAddr,
    assetIndex: pool.asset1ID,
    amount: asset1OutAmount,
    suggestedParams
  });

  const asset2OutAmount = applySlippageToAmount("negative", slippage, asset2Out);
  const asset2OutTxn = isAlgoPool
    ? algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: poolAddress,
        to: initiatorAddr,
        amount: asset2OutAmount,
        suggestedParams
      })
    : algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: poolAddress,
        to: initiatorAddr,
        assetIndex: pool.asset2ID,
        amount: asset2OutAmount,
        suggestedParams
      });

  const liquidityInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: initiatorAddr,
    to: poolAddress,
    assetIndex: pool.liquidityTokenID as number,
    amount: liquidityIn,
    suggestedParams
  });

  let txnFees = validatorAppCallTxn.fee + asset1OutTxn.fee + asset2OutTxn.fee;

  const feeTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: initiatorAddr,
    to: poolAddress,
    amount: txnFees,
    note: DEFAULT_FEE_TXN_NOTE,
    suggestedParams
  });

  let txns: Transaction[] = [];

  txns[V1_1RemoveLiquidityTxnIndices.FEE_TXN] = feeTxn;
  txns[V1_1RemoveLiquidityTxnIndices.VALIDATOR_APP_CALL_TXN] = validatorAppCallTxn;
  txns[V1_1RemoveLiquidityTxnIndices.ASSET1_OUT_TXN] = asset1OutTxn;
  txns[V1_1RemoveLiquidityTxnIndices.ASSET2_OUT_TXN] = asset2OutTxn;
  txns[V1_1RemoveLiquidityTxnIndices.LIQUDITY_IN_TXN] = liquidityInTxn;

  const txGroup = algosdk.assignGroupID(txns);

  return [
    {
      txn: txGroup[V1_1RemoveLiquidityTxnIndices.FEE_TXN],
      signers: [initiatorAddr]
    },
    {
      txn: txGroup[V1_1RemoveLiquidityTxnIndices.VALIDATOR_APP_CALL_TXN],
      signers: [poolAddress]
    },
    {
      txn: txGroup[V1_1RemoveLiquidityTxnIndices.ASSET1_OUT_TXN],
      signers: [poolAddress]
    },
    {
      txn: txGroup[V1_1RemoveLiquidityTxnIndices.ASSET2_OUT_TXN],
      signers: [poolAddress]
    },
    {
      txn: txGroup[V1_1RemoveLiquidityTxnIndices.LIQUDITY_IN_TXN],
      signers: [initiatorAddr]
    }
  ];
}

async function signTxns({
  pool,
  txGroup,
  initiatorSigner
}: {
  pool: V1PoolInfo;
  txGroup: SignerTransaction[];
  initiatorSigner: InitiatorSigner;
}): Promise<Uint8Array[]> {
  const [signedFeeTxn, signedLiquidityInTxn] = await initiatorSigner([txGroup]);
  const lsig = pool.account;

  const signedTxns = txGroup.map((txDetail, index) => {
    if (index === V1_1RemoveLiquidityTxnIndices.FEE_TXN) {
      return signedFeeTxn;
    }
    if (index === V1_1RemoveLiquidityTxnIndices.LIQUDITY_IN_TXN) {
      return signedLiquidityInTxn;
    }
    const {blob} = algosdk.signLogicSigTransactionObject(txDetail.txn, lsig);

    return blob;
  });

  return signedTxns;
}

async function execute({
  client,
  pool,
  txGroup,
  signedTxns,
  initiatorAddr
}: {
  client: Algodv2;
  pool: V1PoolInfo;
  txGroup: SignerTransaction[];
  signedTxns: Uint8Array[];
  /**
   * The address of the account performing the burn operation.
   */
  initiatorAddr: string;
}): Promise<V1_1RemoveLiquidityExecution> {
  try {
    const asset1Out = txGroup[V1_1RemoveLiquidityTxnIndices.ASSET1_OUT_TXN].txn.amount;
    const asset2Out = txGroup[V1_1RemoveLiquidityTxnIndices.ASSET2_OUT_TXN].txn.amount;
    const liquidityIn = txGroup[V1_1RemoveLiquidityTxnIndices.LIQUDITY_IN_TXN].txn.amount;

    const prevExcessAssets = await getAccountExcessWithinPool({
      client,
      pool,
      accountAddr: initiatorAddr
    });

    const [{confirmedRound, txnID}] = await sendAndWaitRawTransaction(client, [
      signedTxns
    ]);

    const excessAssets = await getAccountExcessWithinPool({
      client,
      pool,
      accountAddr: initiatorAddr
    });

    let excessAmountDeltaAsset1 =
      excessAssets.excessAsset1 - prevExcessAssets.excessAsset1;

    if (excessAmountDeltaAsset1 < 0n) {
      excessAmountDeltaAsset1 = 0n;
    }

    let excessAmountDeltaAsset2 =
      excessAssets.excessAsset2 - prevExcessAssets.excessAsset2;

    if (excessAmountDeltaAsset2 < 0n) {
      excessAmountDeltaAsset2 = 0n;
    }

    return {
      round: confirmedRound,
      fees: sumUpTxnFees(txGroup),
      asset1ID: pool.asset1ID,
      asset1Out: BigInt(asset1Out) + excessAmountDeltaAsset1,
      asset2ID: pool.asset2ID,
      asset2Out: BigInt(asset2Out) + excessAmountDeltaAsset2,
      liquidityID: pool.liquidityTokenID!,
      liquidityIn: BigInt(liquidityIn),
      excessAmounts: [
        {
          assetID: pool.asset1ID,
          excessAmountForBurning: excessAmountDeltaAsset1,
          totalExcessAmount: excessAssets.excessAsset1
        },
        {
          assetID: pool.asset2ID,
          excessAmountForBurning: excessAmountDeltaAsset2,
          totalExcessAmount: excessAssets.excessAsset2
        }
      ],
      txnID,
      groupID: getTxnGroupID(txGroup)
    };
  } catch (error: any) {
    const parsedError = new TinymanError(
      error,
      "We encountered something unexpected while burning liquidity. Try again later."
    );

    if (parsedError.type === "SlippageTolerance") {
      parsedError.setMessage(
        "The burn failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."
      );
    }

    throw parsedError;
  }
}

export const RemoveLiquidityV1_1 = {
  generateTxns,
  signTxns,
  execute
};