// netlify/functions/affirm-authorize.js
// API v2: crea el charge desde checkout_token y (opcional) captura el pago

// Detecta producción (acepta "prod" o "production")
// Si solo usás prod, dejá AFFIRM_ENV=production en Netlify y listo.
const env = String(process.env.AFFIRM_ENV || "").toLowerCase();
const isProd = env === "prod" || env === "production";
const BASE = isProd
  ? "https://api.affirm.com/api/v2"
  : "https://sandbox.affirm.com/api/v2";

// CORS básico
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Logging seguro (recorta)
const safe = (o) => {
  try { return JSON.stringify(o, null, 2).slice(0, 4000); }
  catch { return "[unserializable]"; }
};

// En prod conviene capturar
const CAPTURE = true;

export async function handler(event) {
  // Preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: "Method Not Allowed" };
  }

  try {
    const {
      checkout_token,
      order_id,
      amount_cents,          // total en centavos (entero)
      shipping_carrier,      // opcional
      shipping_confirmation, // opcional
    } = JSON.parse(event.body || "{}");

    if (!checkout_token || !order_id) {
      return resp(400, { error: "Missing checkout_token or order_id" });
    }

    // Lee ambas variantes por si en Netlify están como *_API_KEY
    const PUB  = process.env.AFFIRM_PUBLIC_API_KEY  || process.env.AFFIRM_PUBLIC_KEY  || "";
    const PRIV = process.env.AFFIRM_PRIVATE_API_KEY || process.env.AFFIRM_PRIVATE_KEY || "";

    if (!PUB || !PRIV) {
      return resp(500, { error: "Missing AFFIRM keys" });
    }

    // *** AUTH correcto: PRIVATE como usuario, password vacío ***
    const AUTH = "Basic " + Buffer.from(`${PRIV}:`).toString("base64");

    // 1) Autorizar: crear el charge a partir del checkout_token
    const authRes = await fetch(`${BASE}/charges`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: AUTH },
      body: JSON.stringify({ checkout_token }),
    });

    const charge = await tryJson(authRes);
    console.log("[charges]", { env: isProd ? "prod" : "sandbox", status: authRes.status, resp: safe(charge) });

    if (!authRes.ok) {
      return resp(authRes.status, { step: "charges", error: charge });
    }

    // 2) Capturar (si aplica)
    let capture = null;
    if (CAPTURE) {
      if (typeof amount_cents !== "number") {
        return resp(400, { error: "amount_cents required for capture=true" });
      }

      const capRes = await fetch(`${BASE}/charges/${encodeURIComponent(charge.id)}/capture`, {
        method: "POST",
        headers: { Authorization: AUTH, "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id,
          amount: amount_cents, // centavos (entero)
          shipping_carrier,
          shipping_confirmation,
        }),
      });

      capture = await tryJson(capRes);
      console.log("[capture]", { status: capRes.status, resp: safe(capture) });

      if (!capRes.ok) {
        return resp(capRes.status, { step: "capture", error: capture });
      }
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, charge, capture }),
    };
  } catch (e) {
    console.error("[affirm-authorize] error", e);
    return resp(500, { error: "server_error" });
  }
}

// Helpers
async function tryJson(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { raw: text }; }
}
function resp(statusCode, obj) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };
}
