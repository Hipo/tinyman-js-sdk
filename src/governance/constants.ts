import {SupportedNetwork} from "../util/commonTypes";

const TINY_ASSET_ID: Record<SupportedNetwork, number> = {
  testnet: 258703304,
  // TODO: Update mainnet tiny asset id when it is available
  mainnet: NaN
};

const VAULT_APP_ID: Record<SupportedNetwork, number> = {
  testnet: 265037714,
  // TODO: Update mainnet vault app id when it is available
  mainnet: NaN
};

const BOX_FLAT_MIN_BALANCE = 2_500;
const BOX_BYTE_MIN_BALANCE = 400;

const TWO_TO_THE_64 = 2 ** 64;

export {
  TINY_ASSET_ID,
  VAULT_APP_ID,
  BOX_BYTE_MIN_BALANCE,
  BOX_FLAT_MIN_BALANCE,
  TWO_TO_THE_64
};
