// src/components/AffirmButton.tsx
import { useEffect, useMemo, useState } from 'react';
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
  cartItems = [],
  totalUSD,
  shippingUSD = 0,
  taxUSD = 0,
  customer,
}: Props) {
  const PUBLIC_KEY = import.meta.env.VITE_AFFIRM_PUBLIC_KEY || '';

  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);

  const normalizedItems = useMemo(() => {
    return cartItems.map((it, idx) => ({
      display_name: it.name,
      sku: it.sku || `ITEM-${idx + 1}`,
      unit_price: Math.round(Number(it.price) * 100),
      qty: Number(it.qty) || 1,
      item_url: it.url || window.location.href,
      item_image_url: it.image,
    }));
  }, [cartItems]);

  const totalCents =
    Math.round(Number(totalUSD || 0) * 100) ||
    normalizedItems.reduce((acc, item) => acc + item.unit_price * item.qty, 0);

  useEffect(() => {
    if (!PUBLIC_KEY) return;

    loadAffirm(PUBLIC_KEY)
      .then(() => setReady(true))
      .catch(() => setReady(false));
  }, [PUBLIC_KEY]);

  if (!PUBLIC_KEY) return null;
  if (!normalizedItems.length) return null;
  if (totalCents < MIN_TOTAL_CENTS) return null;

  const handleClick = () => {
    const affirm = (window as any).affirm;

    if (!affirm?.checkout) {
      setReady(false);
      return;
    }

    const orderId = `GUZZIES-${Date.now()}`;

    const fallbackCustomer: Customer = {
      firstName: 'Guest',
      lastName: 'Customer',
      email: 'guzziesriv@gmail.com',
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
        user_confirmation_url: `${window.location.origin}/affirm/confirm.html`,
        user_cancel_url: `${window.location.origin}/affirm/cancel.html`,
        user_confirmation_url_action: 'GET',
        name: 'GUZZIES RIV',
      },

      billing: {
        name: {
          first: c.firstName,
          last: c.lastName,
        },
        address: {
          line1: c.address.line1,
          line2: c.address.line2 || '',
          city: c.address.city,
          state: c.address.state,
          zipcode: c.address.zip,
          country: c.address.country || 'US',
        },
        email: c.email || 'guzziesriv@gmail.com',
        phone_number: c.phone || '17862993771',
      },

      shipping: {
        name: {
          first: c.firstName,
          last: c.lastName,
        },
        address: {
          line1: c.address.line1,
          line2: c.address.line2 || '',
          city: c.address.city,
          state: c.address.state,
          zipcode: c.address.zip,
          country: c.address.country || 'US',
        },
        email: c.email || 'guzziesriv@gmail.com',
        phone_number: c.phone || '17862993771',
      },

      items: normalizedItems,
      currency: 'USD',
      shipping_amount: Math.round(shippingUSD * 100),
      tax_amount: Math.round(taxUSD * 100),
      total: totalCents,
      order_id: orderId,
      metadata: {
        mode: 'modal',
        source: 'guzzies-riv-cart',
      },
    };

    setOpening(true);

    try {
      affirm.checkout(checkout);
      affirm.checkout.open();
      setTimeout(() => setOpening(false), 2000);
    } catch {
      setOpening(false);
    }
  };

  if (!ready) {
    return (
      <button
        type="button"
        disabled
        className="w-full bg-white/5 text-white/50 py-3 rounded-xl text-sm font-bold cursor-not-allowed"
      >
        Financing loading...
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={opening}
      className="w-full bg-[#9b7a55] text-white font-bold py-3 rounded-xl hover:bg-[#7c6043] transition-all duration-300 disabled:opacity-60"
    >
      {opening ? 'Opening Affirm...' : 'Pay with Affirm'}
    </button>
  );
}