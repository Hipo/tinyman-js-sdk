import {SupportedNetwork} from "../../../util/commonTypes";
import {SwapType} from "../../constants";

export const SWAP_ROUTER_APP_ID: Record<SupportedNetwork, number> = {
  testnet: 159521633,
  //  This is temporary APP ID for testing only, remove it when the actual mainnet APP ID is deployed
  mainnet: 1071281873
};

/**
 * Inner txn counts according to the swap type
 */
export const SWAP_ROUTER_INNER_TXN_COUNT: Record<SwapType, number> = {
  [SwapType.FixedInput]: 7,
  [SwapType.FixedOutput]: 8
} as const;