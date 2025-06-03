import { WalletProvider } from "./context/WalletContext";
import RouteApp from "./RouteApp";

function App() {
  return (
    <WalletProvider>
      <div className="w-full  p-3 bg-gray-950 min-h-screen">
        <RouteApp />
      </div>
    </WalletProvider>
  );
}

export default App;
