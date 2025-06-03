import { useEffect, useState } from "react";
import type { ITokenPurchaseEvent } from "../types/Hooks.types";
import { useContracts } from "./useContract";
import type { EventLog } from "ethers";
import { useWallet } from "../context/WalletContext";

export const useTokenPurchasedEvent = () => {
  const { StanTokenSaleContract } = useContracts();
  const { provider } = useWallet();

  const [transactions, setTransactions] = useState<ITokenPurchaseEvent[]>([]),
    [isTxtUpdated, setIsTxtUpdated] = useState<boolean>(false);

  const txtUpdateControl = () => {
    setIsTxtUpdated((prev) => !prev);
  };

  useEffect(() => {
    async function getTransactions() {
      console.log(isTxtUpdated, "isTxtUpdated");
      if (!StanTokenSaleContract) return;
      try {
        const events = await StanTokenSaleContract.queryFilter(
          StanTokenSaleContract.filters.TokensPurchased()
        );

        const parsedTxs: ITokenPurchaseEvent[] = await Promise.all(
          events.map(async (event) => {
            const { args } = event as EventLog;

            const buyer = args?.[0];
            const ethAmount = args?.[1];
            const tokenAmount = args?.[2];

            const block = await provider?.getBlock(event.blockNumber);
            const timestamp: any = block?.timestamp ?? "";
            const date = new Date(timestamp * 1000).toLocaleString();
            return {
              buyer,
              ethAmount: ethAmount.toString(),
              tokenAmount: tokenAmount.toString(),
              date,
              txHash: event.transactionHash,
            };
          })
        );

        setTransactions([...parsedTxs].reverse());
      } catch (error) {
        console.error(error, "Error In Token Purchased...");
      }
    }
    getTransactions();
  }, [StanTokenSaleContract, provider, isTxtUpdated]);

  return { transactions, txtUpdateControl };
};
