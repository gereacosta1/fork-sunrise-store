// src/components/CartDrawer.tsx
import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import AffirmButton from './AffirmButton';
import { useI18n } from '../i18n/I18nProvider';
import PayWithCard from './PayWithCard';

const CartDrawer: React.FC = () => {
  const { t, fmtMoney } = useI18n();
  const { items, isOpen, close, removeItem, setQty, totalUSD, clear } = useCart();

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '/';

  const handleDec = (id: string, qty: number) => {
    setQty(id, Math.max(1, qty - 1));
  };

  const handleInc = (id: string, qty: number) => {
    setQty(id, qty + 1);
  };

  const safeT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* BACKDROP */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={close}
      />

      {/* DRAWER */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#070604] text-white border-l border-[#9b7a55]/40 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#9b7a55]/25 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#d8b98c]">
              GUZZIES RIV
            </p>
            <h3 className="text-2xl font-black">
              {safeT('cart.title', 'Your Cart')}
            </h3>
          </div>

          <button
            type="button"
            onClick={close}
            className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <p className="text-lg font-bold text-white">
                {safeT('cart.empty', 'Your cart is empty')}
              </p>
              <p className="mt-2 text-sm text-white/50">
                {safeT('cart.emptyDesc', 'Add products to continue')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((it, index) => {
                const price = Number(it.price) || 0;
                const qty = Number(it.qty) || 1;
                const subtotal = price * qty;

                return (
                  <div
                    key={`${it.id}-${index}`} // 🔥 FIX IMPORTANTE
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <img
                      src={it.image || '/IMG/guzzies-riv-logo-furniture.jpeg'}
                      alt={it.name}
                      className="h-24 w-24 rounded-xl bg-white object-contain p-2"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-bold">{it.name}</p>
                          <p className="text-[#d8b98c] font-semibold">
                            {fmtMoney(price)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                        >
                          <Trash2 className="w-4 h-4 text-white/60 hover:text-white" />
                        </button>
                      </div>

                      {/* QTY */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDec(it.id, qty)}
                          className="bg-white/10 p-2 rounded-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="px-3 py-1 bg-white/10 rounded-lg font-bold">
                          {qty}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleInc(it.id, qty)}
                          className="bg-white/10 p-2 rounded-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>

                        <span className="ml-auto font-black">
                          {fmtMoney(subtotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t border-[#9b7a55]/25 bg-[#0d0a07] p-5 space-y-4">
          <div className="flex justify-between">
            <span className="text-white/60">
              {safeT('cart.total', 'Total')}
            </span>
            <span className="text-2xl font-black text-[#d8b98c]">
              {fmtMoney(Number(totalUSD) || 0)}
            </span>
          </div>

          {/* CLEAR */}
          <button
            type="button"
            onClick={clear}
            disabled={!items.length}
            className="w-full bg-white/5 py-3 rounded-xl font-bold hover:bg-white/10 disabled:opacity-40"
          >
            {safeT('cart.clear', 'Clear cart')}
          </button>

          {/* AFFIRM */}
          {items.length > 0 && totalUSD >= 50 && (
            <AffirmButton
              cartItems={items.map((it) => ({
                name: it.name,
                price: Number(it.price),
                qty: Number(it.qty),
                sku: String(it.sku || it.id),
                url: currentUrl,
                image: it.image,
              }))}
              totalUSD={Number(totalUSD)}
            />
          )}

          {/* CARD */}
          <PayWithCard />
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;