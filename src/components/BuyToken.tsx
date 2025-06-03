import { Contract, ethers } from "ethers";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useContracts } from "../hooks/useContract";
import type { ITokenInfo } from "../types/components.type";
import { useTokenPurchasedEvent } from "../hooks/useTokenPurchasedEvent";

type PropsType = {
  tokenInfo: ITokenInfo;
  txtUpdateControl: () => void;
};

function BuyToken({ tokenInfo, txtUpdateControl }: Readonly<PropsType>) {
  const { StanTokenSaleContract } = useContracts();
  const [ethAmount, setEthAmount] = useState(""),
    [loader, setLoader] = useState<boolean>(false);

  const buyToken = async () => {
    if (!StanTokenSaleContract || !ethAmount) return;
    try {
      setLoader(true);
      const tx = await StanTokenSaleContract?.buyTokens({
        value: ethers.parseEther(ethAmount),
      });
      await tx.wait(1); // Wait for confirmation
      txtUpdateControl(); // re-render the transactions...
    } catch (error) {
      console.log(
        error,
        "Some error occurred while buying token, Please try again 😥!!"
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-100 to-cyan-300 rounded p-4 h-full border-2 border-cyan-400">
      <div>
        <p className="font-medium text-cyan-800 flex items-center gap-1.5 text-lg">
          <ShoppingCart />
          <span>Buy Token</span>
        </p>
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-sm font-medium text-cyan-800">
            Enter ETH to Spend
          </label>
          <input
            type="number"
            step="0.0001"
            min="0"
            className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="0.01"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
          />
        </div>

        <button
          className="w-full mt-4 bg-cyan-600 text-white font-medium py-2 rounded hover:bg-cyan-700 transition"
          onClick={buyToken}
          disabled={!ethAmount}
        >
          {loader ? "Processing, Please Wait..." : "Buy Token"}
        </button>
      </div>
    </div>
  );
}

export default BuyToken;
