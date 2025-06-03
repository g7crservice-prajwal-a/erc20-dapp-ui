import { ethers } from "ethers";
import { ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import type { ITokenPurchaseEvent } from "../types/Hooks.types";
type PropsType = {
  transactions: ITokenPurchaseEvent[];
};
function Transactions({ transactions }: Readonly<PropsType>) {
  const { provider } = useWallet();
  const [detailedTxs, setDetailedTxs] = useState<any[]>([]);

  useEffect(() => {
    const fetchGasData = async () => {
      if (!provider) return null;
      const txDetails = await Promise.all(
        transactions.map(async (tx) => {
          const receipt = await provider?.getTransactionReceipt(tx.txHash);
          const gasUsed = receipt?.gasUsed?.toString() ?? "0";
          const gasFee = receipt?.fee
            ? ethers.formatEther(receipt.gasPrice * receipt.gasUsed)
            : "0";
          return {
            ...tx,
            gasUsed,
            gasFee,
          };
        })
      );
      setDetailedTxs(txDetails);
    };

    fetchGasData();
  }, [transactions]);

  console.log(transactions, "parsedTxs");
  const txValueComp = (label: string, value: string) => {
    return (
      <div className="text-sm  flex gap-2">
        <span className="mr-2 w-[100px] text-gray-500">{label}</span>
        <span className="">{value}</span>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white-200 to-blue-300 rounded p-4 h-full border-2 border-blue-400">
      <p className="font-medium text-blue-800 flex items-center gap-1.5 text-lg">
        <ArrowDownUp />
        <span>Transactions</span>
      </p>
      <div className="h-[300px] overflow-y-auto flex flex-col gap-3 p-2">
        {detailedTxs.map((tx, idx) => (
          <div
            className="rounded-2xl border border-indigo-300 p-1 shadow bg-blue-100"
            key={idx}
          >
            <div className="rounded-2xl border-2 border-indigo-300 p-2">
              <p className="text-sm text-blue-800 mb-2 font-medium">
                {tx.buyer}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 my-1">
                {txValueComp(
                  "ETH SEND",
                  `${ethers.formatEther(tx.ethAmount)} ETH`
                )}
                {txValueComp(
                  "Token Received",
                  `${ethers.formatEther(tx.tokenAmount)} STAN`
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2  my-1">
                {txValueComp("Gas Used", tx.gasUsed)}
                {txValueComp("Gas Fee", `${tx.gasFee} ETH`)}
              </div>
            </div>
            <div className="flex justify-end items-center p-1">
              <div className="text-sm ">
                <span className="">{tx.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
