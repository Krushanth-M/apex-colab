// ══════════════════════════════════════
// Apex Colab — Realistic Mock Data
// ══════════════════════════════════════

export const CURRENT_USER = {
  id: 1,
  name: 'Krushanth M',
  email: 'krushanth.m@rathinam.in',
  college: 'Rathinam Institute of technology',
  dept: 'Computer Science',
  year: 3,
  role: 'student',
  avatar: 'KM',
  xp: 3480,
  xpNext: 4000,
  level: 12,
  streak: 14,
  rank: 7,
  campusRank: 2,
  skills: ['React', 'Python', 'TensorFlow', 'Node.js', 'PostgreSQL', 'Docker'],
  skillScores: { React: 92, Python: 88, TensorFlow: 74, 'Node.js': 85, PostgreSQL: 70, Docker: 65 },
  badges: ['🚀 Early Builder', '🧠 AI Pioneer', '🏆 Hackathon Winner', '⭐ Top Mentor', '🔥 14-Day Streak', '💡 Idea Validator'],
  bio: 'Building AI tools for campus innovation. Looking for designers and PMs for my startup idea.',
  github: 'krushanthm',
  linkedIn: 'krushanth-m-rathinam',
  openToTeam: true,
  lookingFor: ['Designer', 'Product Manager'],
  startups: [1],
};

export const STUDENTS = [
  { id: 2, name: 'Priya Sharma', college: 'NIT Trichy',    dept: 'Design',           year: 2, skills: ['Figma', 'UI/UX', 'Illustration'], role: 'Designer',     xp: 2900, level: 10, avatar: 'PS', openToTeam: true,  match: 94 },
  { id: 3, name: 'Rohan Gupta',  college: 'IIT Delhi',     dept: 'CS',               year: 4, skills: ['Flutter', 'Dart', 'Firebase'],    role: 'Developer',    xp: 4200, level: 14, avatar: 'RG', openToTeam: true,  match: 89 },
  { id: 4, name: 'Sneha Rao',    college: 'BITS Pilani',   dept: 'Management',       year: 3, skills: ['Marketing', 'SEO', 'Analytics'],  role: 'Marketing',    xp: 2100, level: 8,  avatar: 'SR', openToTeam: true,  match: 87 },
  { id: 5, name: 'Dev Kapoor',   college: 'IIT Bombay',    dept: 'Finance',          year: 4, skills: ['Finance', 'Pitch Decks', 'Excel'],role: 'Finance',      xp: 1800, level: 7,  avatar: 'DK', openToTeam: false, match: 82 },
  { id: 6, name: 'Ananya Singh', college: 'VIT Vellore',   dept: 'AI/ML',            year: 3, skills: ['PyTorch', 'NLP', 'CV'],           role: 'AI Engineer',  xp: 3600, level: 13, avatar: 'AS', openToTeam: true,  match: 91 },
  { id: 7, name: 'Kiran Patel',  college: 'IIIT Hyderabad',dept: 'Cybersecurity',    year: 2, skills: ['Security', 'Blockchain', 'Rust'], role: 'Developer',    xp: 2400, level: 9,  avatar: 'KP', openToTeam: true,  match: 78 },
  { id: 8, name: 'Meera Nair',   college: 'IIT Madras',    dept: 'CS',               year: 4, skills: ['Go', 'Kubernetes', 'AWS'],        role: 'DevOps',       xp: 3900, level: 13, avatar: 'MN', openToTeam: true,  match: 85 },
];

export const HACKATHONS = [
  { id: 1, name: 'AI4Good Hackathon 2026', host: 'Google', date: '2026-06-14', deadline: '2026-06-07', prize: '₹5,00,000', tags: ['AI', 'Social Impact'], status: 'open', teams: 342, maxTeam: 4, mode: 'Online', icon: '🤖' },
  { id: 2, name: 'Smart India Hackathon',  host: 'Govt of India', date: '2026-07-01', deadline: '2026-06-20', prize: '₹1,00,000', tags: ['Gov-Tech', 'Nation'], status: 'open', teams: 1204, maxTeam: 6, mode: 'Offline', icon: '🇮🇳' },
  { id: 3, name: 'FinTech Forge 2026',     host: 'Razorpay', date: '2026-06-28', deadline: '2026-06-15', prize: '₹3,00,000', tags: ['FinTech', 'Web3'], status: 'open', teams: 218, maxTeam: 4, mode: 'Hybrid', icon: '💸' },
  { id: 4, name: 'ClimateHack',            host: 'Microsoft', date: '2026-05-10', deadline: '2026-04-28', prize: '₹2,50,000', tags: ['Climate', 'Sustainability'], status: 'ended', teams: 890, maxTeam: 5, mode: 'Online', icon: '🌍' },
  { id: 5, name: 'HealthTech Sprint',       host: 'Apollo', date: '2026-07-20', deadline: '2026-07-10', prize: '₹4,00,000', tags: ['HealthTech', 'AI'], status: 'upcoming', teams: 0, maxTeam: 4, mode: 'Hybrid', icon: '🏥' },
];

