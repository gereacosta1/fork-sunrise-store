import React from "react";
import { useI18n } from "../i18n/I18nProvider";

export default function LangToggle() {
  const { lang, setLang } = useI18n();

  const toggle = () => {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
  };

  const isES = lang === "es";

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label="Change language"
      title={isES ? "Switch to English" : "Cambiar a Español"}
      className="
        relative flex items-center gap-2 px-3 py-1.5
        rounded-full border border-[#9b7a55]/50
        bg-white/5 backdrop-blur-md
        text-white font-semibold text-sm
        hover:bg-white/10 transition-all duration-300
      "
    >
      {/* Indicador visual */}
      <span
        className={`
          absolute left-1 top-1 bottom-1 w-1/2 rounded-full
          bg-[#9b7a55] transition-all duration-300
          ${isES ? "translate-x-full" : "translate-x-0"}
        `}
      />

      {/* Labels */}
      <span className={`relative z-10 px-2 ${!isES ? "text-black" : "text-white/70"}`}>
        EN
      </span>

      <span className={`relative z-10 px-2 ${isES ? "text-black" : "text-white/70"}`}>
        ES
      </span>
    </button>
  );
}