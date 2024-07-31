import AlgodClient from "algosdk/dist/types/client/v2/algod/algod";
import { SuggestedParams, Transaction } from "algosdk";
import { VaultAppGlobalState } from "./vault/storage";
import { RewardsAppGlobalState } from "./rewards/storage";
import { ProposalVotingAppGlobalState } from "./proposal-voting/storage";
import { ProposalVote } from "./proposal-voting/constants";
import { GetRawBoxValueCacheProps } from "./types";
import { SupportedNetwork } from "../util/commonTypes";
declare class TinymanGovernanceClient {
    private algodClient;
    private userAddress;
    private network;
    constructor(algodClient: AlgodClient, userAddress: string, network: SupportedNetwork);
    getTinyPower(timeStamp?: number, cacheProps?: GetRawBoxValueCacheProps): Promise<number>;
    getTotalTinyPower(timeStamp?: number, cacheProps?: GetRawBoxValueCacheProps): Promise<number>;
    getCumulativeTinyPower(cacheProps?: GetRawBoxValueCacheProps, timeStamp?: number): Promise<number>;
    fetchVaultAppGlobalState(): Promise<VaultAppGlobalState | null>;
    generateCreateLockTransactions({ lockedAmount, lockEndTime, userAddress }: {
        lockedAmount: number;
        lockEndTime: number;
        userAddress?: string;
    }): Promise<Transaction[]>;
    generateIncreaseLockAmountTransactions({ lockedAmount, userAddress }: {
        lockedAmount: number;
        userAddress?: string;
    }): Promise<Transaction[]>;
    generateExtendLockTimeTransactions({ newLockEndTime, userAddress }: {
        newLockEndTime: number;
        userAddress?: string;
    }): Promise<Transaction[]>;
    generateIncreaseLockAmountAndExtendLockEndTimeTransactions({ lockAmount, lockEndTime, userAddress }: {
        lockAmount: number;
        lockEndTime: number;
        userAddress?: string;
    }): Promise<Transaction[]>;
    generateWithdrawTransactions(userAddress?: string, shouldOptIntoTINY?: boolean): Promise<Transaction[]>;
    fetchAccountState(): Promise<import("./vault/storage").AccountState | null>;
    fetchStakingDistributionProposal(proposalId: string): Promise<import("./staking-voting/storage").StakingDistributionProposal | null>;
    generateCastVoteForStakingDistributionProposalTransactions({ proposalId, votes, assetIds, userAddress, suggestedParams }: {
        proposalId: string;
        votes: number[];
        assetIds: number[];
        userAddress?: string;
        suggestedParams?: SuggestedParams;
    }): Promise<Transaction[]>;
    fetchRewardsAppGlobalState(): Promise<RewardsAppGlobalState | null>;
    generateClaimRewardTransactions({ periodIndexStart, periodCount, userAddress, suggestedParams, shouldOptIntoTINY }: {
        periodIndexStart: number;
        periodCount: number;
        userAddress?: string;
        suggestedParams?: SuggestedParams;
        shouldOptIntoTINY?: boolean;
    }): Promise<Transaction[]>;
    fetchProposal(proposalId: string): Promise<import("./proposal-voting/storage").Proposal | null>;
    uploadProposalMetadata(proposalId: string, metadata: any): Promise<Response>;
    generateCreateProposalTransactions({ proposalId, userAddress, suggestedParams, executionHash, executor }: {
        proposalId: string;
        userAddress?: string;
        suggestedParams?: SuggestedParams;
        executionHash?: string;
        executor?: string;
    }): Promise<Transaction[]>;
    generateCastVoteTransactions({ proposalId, suggestedParams, vote, userAddress }: {
        proposalId: string;
        vote: ProposalVote;
        userAddress?: string;
        suggestedParams?: SuggestedParams;
    }): Promise<Transaction[]>;
    fetchProposalVotingAppGlobalState(): Promise<ProposalVotingAppGlobalState>;
    getRequiredTinyPowerToCreateProposal(): Promise<number>;
}
export { TinymanGovernanceClient };
