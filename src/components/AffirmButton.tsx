// src/components/AffirmButton.tsx
import { useEffect, useState, type ReactNode } from 'react';
import { loadAffirm } from '../lib/affirm';

type CartItem = {
  name: string;
  sku?: string;
  price: number;
  qty: number;
  url?: string;
  image?: string;
};

type Customer = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
  };
};

type Props = {
  cartItems?: CartItem[];
  totalUSD?: number;
  shippingUSD?: number;
  taxUSD?: number;
  customer?: Customer;
};

const MIN_TOTAL_CENTS = 5000;

export default function AffirmButton({
  cartItems,
  totalUSD,
  shippingUSD = 0,
  taxUSD = 0,
  customer,
}: Props) {
  const PUBLIC_KEY = import.meta.env.VITE_AFFIRM_PUBLIC_KEY || '';

  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);

  // 🚨 FIX CLAVE: si no hay key → NO mostramos botón
  if (!PUBLIC_KEY) return null;

  useEffect(() => {
    loadAffirm(PUBLIC_KEY)
      .then(() => setReady(true))
      .catch(() => setReady(false));
  }, [PUBLIC_KEY]);

  const normalizeItems = () => {
    if (!cartItems?.length) return [];

    return cartItems.map((it, idx) => ({
      display_name: it.name,
      sku: it.sku || `SKU-${idx}`,
      unit_price: Math.round(it.price * 100),
      qty: it.qty || 1,
      item_url: it.url || window.location.href,
      item_image_url: it.image,
    }));
  };

  const handleClick = () => {
    const affirm = (window as any).affirm;
    if (!affirm?.checkout) return;

    const items = normalizeItems();
    if (!items.length) return;

    const totalCents =
      Math.round((totalUSD || 0) * 100) ||
      items.reduce((acc, i) => acc + i.unit_price * i.qty, 0);

    if (totalCents < MIN_TOTAL_CENTS) return;

    const orderId = 'ORDER-' + Date.now();

    const fallbackCustomer: Customer = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'contact@guzziesriv.com',
      phone: '17862993771',
      address: {
        line1: 'Miami',
        city: 'Miami',
        state: 'FL',
        zip: '33101',
        country: 'US',
      },
    };

    const c = customer || fallbackCustomer;

    const checkout = {
      merchant: {
        user_confirmation_url: `${window.location.origin}/affirm/confirm`,
        user_cancel_url: `${window.location.origin}/affirm/cancel`,
        user_confirmation_url_action: 'GET',
        name: 'GUZZIES RIV',
      },
      billing: {
        name: { first: c.firstName, last: c.lastName },
        address: {
          line1: c.address.line1,
          city: c.address.city,
          state: c.address.state,
          zipcode: c.address.zip,
          country: 'US',
        },
      },
      shipping: {
        name: { first: c.firstName, last: c.lastName },
        address: {
          line1: c.address.line1,
          city: c.address.city,
          state: c.address.state,
          zipcode: c.address.zip,
          country: 'US',
        },
      },
      items,
      currency: 'USD',
      shipping_amount: Math.round(shippingUSD * 100),
      tax_amount: Math.round(taxUSD * 100),
      total: totalCents,
      order_id: orderId,
    };

    setOpening(true);

    try {
      affirm.checkout(checkout);
      affirm.checkout.open();
    } catch {
      setOpening(false);
    }
  };

  // 🔥 UX FIX: mejor loading
  if (!ready) {
    return (
      <button
        disabled
        className="bg-[#2a2a2a] text-white px-5 py-3 rounded-xl text-sm opacity-60"
      >
        Financing loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={opening}
      className="
        w-full
        bg-[#9b7a55]
        text-white
        font-bold
        py-3
        rounded-xl
        hover:bg-[#7c6043]
        transition-all
        duration-300
      "
    >
      {opening ? 'Opening...' : 'Pay with Affirm'}
    </button>
  );
}