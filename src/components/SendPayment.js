import React, { useState } from "react";
import { Send, AlertTriangle, AlertCircle, CheckCircle2, Loader2, ExternalLink, User, Coins, FileText } from "lucide-react";

const SendPayment = ({ address, onSend, balance }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!recipient.trim()) {
      newErrors.recipient = "Recipient address is required";
    } else if (recipient.length < 56) {
      newErrors.recipient = "Invalid Stellar address format";
    } else if (recipient === address) {
      newErrors.recipient = "Cannot send to your own address";
    }

    if (!amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    } else if (balance) {
      const numBal = parseFloat(balance.replace(/,/g, ""));
      if (parseFloat(amount) > numBal) {
        newErrors.amount = `Insufficient balance. You have ${numBal} XLM`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      address &&
      recipient.trim().length >= 56 &&
      amount.trim() &&
      !isNaN(amount) &&
      parseFloat(amount) > 0
    );
  };

  const handleMaxClick = (e) => {
    e.preventDefault();
    if (!balance) return;
    const numBalance = parseFloat(balance.replace(/,/g, ""));
    // Reserve 1.0 XLM for Stellar minimum reserve + transaction fee
    const maxAmount = Math.max(0, numBalance - 1.0);
    setAmount(maxAmount.toFixed(5).replace(/\.?0+$/, "")); // Strip trailing zeros
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // Clear old status explicitly before starting new flow
    if (!validate()) return;

    try {
      setLoading(true);
      setStatus({ type: "warning", message: "Processing transaction..." });

      const result = await onSend(recipient, amount);

      setStatus({
        type: "success",
        message: "Payment Successful",
        hash: result.hash,
      });

      // Reset form after success
      setRecipient("");
      setAmount("");
      setMemo("");
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: err.message || "Transaction failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden">
      
      {/* Background card accent glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800/80">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-450 border border-emerald-500/20">
          <Send size={20} />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Send Payment</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Recipient Input */}
        <div>
          <div className="relative flex items-center group">
            <div className="absolute left-3.5 text-slate-500 group-focus-within:text-emerald-450 transition-colors">
              <User size={16} />
            </div>
            <input
              id="recipient-input"
              className={`peer w-full bg-slate-950/20 text-slate-200 border rounded-2xl pl-10 pr-4 pt-6 pb-2 outline-none transition-all placeholder-transparent text-sm ${
                errors.recipient 
                  ? "border-rose-500/40 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10" 
                  : "border-slate-800/80 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
              }`}
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                if (errors.recipient)
                  setErrors((prev) => ({ ...prev, recipient: "" }));
              }}
              disabled={loading}
            />
            <label
              htmlFor="recipient-input"
              className="absolute left-10 top-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-emerald-450 pointer-events-none"
            >
              Recipient Address
            </label>
          </div>
          {errors.recipient && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-rose-450 font-semibold pl-2">
              <AlertCircle size={13} />
              {errors.recipient}
            </div>
          )}
        </div>

        {/* Amount Input */}
        <div>
          <div className="relative flex items-center group">
            <div className="absolute left-3.5 text-slate-500 group-focus-within:text-emerald-450 transition-colors">
              <Coins size={16} />
            </div>
            <input
              id="amount-input"
              className={`peer w-full bg-slate-950/20 text-slate-200 border rounded-2xl pl-10 pr-16 pt-6 pb-2 outline-none transition-all placeholder-transparent text-sm ${
                errors.amount 
                  ? "border-rose-500/40 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10" 
                  : "border-slate-800/80 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
              }`}
              type="text"
              placeholder="Amount (XLM)"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount)
                  setErrors((prev) => ({ ...prev, amount: "" }));
              }}
              disabled={loading}
            />
            <label
              htmlFor="amount-input"
              className="absolute left-10 top-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-emerald-450 pointer-events-none"
            >
              Amount (XLM)
            </label>
            <button
              type="button"
              onClick={handleMaxClick}
              disabled={loading || !balance}
              className="absolute right-3 px-2.5 py-1 text-[10px] font-bold text-emerald-400 hover:text-slate-950 bg-emerald-500/10 hover:bg-emerald-400 border border-emerald-500/20 hover:border-emerald-400 rounded-lg transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              MAX
            </button>
          </div>
          {errors.amount && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-rose-450 font-semibold pl-2">
              <AlertCircle size={13} />
              {errors.amount}
            </div>
          )}
        </div>

        {/* Memo Input */}
        <div>
          <div className="relative flex items-center group">
            <div className="absolute left-3.5 text-slate-500 group-focus-within:text-emerald-450 transition-colors">
              <FileText size={16} />
            </div>
            <input
              id="memo-input"
              className="peer w-full bg-slate-950/20 text-slate-200 border border-slate-800/80 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 rounded-2xl pl-10 pr-4 pt-6 pb-2 outline-none transition-all placeholder-transparent text-sm"
              type="text"
              placeholder="Memo (Optional)"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              disabled={loading}
            />
            <label
              htmlFor="memo-input"
              className="absolute left-10 top-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-emerald-450 pointer-events-none"
            >
              Memo (Optional)
            </label>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={!address || loading || !isFormValid()}
          className="mt-2 w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:scale-[1.02] active:scale-100"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin text-slate-950" size={16} />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Send Payment</span>
            </>
          )}
        </button>
      </form>

      {!address && (
        <div className="mt-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-850 text-slate-400 text-xs text-center font-medium">
          🔗 Connect your wallet to send payments
        </div>
      )}

      {/* Warning Box */}
      {address && (
        <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-450 text-xs font-semibold leading-relaxed">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <p>
            Transactions are irreversible. Double-check the recipient address before sending.
          </p>
        </div>
      )}

      {/* Feedback Alerts */}
      {status && (
        <div 
          className={`mt-6 p-4 rounded-2xl border animate-fade-in ${
            status.type === "success" 
              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
              : status.type === "error" 
              ? "bg-rose-500/5 border-rose-500/20 text-rose-450"
              : "bg-cyan-500/5 border-cyan-500/20 text-cyan-400"
          }`}
        >
          <div className="flex items-start gap-3">
            {status.type === "success" && <CheckCircle2 size={18} className="shrink-0 mt-0.5" />}
            {status.type === "error" && <AlertCircle size={18} className="shrink-0 mt-0.5" />}
            {status.type === "warning" && <Loader2 size={18} className="shrink-0 mt-0.5 animate-spin text-cyan-400" />}
            
            <div className="flex-1">
              <h4 className="font-bold text-xs uppercase tracking-wider mb-1">
                {status.type === "success" && "Payment Successful"}
                {status.type === "error" && "Transaction Failed"}
                {status.type === "warning" && "Processing..."}
              </h4>
              <p className="text-xs opacity-90 leading-relaxed">{status.message}</p>
              
              {status.hash && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <p className="text-[10px] font-mono break-all mb-3 text-slate-400">
                    {status.hash}
                  </p>
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${status.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold bg-slate-900 hover:bg-slate-855 text-emerald-450 border border-slate-800 rounded-lg transition-all"
                  >
                    <span>View Explorer</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SendPayment;

