declare const MAX_LOCK_TIME = 126144000;
declare const MIN_LOCK_AMOUNT = 10000000;
declare const MIN_LOCK_AMOUNT_INCREMENT = 10000000;
declare const TWO_TO_THE_64: number;
declare const ACCOUNT_STATE_BOX_SIZE = 32;
declare const SLOPE_CHANGE_BOX_SIZE = 16;
declare const ACCOUNT_POWER_SIZE = 48;
declare const ACCOUNT_POWER_BOX_SIZE = 1008;
declare const ACCOUNT_POWER_BOX_ARRAY_LEN = 21;
declare const TOTAL_POWER_SIZE = 48;
declare const TOTAL_POWER_BOX_SIZE = 1008;
declare const TOTAL_POWER_BOX_ARRAY_LEN = 21;
declare const TOTAL_POWERS: Uint8Array;
declare const SLOPE_CHANGES: Uint8Array;
declare const ACCOUNT_STATE_BOX_COST: number;
declare const SLOPE_CHANGE_BOX_COST: number;
declare const ACCOUNT_POWER_BOX_COST: number;
declare const TOTAL_POWER_BOX_COST: number;
export { ACCOUNT_STATE_BOX_SIZE, SLOPE_CHANGE_BOX_SIZE, ACCOUNT_POWER_SIZE, ACCOUNT_POWER_BOX_SIZE, ACCOUNT_POWER_BOX_ARRAY_LEN, TOTAL_POWER_BOX_ARRAY_LEN, TOTAL_POWER_BOX_SIZE, TOTAL_POWER_SIZE, TOTAL_POWERS, MAX_LOCK_TIME, MIN_LOCK_AMOUNT, MIN_LOCK_AMOUNT_INCREMENT, TWO_TO_THE_64, SLOPE_CHANGES, ACCOUNT_STATE_BOX_COST, SLOPE_CHANGE_BOX_COST, ACCOUNT_POWER_BOX_COST, TOTAL_POWER_BOX_COST };