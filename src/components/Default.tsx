import { Grid2x2Plus, Hash, TrendingUp } from "lucide-react";
import type { ITokenInfo } from "../types/components.type";

type PropsType = {
  tokenInfo: ITokenInfo;
};
function Default({ tokenInfo }: Readonly<PropsType>) {
  const infoCard = (
    Icon: any,
    label: string,
    value: string,
    bgColor: string,
    textColor = "text-gray-800",
    highlight = false
  ) => (
    <div
      className={`${bgColor} backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group ${
        highlight ? "ring-2 ring-blue-400/50" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
          <Icon className={`w-5 h-5 ${textColor}`} />
        </div>
        <div className="flex-1">
          <div className={`text-sm opacity-80 ${textColor} font-medium`}>
            {label}
          </div>
          <div className={`text-lg font-bold ${textColor} truncate`}>
            {value}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {infoCard(
        Hash,
        "Token Symbol",
        tokenInfo.symbol,
        "bg-gradient-to-br from-blue-100 to-blue-200",
        "text-blue-800",
        true
      )}
      {infoCard(
        TrendingUp,
        "Total Supply",
        tokenInfo.totalSupply,
        "bg-gradient-to-br from-emerald-100 to-emerald-200",
        "text-emerald-800",
        true
      )}
      {infoCard(
        Grid2x2Plus,
        "Token Name",
        tokenInfo.name,
        "bg-gradient-to-br from-purple-100 to-purple-200",
        "text-purple-800",
        true
      )}
    </div>
  );
}

export default Default;
