import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import type { BrowserProvider } from "ethers";
import { EtherEnum } from "../utils/constants";
import type { WalletContextType } from "../types/Context.type";

const WalletContext = createContext<WalletContextType>({
  provider: null,
  signer: null,
  account: null,
  walletLoading: false,
  walletConnected: false,

  connectWallet: async () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null),
    [walletLoading, setWalletLoading] = useState<boolean>(false),
    [walletConnected, setWalletConnected] = useState<boolean>(false);

  const walletLoadingControl = () => {
    setWalletLoading((prev) => !prev);
  };
  const connectWallet = async () => {
    if (account) {
      setWalletLoading(false);
      setWalletConnected(true);
      alert("Wallet already connected 🙂");

      return;
    }

    try {
      walletLoadingControl();
      if ((window as any).ethereum) {
        const web3Provider = new ethers.BrowserProvider(
          (window as any).ethereum
        );
        await web3Provider.send(EtherEnum.ETH_REQ_ACCOUNT, []);
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
        setProvider(web3Provider);
        setSigner(signer);
        setAccount(address);
        setWalletConnected(true);
      } else {
        alert("MetaMask not found!");
      }
    } finally {
      walletLoadingControl();
    }
  };

  useEffect(() => {
    if ((window as any).ethereum && !account) {
      connectWallet();
    }
  }, []);

  const contextValue = React.useMemo(
    () => ({
      provider,
      signer,
      account,
      walletLoading,
      walletConnected,
      connectWallet,
    }),
    [provider, signer, account, walletLoading, walletConnected, connectWallet]
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
