import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageButton from "@/components/LanguageButton";

const Home = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  return (
    <div className="relative">
      {/* Language toggle */}
     <LanguageButton className="z-10 top-4 right-4"/>

      <HeroSection onStartTraining={() => navigate("/training")} />
    </div>
  );
};

export default Home;
