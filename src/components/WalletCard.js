import React, { useState } from "react";
import { Copy, Check, LogOut, ExternalLink, ShieldCheck } from "lucide-react";

const WalletCard = ({ address, onDisconnect }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shortenAddress = (addr) => {
    if (!addr) return "";
    return addr.slice(0, 8) + "..." + addr.slice(-8);
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl p-6 transition-all duration-300 relative overflow-hidden">
      {/* Background card accent glow */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Row: Connected + Disconnect */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
          <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">Connected</span>
        </div>
        <button
          onClick={onDisconnect}
          className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
        >
          <LogOut size={13} />
          Disconnect
        </button>
      </div>

      {/* Address Box */}
      <div className="bg-slate-950/30 border border-slate-800/80 rounded-2xl px-4 py-3.5 mb-5 relative group/addr">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
          <ShieldCheck size={11} className="text-emerald-500" />
          <span>Stellar Public Key</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-300 truncate" title={address}>
            {shortenAddress(address)}
          </span>
          <button
            onClick={copyAddress}
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-900 border border-transparent hover:border-slate-800/80 active:scale-95 transition-all duration-200 shrink-0 relative"
            title="Copy Address"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-[9px] rounded text-emerald-400 whitespace-nowrap font-semibold">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* View on Stellar Expert */}
      <a
        href={`https://stellar.expert/explorer/testnet/account/${address}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-all group/link"
      >
        <span>View on Stellar Expert</span>
        <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
};

export default WalletCard;

