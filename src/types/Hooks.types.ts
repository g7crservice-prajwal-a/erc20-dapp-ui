interface ITokenPurchaseEvent {
  buyer: string;
  ethAmount: string;
  tokenAmount: string;
  date: string;
  txHash: string;
}

export type { ITokenPurchaseEvent };
