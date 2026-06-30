import React from "react";
import { Wallet, ShieldCheck, Link as LinkIcon, Key, Coins, Send, Sparkles } from "lucide-react";

const ConnectHero = ({ onConnect, onOpenWalletModal }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-[85vh] relative z-10">
      
      {/* Background radial highlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Top Split Section */}
      <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20 animate-fade-in">
        {/* Left - Brand */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="w-20 h-20 mb-8 rounded-[2rem] bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-2xl shadow-emerald-500/20 ring-4 ring-emerald-500/20 relative">
            <Sparkles size={40} className="animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-400">
            StellarPay
          </h1>
          <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold tracking-[0.3em] uppercase mb-8">
            Universal Payment Node
          </p>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed font-medium">
            The secure, next-generation portal for managing balances and global payments on the Stellar network.
          </p>
        </div>

        {/* Right - Connect Card */}
        <div className="flex-1 w-full max-w-md">
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 shadow-2xl shadow-emerald-950/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Connect Wallet</h2>
            </div>
            
            <p className="text-slate-400 mb-8 leading-relaxed text-sm">
              Connect your Stellar wallet to view your balance, manage assets, and initiate secure transactions.
            </p>

            <button
              onClick={onOpenWalletModal}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
            >
              <Wallet size={20} />
              Connect Wallet
            </button>

            {/* Supported Wallets */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm font-medium">
                <Key size={16} className="text-emerald-500" />
                <span>Supported Wallets</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Freighter", "xBull", "Albedo", "Rabet", "Lobstr", "Hana", "WalletConnect"].map(w => (
                  <span key={w} className="px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 font-medium transition-all duration-200 hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500/25 cursor-default">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800/60 to-transparent mb-20" />

      {/* Bottom Section - Features */}
      <div className="w-full max-w-6xl text-center flex flex-col items-center">
        <h2 className="text-4xl font-black text-white tracking-tight mb-4">Unlock the Future of Payments</h2>
        <p className="text-slate-400 text-base max-w-2xl mx-auto mb-16 leading-relaxed">
          Connect your wallet to send XLM, track transactions, and manage your balance instantly on the <strong className="text-emerald-400 font-semibold">Stellar Testnet</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
          {/* Feature 1 */}
          <div className="glass-panel p-6 rounded-2xl hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-emerald-500/5 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 shadow-inner">
              <Wallet size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Get Wallet</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Install a Stellar-compatible wallet extension like Freighter or xBull to begin.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel p-6 rounded-2xl hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-emerald-500/5 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-5 shadow-inner">
              <LinkIcon size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Connect</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Use the 'Connect Wallet' button to safely pair your account's public key.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel p-6 rounded-2xl hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-emerald-500/5 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 shadow-inner">
              <Coins size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Fund Testnet</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Use Friendbot built into the wallets to get free Testnet XLM for network fees.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-panel p-6 rounded-2xl hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-emerald-500/5 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 shadow-inner">
              <Send size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Send & Track</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Send fast XLM payments globally and view your transaction history instantly.
            </p>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default ConnectHero;

