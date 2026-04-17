import heroImage from "@/assets/hero-basketball.jpg";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onStartTraining: () => void;
}

const HeroSection = ({ onStartTraining }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Basketball player training"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 animate-fade-up">
          Basketball Training Program
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          FROM <span className="text-gradient-fire">BASIC</span> TO{" "}
          <span className="text-gradient-fire">PRO</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          Master every skill. Structured drills, progressive training, and expert techniques to elevate your game to the next level.
        </p>
        <div className="animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <Button
            size="lg"
            onClick={onStartTraining}
            className="bg-gradient-fire text-primary-foreground font-bold text-lg px-10 py-6 rounded-full shadow-glow hover:scale-105 transition-transform duration-300"
          >
            Start Training <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
