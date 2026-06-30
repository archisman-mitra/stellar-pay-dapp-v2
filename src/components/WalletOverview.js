import React, { useState } from "react";
import { Wallet, RefreshCw, Clock, ArrowUpRight, Globe, CheckCircle2 } from "lucide-react";

const WalletOverview = ({ balance, onRefresh, transactions = [] }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const formatBalance = (bal) => {
    if (!bal) return "0.00";
    const num = parseFloat(bal.replace(/,/g, ""));
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
    });
  };

  const estimateUSD = (bal) => {
    if (!bal) return "0.00";
    const xlmPrice = 0.12; // approximate
    const num = parseFloat(bal.replace(/,/g, ""));
    const usd = num * xlmPrice;
    return usd.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getTimeSince = () => {
    const seconds = Math.floor((new Date() - lastUpdated) / 1000);
    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${seconds}s ago`;
    return `${Math.floor(seconds / 60)}m ago`;
  };

  // Compute stats from transactions array
  const sentTx = transactions.filter((t) => t.isSent);
  const totalSentCount = sentTx.length;
  const totalSentVolume = sentTx.reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* 1. Wallet Balance Card */}
      <div className="glass-panel glass-panel-hover rounded-3xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Wallet size={20} />
            </div>
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Wallet Balance</span>
          </div>
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-900 border border-transparent hover:border-slate-800/80 active:scale-95 transition-all duration-300"
            title="Refresh Balance"
            id="refresh-balance-btn"
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin text-emerald-400" : ""} />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {formatBalance(balance)}
            </span>
            <span className="text-xs font-bold text-emerald-400 tracking-wider">XLM</span>
          </div>
          <div className="text-slate-400 text-xs font-semibold mt-1">
            ≈ ${estimateUSD(balance)} USD
          </div>
          
          <div className="flex items-center gap-1 mt-4 pt-3 border-t border-slate-800/60 text-[10px] text-slate-500 font-semibold">
            <Clock size={11} className="text-emerald-500" />
            <span>Updated {getTimeSince()}</span>
          </div>
        </div>
      </div>

      {/* 2. Payments Sent Card */}
      <div className="glass-panel glass-panel-hover rounded-3xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Payments Sent</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {totalSentVolume.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-xs font-bold text-cyan-400 tracking-wider">XLM</span>
          </div>
          <div className="text-slate-400 text-xs font-semibold mt-1">
            Across {totalSentCount} {totalSentCount === 1 ? "transaction" : "transactions"}
          </div>

          <div className="flex items-center gap-1 mt-4 pt-3 border-t border-slate-800/60 text-[10px] text-slate-500 font-semibold">
            <CheckCircle2 size={11} className="text-cyan-400" />
            <span>Based on recent records</span>
          </div>
        </div>
      </div>

      {/* 3. Network Status Card */}
      <div className="glass-panel glass-panel-hover rounded-3xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Globe size={20} />
            </div>
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Network Status</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>TESTNET</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-bold">Horizon URL</span>
            <span className="font-mono text-[10px] text-slate-300">horizon-testnet...</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-bold">Base Fee</span>
            <span className="font-mono text-[10px] text-slate-300">100 Stroops</span>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/60">
            <span className="text-slate-550 text-[10px] font-semibold">Soroban RPC</span>
            <span className="font-mono text-[9px] text-emerald-400/80">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletOverview;

