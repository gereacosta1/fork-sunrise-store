import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { loadAffirm } from '../lib/affirm';

/** Datos mínimos del comprador que queremos que vea Affirm (evita "John Doe") */
export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country?: string; // default: "US"
  };
};

type Props = {
  customer: Customer;         // ← pásalo desde tu formulario/checkout
  shippingUSD?: number;       // opcional
  taxUSD?: number;            // opcional
  buttonClassName?: string;   // para estilos
  label?: string;             // texto del botón
};

export default function PayWithAffirm({
  customer,
  shippingUSD = 0,
  taxUSD = 0,
  buttonClassName = 'btn btn-primary w-full',
  label = 'Pagar con Affirm',
}: Props) {
  const { items, totalUSD, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const toCents = (n: number) => Math.round(n * 100);

  async function handlePay() {
    try {
      setBusy(true);

      // 1) Cargar Affirm (CDN prod). Si no hay PK en dev, solo loguea y sigue.
      await loadAffirm(import.meta.env.VITE_AFFIRM_PUBLIC_KEY as string);

      if (!items.length) {
        console.warn('[Affirm] carrito vacío');
        setBusy(false);
        return;
      }

      // 2) Items → formato Affirm
      const affItems = items.map(it => ({
        display_name: it.name,
        sku: it.sku,
        unit_price: toCents(it.price),
        qty: it.qty,
      }));

      const total_cents = toCents(totalUSD);
      const shipping_cents = toCents(shippingUSD || 0);
      const tax_cents = toCents(taxUSD || 0);
      const order_id = `SUNRISE-${Date.now()}`;

      // 3) CheckoutData con identidad real (billing/shipping)
      const checkoutData = {
        merchant: {
          user_confirmation_url: `${location.origin}/checkout/success`,
          user_cancel_url: `${location.origin}/checkout/cancel`,
          name: 'Sunrise Store',
        },
        items: affItems,
        shipping_amount: shipping_cents,
        tax_amount: tax_cents,
        total: total_cents,
        billing: {
          name: { first: customer.firstName, last: customer.lastName },
          email: customer.email,
          phone_number: customer.phone,
          address: {
            line1: customer.address.line1,
            line2: customer.address.line2 || '',
            city: customer.address.city,
            state: customer.address.state,
            zipcode: customer.address.zip,
            country: customer.address.country || 'US',
          },
        },
        shipping: {
          name: { first: customer.firstName, last: customer.lastName },
          address: {
            line1: customer.address.line1,
            line2: customer.address.line2 || '',
            city: customer.address.city,
            state: customer.address.state,
            zipcode: customer.address.zip,
            country: customer.address.country || 'US',
          },
        },
        order_id,
      } as const;

      // 4) Abrir Affirm
      window.affirm.checkout(checkoutData);
      window.affirm.checkout.open({
        onFail: (a: any) => {
          console.warn('[Affirm] fail', a);
          setBusy(false);
        },
        onSuccess: async (data: any) => {
          const checkout_token = data?.checkout_token || data?.token;
          if (!checkout_token) {
            console.error('[Affirm] missing checkout_token', data);
            setBusy(false);
            return;
          }

          // 5) Autorizar y capturar en tu función Netlify (prod/sandbox lo decide el server)
          const res = await fetch('/.netlify/functions/affirm-authorize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              checkout_token,
              order_id,
              amount_cents: total_cents,
            }),
          });
          const json = await res.json().catch(() => ({}));

          if (!res.ok || !json?.ok) {
            console.error('[Affirm] server error', json);
            setBusy(false);
            return;
          }

          // (Opcional) Guardar en tu admin el nombre + chargeId para mostrárselo a Edu ya.
          // await saveOrder({ order_id, chargeId: json.charge?.id, name: `${customer.firstName} ${customer.lastName}`, email: customer.email, total_cents });

          clear(); // limpia carrito local si querés
          location.href = checkoutData.merchant.user_confirmation_url;
        },
      });
    } catch (e) {
      console.error(e);
      setBusy(false);
    }
  }

  return (
    <button onClick={handlePay} disabled={busy} className={buttonClassName}>
      {busy ? 'Procesando…' : label}
    </button>
  );
}
