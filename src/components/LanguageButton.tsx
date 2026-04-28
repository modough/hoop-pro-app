import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";

interface LanguageButtonProps {
  className?: string;
}

function LanguageButton({className}: LanguageButtonProps) {
  const { lang, setLang } = useLanguage();
  return (
    <div>
      {/* Language toggle */}
      <button
        onClick={() => setLang(lang === "en" ? "fr" : "en")}
        className={`absolute ${className} w-14 h-8 flex items-center rounded-full transition-colors duration-300 ${
          lang === "fr" ? "bg-white" : "bg-black"
        }`}
      >
        {/* Thumb */}
        <div
          className={`absolute w-6 h-6 bg-primary rounded-full transform transition-transform duration-300 z-10 ${
            lang === "fr" ? "translate-x-7 " : "translate-x-1 "
          }`}
        />

        {/* Labels inside (optional) */}
        <span className="absolute left-2 text-[10px] font-bold text-black">
          FR
        </span>
        <span className="absolute right-2 text-[10px] font-bold text-white">
          EN
        </span>
      </button>
    </div>
  );
}

export default LanguageButton;
