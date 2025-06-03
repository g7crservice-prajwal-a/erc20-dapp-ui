const EtherEnum = {
  ETH_REQ_ACCOUNT: "eth_requestAccounts",
} as const;

export { EtherEnum };
export type EtherEnum = (typeof EtherEnum)[keyof typeof EtherEnum];
