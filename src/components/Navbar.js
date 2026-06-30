import React, { useState } from "react";
import { Copy, Check, LogOut, Wallet, Sparkles } from "lucide-react";

const Navbar = ({ address, onConnect, onDisconnect, onOpenWalletModal }) => {
  const [copied, setCopied] = useState(false);

  const shortenAddress = (addr) => {
    if (!addr) return "";
    return addr.slice(0, 4) + "..." + addr.slice(-4);
  };

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

  return (
    <nav className="flex items-center justify-between py-4 px-6 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-xl sticky top-0 z-50">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20">
          <Sparkles size={20} className="animate-pulse" />
        </div>
        <div>
          <div className="text-xl font-black text-white tracking-tighter leading-none mb-0.5">StellarPay</div>
          <div className="text-[10px] font-bold tracking-[0.2em] text-emerald-400/80 uppercase">Universal Node</div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-4">
        {address ? (
          <>
            {/* Status indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">Connected</span>
              <span className="text-[10px] font-bold text-cyan-400 ml-1 px-1.5 py-0.5 bg-cyan-500/10 rounded">TESTNET</span>
            </div>

            {/* Address bar */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
              <span>{shortenAddress(address)}</span>
              <button 
                onClick={copyAddress}
                className="p-1.5 rounded-lg hover:bg-slate-800 active:scale-95 transition-all duration-200 text-slate-400 hover:text-white relative group"
                title="Copy Address"
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                
                {copied && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 text-[9px] rounded text-emerald-400 whitespace-nowrap font-semibold">
                    Copied! ✅
                  </span>
                )}
              </button>
            </div>

            {/* Disconnect Button */}
            <button 
              onClick={onDisconnect}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/40 hover:text-rose-300 transition-all duration-200 font-medium text-xs group"
            >
              <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Disconnect</span>
            </button>
          </>
        ) : (
          <button 
            onClick={onOpenWalletModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:scale-105 active:scale-100"
          >
            <Wallet size={16} />
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

