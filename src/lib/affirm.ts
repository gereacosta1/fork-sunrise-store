// src/lib/affirm.ts
declare global {
  interface Window {
    _affirm_config?: {
      public_api_key: string;
      script: string;
      locale: string;
      country_code: string;
    };
    affirm?: any;
  }
}

const AFFIRM_SCRIPT_URL = 'https://cdn1.affirm.com/js/v2/affirm.js';

export function loadAffirm(publicKey: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!publicKey) {
      reject(new Error('[Affirm] Missing VITE_AFFIRM_PUBLIC_KEY'));
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${AFFIRM_SCRIPT_URL}"]`
    );

    window._affirm_config = {
      public_api_key: publicKey,
      script: AFFIRM_SCRIPT_URL,
      locale: 'en_US',
      country_code: 'US',
    };

    if (window.affirm?.ui && existingScript) {
      try {
        window.affirm.ui.ready(() => resolve());
      } catch {
        resolve();
      }
      return;
    }

    const oldScripts = document.querySelectorAll<HTMLScriptElement>(
      'script[src*="affirm.com/js/v2/affirm.js"]'
    );

    oldScripts.forEach((script) => {
      if (script.src !== AFFIRM_SCRIPT_URL) {
        script.remove();
      }
    });

    const script = existingScript || document.createElement('script');

    script.async = true;
    script.src = AFFIRM_SCRIPT_URL;

    script.onload = () => {
      if (window.affirm?.ui) {
        window.affirm.ui.ready(() => resolve());
      } else {
        resolve();
      }
    };

    script.onerror = () => {
      reject(new Error('[Affirm] Failed to load Affirm script'));
    };

    if (!existingScript) {
      document.head.appendChild(script);
    }
  });
}

export {};