export const STARTUPS = [
  { id: 1, name: 'MindMap AI', tagline: 'AI-powered personalized learning paths for students', founder: 'Krushanth M', college: 'Rathinam Institute of technology', stage: 'MVP', score: 87, tags: ['EdTech', 'AI'], upvotes: 142, feasibility: 82, market: '₹2,400Cr', milestone: 65, funded: false },
  { id: 2, name: 'CampusKart', tagline: 'Hyperlocal delivery marketplace within college campuses', founder: 'Priya Sharma', college: 'NIT Trichy', stage: 'Seed', score: 91, tags: ['Logistics', 'Marketplace'], upvotes: 214, feasibility: 88, market: '₹800Cr', milestone: 80, funded: true },
  { id: 3, name: 'LearnSync',  tagline: 'Real-time collaborative coding editor for students', founder: 'Rohan Gupta', college: 'IIT Delhi', stage: 'Prototype', score: 74, tags: ['EdTech', 'Dev Tools'], upvotes: 98, feasibility: 76, market: '₹1,100Cr', milestone: 40, funded: false },
  { id: 4, name: 'GreenGrid',  tagline: 'Campus energy monitoring and optimization via IoT', founder: 'Dev Kapoor', college: 'IIT Bombay', stage: 'Idea', score: 68, tags: ['CleanTech', 'IoT'], upvotes: 67, feasibility: 70, market: '₹650Cr', milestone: 20, funded: false },
  { id: 5, name: 'HireLocal',  tagline: 'AI matchmaking between students and local SME internships', founder: 'Sneha Rao', college: 'BITS Pilani', stage: 'Seed', score: 93, tags: ['HRTech', 'AI'], upvotes: 301, feasibility: 90, market: '₹3,200Cr', milestone: 90, funded: true },
];

export const MENTORS = [
  { id: 1, name: 'Dr. Anand Kumar', role: 'Prof. of CS', org: 'IIT Bombay', expertise: ['AI', 'ML', 'Research'], rating: 4.9, sessions: 312, available: true, slots: ['Mon 4pm', 'Wed 2pm', 'Fri 3pm'] },
  { id: 2, name: 'Nisha Verma',     role: 'Product Lead', org: 'Swiggy',     expertise: ['Product', 'UX', 'Growth'], rating: 4.8, sessions: 189, available: true, slots: ['Tue 6pm', 'Thu 5pm'] },
  { id: 3, name: 'Rahul Bose',      role: 'CTO',         org: 'Zepto',      expertise: ['Engineering', 'System Design', 'Scale'], rating: 4.7, sessions: 97, available: false, slots: [] },
  { id: 4, name: 'Kavitha R.',      role: 'VC Partner',  org: 'Peak XV',    expertise: ['Funding', 'Pitch', 'GTM'], rating: 4.9, sessions: 54, available: true, slots: ['Sat 10am', 'Sat 12pm'] },
  { id: 5, name: 'Arjun Malhotra',  role: 'Alumni SDE',  org: 'Google',     expertise: ['FAANG Prep', 'DSA', 'Interviews'], rating: 4.6, sessions: 421, available: true, slots: ['Mon 8pm', 'Wed 8pm', 'Sun 11am'] },
];

export const LEADERBOARD = [
  { rank: 1,  name: 'Kiran Patel',  college: 'IIIT Hyd', xp: 6200, badges: 18, streak: 32, avatar: 'KP', color: '#fbbf24' },
  { rank: 2,  name: 'Meera Nair',   college: 'IIT Madras', xp: 5800, badges: 15, streak: 28, avatar: 'MN', color: '#94a3b8' },
  { rank: 3,  name: 'Ananya Singh', college: 'VIT Vellore', xp: 5400, badges: 14, streak: 21, avatar: 'AS', color: '#cd7c3a' },
  { rank: 4,  name: 'Rohan Gupta',  college: 'IIT Delhi', xp: 4900, badges: 12, streak: 18, avatar: 'RG', color: '#7c3aed' },
  { rank: 5,  name: 'Dev Kapoor',   college: 'IIT Bombay', xp: 4500, badges: 11, streak: 15, avatar: 'DK', color: '#06b6d4' },
  { rank: 6,  name: 'Priya Sharma', college: 'NIT Trichy', xp: 4100, badges: 10, streak: 12, avatar: 'PS', color: '#ec4899' },
  { rank: 7,  name: 'Krushanth M',  college: 'Rathinam Institute of technology', xp: 3480, badges: 9,  streak: 14, avatar: 'KM', color: '#10b981' },
  { rank: 8,  name: 'Sneha Rao',    college: 'BITS Pilani', xp: 3200, badges: 8,  streak: 9, avatar: 'SR', color: '#f59e0b' },
];

