import AlgodClient from "algosdk/dist/types/client/v2/algod/algod";

import {TWO_TO_THE_64} from "./constants";

async function getRawBoxValue(algod: AlgodClient, appId: number, boxName: Uint8Array) {
  try {
    const {value} = await algod.getApplicationBoxByName(appId, boxName).do();

    return Buffer.from(value.toString(), "base64");
  } catch (error) {
    throw error;
  }
}

function getBias(slope: number, timeDelta: number) {
  if (timeDelta < 0) {
    throw new Error("Time delta must be greater than or equal to 0");
  }

  return (slope * timeDelta) / TWO_TO_THE_64;
}

function getCumulativePowerDelta(bias: number, slope: number, timeDelta: number) {
  let biasDelta = getBias(slope, timeDelta);

  if (biasDelta > bias) {
    if (slope) {
      biasDelta = (bias * bias * TWO_TO_THE_64) / (slope * 2);
    } else {
      biasDelta = 0;
    }
  } else {
    const newBias = bias - biasDelta;

    biasDelta = ((bias + newBias) * timeDelta) / 2;
  }

  return biasDelta;
}

export {getRawBoxValue, getCumulativePowerDelta, getBias};
