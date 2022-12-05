import algosdk, {
  Algodv2,
  ALGORAND_MIN_TX_FEE,
  Transaction,
  waitForConfirmation
} from "algosdk";

import {
  applySlippageToAmount,
  convertFromBaseUnits,
  sendAndWaitRawTransaction
} from "../../util/util";
import {
  InitiatorSigner,
  SignerTransaction,
  SupportedNetwork
} from "../../util/commonTypes";
import TinymanError from "../../util/error/TinymanError";
import {PoolStatus, V2PoolInfo} from "../../util/pool/poolTypes";
import {SwapQuote, V2SwapExecution} from "../types";
import {SwapType} from "../constants";
import {
  V2_SWAP_APP_CALL_ARG_ENCODED,
  V2_SWAP_APP_CALL_SWAP_TYPE_ARGS_ENCODED,
  V2SwapTxnGroupIndices,
  V2_SWAP_APP_CALL_INNER_TXN_COUNT
} from "./constants";
import {poolUtils} from "../../util/pool";
import {isAlgo} from "../../util/asset/assetUtils";
import {calculatePriceImpact} from "../common/utils";

async function generateTxns({
  client,
  pool,
  swapType,
  assetIn,
  assetOut,
  initiatorAddr,
  slippage
}: {
  client: Algodv2;
  pool: V2PoolInfo;
  swapType: SwapType;
  assetIn: {assetID: number; amount: number | bigint};
  assetOut: {assetID: number; amount: number | bigint};
  initiatorAddr: string;
  slippage: number;
}): Promise<SignerTransaction[]> {
  const suggestedParams = await client.getTransactionParams().do();
  const poolAddress = pool.account.address();
  const isAssetInAlgo = isAlgo(assetIn.assetID);
  const assetInAmount =
    swapType === SwapType.FixedInput
      ? assetIn.amount
      : applySlippageToAmount("positive", slippage, assetIn.amount);
  const assetOutAmount =
    swapType === SwapType.FixedOutput
      ? assetOut.amount
      : applySlippageToAmount("negative", slippage, assetOut.amount);

  /**
   * If the input asset is Algo, a payment txn, otherwise an asset transfer txn is required
   */
  const inputTxn = isAssetInAlgo
    ? algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: initiatorAddr,
        to: poolAddress,
        amount: assetInAmount,
        suggestedParams
      })
    : algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: initiatorAddr,
        to: poolAddress,
        amount: assetInAmount,
        assetIndex: assetIn.assetID,
        suggestedParams
      });

  const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
    from: initiatorAddr,
    appIndex: pool.validatorAppID!,
    appArgs: [
      V2_SWAP_APP_CALL_ARG_ENCODED,
      V2_SWAP_APP_CALL_SWAP_TYPE_ARGS_ENCODED[swapType],
      algosdk.encodeUint64(assetOutAmount)
    ],
    accounts: [poolAddress],
    foreignAssets: [pool.asset1ID, pool.asset2ID],
    suggestedParams
  });

  appCallTxn.fee = getSwapAppCallFeeAmount(swapType);

  let txns: Transaction[] = [];

  txns[V2SwapTxnGroupIndices.INPUT_TXN] = inputTxn;
  txns[V2SwapTxnGroupIndices.APP_CALL_TXN] = appCallTxn;

  const txGroup = algosdk.assignGroupID(txns);

  return [
    {
      txn: txGroup[V2SwapTxnGroupIndices.INPUT_TXN],
      signers: [initiatorAddr]
    },
    {
      txn: txGroup[V2SwapTxnGroupIndices.APP_CALL_TXN],
      signers: [initiatorAddr]
    }
  ];
}

function signTxns({
  txGroup,
  initiatorSigner
}: {
  txGroup: SignerTransaction[];
  initiatorSigner: InitiatorSigner;
}): Promise<Uint8Array[]> {
  return initiatorSigner([txGroup]);
}

function getSwapAppCallFeeAmount(swapType: SwapType) {
  // Add +1 to account for the outer txn fee
  const totalTxnCount = V2_SWAP_APP_CALL_INNER_TXN_COUNT[swapType] + 1;

  return totalTxnCount * ALGORAND_MIN_TX_FEE;
}

/**
 * Executes a swap with the desired quantities.
 */
