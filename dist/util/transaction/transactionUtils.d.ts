import AlgodClient from "algosdk/dist/types/src/client/v2/algod/algod";
import { SignerTransaction } from "../commonTypes";
export declare function getAppCallTxnResponse(client: AlgodClient, txGroup: SignerTransaction[]): Promise<Record<string, any> | undefined>;
/**
 * Tries to find the app call transaction in the group, get the response, and extract the inner txns data.
 * @returns the innter transactions of the app call transaction or `undefined` if no app call transaction was found.
 */
export declare function getAppCallInnerTxns(client: AlgodClient, txGroup: SignerTransaction[]): Promise<{
    txn: {
        txn: {
            xaid: number;
            aamt: number;
            type: string;
        };
    };
}[] | undefined>;
/**
 * Combines the provided signer transaction groups into one signer transaction group, with a new group ID
 * @param signerTransactions - The signer transaction groups to combine
 * @returns the combined signer transaction groups, with a new assigned group ID
 */
export declare function combineAndRegroupSignerTxns(...signerTransactions: SignerTransaction[][]): SignerTransaction[];
