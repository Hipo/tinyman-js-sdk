import AlgodClient from "algosdk/dist/types/client/v2/algod/algod";

import {SupportedNetwork} from "../util/commonTypes";
import {getAccountPowers, getAccountState, getPowerIndexAt} from "./vault/storage";
import {VAULT_APP_ID} from "./constants";
import {getBias, getCumulativePowerDelta} from "./utils";

class TinymanGovernanceClient {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private algodClient: AlgodClient,
    private userAddress: string,
    private network: SupportedNetwork
  ) {}

  async getTinyPower(timeStamp: number = Date.now()) {
    const accountState = await this.fetchAccountState();

    if (!accountState) {
      return 0;
    }

    const accountPowers = await getAccountPowers(
      this.algodClient,
      this.userAddress,
      VAULT_APP_ID[this.network],
      accountState.powerCount
    );

    const accountPowerIndex = getPowerIndexAt(accountPowers, timeStamp);

    if (accountPowerIndex === null) {
      return 0;
    }

    const accountPower = accountPowers[accountPowerIndex];
    const timeDelta = timeStamp - accountPower.timestamp;
    const tinyPower = Math.max(
      accountPower.bias - getBias(accountPower.slope, timeDelta),
      0
    );

    return tinyPower;
  }

  async getCumulativeTinyPower(timeStamp: number = Date.now()) {
    const accountState = await this.fetchAccountState();

    if (!accountState) {
      return 0;
    }

    const accountPowers = await getAccountPowers(
      this.algodClient,
      this.userAddress,
      VAULT_APP_ID[this.network],
      accountState.powerCount
    );
    const accountPowerIndex = getPowerIndexAt(accountPowers, timeStamp);

    if (accountPowerIndex === null) {
      return 0;
    }

    const accountPower = accountPowers[accountPowerIndex];
    const timeDelta = timeStamp - accountPower.timestamp;
    const cumulativePowerDelta = getCumulativePowerDelta(
      accountPower.bias,
      accountPower.slope,
      timeDelta
    );
    const cumulativeTinyPower = accountPower.cumulativePower - cumulativePowerDelta;

    return cumulativeTinyPower;
  }

  fetchAccountState() {
    return getAccountState(
      this.algodClient,
      VAULT_APP_ID[this.network],
      this.userAddress
    );
  }
}

export default TinymanGovernanceClient;
