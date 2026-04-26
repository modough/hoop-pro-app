import { NavLink } from "react-router-dom";
import { Home, Dumbbell, BarChart3, User, Sparkles, BotMessageSquare  } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";



const BottomNav = () => {
  const { t } = useLanguage();
  const navItems = [
    { to: "/", icon: Home, label: t("nav.home") },
    { to: "/training", icon: Dumbbell, label: t("nav.training") },
    { to: "/coach", icon: BotMessageSquare, label: t("nav.coach") },
    { to: "/progress", icon: BarChart3, label: t("nav.progress") },
    { to: "/profile", icon: User, label: t("nav.profile") },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_6px_hsl(25,95%,53%)]")} />
                <span className="text-[10px] font-semibold">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
