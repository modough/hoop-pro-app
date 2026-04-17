export interface Drill {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
}

export interface TrainingLevel {
  id: number;
  title: string;
  description: string;
  drills: Drill[];
}

export const trainingLevels: TrainingLevel[] = [
  {
    id: 1,
    title: "Beginner Fundamentals",
    description: "Build your foundation with basic ball handling, shooting form, and footwork essentials.",
    drills: [
      { id: "1-1", title: "Stationary Ball Handling", description: "Practice pound dribbles, crossovers, and between-the-legs while standing still. Focus on keeping your head up and controlling the ball with your fingertips. Do 30 reps of each move with each hand.", duration: "10 min", difficulty: "Easy", category: "Dribbling" },
      { id: "1-2", title: "Form Shooting", description: "Stand 3-5 feet from the basket. Focus on proper shooting form: elbow in, follow through, arc on the ball. Make 20 shots from 5 different spots.", duration: "15 min", difficulty: "Easy", category: "Shooting" },
      { id: "1-3", title: "Defensive Slides", description: "Practice lateral defensive slides across the lane. Stay low, keep your hands active, and don't cross your feet. 4 sets of 10 slides each direction.", duration: "8 min", difficulty: "Easy", category: "Defense" },
      { id: "1-4", title: "Layup Lines", description: "Alternate right-hand and left-hand layups from both sides. Focus on proper footwork: right-left for right-hand layups, left-right for left-hand. Make 20 with each hand.", duration: "12 min", difficulty: "Easy", category: "Finishing" },
      { id: "1-5", title: "Jump Rope Conditioning", description: "Basic jump rope intervals to build footwork and conditioning. 30 seconds on, 15 seconds rest. Complete 10 rounds.", duration: "10 min", difficulty: "Easy", category: "Conditioning" },
      { id: "1-6", title: "Chest & Bounce Passes", description: "Partner or wall passing drills. Practice crisp chest passes and bounce passes from various distances. 50 reps of each type.", duration: "10 min", difficulty: "Easy", category: "Passing" },
      { id: "1-7", title: "Triple Threat Position", description: "Practice catching the ball and getting into triple threat stance. Work on jab steps, shot fakes, and rip-throughs from this position. 5 sets of 10 reps.", duration: "10 min", difficulty: "Easy", category: "Footwork" },
      { id: "1-8", title: "Free Throw Routine", description: "Develop a consistent free throw routine. Focus on rhythm, breath, and follow-through. Shoot 50 free throws and track your percentage.", duration: "15 min", difficulty: "Easy", category: "Shooting" },
      { id: "1-9", title: "Pivot Foot Drills", description: "Practice front pivots and reverse pivots from triple threat. Maintain balance and protect the ball. 20 reps each direction with each pivot foot.", duration: "8 min", difficulty: "Easy", category: "Footwork" },
      { id: "1-10", title: "Wall Dribbling", description: "Dribble the ball against a wall at different heights to build finger strength and control. 3 sets of 1 minute with each hand.", duration: "8 min", difficulty: "Easy", category: "Dribbling" },
    ],
  },
  {
    id: 2,
    title: "Intermediate Skills",
    description: "Level up with combo moves, mid-range shooting, and transition play.",
    drills: [
      { id: "2-1", title: "Two-Ball Dribbling", description: "Dribble two basketballs simultaneously. Start with same-time dribbles, then alternate. Walk forward and backward while maintaining control.", duration: "12 min", difficulty: "Medium", category: "Dribbling" },
      { id: "2-2", title: "Pull-Up Jumpers", description: "Practice catching the ball on the move and pulling up for a mid-range jumper. Work from both wings and the elbow. 10 makes from each spot.", duration: "20 min", difficulty: "Medium", category: "Shooting" },
      { id: "2-3", title: "Closeout & Contest", description: "Sprint to close out on a cone or partner, then slide to contain the drive. Focus on choppy steps and active hands. 5 sets of 8 closeouts.", duration: "12 min", difficulty: "Medium", category: "Defense" },
      { id: "2-4", title: "Euro Step Finishes", description: "Practice the Euro step from both sides of the basket. Start slow to nail the footwork, then add speed. 15 makes from each side.", duration: "15 min", difficulty: "Medium", category: "Finishing" },
      { id: "2-5", title: "Suicide Sprints", description: "Full-court suicide sprints: free throw line, half court, far free throw line, full court and back. 6 rounds with 30 seconds rest.", duration: "15 min", difficulty: "Hard", category: "Conditioning" },
      { id: "2-6", title: "Transition Passing", description: "Practice outlet passes and long-court passes while running. Simulate fast-break scenarios with quick, accurate passes ahead.", duration: "12 min", difficulty: "Medium", category: "Passing" },
      { id: "2-7", title: "Hesitation Moves", description: "Master the hesitation dribble to freeze defenders. Practice hesi into crossover, hesi into drive, and hesi pull-up. 10 reps each from both sides.", duration: "12 min", difficulty: "Medium", category: "Dribbling" },
      { id: "2-8", title: "Mid-Range Bank Shots", description: "Practice bank shots from both sides of the lane at 45-degree angles. Focus on aim point on the backboard. 15 makes from each spot.", duration: "15 min", difficulty: "Medium", category: "Shooting" },
      { id: "2-9", title: "Deny & Deflect", description: "Work on denying the wing pass by staying in the passing lane with active hands. Practice deflecting and intercepting passes. 5 sets of 2 minutes.", duration: "12 min", difficulty: "Medium", category: "Defense" },
      { id: "2-10", title: "Reverse Layups", description: "Practice under-the-basket reverse layups from both sides. Focus on using the rim as protection from shot blockers. 15 makes each side.", duration: "15 min", difficulty: "Medium", category: "Finishing" },
    ],
  },
  {
    id: 3,
    title: "Advanced Training",
    description: "Master complex moves, three-point shooting, and advanced defensive concepts.",
    drills: [
      { id: "3-1", title: "Combo Move Attacks", description: "Chain together 3+ dribble moves into an attack sequence: hesitation → crossover → spin → finish. Practice 5 different combos, 10 reps each.", duration: "20 min", difficulty: "Hard", category: "Dribbling" },
      { id: "3-2", title: "Catch & Shoot Threes", description: "Simulate game-speed catch-and-shoot threes. Sprint to a spot, receive a pass (or toss to yourself), and shoot. 100 attempts from 5 spots.", duration: "25 min", difficulty: "Hard", category: "Shooting" },
      { id: "3-3", title: "Help & Recover Defense", description: "Practice rotating to help on drives, then recovering to your man. Work on communication and positioning. 4 sets of 5 minutes.", duration: "20 min", difficulty: "Hard", category: "Defense" },
      { id: "3-4", title: "Floater Package", description: "Develop a floater from multiple angles. Practice off one foot and two feet, from the lane and outside it. 15 makes from each angle.", duration: "18 min", difficulty: "Hard", category: "Finishing" },
      { id: "3-5", title: "Agility Ladder + Sprints", description: "Combine agility ladder patterns with sprint-outs. Focus on quick feet transitioning into explosive speed. 8 rounds.", duration: "15 min", difficulty: "Hard", category: "Conditioning" },
      { id: "3-6", title: "Read & React Passing", description: "Make passing decisions based on defensive reads. Practice skip passes, pocket passes, and lob passes in decision-making scenarios.", duration: "15 min", difficulty: "Hard", category: "Passing" },
      { id: "3-7", title: "In-and-Out Crossover", description: "Master the in-and-out fake into a sharp crossover. Attack both directions off the move. 15 reps each side at game speed.", duration: "12 min", difficulty: "Hard", category: "Dribbling" },
      { id: "3-8", title: "Spot-Up Shooting Under Fatigue", description: "Run a sprint between each set of 5 three-pointers. Simulate shooting when tired in late-game situations. 60 total attempts.", duration: "20 min", difficulty: "Hard", category: "Shooting" },
      { id: "3-9", title: "Pick & Roll Defense", description: "Practice hedging, switching, and dropping in pick-and-roll coverage. Communicate screens and recover to shooters. 5 sets of 4 minutes.", duration: "20 min", difficulty: "Hard", category: "Defense" },
      { id: "3-10", title: "Power Finishes", description: "Attack the basket and finish strong with two-foot power layups through contact. Use a pad for resistance. 20 makes each side.", duration: "15 min", difficulty: "Hard", category: "Finishing" },
    ],
  },
  {
    id: 4,
    title: "Pro Elite",
    description: "Train like the pros with elite-level drills used by professional players.",
    drills: [
      { id: "4-1", title: "Full-Speed Handle Gauntlet", description: "Navigate through a course of cones at full speed using advanced handles. Tight crossovers, behind-the-back, and between-the-legs at game speed. Timed runs.", duration: "15 min", difficulty: "Hard", category: "Dribbling" },
      { id: "4-2", title: "Off-the-Dribble Threes", description: "Create your own three-point shot off the dribble. Step-back threes, side-step threes, and pull-up threes. 20 makes from each type.", duration: "30 min", difficulty: "Hard", category: "Shooting" },
      { id: "4-3", title: "1-on-1 Lockdown", description: "Full-speed 1-on-1 defensive possessions. Focus on staying in front, forcing tough shots, and contesting everything. 20 possessions.", duration: "20 min", difficulty: "Hard", category: "Defense" },
      { id: "4-4", title: "Contact Finishes", description: "Practice finishing through contact at the rim. Use a pad or partner to simulate game physicality. Work on and-one finishes.", duration: "20 min", difficulty: "Hard", category: "Finishing" },
      { id: "4-5", title: "Pro Conditioning Circuit", description: "Full-court sprints, defensive slides, backpedals, and jump sequences. Non-stop for 5 minutes, rest 2 minutes. 4 rounds.", duration: "28 min", difficulty: "Hard", category: "Conditioning" },
      { id: "4-6", title: "Full-Court Vision Passing", description: "Run full-court scenarios making elite-level reads and passes. Behind-the-back, no-look, and one-hand skip passes at full speed.", duration: "18 min", difficulty: "Hard", category: "Passing" },
      { id: "4-7", title: "Shamgod & Advanced Handles", description: "Master elite handles like the Shamgod, wrap-around, and through-the-legs spin move. 10 reps each move at full speed.", duration: "15 min", difficulty: "Hard", category: "Dribbling" },
      { id: "4-8", title: "Contested Shot Making", description: "Shoot with a hand in your face from all three levels. Develop the ability to score over length and closeouts. 80 total attempts.", duration: "25 min", difficulty: "Hard", category: "Shooting" },
      { id: "4-9", title: "Full-Court Press Break", description: "Practice breaking full-court pressure with quick decision-making, passing under duress, and finding the open man. 10 possessions.", duration: "15 min", difficulty: "Hard", category: "Defense" },
      { id: "4-10", title: "Acrobatic Finishes", description: "Practice circus finishes: scoop layups, finger rolls, up-and-unders, and wrong-foot layups at game speed. 15 makes of each type.", duration: "20 min", difficulty: "Hard", category: "Finishing" },
    ],
  },
];
