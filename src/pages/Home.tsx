import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection onStartTraining={() => navigate("/training")} />
    </div>
  );
};

export default Home;
