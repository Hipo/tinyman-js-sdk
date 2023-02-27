import { ContractVersionValue } from "./types";
export declare function getIsV2ContractVersion(contractVersion: ContractVersionValue): boolean;
export declare function getContract(contractVersion: ContractVersionValue): import("./v2/contract").TinymanContractV2 | import("./v1_1/contract").TinymanContractV1_1;
