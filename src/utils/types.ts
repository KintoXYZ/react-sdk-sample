export interface AppMetadata {
  parent: `0x${string}`;
  paymasterBalance: number;
  tokenId: number;
  dsaEnabled: boolean;
  rateLimitPeriod: number;
  rateLimitNumber: number;
  gasLimitPeriod: number;
  gasLimitCost: number;
  name: string;
  devEOAs: string[];
  appContracts: string[];
}

export interface KintoAccountInfo {
  exists: boolean;
  approval?: boolean;
  walletAddress?: `0x${string}`;
  app: AppMetadata;
  appKey?: `0x${string}`;
};

export interface TxCall {
  to: `0x${string}`;
  data: `0x${string}`;
  value: bigint;
};