import {decodeAddress} from "algosdk";
import AlgodClient from "algosdk/dist/types/client/v2/algod/algod";

import {getCumulativePowerDelta, getRawBoxValue} from "../utils";
import {ACCOUNT_POWER_BOX_ARRAY_LEN, ACCOUNT_POWER_SIZE, TOTAL_POWERS} from "./constants";
import {intToBytes} from "../../util/util";

class AccountState {
  lockedAmount: number;
  lockEndTime: number;
  powerCount: number;
  freeAccountPowerSpaceCount = 0;
  lastAccountPowerBoxIndex: number;
  lastAccountPowerArrayIndex: number;

  constructor(lockedAmount: number, lockEndTime: number, powerCount: number) {
    this.lockedAmount = lockedAmount;
    this.lockEndTime = lockEndTime;
    this.powerCount = powerCount;

    const remainder = powerCount % ACCOUNT_POWER_BOX_ARRAY_LEN;

    if (remainder > 0) {
      this.freeAccountPowerSpaceCount = ACCOUNT_POWER_BOX_ARRAY_LEN - remainder;
    }

    this.lastAccountPowerBoxIndex = getLastAccountPowerBoxIndexes(powerCount)[0];
    this.lastAccountPowerArrayIndex = getLastAccountPowerBoxIndexes(powerCount)[1];
  }
}

class AccountPower {
  bias: number;
  timestamp: number;
  slope: number;
  cumulativePower: number;

  constructor(bias: number, timestamp: number, slope: number, cumulativePower: number) {
    this.bias = bias;
    this.timestamp = timestamp;
    this.slope = slope;
    this.cumulativePower = cumulativePower;
  }

  get lockEndTimestamp() {
    const lockDuration = (this.bias * 2 ** 64) / this.slope;

    return this.timestamp + lockDuration;
  }

  cumulativePowerAt(timestamp: number) {
    const timeDelta = timestamp - this.timestamp;

    if (timeDelta < 0) {
      throw new Error("Time delta must be greater than or equal to 0");
    }

    return (
      this.cumulativePower + getCumulativePowerDelta(this.bias, this.slope, timeDelta)
    );
  }
}

class TotalPower {
  bias: number;
  timestamp: number;
  slope: number;
  cumulativePower: number;

  constructor(bias: number, timestamp: number, slope: number, cumulativePower: number) {
    this.bias = bias;
    this.timestamp = timestamp;
    this.slope = slope;
    this.cumulativePower = cumulativePower;
  }
}

async function getAccountState(algodClient: AlgodClient, appId: number, address: string) {
  const boxName = getAccountStateBoxName(address);
  const rawBox = await getRawBoxValue(algodClient, appId, boxName);

  if (!rawBox) {
    return null;
  }

  return parseBoxAccountState(rawBox);
}

function parseBoxAccountState(rawBox: Uint8Array): AccountState {
  const buffer = Buffer.from(rawBox);

  return new AccountState(
    buffer.readUIntBE(0, 8),
    buffer.readUIntBE(8, 16),
    buffer.readUIntBE(16, 24)
  );
}

function getAccountStateBoxName(address: string): Uint8Array {
  return decodeAddress(address).publicKey;
}

function getTotalPowerBoxName(boxIndex: number): Uint8Array {
  const boxIndexBytes = intToBytes(boxIndex);
  const combinedArray = new Uint8Array(TOTAL_POWERS.length + boxIndexBytes.length);

  combinedArray.set(TOTAL_POWERS, 0);
  combinedArray.set(boxIndexBytes, TOTAL_POWERS.length);

  return combinedArray;
}

function getLastAccountPowerBoxIndexes(powerCount: number): [number, number] {
  const lastIndex = powerCount - 1;
  const boxIndex = lastIndex;
  const arrayIndex = lastIndex % ACCOUNT_POWER_BOX_ARRAY_LEN;

  return [boxIndex, arrayIndex];
}

function getAccountPowerBoxName(address: string, boxIndex: number) {
  const decodedAddress = decodeAddress(address).publicKey;
  const boxIndexBytes = intToBytes(boxIndex);

  const combinedArray = new Uint8Array(decodedAddress.length + boxIndexBytes.length);

  combinedArray.set(decodedAddress, 0);
  combinedArray.set(boxIndexBytes, decodedAddress.length);

  return combinedArray;
}

async function getAccountPowers(
  algodClient: AlgodClient,
  address: string,
  appId: number,
  powerCount: number | null = null
) {
  let boxCount = 0;

  if (powerCount) {
    boxCount = Math.ceil(powerCount / ACCOUNT_POWER_BOX_ARRAY_LEN);
  }

  const accountPowers: AccountPower[] = [];

  for (let boxIndex = 0; boxIndex < boxCount; boxIndex++) {
    const boxName = getAccountPowerBoxName(address, boxIndex);
    const rawBox = await getRawBoxValue(algodClient, appId, boxName);

    accountPowers.push(...parseBoxAccountPower(rawBox));
  }

  return accountPowers;
}

function getPowerIndexAt(powers: AccountPower[] | TotalPower[], timestamp: number) {
  let powerIndex: number | null = null;

  for (let index = 0; index < powers.length; index++) {
    const power = powers[index];

    if (timestamp >= power.timestamp) {
      powerIndex = index;
    } else {
      break;
    }
  }

  return powerIndex;
}

function parseBoxAccountPower(rawBox: Uint8Array) {
  const boxSize = ACCOUNT_POWER_SIZE;

  const rows: Uint8Array[] = [];

  for (let i = 0; i < rawBox.length; i += boxSize) {
    rows.push(rawBox.slice(i, i + boxSize));
  }

  const powers: AccountPower[] = [];

  for (let row of rows) {
    if (row === Buffer.alloc(boxSize)) {
      break;
    }

    const buffer = Buffer.from(rawBox);

    powers.push(
      new AccountPower(
        buffer.readUIntBE(0, 8),
        buffer.readUIntBE(8, 16),
        buffer.readUIntBE(16, 32),
        buffer.readUIntBE(32, 48)
      )
    );
  }

  return powers;
}

export {
  getAccountState,
  getAccountPowers,
  getAccountPowerBoxName,
  getAccountStateBoxName,
  getLastAccountPowerBoxIndexes,
  getPowerIndexAt,
  getTotalPowerBoxName
};
