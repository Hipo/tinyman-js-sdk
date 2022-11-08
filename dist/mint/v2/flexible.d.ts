import algosdk from "algosdk";
import AlgodClient from "algosdk/dist/types/src/client/v2/algod/algod";
import { SupportedNetwork } from "../../util/commonTypes";
import { PoolInfo, PoolReserves } from "../../util/pool/poolTypes";
import { FlexibleMintQuote } from "../types";
export * from "./common";
/**
 * Get a quote for how many liquidity tokens a deposit of asset1In and asset2In is worth at this
 * moment. This does not execute any transactions.
 *
 * @param params.pool Information for the pool.
 * @param params.reserves Pool reserves.
 * @param params.asset1In The quantity of the first asset being deposited.
 * @param params.asset2In The quantity of the second asset being deposited.
 */
export declare function getQuote({ pool, reserves, asset1In, asset2In, slippage }: {
    pool: PoolInfo;
    reserves: PoolReserves;
    asset1In: number | bigint;
    asset2In: number | bigint;
    slippage?: number;
}): FlexibleMintQuote;
export declare function generateTxns({ client, network, poolAddress, asset_1, pool, asset_2, liquidityToken, initiatorAddr, minPoolTokenAssetAmount }: {
    client: AlgodClient;
    pool: PoolInfo;
    network: SupportedNetwork;
    poolAddress: string;
    asset_1: {
        id: number;
        amount: number | bigint;
    };
    asset_2: {
        id: number;
        amount: number | bigint;
    };
    liquidityToken: {
        id: number;
        amount: number | bigint;
    };
    initiatorAddr: string;
    minPoolTokenAssetAmount: bigint;
}): Promise<{
    txn: algosdk.Transaction;
    signers: string[];
}[]>;