# 🏆 Apex Colab — Neural Student Innovation Ecosystem

**Apex Colab** is an immersive, highly interactive, and futuristic digital innovation platform centered around a premium **glowing Light Gold & Charcoal Black cyber-academic theme**, structured inside a responsive laptop-ratio viewport container.

Designed to serve as a complete co-working and startup hub, Apex Colab empowers student builders to network, form teams across universities, validate ideas, manage hackathons, and accelerate their startup concepts using live artificial intelligence.

---

## 🎨 Design System: "Liquid Intelligence"

The visual theme is custom-crafted using vanilla CSS variables to form a gorgeous glassmorphism environment that behaves like a breathing neural network:
* **The Color Palette**: Champagne Gold gradients (`#f3e5ab` to `#aa7c11`), warm gold borders (`rgba(212,175,55,0.42)`), and metallic deep charcoal backgrounds (`#020202`).
* **Visual FX**: Concentric cyber radar sweeps, blurred backdrops (40px blur), pulsing indicators, and subtle floating keyframes.
* **Dynamic Fluid Background**: Canvas-rendered butterfly orbit mathematics with 180 active particles, constellation node connection paths, repulsion vector responses, and dot-matrix grid layouts.

---

## 🧬 Advanced Core Features

### 1. 🔐 High-Security Entry Portal (`src/views/Auth.jsx`)
Apex Colab implements a multi-channel authentications gate with simulated biometrics and real database syncs:
* **🧬 Biometric Face Scanner**: Circular biometric camera sweeps with a vertical gold scanline and dynamic grid node tracking. Emits high-frequency sonar pings synthesized using the **Web Audio API** (`OscillatorNode`).
* **📧 Gmail Multi-Factor OTP Verification**: Intercepts sign-ins to open a dark frosted MFA modal. Auto-forwards cursor focus across 4 digits, provides resend countdown timers, and supports instant testing bypass via code `1234`.
* **🌐 Google Sign-In Selector**: Pre-populated accounts chooser highlighting developer credentials (**Krushanth M**, student at **Rathinam Institute of technology**).
* **🗄️ Supabase Cloud Write**: Captures structured registrations (Full Name, Age, Gender, Skills, College, Gmail, and Password) and stores them directly to the Supabase database users table. Falls back to a local secure sandbox if keys are unconfigured.

### 2. 🤖 Live Google Gemini 2.5 Flash Co-Pilot (`src/components/AIChat.jsx`)
A direct frontend integration with Google's generative AI:
* **🔑 Custom API Key**: Input a masked Gemini API Key inside **My Profile -> Settings & Accessibility**. Values write securely directly to client `localStorage` under `'apex-gemini-key'`.
* **💡 Real-Time co-pilot**: Queries the live Google Gemini 2.5 Flash API directly using pure CORS-friendly fetch hooks. Includes a pulsing 3-dot thinking animation and dynamic markdown rendering.
* **🛡️ Smart Fallback Engine**: If no API key is supplied, a keyword-tailored sandbox intelligence handles student productivity prompts (idea pitching, teammate matching, milestones, sentiment scoring).

### 3. 🎬 macOS Boot Sequence (`src/components/BootScreen.jsx`)
* Displays a giant centered `"APEX"` Space Grotesk text with an organic glow and thin progress bar.
* Synthesizes a rich, G-Major/C-Major decaying startup chord overlaid with triangle wave resonance using the Web Audio API.

### 4. ⚡ Accessibility & Hardware Control (`src/views/Profile.jsx`)
* **Reduce Motion**: Disables ambient canvas particles and slow CSS floating animations for low-end hardware.
* **High Contrast Mode**: Instantly swaps dark gold layouts for a clean, sharp high-contrast ivory-light template.

---

## 🛠️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone & Scaffold
Clone the repository and install all dependencies:
```bash
# Navigate to project directory
cd nexuscampus

# Install production dependencies (react, lucide-react, supabase)
npm install
```

### 2. Start the Development Server
Launch the Vite hot-module-reload server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) inside your web browser.

### 3. Build for Production
To compile a minimized, hardware-optimized production bundle:
```bash
npm run build
```
Assets are successfully compiled inside the `dist/` directory.

---

## ⚙️ Project File Directory Layout

```yaml
nexuscampus/
├── dist/                   # Minified Production Build Assets
├── src/
│   ├── assets/             # Brand logos & static vectors
│   ├── components/
│   │   ├── AIChat.jsx      # Live Google Gemini Chat co-pilot with thinking state
│   │   ├── BootScreen.jsx  # macOS-style Boot screen & Audio chimes
│   │   ├── FluidBackground.jsx # HTML5 Canvas constellation butterfly orbit
│   │   ├── Sidebar.jsx     # Navigation sidebar with dynamic initial calculators
│   │   └── Toast.jsx       # Alert notification stack controller
│   ├── views/
│   │   ├── Auth.jsx        # Login, Face Scanner, Gmail OTP, Supabase registrations
│   │   ├── Dashboard.jsx   # Networking feed, XP tracks, and contribution heatmap
│   │   ├── Profile.jsx     # Accessibility Settings, Gemini Keys, and Resume Builders
│   │   ├── TeamBuilder.jsx # Role matchmaking & college-collaborative squads
│   │   ├── StartupHub.jsx  # Pitch simulator, Equity Calculators, Novelty Scanners
│   │   ├── HackathonPortal.jsx # Registered milestones & achievements trophy wall
│   │   ├── AITools.jsx     # Project scorers, sentiment logs & velocity engines
│   │   ├── Leaderboard.jsx # Gamified daily streaks, claimable bounties & rankings
│   │   ├── MentorConnect.jsx # Video session calendars & alumni directory lists
│   │   └── Analytics.jsx   # Donut status graphs, committing stats & PDF reports
│   ├── App.jsx             # Shell wrapper, viewport aspect frames & state routers
│   ├── index.css           # Premium Gold & Black design system declarations
│   ├── mockData.js         # Unified profiles & timelines repository
│   ├── supabase.js         # Supabase Client SDK connections
│   └── gemini.js           # Google Gemini Generative fetch hook
├── index.html              # Custom SVG golden icon & web fonts header
├── package.json            # Node project configuration
└── README.md               # Documentation guide (this file)
```

---

## ⚡ Active Developer Signature
* **Student Developer**: Krushanth M
* **Academic Institution**: Rathinam Institute of technology
* **Department & Year**: Computer Science · 3rd Year
* **Default Avatar**: `KM` (Krushanth M)
* **Registered Email**: `krushanth.m@rathinam.in`
