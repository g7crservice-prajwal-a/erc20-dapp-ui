import { useEffect, useState } from "react";
import BuyToken from "./components/BuyToken";
import ConnectWallet from "./components/Connect";
import Default from "./components/Default";
import { useWallet } from "./context/WalletContext";
import type { ITokenInfo } from "./types/components.type";
import { useContracts } from "./hooks/useContract";
import { ethers } from "ethers";
import Transactions from "./components/Transcations";
import { useTokenPurchasedEvent } from "./hooks/useTokenPurchasedEvent";

function RouteApp() {
  const { StanTokenContract, StanTokenSaleContract } = useContracts();
  const { walletConnected } = useWallet();
  const { transactions, txtUpdateControl } = useTokenPurchasedEvent();
  const [tokenInfo, setTokenInfo] = useState<ITokenInfo>({
    name: "",
    symbol: "",
    totalSupply: "",
    pricePerToken: null,
  });

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!StanTokenContract) return;
      const [name, symbol, decimals, totalSupply] =
        await StanTokenContract.stanTokenInfo();
      const formattedTotalSupply = ethers.formatUnits(totalSupply, decimals);
      setTokenInfo({
        name,
        symbol,
        totalSupply: formattedTotalSupply,
        pricePerToken: null,
      });
    };

    fetchTokenInfo();
  }, [StanTokenContract, StanTokenSaleContract]);
  return (
    <div>
      {walletConnected ? (
        <div>
          <Default tokenInfo={tokenInfo} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8 overflow-y-auto">
            <BuyToken
              tokenInfo={tokenInfo}
              txtUpdateControl={txtUpdateControl}
            />

            <Transactions transactions={transactions} />
          </div>
        </div>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
}

export default RouteApp;
