import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import es from "./dict.es";
import en from "./dict.en";

type Lang = "en" | "es";

type Ctx = {
  lang: Lang;
  t: (k: string) => string;
  setLang: (l: Lang) => void;
  fmtMoney: (v: number) => string;
};

const I18nCtx = createContext<Ctx | null>(null);
const LS_KEY = "guzzies_riv_lang";

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    const def: Lang = saved === "es" || saved === "en" ? saved : "en";

    setLang(def);
    document.documentElement.lang = def;
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const dict = lang === "es" ? es : en;

  const t = (key: string) => {
    const directValue = (dict as Record<string, unknown>)[key];

    if (typeof directValue === "string") {
      return directValue;
    }

    const nestedValue = getNestedValue(dict, key);

    if (typeof nestedValue === "string") {
      return nestedValue;
    }

    return key;
  };

  const fmtMoney = (value: number) =>
    new Intl.NumberFormat(lang === "es" ? "es-US" : "en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const value = useMemo<Ctx>(() => ({ lang, t, setLang, fmtMoney }), [lang]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nCtx);

  if (!ctx) {
    throw new Error("useI18n must be used within <I18nProvider>");
  }

  return ctx;
};