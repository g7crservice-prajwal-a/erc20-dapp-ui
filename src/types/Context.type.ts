import type { BrowserProvider, JsonRpcSigner } from "ethers";

interface WalletContextType {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  account: string | null;
  walletLoading: boolean;
  walletConnected: boolean;
  connectWallet: () => Promise<void>;
}

export type { WalletContextType };