export const VIRTUAL_ROOMS = [
  { id: 1, name: 'Deep Work Den', theme: '🌿', members: ['AM', 'PS', 'RG'], capacity: 6, mode: 'Pomodoro 25/5', timer: '14:22', active: true },
  { id: 2, name: 'Code Sprint',   theme: '💻', members: ['AS', 'KP'],       capacity: 8, mode: 'Pomodoro 50/10', timer: '38:05', active: true },
  { id: 3, name: 'Design Review', theme: '🎨', members: ['MN', 'SR', 'DK'], capacity: 5, mode: 'Open Session',   timer: 'Live',  active: true },
  { id: 4, name: 'Pitch Prep',    theme: '🚀', members: [],                  capacity: 4, mode: 'Pomodoro 25/5', timer: '--:--', active: false },
];

export const BOUNTIES = [
  { id: 1, title: 'Fix responsive layout bug on Team Builder page', xp: 120, tags: ['React', 'CSS'], poster: 'MN', deadline: '2d', difficulty: 'Easy' },
  { id: 2, title: 'Train classifier for startup success prediction model', xp: 450, tags: ['ML', 'Python'], poster: 'RG', deadline: '5d', difficulty: 'Hard' },
  { id: 3, title: 'Design pitch deck template for ClimaTech startups', xp: 200, tags: ['Design', 'Figma'], poster: 'AS', deadline: '3d', difficulty: 'Medium' },
  { id: 4, title: 'Write technical blog on Vector DB for campus wiki', xp: 80, tags: ['Writing', 'AI'], poster: 'KP', deadline: '7d', difficulty: 'Easy' },
  { id: 5, title: 'Build Discord bot for hackathon deadline reminders', xp: 300, tags: ['Node.js', 'Bot'], poster: 'DK', deadline: '4d', difficulty: 'Medium' },
];

export const SKILL_GAPS = [
  { skill: 'System Design', importance: 95, current: 40, course: 'System Design for Engineers — Educative.io' },
  { skill: 'Docker & K8s',  importance: 88, current: 65, course: 'Docker Mastery — Udemy' },
  { skill: 'DSA Advanced',  importance: 85, current: 55, course: 'LeetCode Premium + NeetCode' },
  { skill: 'Product Sense', importance: 80, current: 30, course: 'Reforge Product Strategy' },
  { skill: 'AWS Cloud',     importance: 78, current: 50, course: 'AWS Solutions Architect — A Cloud Guru' },
];

export const ACTIVITY_FEED = [
  { id: 1, type: 'match',    text: 'AI matched you with Priya Sharma for Team Builder', time: '2m ago',  icon: '🤝', color: '#7c3aed' },
  { id: 2, type: 'hackathon',text: 'AI4Good Hackathon registration closes in 7 days',   time: '1h ago',  icon: '⚡', color: '#f59e0b' },
  { id: 3, type: 'xp',       text: 'You earned +120 XP for completing a bounty',        time: '3h ago',  icon: '⭐', color: '#10b981' },
  { id: 4, type: 'idea',     text: 'Your startup "MindMap AI" got 12 new upvotes',      time: '5h ago',  icon: '💡', color: '#06b6d4' },
  { id: 5, type: 'mentor',   text: 'Dr. Anand Kumar confirmed your session for Mon 4pm',time: '1d ago',  icon: '📅', color: '#ec4899' },
  { id: 6, type: 'badge',    text: 'New badge earned: 🔥 14-Day Streak!',               time: '1d ago',  icon: '🏅', color: '#fbbf24' },
];

export const CONTRIBUTION_HEATMAP = (() => {
  const data = [];
  for (let w = 0; w < 26; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const val = Math.random();
      week.push(val < 0.3 ? 0 : val < 0.55 ? 1 : val < 0.75 ? 2 : val < 0.9 ? 3 : 4);
    }
    data.push(week);
  }
  return data;
})();
