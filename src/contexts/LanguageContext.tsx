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
    //Auth
    "auth.login.title": "Welcome back",
    "auth.login.subtitle": "Log in to track your training",
    "auth.login.cta": "Log in",

    "auth.signup.title": "Create account",
    "auth.signup.subtitle": "Start training and saving progress",
    "auth.signup.cta": "Sign up",

    "auth.pseudo": "Username",
    "auth.email": "Email",
    "auth.password": "Password",

    "auth.loading": "Please wait...",

    "auth.switch.toSignup": "No account? Sign up",
    "auth.switch.toLogin": "Already have an account? Log in",

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
    "ach.monthly-minutes-200.title": "Monthly Grinder",
    "ach.monthly-minutes-200.desc": "Train 200 minutes in a single month",

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

    // Categories
    "category.Dribbling": "Dribbling",
    "category.Shooting": "Shooting",
    "category.Defense": "Defense",
    "category.Finishing": "Finishing",
    "category.Conditioning": "Conditioning",
    "category.Passing": "Passing",
    "category.Footwork": "Footwork",

    // Drill titles & descriptions (EN = source of truth)
    "drill.1-1.title": "Stationary Ball Handling",
    "drill.1-1.desc":
      "Practice pound dribbles, crossovers, and between-the-legs while standing still. Focus on keeping your head up and controlling the ball with your fingertips. Do 30 reps of each move with each hand.",
    "drill.1-2.title": "Form Shooting",
    "drill.1-2.desc":
      "Stand 3-5 feet from the basket. Focus on proper shooting form: elbow in, follow through, arc on the ball. Make 20 shots from 5 different spots.",
    "drill.1-3.title": "Defensive Slides",
    "drill.1-3.desc":
      "Practice lateral defensive slides across the lane. Stay low, keep your hands active, and don't cross your feet. 4 sets of 10 slides each direction.",
    "drill.1-4.title": "Layup Lines",
    "drill.1-4.desc":
      "Alternate right-hand and left-hand layups from both sides. Focus on proper footwork: right-left for right-hand layups, left-right for left-hand. Make 20 with each hand.",
    "drill.1-5.title": "Jump Rope Conditioning",
    "drill.1-5.desc":
      "Basic jump rope intervals to build footwork and conditioning. 30 seconds on, 15 seconds rest. Complete 10 rounds.",
    "drill.1-6.title": "Chest & Bounce Passes",
    "drill.1-6.desc":
      "Partner or wall passing drills. Practice crisp chest passes and bounce passes from various distances. 50 reps of each type.",
    "drill.1-7.title": "Triple Threat Position",
    "drill.1-7.desc":
      "Practice catching the ball and getting into triple threat stance. Work on jab steps, shot fakes, and rip-throughs from this position. 5 sets of 10 reps.",
    "drill.1-8.title": "Free Throw Routine",
    "drill.1-8.desc":
      "Develop a consistent free throw routine. Focus on rhythm, breath, and follow-through. Shoot 50 free throws and track your percentage.",
    "drill.1-9.title": "Pivot Foot Drills",
    "drill.1-9.desc":
      "Practice front pivots and reverse pivots from triple threat. Maintain balance and protect the ball. 20 reps each direction with each pivot foot.",
    "drill.1-10.title": "Wall Dribbling",
    "drill.1-10.desc":
      "Dribble the ball against a wall at different heights to build finger strength and control. 3 sets of 1 minute with each hand.",
    "drill.2-1.title": "Two-Ball Dribbling",
    "drill.2-1.desc":
      "Dribble two basketballs simultaneously. Start with same-time dribbles, then alternate. Walk forward and backward while maintaining control.",
    "drill.2-2.title": "Pull-Up Jumpers",
    "drill.2-2.desc":
      "Practice catching the ball on the move and pulling up for a mid-range jumper. Work from both wings and the elbow. 10 makes from each spot.",
    "drill.2-3.title": "Closeout & Contest",
    "drill.2-3.desc":
      "Sprint to close out on a cone or partner, then slide to contain the drive. Focus on choppy steps and active hands. 5 sets of 8 closeouts.",
    "drill.2-4.title": "Euro Step Finishes",
    "drill.2-4.desc":
      "Practice the Euro step from both sides of the basket. Start slow to nail the footwork, then add speed. 15 makes from each side.",
    "drill.2-5.title": "Suicide Sprints",
    "drill.2-5.desc":
      "Full-court suicide sprints: free throw line, half court, far free throw line, full court and back. 6 rounds with 30 seconds rest.",
    "drill.2-6.title": "Transition Passing",
    "drill.2-6.desc":
      "Practice outlet passes and long-court passes while running. Simulate fast-break scenarios with quick, accurate passes ahead.",
    "drill.2-7.title": "Hesitation Moves",
    "drill.2-7.desc":
      "Master the hesitation dribble to freeze defenders. Practice hesi into crossover, hesi into drive, and hesi pull-up. 10 reps each from both sides.",
    "drill.2-8.title": "Mid-Range Bank Shots",
    "drill.2-8.desc":
      "Practice bank shots from both sides of the lane at 45-degree angles. Focus on aim point on the backboard. 15 makes from each spot.",
    "drill.2-9.title": "Deny & Deflect",
    "drill.2-9.desc":
      "Work on denying the wing pass by staying in the passing lane with active hands. Practice deflecting and intercepting passes. 5 sets of 2 minutes.",
    "drill.2-10.title": "Reverse Layups",
    "drill.2-10.desc":
      "Practice under-the-basket reverse layups from both sides. Focus on using the rim as protection from shot blockers. 15 makes each side.",
    "drill.3-1.title": "Combo Move Attacks",
    "drill.3-1.desc":
      "Chain together 3+ dribble moves into an attack sequence: hesitation → crossover → spin → finish. Practice 5 different combos, 10 reps each.",
    "drill.3-2.title": "Catch & Shoot Threes",
    "drill.3-2.desc":
      "Simulate game-speed catch-and-shoot threes. Sprint to a spot, receive a pass (or toss to yourself), and shoot. 100 attempts from 5 spots.",
    "drill.3-3.title": "Help & Recover Defense",
    "drill.3-3.desc":
      "Practice rotating to help on drives, then recovering to your man. Work on communication and positioning. 4 sets of 5 minutes.",
    "drill.3-4.title": "Floater Package",
    "drill.3-4.desc":
      "Develop a floater from multiple angles. Practice off one foot and two feet, from the lane and outside it. 15 makes from each angle.",
    "drill.3-5.title": "Agility Ladder + Sprints",
    "drill.3-5.desc":
      "Combine agility ladder patterns with sprint-outs. Focus on quick feet transitioning into explosive speed. 8 rounds.",
    "drill.3-6.title": "Read & React Passing",
    "drill.3-6.desc":
      "Make passing decisions based on defensive reads. Practice skip passes, pocket passes, and lob passes in decision-making scenarios.",
    "drill.3-7.title": "In-and-Out Crossover",
    "drill.3-7.desc":
      "Master the in-and-out fake into a sharp crossover. Attack both directions off the move. 15 reps each side at game speed.",
    "drill.3-8.title": "Spot-Up Shooting Under Fatigue",
    "drill.3-8.desc":
      "Run a sprint between each set of 5 three-pointers. Simulate shooting when tired in late-game situations. 60 total attempts.",
    "drill.3-9.title": "Pick & Roll Defense",
    "drill.3-9.desc":
      "Practice hedging, switching, and dropping in pick-and-roll coverage. Communicate screens and recover to shooters. 5 sets of 4 minutes.",
    "drill.3-10.title": "Power Finishes",
    "drill.3-10.desc":
      "Attack the basket and finish strong with two-foot power layups through contact. Use a pad for resistance. 20 makes each side.",
    "drill.4-1.title": "Full-Speed Handle Gauntlet",
    "drill.4-1.desc":
      "Navigate through a course of cones at full speed using advanced handles. Tight crossovers, behind-the-back, and between-the-legs at game speed. Timed runs.",
    "drill.4-2.title": "Off-the-Dribble Threes",
    "drill.4-2.desc":
      "Create your own three-point shot off the dribble. Step-back threes, side-step threes, and pull-up threes. 20 makes from each type.",
    "drill.4-3.title": "1-on-1 Lockdown",
    "drill.4-3.desc":
      "Full-speed 1-on-1 defensive possessions. Focus on staying in front, forcing tough shots, and contesting everything. 20 possessions.",
    "drill.4-4.title": "Contact Finishes",
    "drill.4-4.desc":
      "Practice finishing through contact at the rim. Use a pad or partner to simulate game physicality. Work on and-one finishes.",
    "drill.4-5.title": "Pro Conditioning Circuit",
    "drill.4-5.desc":
      "Full-court sprints, defensive slides, backpedals, and jump sequences. Non-stop for 5 minutes, rest 2 minutes. 4 rounds.",
    "drill.4-6.title": "Full-Court Vision Passing",
    "drill.4-6.desc":
      "Run full-court scenarios making elite-level reads and passes. Behind-the-back, no-look, and one-hand skip passes at full speed.",
    "drill.4-7.title": "Shamgod & Advanced Handles",
    "drill.4-7.desc":
      "Master elite handles like the Shamgod, wrap-around, and through-the-legs spin move. 10 reps each move at full speed.",
    "drill.4-8.title": "Contested Shot Making",
    "drill.4-8.desc":
      "Shoot with a hand in your face from all three levels. Develop the ability to score over length and closeouts. 80 total attempts.",
    "drill.4-9.title": "Full-Court Press Break",
    "drill.4-9.desc":
      "Practice breaking full-court pressure with quick decision-making, passing under duress, and finding the open man. 10 possessions.",
    "drill.4-10.title": "Acrobatic Finishes",
    "drill.4-10.desc":
      "Practice circus finishes: scoop layups, finger rolls, up-and-unders, and wrong-foot layups at game speed. 15 makes of each type.",
  },

  fr: {
    //Auth
    "auth.login.title": "Welcome back",
    "auth.login.subtitle": "Connecte-toi pour suivre ton entraînement",
    "auth.login.cta": "Se connecter",

    "auth.signup.title": "Créer un compte",
    "auth.signup.subtitle":
      "Commence à t'entraîner et sauvegarde ta progression",
    "auth.signup.cta": "S'inscrire",

    "auth.pseudo": "Pseudo",
    "auth.email": "Email",
    "auth.password": "Mot de passe",

    "auth.loading": "Veuillez patienter...",

    "auth.switch.toSignup": "Pas de compte ? S'inscrire",
    "auth.switch.toLogin": "Déjà un compte ? Se connecter",

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
    "ach.monthly-minutes-200.title": "Grinder du Mois",
    "ach.monthly-minutes-200.desc":
      "Entraîne-toi 200 minutes dans un même mois",

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

    // Categories
    "category.Dribbling": "Dribble",
    "category.Shooting": "Tir",
    "category.Defense": "Défense",
    "category.Finishing": "Finition",
    "category.Conditioning": "Physique",
    "category.Passing": "Passe",
    "category.Footwork": "Appuis",

    // Drill titles & descriptions (FR)
    "drill.1-1.title": "Maniement de balle stationnaire",
    "drill.1-1.desc":
      "Pratique les dribbles puissants, crossovers et entre les jambes en restant immobile. Garde la tête haute et contrôle le ballon avec le bout des doigts. 30 répétitions de chaque mouvement avec chaque main.",
    "drill.1-2.title": "Tir technique",
    "drill.1-2.desc":
      "Place-toi à 1-1,5 m du panier. Concentre-toi sur la forme de tir : coude rentré, accompagnement, arc du ballon. Marque 20 tirs depuis 5 spots différents.",
    "drill.1-3.title": "Pas chassés défensifs",
    "drill.1-3.desc":
      "Pratique les pas chassés latéraux dans la raquette. Reste bas, mains actives, ne croise pas les pieds. 4 séries de 10 pas dans chaque direction.",
    "drill.1-4.title": "Lignes de lay-up",
    "drill.1-4.desc":
      "Alterne lay-ups main droite et main gauche des deux côtés. Concentre-toi sur les appuis : droite-gauche pour la main droite, gauche-droite pour la main gauche. 20 réussis avec chaque main.",
    "drill.1-5.title": "Corde à sauter",
    "drill.1-5.desc":
      "Intervalles à la corde à sauter pour bâtir appuis et endurance. 30 secondes d'effort, 15 secondes de repos. 10 rounds.",
    "drill.1-6.title": "Passes à deux mains et à terre",
    "drill.1-6.desc":
      "Exercices de passes avec un partenaire ou un mur. Travaille des passes nettes à deux mains et des passes à terre à différentes distances. 50 répétitions de chaque type.",
    "drill.1-7.title": "Position triple menace",
    "drill.1-7.desc":
      "Pratique la réception du ballon en position triple menace. Travaille les jab steps, feintes de tir et rip-throughs depuis cette position. 5 séries de 10 répétitions.",
    "drill.1-8.title": "Routine lancers francs",
    "drill.1-8.desc":
      "Développe une routine de lancer franc cohérente. Travaille le rythme, la respiration et l'accompagnement. Tire 50 lancers et note ton pourcentage.",
    "drill.1-9.title": "Pivots",
    "drill.1-9.desc":
      "Pratique les pivots avant et arrière depuis la triple menace. Garde l'équilibre et protège le ballon. 20 répétitions dans chaque direction avec chaque pied de pivot.",
    "drill.1-10.title": "Dribble au mur",
    "drill.1-10.desc":
      "Dribble le ballon contre un mur à différentes hauteurs pour renforcer les doigts et le contrôle. 3 séries d'1 minute avec chaque main.",
    "drill.2-1.title": "Dribble à deux ballons",
    "drill.2-1.desc":
      "Dribble deux ballons simultanément. Commence en simultané, puis alterné. Avance et recule en gardant le contrôle.",
    "drill.2-2.title": "Tirs en sortie de dribble",
    "drill.2-2.desc":
      "Pratique la réception en mouvement et le tir mi-distance en pull-up. Travaille depuis les ailes et le coude. 10 réussis depuis chaque spot.",
    "drill.2-3.title": "Closeout & contest",
    "drill.2-3.desc":
      "Sprint pour fermer sur un cône ou partenaire, puis pas chassés pour contenir la pénétration. Pas courts, mains actives. 5 séries de 8 closeouts.",
    "drill.2-4.title": "Finitions Euro Step",
    "drill.2-4.desc":
      "Pratique l'Euro step des deux côtés du panier. Commence lentement pour les appuis, puis ajoute la vitesse. 15 réussis de chaque côté.",
    "drill.2-5.title": "Sprints suicide",
    "drill.2-5.desc":
      "Sprints suicide tout terrain : ligne des LF, milieu, LF opposée, fond et retour. 6 rounds avec 30 secondes de repos.",
    "drill.2-6.title": "Passes en transition",
    "drill.2-6.desc":
      "Pratique les passes d'outlet et les longues passes en course. Simule des contre-attaques avec des passes rapides et précises.",
    "drill.2-7.title": "Mouvements d'hésitation",
    "drill.2-7.desc":
      "Maîtrise le dribble d'hésitation pour figer le défenseur. Hesi-crossover, hesi-pénétration, hesi pull-up. 10 répétitions de chaque côté.",
    "drill.2-8.title": "Tirs en planche mi-distance",
    "drill.2-8.desc":
      "Pratique les tirs en planche des deux côtés à 45°. Vise le bon point sur la planche. 15 réussis depuis chaque spot.",
    "drill.2-9.title": "Interception et déviation",
    "drill.2-9.desc":
      "Travaille à empêcher la passe sur l'aile en restant dans la ligne de passe avec mains actives. Pratique déviations et interceptions. 5 séries de 2 minutes.",
    "drill.2-10.title": "Lay-ups inversés",
    "drill.2-10.desc":
      "Pratique les lay-ups inversés sous le panier des deux côtés. Utilise le cercle comme protection face aux contreurs. 15 réussis de chaque côté.",
    "drill.3-1.title": "Combos d'attaque",
    "drill.3-1.desc":
      "Enchaîne 3+ mouvements de dribble en attaque : hésitation → crossover → spin → finition. Pratique 5 combos différents, 10 répétitions chacun.",
    "drill.3-2.title": "Catch & shoot à 3 points",
    "drill.3-2.desc":
      "Simule des catch-and-shoot à 3 points à vitesse de match. Sprinte vers un spot, reçois la passe et tire. 100 tentatives depuis 5 spots.",
    "drill.3-3.title": "Aide et récupération défensive",
    "drill.3-3.desc":
      "Pratique la rotation pour aider sur les pénétrations, puis récupère ton joueur. Communication et placement. 4 séries de 5 minutes.",
    "drill.3-4.title": "Panoplie de floaters",
    "drill.3-4.desc":
      "Développe le floater sous plusieurs angles. Travaille à un et deux pieds, dans la raquette et à l'extérieur. 15 réussis sous chaque angle.",
    "drill.3-5.title": "Échelle d'agilité + sprints",
    "drill.3-5.desc":
      "Combine échelle d'agilité et sprints. Pieds rapides puis transition explosive vers la vitesse. 8 rounds.",
    "drill.3-6.title": "Lecture et passes",
    "drill.3-6.desc":
      "Décide en passe selon la lecture défensive. Skip passes, passes pocket et lobs en situation de décision.",
    "drill.3-7.title": "In-and-out crossover",
    "drill.3-7.desc":
      "Maîtrise la feinte in-and-out enchaînée d'un crossover sec. Attaque les deux directions. 15 répétitions de chaque côté à vitesse de match.",
    "drill.3-8.title": "Tir en spot-up sous fatigue",
    "drill.3-8.desc":
      "Sprint entre chaque série de 5 tirs à 3 points. Simule le tir en fin de match quand tu es fatigué. 60 tentatives au total.",
    "drill.3-9.title": "Défense sur pick & roll",
    "drill.3-9.desc":
      "Pratique hedge, switch et drop sur pick-and-roll. Annonce les écrans et récupère sur les shooteurs. 5 séries de 4 minutes.",
    "drill.3-10.title": "Finitions en force",
    "drill.3-10.desc":
      "Attaque le panier et finis en force avec lay-ups à deux pieds dans le contact. Utilise un pad. 20 réussis de chaque côté.",
    "drill.4-1.title": "Parcours de handle pleine vitesse",
    "drill.4-1.desc":
      "Navigue un parcours de cônes à pleine vitesse avec des handles avancés. Crossovers serrés, dans le dos et entre les jambes à vitesse de match. Chronométré.",
    "drill.4-2.title": "Tirs à 3 points en sortie de dribble",
    "drill.4-2.desc":
      "Crée tes propres tirs à 3 points en sortie de dribble. Step-back, side-step et pull-up à 3 points. 20 réussis de chaque type.",
    "drill.4-3.title": "1-contre-1 lockdown",
    "drill.4-3.desc":
      "Possessions défensives 1-contre-1 à pleine vitesse. Reste devant, force des tirs difficiles, conteste tout. 20 possessions.",
    "drill.4-4.title": "Finitions au contact",
    "drill.4-4.desc":
      "Pratique les finitions dans le contact au cercle. Utilise un pad ou un partenaire pour simuler la physicalité du match. Travaille les and-one.",
    "drill.4-5.title": "Circuit de condition pro",
    "drill.4-5.desc":
      "Sprints tout terrain, pas chassés défensifs, courses arrière et séquences de saut. Sans arrêt 5 minutes, 2 minutes de repos. 4 rounds.",
    "drill.4-6.title": "Vision et passes tout terrain",
    "drill.4-6.desc":
      "Scénarios tout terrain avec lectures et passes d'élite. Passes dans le dos, no-look et skip à une main à pleine vitesse.",
    "drill.4-7.title": "Shamgod & handles avancés",
    "drill.4-7.desc":
      "Maîtrise les handles d'élite : Shamgod, wrap-around et spin entre les jambes. 10 répétitions de chaque à pleine vitesse.",
    "drill.4-8.title": "Tirs contestés",
    "drill.4-8.desc":
      "Tire avec une main au visage depuis les trois niveaux. Développe la capacité à scorer malgré l'envergure et les closeouts. 80 tentatives au total.",
    "drill.4-9.title": "Sortie de pression tout terrain",
    "drill.4-9.desc":
      "Pratique la sortie de pression tout terrain avec décisions rapides, passes sous pression et trouve le joueur ouvert. 10 possessions.",
    "drill.4-10.title": "Finitions acrobatiques",
    "drill.4-10.desc":
      "Pratique les finitions de cirque : scoop, finger rolls, up-and-unders et lay-ups à contre-pied à vitesse de match. 15 réussis de chaque type.",
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
