import { Algodv2 } from "algosdk";
import { CONTRACT_VERSION } from "../contract/constants";
import { TinymanAnalyticsApiAsset } from "../util/asset/assetModels";
import { InitiatorSigner, SignerTransaction, SupportedNetwork } from "../util/commonTypes";
import { PoolReserves, V1PoolInfo, V2PoolInfo } from "../util/pool/poolTypes";
import { SwapQuoteWithPool, SwapType } from "./types";
/**
 * Gets quotes for swap from each pool passed as an argument,
 * and returns the best quote (with the highest rate).
 */
export declare function getQuote(params: {
    type: SwapType;
    pools: {
        info: V1PoolInfo | V2PoolInfo;
        reserves: PoolReserves;
    }[];
    assetIn: Pick<TinymanAnalyticsApiAsset, "id" | "decimals">;
    assetOut: Pick<TinymanAnalyticsApiAsset, "id" | "decimals">;
    amount: number | bigint;
}): SwapQuoteWithPool;
/**
 * Gets quotes for fixed input swap from each pool passed as an argument,
 * and returns the best quote (with the highest rate).
 */
export declare function getFixedInputSwapQuote({ pools, assetIn, assetOut, amount }: {
    pools: {
        info: V1PoolInfo | V2PoolInfo;
        reserves: PoolReserves;
    }[];
    assetIn: Pick<TinymanAnalyticsApiAsset, "id" | "decimals">;
    assetOut: Pick<TinymanAnalyticsApiAsset, "id" | "decimals">;
    amount: number | bigint;
}): SwapQuoteWithPool;
/**
 * Gets quotes for fixed output swap from each pool passed as an argument,
 * and returns the best quote (with the highest rate).
 */
export declare function getFixedOutputSwapQuote({ pools, assetIn, assetOut, amount }: {
    pools: {
        info: V1PoolInfo | V2PoolInfo;
        reserves: PoolReserves;
    }[];
    assetIn: Pick<TinymanAnalyticsApiAsset, "id" | "decimals">;
    assetOut: Pick<TinymanAnalyticsApiAsset, "id" | "decimals">;
    amount: number | bigint;
}): SwapQuoteWithPool;
export declare function generateTxns(params: {
    client: Algodv2;
    pool: V1PoolInfo | V2PoolInfo;
    poolAddress: string;
    swapType: SwapType;
    assetIn: {
        assetID: number;
        amount: number | bigint;
    };
    assetOut: {
        assetID: number;
        amount: number | bigint;
    };
    slippage: number;
    initiatorAddr: string;
}): Promise<SignerTransaction[]>;
export declare function signTxns(params: {
    pool: V1PoolInfo;
    txGroup: SignerTransaction[];
    initiatorSigner: InitiatorSigner;
}): Promise<Uint8Array[]>;
interface ExecuteCommonParams {
    swapType: SwapType;
    client: Algodv2;
    pool: V2PoolInfo;
    network: SupportedNetwork;
    txGroup: SignerTransaction[];
    signedTxns: Uint8Array[];
    assetIn: {
        assetID: number;
        amount: number | bigint;
    };
}
export declare function execute(params: ({
    contractVersion: typeof CONTRACT_VERSION.V1_1;
    initiatorAddr: string;
} | {
    contractVersion: typeof CONTRACT_VERSION.V2;
}) & ExecuteCommonParams): Promise<import("./types").V2SwapExecution> | Promise<import("./types").V1SwapExecution>;
export {};