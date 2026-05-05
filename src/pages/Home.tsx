import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import LanguageButton from "@/components/LanguageButton";

const Home = () => {
  const navigate = useNavigate();
 
  return (
    <div className="relative">
       
      {/* Language toggle */}
     <LanguageButton className="z-10 top-4 right-4"/>

      <HeroSection onStartTraining={() => navigate("/training")} />
    </div>
  );
};

export default Home;
