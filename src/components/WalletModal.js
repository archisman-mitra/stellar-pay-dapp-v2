import React from "react";
import { X, ChevronRight, Info } from "lucide-react";

const wallets = [
  { name: "Freighter", icon: "🦊", available: true, description: "Popular Stellar wallet extension" },
  { name: "Albedo", icon: "🔺", available: true, description: "Web-based Stellar wallet" },
  { name: "xBull", icon: "🐂", available: true, description: "Full-featured Stellar wallet" },
  { name: "HOT Wallet", icon: "🔥", available: false, description: "NEAR & multi-chain wallet" },
  { name: "Rabet", icon: "🐇", available: false, description: "Stellar browser extension" },
  { name: "LOBSTR", icon: "🦞", available: false, description: "Mobile-first Stellar wallet" },
  { name: "Hana Wallet", icon: "🌸", available: false, description: "Multi-chain browser wallet" },
  { name: "Klever Wallet", icon: "💎", available: false, description: "Self-custody crypto wallet" },
];

const WalletModal = ({ isOpen, onClose, onSelectWallet }) => {
  if (!isOpen) return null;

  const handleSelect = (wallet) => {
    if (wallet.available) {
      onSelectWallet(wallet.name);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-slate-900/90 border border-slate-800/80 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Info Column (Hidden on very small screens) */}
        <div className="hidden md:block w-1/3 bg-slate-950/40 p-8 border-r border-slate-800/60">
          <h2 className="text-xl font-bold text-white tracking-tight mb-6">Connect</h2>
          
          <div className="mb-8">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
              <Info size={15} />
              <span>What is a Wallet?</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Wallets are used to send, receive, and store the keys you use to sign blockchain transactions securely.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
              <Info size={15} />
              <span>What is Stellar?</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Stellar is a decentralized, public blockchain that gives developers the tools to create experiences that are more like cash than crypto.
            </p>
          </div>
        </div>

        {/* Wallets Column */}
        <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col h-full overflow-y-auto max-h-[70vh] md:max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white tracking-tight">Select a Wallet</h3>
            <button 
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              onClick={onClose}
              id="modal-close-btn"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* List */}
          <div className="flex flex-col gap-2.5">
            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleSelect(wallet)}
                disabled={!wallet.available}
                id={`wallet-${wallet.name.toLowerCase().replace(/\s/g, "-")}`}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group ${
                  wallet.available 
                    ? "bg-slate-800/20 border-slate-850 hover:bg-emerald-500/5 hover:border-emerald-500/35 cursor-pointer"
                    : "bg-slate-950/10 border-slate-900/40 opacity-40 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-xl bg-slate-900 border border-slate-850 ${wallet.available ? 'shadow-inner group-hover:border-emerald-500/20' : ''}`}>
                    {wallet.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-200 text-sm mb-0.5">{wallet.name}</div>
                    <div className="text-[11px] text-slate-400 leading-normal">{wallet.description}</div>
                  </div>
                </div>

                {wallet.available ? (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300">
                    <ChevronRight size={18} />
                  </div>
                ) : (
                  <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 bg-slate-950 text-slate-500 rounded-lg">
                    Unavailable
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;

