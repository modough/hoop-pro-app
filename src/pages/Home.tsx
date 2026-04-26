import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const navigate = useNavigate();
 const { lang, setLang } = useLanguage();
  return (
    <div className="relative">
       <div className="absolute z-10 top-4 right-4 flex gap-2">
          {(["en", "fr"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                lang === l
                  ? "bg-gradient-fire text-primary-foreground shadow-glow"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {l === "en" ? "🇬🇧 EN" : "🇫🇷 FR"}
            </button>
          ))}
        </div>
      <HeroSection onStartTraining={() => navigate("/training")} />
    </div>
  );
};

export default Home;