async function execute({
  client,
  pool,
  txGroup,
  signedTxns,
  network,
  assetIn
}: {
  client: Algodv2;
  pool: V2PoolInfo;
  network: SupportedNetwork;
  txGroup: SignerTransaction[];
  signedTxns: Uint8Array[];
  assetIn: {assetID: number; amount: number | bigint};
}): Promise<V2SwapExecution> {
  let [{confirmedRound, txnID}] = await sendAndWaitRawTransaction(client, [signedTxns]);
  const appCallTxnId = txGroup[V2SwapTxnGroupIndices.APP_CALL_TXN].txn.txID();
  const appCallTxnResponse = await waitForConfirmation(client, appCallTxnId, 1000);
  const innerTxns: {txn: {txn: {xaid: number; aamt: number}}}[] =
    appCallTxnResponse["inner-txns"];
  const assetOutId = [pool.asset1ID, pool.asset2ID].filter(
    (id) => id !== assetIn.assetID
  )[0];
  /**
   * If the swap type if Fixed Output, usually there will be a difference between
   * input amount and the actual used input amount. The change will be returned to the user
   * using an inner txn.
   * If it is `undefined`, it means that the input amount was exactly the amount used,
   * or the swap type is fixed input.
   */
  const assetInChangeInnerTxn = innerTxns.find(
    (item) => item.txn.txn.xaid === assetIn.assetID
  )?.txn.txn;
  const assetOutInnerTxn = innerTxns.find((item) => item.txn.txn.xaid === assetOutId)?.txn
    .txn;

  // TODO: Improve error handling here. Check: https://github.com/Hipo/private-tinyman-js-sdk/pull/4#discussion_r1010836979
  if (!assetOutInnerTxn) {
    console.log({confirmedRound, txnID});
    throw new Error(
      "We successfully swapped your assets and your transactions went through. However, there was an error while reading the output amount from the transaction group."
    );
  }

  return {
    round: confirmedRound,
    assetIn: {
      // The actual spent amount is the input amount minus the change (refunded) amount
      amount: BigInt(assetIn.amount) - BigInt(assetInChangeInnerTxn?.aamt || 0),
      assetID: assetIn.assetID
    },
    assetOut: {
      amount: assetOutInnerTxn?.aamt,
      assetID: assetOutId
    },
    pool: await poolUtils.v2.getPoolInfo({
      client,
      network,
      asset1ID: pool.asset1ID,
      asset2ID: pool.asset2ID
    }),
    appCallTxnResponse,
    txnID
  };
}

/**
 * @param type - Type of the swap
 * @param pool - Information for the pool.
 * @param asset.assetID - ID of the asset to be swapped
 * @param asset.amount - Amount of the asset to be swapped
 * @param decimals.assetIn - Decimals quantity for the input asset
 * @param decimals.assetOut - Decimals quantity for the output asset
 * @returns A promise for the Swap quote
 */
function getQuote(
  type: SwapType,
  pool: V2PoolInfo,
  asset: {assetID: number; amount: number | bigint},
  decimals: {assetIn: number; assetOut: number}
): SwapQuote {
  let quote: SwapQuote;

  if (pool.status !== PoolStatus.READY) {
    throw new TinymanError({pool, asset}, "Trying to swap on a non-existent pool");
  }

  if (type === SwapType.FixedInput) {
    quote = getFixedInputSwapQuote({pool, assetIn: asset, decimals});
  } else {
    quote = getFixedOutputSwapQuote({pool, assetOut: asset, decimals});
  }

  return quote;
}

/**
 * @returns A quote for a fixed input swap. Does NOT execute any transactions.
 */
function getFixedInputSwapQuote({
  pool,
  assetIn,
  decimals
}: {
  pool: V2PoolInfo;
  assetIn: {assetID: number; amount: number | bigint};
  decimals: {assetIn: number; assetOut: number};
}): SwapQuote {
  if (pool.status !== PoolStatus.READY) {
    throw new TinymanError({pool, assetIn}, "Trying to swap on a non-existent pool");
  }

  const assetInAmount = BigInt(assetIn.amount);
  // TODO: remove `!` once pool info shape is updated
  const totalFeeShare = pool.totalFeeShare!;

  let assetOutID: number;
  let inputSupply: bigint;
  let outputSupply: bigint;

  if (assetIn.assetID === pool.asset1ID) {
    assetOutID = pool.asset2ID;
    inputSupply = pool.asset1Reserves!;
    outputSupply = pool.asset2Reserves!;
  } else {
    assetOutID = pool.asset1ID;
    inputSupply = pool.asset2Reserves!;
    outputSupply = pool.asset1Reserves!;
  }

  const {swapOutputAmount, totalFeeAmount, priceImpact} = calculateFixedInputSwap({
    inputSupply,
    outputSupply,
    swapInputAmount: assetInAmount,
    totalFeeShare,
    decimals
  });

  return {
    assetInID: assetIn.assetID,
    assetInAmount,
    assetOutID,
    assetOutAmount: swapOutputAmount,
    swapFee: Number(totalFeeAmount),
    rate:
      convertFromBaseUnits(decimals.assetOut, Number(swapOutputAmount)) /
      convertFromBaseUnits(decimals.assetIn, Number(assetInAmount)),
    priceImpact
  };
}

/**
 * @returns A quote for a fixed output swap. Does NOT execute any transactions.
 */
