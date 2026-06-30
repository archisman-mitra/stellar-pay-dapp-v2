import React, { useState } from "react";
import { History, RefreshCw, ArrowUpRight, ArrowDownLeft, ExternalLink, Rocket } from "lucide-react";

const TransactionHistory = ({ address, transactions = [], loading, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const shortenAddr = (addr) => {
    if (!addr) return "—";
    return addr.slice(0, 6) + "..." + addr.slice(-6);
  };

  const timeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 10) return "Just now";
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden h-full">
      {/* Background card accent glow */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-450 border border-emerald-500/20">
            <History size={20} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recent Transactions</h2>
        </div>
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-450 hover:bg-slate-900 border border-transparent hover:border-slate-800/80 active:scale-95 transition-all duration-300"
          title="Refresh Transactions"
        >
          <RefreshCw size={14} className={isRefreshing || loading ? "animate-spin text-emerald-450" : ""} />
        </button>
      </div>

      {/* Loading Skeletons */}
      {loading && transactions.length === 0 ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-4 rounded-2xl bg-slate-950/20 border border-slate-900/40 animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-900" />
                  <div className="h-3.5 w-16 bg-slate-900 rounded-lg" />
                </div>
                <div className="h-5 w-24 bg-slate-900 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3 pl-12">
                <div className="space-y-1.5">
                  <div className="h-2 w-8 bg-slate-900 rounded" />
                  <div className="h-3 w-20 bg-slate-900 rounded" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-8 bg-slate-900 rounded" />
                  <div className="h-3 w-20 bg-slate-900 rounded" />
                </div>
              </div>
              <div className="flex items-center justify-between pl-12">
                <div className="h-2.5 w-16 bg-slate-900 rounded" />
                <div className="h-2.5 w-12 bg-slate-900 rounded" />
              </div>
            </div>
          ))}
        </div>

      ) : transactions.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-3xl bg-slate-950/40 border border-slate-850 flex items-center justify-center mb-5 shadow-inner">
            <Rocket size={28} className="text-slate-500 animate-bounce" />
          </div>
          <div className="text-white font-bold text-base mb-1">No transactions yet</div>
          <div className="text-slate-450 text-xs leading-relaxed max-w-[200px]">
            Start by sending a payment or fund your testnet account.
          </div>
        </div>

      ) : (
        /* Transaction List */
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 rounded-2xl bg-slate-950/20 border border-slate-900/60 hover:bg-slate-900/30 hover:border-emerald-500/20 transition-all duration-300 group relative"
            >
              {/* TOP ROW: Icon + Label  |  Amount */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${
                    tx.isSent
                      ? "bg-rose-500/10 text-rose-450 border border-rose-500/20"
                      : "bg-emerald-500/10 text-emerald-450 border border-emerald-500/20"
                  }`}>
                    {tx.isSent ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                  </div>
                  <span className="font-bold text-slate-200 text-xs tracking-wide uppercase">
                    {tx.type}
                  </span>
                </div>

                <div className={`text-base font-extrabold tracking-tight ${
                  tx.isSent ? "text-rose-450" : "text-emerald-450"
                }`}>
                  {tx.isSent ? "−" : "+"}
                  {parseFloat(tx.amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}{" "}
                  XLM
                </div>
              </div>

              {/* MIDDLE: From / To Grid */}
              <div className="grid grid-cols-2 gap-4 mb-3.5 pl-12">
                <div>
                  <div className="text-[9px] font-bold text-slate-550 uppercase tracking-wider mb-1">From</div>
                  <div className="text-xs font-mono text-slate-350 truncate pr-2" title={tx.from}>
                    {shortenAddr(tx.from)}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-550 uppercase tracking-wider mb-1">To</div>
                  <div className="text-xs font-mono text-slate-350 truncate pr-2" title={tx.to}>
                    {shortenAddr(tx.to)}
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: Time  |  Details Link */}
              <div className="flex items-center justify-between pl-12 pt-2 border-t border-slate-900/60">
                <span className="text-[10px] text-slate-500 font-semibold">{timeAgo(tx.time)}</span>
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-cyan-400 transition-colors group/link"
                >
                  <span>Details</span>
                  <ExternalLink size={10} className="group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
