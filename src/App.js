import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { connectWallet } from "./wallet";
import { getBalance } from "./balance";
import { sendXLM } from "./transaction";
import { server } from "./stellar";

import Navbar from "./components/Navbar";
import ConnectHero from "./components/ConnectHero";
import WalletOverview from "./components/WalletOverview";
import SendPayment from "./components/SendPayment";
import TransactionHistory from "./components/TransactionHistory";
import WalletModal from "./components/WalletModal";
import WalletCard from "./components/WalletCard";

function App() {
  const [address, setAddress] = useState("GC6NUHJZOYIKZ4ZQYVYHFEFOKV24B05IZVR73ZDE34J5JDD6ERAI4PYT");
  const [balance, setBalance] = useState("10,000.00");
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);

  const handleOpenWalletModal = () => {
    setWalletModalOpen(true);
  };

  const handleCloseWalletModal = () => {
    setWalletModalOpen(false);
  };

  const fetchTransactions = useCallback(async (currentAddress) => {
    if (!currentAddress) return;
    try {
      setLoadingTransactions(true);
      const payments = await server
        .payments()
        .forAccount(currentAddress)
        .order("desc")
        .limit(10)
        .call();

      const parsed = payments.records
        .filter(
          (r) => r.type === "payment" || r.type === "create_account"
        )
        .map((record) => {
          const isSent = record.from === currentAddress;
          return {
            id: record.id,
            type: isSent ? "Sent" : "Received",
            isSent,
            amount: record.amount || record.starting_balance || "0",
            from: record.from || record.source_account || "",
            to: record.to || record.account || "",
            time: record.created_at,
            hash: record.transaction_hash,
          };
        });

      setTransactions(parsed);
    } catch (err) {
      console.error("Failed to load transactions:", err);
    } finally {
      setLoadingTransactions(false);
    }
  }, []);

  // Initial load or update when address changes
  useEffect(() => {
    if (address) {
      getBalance(address)
        .then((bal) => setBalance(bal))
        .catch((err) => console.error("Initial balance load failed:", err));
      fetchTransactions(address)
        .catch((err) => console.error("Initial transactions load failed:", err));
    } else {
      setTransactions([]);
    }
  }, [address, fetchTransactions]);

  const handleSelectWallet = async (walletName) => {
    setWalletModalOpen(false);
    try {
      const addr = await connectWallet(walletName);
      if (addr) {
        setAddress(addr);
        setConnectedWallet(walletName);
      }
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  const handleDisconnect = () => {
    setAddress("");
    setBalance("");
    setConnectedWallet(null);
    setTransactions([]);
  };

  const handleRefreshBalance = async () => {
    if (!address) return;
    try {
      const bal = await getBalance(address);
      setBalance(bal);
    } catch (err) {
      console.error("Failed to refresh balance:", err);
    }
  };

  const handleRefreshTransactions = async () => {
    if (!address) return;
    await fetchTransactions(address);
  };

  const handleSend = async (recipient, amount) => {
    const result = await sendXLM(address, recipient, amount, connectedWallet);

    // Refresh balance and transactions after successful send
    const bal = await getBalance(address);
    setBalance(bal);
    await fetchTransactions(address);

    return result;
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-emerald-500/30">
      <Navbar
        address={address}
        onConnect={handleSelectWallet}
        onDisconnect={handleDisconnect}
        onOpenWalletModal={handleOpenWalletModal}
      />

      <WalletModal
        isOpen={walletModalOpen}
        onClose={handleCloseWalletModal}
        onSelectWallet={handleSelectWallet}
      />

      {!address ? (
        <ConnectHero
          onConnect={handleSelectWallet}
          onOpenWalletModal={handleOpenWalletModal}
        />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-8 animate-fade-in">
          
          {/* Top Row: Welcome & Statistics overview */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Dashboard Overview</h1>
            <p className="text-slate-400 text-sm">
              Manage your assets, track transactions, and execute payments on the Stellar network.
            </p>
          </div>

          <WalletOverview
            balance={balance}
            onRefresh={handleRefreshBalance}
            transactions={transactions}
          />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Send & Wallet Identity (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <WalletCard address={address} onDisconnect={handleDisconnect} />
              <SendPayment address={address} onSend={handleSend} balance={balance} />
            </div>

            {/* Right Column: Transaction History (7 cols) */}
            <div className="lg:col-span-7">
              <TransactionHistory
                address={address}
                transactions={transactions}
                loading={loadingTransactions}
                onRefresh={handleRefreshTransactions}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;