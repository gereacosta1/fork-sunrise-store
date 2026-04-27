import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { startCardCheckout } from "../lib/cardCheckout";

const PayWithCard: React.FC = () => {
  const { items, totalUSD } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setError(null);

      if (!items.length) {
        setError("Your cart is empty.");
        return;
      }

      setLoading(true);
      await startCardCheckout(items);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Payment error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* BUTTON */}
      <button
        type="button"
        onClick={handleClick}
        disabled={loading || !items.length}
        className="
          w-full
          bg-white/5
          border border-white/10
          text-white
          py-3
          rounded-xl
          font-bold
          hover:bg-white/10
          transition
          disabled:opacity-50
        "
      >
        {loading ? "Redirecting..." : "Pay with card"}
      </button>

      {/* TOTAL */}
      <p className="text-xs text-white/50 text-center">
        Total:{" "}
        <span className="font-bold text-[#d8b98c]">
          ${totalUSD.toFixed(2)}
        </span>
      </p>

      {/* ERROR */}
      {error && (
        <p className="text-xs text-red-400 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default PayWithCard;