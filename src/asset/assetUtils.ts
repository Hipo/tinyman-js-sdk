import algosdk from "algosdk";

import {SignerTransaction, SupportedNetwork} from "../common-types";
import {IndexerAssetInformation, TinymanAnalyticsApiAsset} from "./assetModels";
import {ALGO_ASSET_ID, ALGO_ASSET, CACHED_ASSETS} from "./assetConstants";
import {getIndexerBaseURLForNetwork} from "../util";
import WebStorage from "../web-storage/WebStorage";

export async function generateOptIntoAssetTxns({
  client,
  assetID,
  initiatorAddr
}): Promise<SignerTransaction[]> {
  const suggestedParams = await client.getTransactionParams().do();

  const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: initiatorAddr,
    to: initiatorAddr,
    assetIndex: assetID,
    amount: 0,
    suggestedParams
  });

  return [{txn: optInTxn, signers: [initiatorAddr]}];
}

/**
 * Fetches asset data and caches it in a Map.
 * @param network "mainnet" | "testnet" | "hiponet".
 * @param {number} id - id of the asset
 * @param {boolean} alwaysFetch - Determines whether to always fetch the information of the asset or read it from the cache
 * @returns a promise that resolves with TinymanAnalyticsApiAsset
 */
export function getAssetInformationById(
  network: SupportedNetwork,
  id: number,
  alwaysFetch?: boolean
) {
  return new Promise<{asset: TinymanAnalyticsApiAsset; isDeleted: boolean}>(
    async (resolve, reject) => {
      try {
        if (id === ALGO_ASSET_ID) {
          resolve({asset: ALGO_ASSET, isDeleted: false});
          return;
        }

        const memoizedValue = CACHED_ASSETS[`${id}`];

        if (
          memoizedValue &&
          // invalidate cache for this asset if total_amount is not available in the cached data
          memoizedValue.asset.total_amount != null &&
          !alwaysFetch
        ) {
          resolve(memoizedValue);
          return;
        }

        const response = await fetch(
          `${getIndexerBaseURLForNetwork(network)}/assets/${id}?include-all=true`
        );
        const {asset} = (await response.json()) as IndexerAssetInformation;

        const assetData: TinymanAnalyticsApiAsset = {
          id: `${asset.index}`,
          decimals: Number(asset.params.decimals),
          is_liquidity_token: false,
          name: asset.params.name || "",
          unit_name: asset.params["unit-name"] || "",
          url: "",
          total_amount: String(asset.params.total)
        };

        CACHED_ASSETS[`${id}`] = {asset: assetData, isDeleted: asset.deleted};
        WebStorage.local.setItem(
          WebStorage.STORED_KEYS.TINYMAN_CACHED_ASSETS,
          CACHED_ASSETS
        );

        resolve({asset: assetData, isDeleted: asset.deleted});
      } catch (error) {
        reject(new Error(error.message || "Failed to fetch asset information"));
      }
    }
  );
}
