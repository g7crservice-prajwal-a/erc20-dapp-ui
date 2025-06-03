import { Spinner } from "../common/Loaders";
import { useWallet } from "../context/WalletContext";

function ConnectWallet() {
  const { connectWallet, walletLoading, account, walletConnected } =
    useWallet();
  console.log(walletConnected, "walletConnected");
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <p className="mb-2 text-shadow-blue-200 text-blue-300">
        Account : {account}
      </p>
      <button
        className="px-6 py-3 text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-500 transition duration-300 ease-in-out cursor-pointer inline-flex items-center gap-1"
        onClick={connectWallet}
      >
        <span className="">Connect Wallet </span> {walletLoading && <Spinner />}
      </button>
    </div>
  );
}

export default ConnectWallet;
