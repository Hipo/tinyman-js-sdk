/** An object containing information about a mint quote. */
export interface V1_1MintQuote {
    /** The round that this quote is based on. */
    round: number;
    /** The ID of the first input asset in this quote. */
    asset1ID: number;
    /** The quantity of the first input asset in this quote. */
    asset1In: bigint;
    /** The ID of the second input asset in this quote. */
    asset2ID: number;
    /** The quantity of the second input asset in this quote. */
    asset2In: bigint;
    /** The ID of the liquidity token output in this quote. */
    liquidityID: number;
    /** The amount of the liquidity token output in this quote. */
    liquidityOut: bigint;
    /** The share of the total liquidity in this quote. */
    share: number;
}
export interface MintSwapQuote {
    amountIn: bigint;
    amountOut: bigint;
    swapFees: bigint;
    priceImpact: bigint;
}
export interface FlexibleMintQuote {
    asset1ID: number;
    asset2ID: number;
    asset1In: bigint;
    asset2In: bigint;
    liquidityOut: bigint;
    liquidityID: number;
    round: number;
    share: number;
    slippage: number;
    swapQuote: MintSwapQuote;
    minPoolTokenAssetAmountWithSlippage: bigint;
}
export interface SingleMintQuote {
    asset1ID: number;
    asset2ID: number;
    assetIn: bigint;
    liquidityOut: bigint;
    liquidityID: number;
    round: number;
    share: number;
    slippage: number;
    swapQuote: MintSwapQuote;
    minPoolTokenAssetAmountWithSlippage: bigint;
}
export interface InitialMintQuote {
    asset1ID: number;
    asset2ID: number;
    asset1In: bigint;
    asset2In: bigint;
    poolTokenAssetAmount: bigint;
    slippage: number;
}
/** An object containing information about a successfully executed mint transaction. */
export interface V1_1MintExecution {
    /** The round that the mint occurred in. */
    round: number;
    /**
     * The total amount of transaction fees that were spent (in microAlgos) to execute the mint and,
     * if applicable, redeem transactions.
     */
    fees: number;
    /** The ID of the output liquidity token asset. */
    liquidityID: number;
    /** The quantity of the output liquidity token asset. */
    liquidityOut?: bigint;
    excessAmount?: {
        /** Excess amount for the current mint */
        excessAmountForMinting: bigint;
        /** Total excess amount accumulated for the pool asset */
        totalExcessAmount: bigint;
    };
    /** The ID of the transaction. */
    txnID: string;
    /** The group ID for the transaction group. */
    groupID: string;
}
export interface V2MintExecution {
    /** The round that the mint occurred in. */
    round: number;
    /** The ID of the transaction. */
    txnID: string;
    /**
     * The total amount of transaction fees that were spent (in microAlgos) to execute the mint and,
     * if applicable, redeem transactions.
     */
    fees: number;
    /** The ID of the output liquidity token asset. */
    liquidityID: number;
    /** The group ID for the transaction group. */
    groupID: string;
    assetOut: {
        assetID: number;
        amount: number | bigint;
    };
}
export declare enum V1_1MintTxnIndices {
    FEE_TXN = 0,
    VALIDATOR_APP_CALL_TXN = 1,
    ASSET1_IN_TXN = 2,
    ASSET2_IN_TXN = 3,
    LIQUDITY_OUT_TXN = 4
}
export declare enum V2MintType {
    SINGLE = "single",
    FLEXIBLE = "flexible",
    INITIAL = "initial"
}
export declare const V2MintTxnIndices: {
    flexible: {
        ASSET1_IN_TXN: number;
        ASSET2_IN_TXN: number;
        VALIDATOR_APP_CALL_TXN: number;
    };
    single: {
        ASSET_IN_TXN: number;
        VALIDATOR_APP_CALL_TXN: number;
    };
    initial: {
        ASSET1_IN_TXN: number;
        ASSET2_IN_TXN: number;
        VALIDATOR_APP_CALL_TXN: number;
    };
};