// netlify/functions/affirm-authorize.js
// API v2: autoriza un charge desde checkout_token y (opcional) captura el pago.

// === Entorno (prod/sandbox) ===============================================
const envVar = String(process.env.AFFIRM_ENV || "").toLowerCase();
const isProdByEnv = envVar === "prod" || envVar === "production";
const PROD_HOST_HINTS = ["sunrisestore.info"]; // añade otros si hace falta
const hostLooksProd = (host = "") => PROD_HOST_HINTS.some(h => host.includes(h));
const baseUrl = (isProd) => isProd
  ? "https://api.affirm.com/api/v2"
  : "https://sandbox.affirm.com/api/v2";

// === CORS ==================================================================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// === Utils =================================================================
const safe = (o) => { try { return JSON.stringify(o, null, 2).slice(0, 4000); } catch { return "[unserializable]"; } };
async function tryJson(res) { const t = await res.text(); try { return JSON.parse(t); } catch { return { raw: t }; } }
function resp(statusCode, obj) {
  return { statusCode, headers: { ...corsHeaders, "Content-Type": "application/json" }, body: JSON.stringify(obj) };
}

// Captura por defecto
const CAPTURE = true;

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "POST")   return { statusCode: 405, headers: corsHeaders, body: "Method Not Allowed" };

  const host = event?.headers?.host || "";
  const isProd = isProdByEnv || hostLooksProd(host);
  const BASE = baseUrl(isProd);

  try {
    const parsed = JSON.parse(event.body || "{}");

    // ---------- 🔎 DIAGNÓSTICO (antes de cualquier validación) -------------
    if (parsed && parsed.diag === true) {
      const diagPayload = {
        host,
        envVar: process.env.AFFIRM_ENV || null,
        isProd,
        baseURL: BASE,
        nodeVersion: process.versions?.node,
        hasFetch: typeof fetch !== "undefined",
        flags: {
          HAS_AFFIRM_PUBLIC_KEY: Boolean(process.env.AFFIRM_PUBLIC_KEY || process.env.AFFIRM_PUBLIC_API_KEY),
          HAS_AFFIRM_PRIVATE_KEY: Boolean(process.env.AFFIRM_PRIVATE_KEY || process.env.AFFIRM_PRIVATE_API_KEY),
          HAS_VITE_AFFIRM_PUBLIC_KEY: Boolean(process.env.VITE_AFFIRM_PUBLIC_KEY),
        },
      };
      return resp(200, { ok: true, diag: diagPayload });
    }
    // ----------------------------------------------------------------------

    const {
      checkout_token,
      order_id,
      amount_cents,          // total en centavos (entero)
      shipping_carrier,      // opcional
      shipping_confirmation, // opcional
    } = parsed;

    if (!checkout_token || !order_id) {
      return resp(400, { error: "Missing checkout_token or order_id" });
    }

    // Env vars (compat)
    const PUB  = process.env.AFFIRM_PUBLIC_API_KEY  || process.env.AFFIRM_PUBLIC_KEY  || "";
    const PRIV = process.env.AFFIRM_PRIVATE_API_KEY || process.env.AFFIRM_PRIVATE_KEY || "";
    if (!PUB || !PRIV) return resp(500, { error: "Missing AFFIRM keys" });

    const AUTH = "Basic " + Buffer.from(`${PUB}:${PRIV}`).toString("base64");

    // 1) Autorizar
    const authRes = await fetch(`${BASE}/charges`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: AUTH },
      body: JSON.stringify({ checkout_token }),
    });
    const charge = await tryJson(authRes);
    console.log("[charges]", { env: isProd ? "prod" : "sandbox", status: authRes.status, resp: safe(charge) });
    if (!authRes.ok) return resp(authRes.status, { step: "charges", error: charge });

    // 2) Capturar (si aplica)
    let capture = null;
    if (CAPTURE) {
      if (typeof amount_cents !== "number") return resp(400, { error: "amount_cents required for capture=true" });

      const capRes = await fetch(`${BASE}/charges/${encodeURIComponent(charge.id)}/capture`, {
        method: "POST",
        headers: { Authorization: AUTH, "Content-Type": "application/json" },
        body: JSON.stringify({ order_id, amount: amount_cents, shipping_carrier, shipping_confirmation }),
      });
      capture = await tryJson(capRes);
      console.log("[capture]", { status: capRes.status, resp: safe(capture) });
      if (!capRes.ok) return resp(capRes.status, { step: "capture", error: capture });
    }

    return resp(200, { ok: true, charge, capture });
  } catch (e) {
    console.error("[affirm-authorize] error", e);
    return resp(500, { error: "server_error" });
  }
}
