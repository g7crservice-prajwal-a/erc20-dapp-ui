import { Contract } from "ethers";
import { useMemo } from "react";
import { useWallet } from "../context/WalletContext";
import { StanTokenABI, StanTokenSaleABI } from "../contracts";

export const useContracts = () => {
  const { signer } = useWallet();
  const StanTokenContract = useMemo(() => {
    if (!signer) return null;
    const stanToken = new Contract(
      StanTokenABI.address,
      StanTokenABI.abi,
      signer
    );

    return stanToken;
  }, [signer, StanTokenABI.address]);

  const StanTokenSaleContract = useMemo(() => {
    if (!signer) return null;
    return new Contract(StanTokenSaleABI.address, StanTokenSaleABI.abi, signer);
  }, [signer, StanTokenSaleABI.address]);

  return { StanTokenContract, StanTokenSaleContract };
};
