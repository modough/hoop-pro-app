import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "fr";

type Dict = Record<string, string>;

const translations: Record<Language, Dict> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.training": "Training",
    "nav.coach": "Coach",
    "nav.progress": "Progress",
    "nav.profile": "Profile",

    // Home / Hero
    "hero.tagline": "Basketball Training Program",
    "hero.title.from": "FROM",
    "hero.title.basic": "BASIC",
    "hero.title.to": "TO",
    "hero.title.pro": "PRO",
    "hero.subtitle":
      "Master every skill. Structured drills, progressive training, and expert techniques to elevate your game to the next level.",
    "hero.cta": "Start Training",

    // DrillCard
    "drill.timer": "Drill Timer",
    "drill.play": "Play",
    "drill.pause": "Pause",
    "drill.resume": "Resume",
    "drill.reset": "Reset",
    "drill.complete": "🏀 Drill Complete!",
    "drill.showDetails": "Show Details",
    "drill.hideDetails": "Hide Details",
    "drill.watchVideo": "Watch Drill Video",
    "drill.completed": "Completed",
    "drill.markComplete": "Mark Complete",
    "drill.videoUnavailable": "Video not available",
    "difficulty.Easy": "Easy",
    "difficulty.Medium": "Medium",
    "difficulty.Hard": "Hard",

    // Training
    "training.title": "Training Program",
    "training.subtitle": "Complete each level to unlock the next",
    "training.back": "Back",

    // Progress
    "progress.title": "Your Progress",
    "progress.overall": "Overall Completion",
    "progress.daily": "Daily Training",
    "progress.byLevel": "By Level",
    "progress.byCategory": "By Category",
    "progress.drills": "drills",

    // Streak
    "streak.dayStreak": "day streak",
    "streak.longest": "Longest:",
    "streak.days": "days",
    "streak.trainToday": "· Train today to keep it!",
    "streak.lockedIn": "· 🏀 Locked in today",

    // Achievements
    "achievements.title": "Achievements",
    "achievements.unlocked": "unlocked",
    "achievements.done": "Done",
    "achievements.days": "days",
    "ach.first-drill.title": "First Bucket",
    "ach.first-drill.desc": "Complete your first drill",
    "ach.ten-drills.title": "Getting Warm",
    "ach.ten-drills.desc": "Complete 10 drills",
    "ach.twentyfive-drills.title": "Locked In",
    "ach.twentyfive-drills.desc": "Complete 25 drills",
    "ach.all-drills.title": "Pro Elite",
    "ach.all-drills.desc": "Complete every drill",
    "ach.streak-3.title": "On Fire",
    "ach.streak-3.desc": "Train 3 days in a row",
    "ach.streak-7.title": "Week Warrior",
    "ach.streak-7.desc": "Train 7 days in a row",
    "ach.streak-30.title": "Unstoppable",
    "ach.streak-30.desc": "Train 30 days in a row",
    "ach.level-1.title": "Fundamentals Master",
    "ach.level-1.desc": "Complete every Beginner drill",
    "ach.active-days-20.title": "Dedicated",
    "ach.active-days-20.desc": "Train on 20 different days",

    // Profile
    "profile.title": "Profile",
    "profile.drillsDone": "Drills Done",
    "profile.levels": "Levels",
    "profile.complete": "Complete",
    "profile.currentLevel": "Current Level",
    "profile.reset": "Reset All Progress",
    "profile.signOut": "Sign out",
    "profile.confirmReset": "Reset all progress? This cannot be undone.",
    "profile.invalidPseudo": "Invalid pseudo",
    "profile.invalidPseudoDesc": "2 to 40 characters",
    "profile.pseudoUpdated": "Pseudo updated",
    "profile.avatarUpdated": "Avatar updated",
    "profile.uploadFailed": "Upload failed",
    "profile.imageTooLarge": "Image too large",
    "profile.imageTooLargeDesc": "Max 5MB",
    "profile.language": "Language",

    // Ranks
    "rank.proElite": "🏆 Pro Elite",
    "rank.advanced": "⭐ Advanced",
    "rank.intermediate": "⚡ Intermediate",
    "rank.beginnerPlus": "🎯 Beginner+",
    "rank.rookie": "🏀 Rookie",

    // Coach
    "coach.title": "AI Coach",
    "coach.subtitle": "Your personal basketball coach",
    "coach.greeting":
      "Hey! I'm your AI Coach 🏀 Ask me anything about drills, technique, workouts, or how to level up your game.",
    "coach.placeholder": "Ask coach anything...",
    "coach.suggestion.workout": "Build me a 30-min shooting workout",
    "coach.suggestion.arc": "How do I fix my jumper arc?",
    "coach.suggestion.next": "What should I train next?",
    "coach.suggestion.pressure": "Tips to handle pressure defense",

    // Level titles
    "level.1": "Beginner",
    "level.2": "Intermediate",
    "level.3": "Advanced",
    "level.4": "Pro Elite",

    // Level titles description
    "level.1.desc":
      "Build your foundation with basic ball handling, shooting form, and footwork essentials.",
    "level.2.desc":
      "Level up with combo moves, mid-range shooting, and transition play.",
    "level.3.desc":
      "Master complex moves, three-point shooting, and advanced defensive concepts.",
    "level.4.desc":
      "Train like the pros with elite-level drills used by professional players.",

    // Months
    "month.1": "January",
    "month.2": "February",
    "month.3": "March",
    "month.4": "April",
    "month.5": "May",
    "month.6": "June",
    "month.7": "July",
    "month.8": "August",
    "month.9": "September",
    "month.10": "October",
    "month.11": "November",
    "month.12": "December",
  },

  fr: {
    // Nav
    "nav.home": "Accueil",
    "nav.training": "Entraînement",
    "nav.coach": "Coach",
    "nav.progress": "Progrès",
    "nav.profile": "Profil",

    // Home / Hero
    "hero.tagline": "Programme d'Entraînement de Basket",
    "hero.title.from": "DE",
    "hero.title.basic": "DÉBUTANT",
    "hero.title.to": "À",
    "hero.title.pro": "PRO",
    "hero.subtitle":
      "Maîtrise chaque compétence. Des exercices structurés, un entraînement progressif et des techniques d'experts pour passer au niveau supérieur.",
    "hero.cta": "Commencer",

    // DrillCard
    "drill.timer": "Minuteur",
    "drill.play": "Démarrer",
    "drill.pause": "Pause",
    "drill.resume": "Reprendre",
    "drill.reset": "Réinitialiser",
    "drill.complete": "🏀 Exercice terminé !",
    "drill.showDetails": "Afficher les détails",
    "drill.hideDetails": "Masquer les détails",
    "drill.watchVideo": "Voir la vidéo",
    "drill.completed": "Terminé",
    "drill.markComplete": "Marquer terminé",
    "drill.videoUnavailable": "Vidéo non disponible",
    "difficulty.Easy": "Facile",
    "difficulty.Medium": "Moyen",
    "difficulty.Hard": "Difficile",

    // Training Levels
    "training.title": "Programme d'Entraînement",
    "training.subtitle": "Termine chaque niveau pour débloquer le suivant",
    "training.back": "Retour",

    // Progress
    "progress.title": "Tes Progrès",
    "progress.overall": "Progression Globale",
    "progress.daily": "Entraînement Quotidien",
    "progress.byLevel": "Par Niveau",
    "progress.byCategory": "Par Catégorie",
    "progress.drills": "exercices",

    // Streak
    "streak.dayStreak": "jours de suite",
    "streak.longest": "Record :",
    "streak.days": "jours",
    "streak.trainToday": "· Entraîne-toi aujourd'hui pour le garder !",
    "streak.lockedIn": "· 🏀 Validé aujourd'hui",

    // Achievements
    "achievements.title": "Récompenses",
    "achievements.unlocked": "débloquées",
    "achievements.done": "Fait",
    "achievements.days": "jours",
    "ach.first-drill.title": "Premier Panier",
    "ach.first-drill.desc": "Termine ton premier exercice",
    "ach.ten-drills.title": "Échauffé",
    "ach.ten-drills.desc": "Termine 10 exercices",
    "ach.twentyfive-drills.title": "Concentré",
    "ach.twentyfive-drills.desc": "Termine 25 exercices",
    "ach.all-drills.title": "Pro Elite",
    "ach.all-drills.desc": "Termine tous les exercices",
    "ach.streak-3.title": "En Feu",
    "ach.streak-3.desc": "Entraîne-toi 3 jours d'affilée",
    "ach.streak-7.title": "Guerrier de la Semaine",
    "ach.streak-7.desc": "Entraîne-toi 7 jours d'affilée",
    "ach.streak-30.title": "Inarrêtable",
    "ach.streak-30.desc": "Entraîne-toi 30 jours d'affilée",
    "ach.level-1.title": "Maître des Fondamentaux",
    "ach.level-1.desc": "Termine tous les exercices Débutant",
    "ach.active-days-20.title": "Assidu",
    "ach.active-days-20.desc": "Entraîne-toi sur 20 jours différents",

    // Profile
    "profile.title": "Profil",
    "profile.drillsDone": "Exercices Faits",
    "profile.levels": "Niveaux",
    "profile.complete": "Complet",
    "profile.currentLevel": "Niveau Actuel",
    "profile.reset": "Réinitialiser les Progrès",
    "profile.signOut": "Se déconnecter",
    "profile.confirmReset":
      "Réinitialiser tous les progrès ? Action irréversible.",
    "profile.invalidPseudo": "Pseudo invalide",
    "profile.invalidPseudoDesc": "2 à 40 caractères",
    "profile.pseudoUpdated": "Pseudo mis à jour",
    "profile.avatarUpdated": "Avatar mis à jour",
    "profile.uploadFailed": "Échec de l'envoi",
    "profile.imageTooLarge": "Image trop grande",
    "profile.imageTooLargeDesc": "Max 5 Mo",
    "profile.language": "Langue",

    // Ranks
    "rank.proElite": "🏆 Pro Elite",
    "rank.advanced": "⭐ Avancé",
    "rank.intermediate": "⚡ Intermédiaire",
    "rank.beginnerPlus": "🎯 Débutant+",
    "rank.rookie": "🏀 Rookie",

    // Coach
    "coach.title": "Coach IA",
    "coach.subtitle": "Ton coach de basket personnel",
    "coach.greeting":
      "Salut ! Je suis ton Coach IA 🏀 Pose-moi des questions sur les exercices, la technique, les séances ou comment progresser.",
    "coach.placeholder": "Demande au coach...",
    "coach.suggestion.workout": "Crée-moi une séance de tir de 30 min",
    "coach.suggestion.arc": "Comment corriger l'arc de mon shoot ?",
    "coach.suggestion.next": "Quoi travailler ensuite ?",
    "coach.suggestion.pressure": "Conseils contre une défense pressante",

    // Level titles
    "level.1": "Débutant",
    "level.2": "Intermédiaire",
    "level.3": "Avancé",
    "level.4": "Pro Elite",

    // Level titles description
    "level.1.desc":
      "Construis tes bases avec le dribble, la mécanique de tir et les fondamentaux du jeu de pieds.",
    "level.2.desc":
      "Progresse avec des enchaînements, le tir mi-distance et le jeu en transition.",
    "level.3.desc":
      "Maîtrise les mouvements complexes, le tir à trois points et les concepts défensifs avancés.",
    "level.4.desc":
      "Entraîne-toi comme les pros avec des exercices de niveau élite utilisés par les joueurs professionnels.",

    //Months
    "month.1": "Janvier",
    "month.2": "Février",
    "month.3": "Mars",
    "month.4": "Avril",
    "month.5": "Mai",
    "month.6": "Juin",
    "month.7": "Juillet",
    "month.8": "Août",
    "month.9": "Septembre",
    "month.10": "Octobre",
    "month.11": "Novembre",
    "month.12": "Décembre",
  },
};

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "app.language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === "en" || stored === "fr") return stored;
    const browser = window.navigator.language?.toLowerCase() ?? "";
    return browser.startsWith("fr") ? "fr" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: (key: string) =>
        translations[lang][key] ?? translations.en[key] ?? key,
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
