import algosdk from "algosdk";

import {SignerTransaction} from "../commonTypes";
import TinymanError from "../error/TinymanError";
import {ALGO_ASSET_ID} from "./assetConstants";

export async function generateOptIntoAssetTxns({
  client,
  assetID,
  initiatorAddr
}): Promise<SignerTransaction[]> {
  try {
    const suggestedParams = await client.getTransactionParams().do();

    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: initiatorAddr,
      to: initiatorAddr,
      assetIndex: assetID,
      amount: 0,
      suggestedParams
    });

    return [{txn: optInTxn, signers: [initiatorAddr]}];
  } catch (error: any) {
    throw new TinymanError(
      error,
      "We encountered something unexpected while opting into this asset. Try again later."
    );
  }
}

export function isAlgo(id: number | bigint) {
  return id === ALGO_ASSET_ID;
}