function getFixedOutputSwapQuote({
  pool,
  assetOut,
  decimals
}: {
  pool: V2PoolInfo;
  assetOut: {assetID: number; amount: number | bigint};
  decimals: {assetIn: number; assetOut: number};
}): SwapQuote {
  const assetOutAmount = BigInt(assetOut.amount);
  // TODO: remove `!` once pool info shape is updated
  const totalFeeShare = pool.totalFeeShare!;
  let assetInID: number;
  let inputSupply: bigint;
  let outputSupply: bigint;

  if (assetOut.assetID === pool.asset1ID) {
    assetInID = pool.asset2ID;
    inputSupply = pool.asset2Reserves!;
    outputSupply = pool.asset1Reserves!;
  } else {
    assetInID = pool.asset1ID;
    inputSupply = pool.asset1Reserves!;
    outputSupply = pool.asset2Reserves!;
  }

  const {swapInputAmount, totalFeeAmount, priceImpact} = calculateFixedOutputSwap({
    inputSupply,
    outputSupply,
    swapOutputAmount: assetOutAmount,
    totalFeeShare,
    decimals
  });

  return {
    assetInID,
    assetInAmount: swapInputAmount,
    assetOutID: assetOut.assetID,
    assetOutAmount,
    swapFee: Number(totalFeeAmount),
    rate:
      convertFromBaseUnits(decimals.assetOut, Number(assetOutAmount)) /
      convertFromBaseUnits(decimals.assetIn, Number(swapInputAmount)),
    priceImpact
  };
}

function calculateFixedInputSwap({
  inputSupply,
  outputSupply,
  swapInputAmount,
  totalFeeShare,
  decimals
}: {
  inputSupply: bigint;
  outputSupply: bigint;
  swapInputAmount: bigint;
  totalFeeShare: bigint;
  decimals: {assetIn: number; assetOut: number};
}) {
  const totalFeeAmount = BigInt(
    calculateFixedInputFeeAmount({
      inputAmount: swapInputAmount,
      totalFeeShare
    })
  );
  const swapAmount = swapInputAmount - totalFeeAmount;
  const swapOutputAmount = calculateOutputAmountOfFixedInputSwap({
    inputSupply,
    outputSupply,
    swapAmount
  });
  const priceImpact = calculatePriceImpact({
    inputSupply,
    outputSupply,
    assetIn: {
      amount: swapInputAmount,
      decimals: decimals.assetIn
    },
    assetOut: {
      amount: swapOutputAmount,
      decimals: decimals.assetOut
    }
  });

  return {
    swapOutputAmount,
    totalFeeAmount,
    priceImpact
  };
}

function calculateFixedOutputSwap({
  inputSupply,
  outputSupply,
  swapOutputAmount,
  totalFeeShare,
  decimals
}: {
  inputSupply: bigint;
  outputSupply: bigint;
  swapOutputAmount: bigint;
  totalFeeShare: bigint;
  decimals: {assetIn: number; assetOut: number};
}) {
  const swapAmount = calculateSwapAmountOfFixedOutputSwap({
    inputSupply,
    outputSupply,
    outputAmount: swapOutputAmount
  });
  const totalFeeAmount = calculateFixedOutputFeeAmount({
    swapAmount,
    totalFeeShare
  });
  const swapInputAmount = swapAmount + totalFeeAmount;
  const priceImpact = calculatePriceImpact({
    inputSupply,
    outputSupply,
    assetIn: {
      amount: swapInputAmount,
      decimals: decimals.assetIn
    },
    assetOut: {
      amount: swapOutputAmount,
      decimals: decimals.assetOut
    }
  });

  return {
    swapInputAmount,
    totalFeeAmount,
    priceImpact
  };
}

function calculateFixedInputFeeAmount({
  inputAmount,
  totalFeeShare
}: {
  inputAmount: bigint;
  totalFeeShare: bigint;
}) {
  return Math.floor(Number(inputAmount * BigInt(totalFeeShare)) / 10_000);
}

function calculateFixedOutputFeeAmount({
  swapAmount,
  totalFeeShare
}: {
  swapAmount: bigint;
  totalFeeShare: bigint;
}) {
  const input_amount = Math.floor(
    Number((swapAmount * BigInt(10_000)) / (BigInt(10_000) - BigInt(totalFeeShare)))
  );
  const total_fee_amount = BigInt(input_amount) - swapAmount;

  return total_fee_amount;
}

function calculateOutputAmountOfFixedInputSwap({
  inputSupply,
  outputSupply,
  swapAmount
}: {
  inputSupply: bigint;
  outputSupply: bigint;
  swapAmount: bigint;
}): bigint {
  const k = inputSupply * outputSupply;
  let outputAmount = outputSupply - BigInt(k / (inputSupply + BigInt(swapAmount)));

  outputAmount -= BigInt(1);

  return outputAmount;
}

function calculateSwapAmountOfFixedOutputSwap({
  inputSupply,
  outputSupply,
  outputAmount
}: {
  inputSupply: bigint;
  outputSupply: bigint;
  outputAmount: bigint;
}): bigint {
  const k = inputSupply * outputSupply;
  let swapAmount = BigInt(k / (outputSupply - outputAmount)) - inputSupply;

  swapAmount += BigInt(1);

  return swapAmount;
}

export const SwapV2 = {
  getQuote,
  getFixedInputSwapQuote,
  getFixedOutputSwapQuote,
  generateTxns,
  signTxns,
  execute,
  calculateFixedInputSwap
};
