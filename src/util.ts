
export function decodeState(stateArray: any[]): Record<string, string | number | bigint> {
    const state: Record<string, number | string> = {};

    for (const pair of stateArray) {
        const key = pair.key;
        let value;

        if (pair.value.type == 1) { // intentionally using == to match BigInts
            // value is byte array
            value = pair.value.bytes;
        } else if (pair.value.type == 2) {
            // value is uint64
            value = pair.value.uint;
        } else {
            throw new Error(`Unexpected state type: ${pair.value.type}`);
        }

        state[key] = value;
    }

    return state;
}

export function joinUint8Arrays(arrays: Uint8Array[]) {
    const joined: number[] = [];
    for (const array of arrays) {
        joined.push(...array);
    }
    return Uint8Array.from(joined);
}

const MIN_BALANCE_PER_ACCOUNT = 100000n;
const MIN_BALANCE_PER_ASSET = 100000n;
const MIN_BALANCE_PER_APP = 100000n;
const MIN_BALANCE_PER_APP_BYTESLICE = 25000n+25000n;
const MIN_BALANCE_PER_APP_UINT = 25000n+3500n;

export function getMinBalanceForAccount(accountInfo: any): bigint {
    const totalSchema = accountInfo['apps-total-schema'];
    let totalByteSlices = 0n;
    let totalUints = 0n;
    if (totalSchema) {
        if (totalSchema['num-byte-slice']) {
            totalByteSlices = totalSchema['num-byte-slice'];
        }
        if (totalSchema['num-uint']) {
            totalUints = totalSchema['num-uint'];
        }
    }

    const localApps = accountInfo['apps-local-state'] || [];
    const createdApps = accountInfo['created-apps'] || [];
    const assets = accountInfo['assets'] || [];

    return MIN_BALANCE_PER_ACCOUNT +
        MIN_BALANCE_PER_ASSET * BigInt(assets.length) +
        MIN_BALANCE_PER_APP * BigInt(createdApps.length + localApps.length) +
        MIN_BALANCE_PER_APP_UINT * totalUints +
        MIN_BALANCE_PER_APP_BYTESLICE * totalByteSlices;
}

export async function waitForTransaction(client: any, txId: string): Promise<any> {
    let lastStatus = await client.status().do();
    let lastRound = lastStatus['last-round'];
    while (true) {
        const status = await client.pendingTransactionInformation(txId).do();
        if (status['pool-error']) {
            throw new Error(`Transaction Pool Error: ${status['pool-error']}`);
        }
        if (status['confirmed-round']) {
            return status;
        }
        lastStatus = await client.statusAfterBlock(lastRound + 1).do();
        lastRound = lastStatus['last-round'];
    }
}