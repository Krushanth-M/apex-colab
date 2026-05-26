import { useState, useEffect } from 'react';
import BootScreen from './components/BootScreen';
import FluidBackground from './components/FluidBackground';
import Sidebar from './components/Sidebar';
import AIChat from './components/AIChat';
import Toast from './components/Toast';

// Views
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import TeamBuilder from './views/TeamBuilder';
import VirtualRooms from './views/VirtualRooms';
import StartupHub from './views/StartupHub';
import HackathonPortal from './views/HackathonPortal';
import MentorConnect from './views/MentorConnect';
import AITools from './views/AITools';
import Leaderboard from './views/Leaderboard';
import Analytics from './views/Analytics';
import { InvestorDashboard, InvestorStartups, InvestorAIMatches } from './views/InvestorHub';

import { CURRENT_USER } from './mockData';

export default function App() {
  const [lightMode, setLightMode] = useState(() => {
    return localStorage.getItem('apex-light-mode') === 'true';
  });

  // Restore accessibility preferences immediately before first render
  useState(() => {
    const rm = localStorage.getItem('apex-reduce-motion') === 'true';
    const hc = localStorage.getItem('apex-high-contrast') === 'true';
    if (rm) document.documentElement.classList.add('reduce-motion');
    if (hc) document.documentElement.classList.add('high-contrast');
  });

  useEffect(() => {
    if (lightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem('apex-light-mode', lightMode);
  }, [lightMode]);

  const [booting, setBooting] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tab, setTab] = useState('dashboard');
  const [roleMode, setRoleMode] = useState('maker');
  const [toasts, setToasts] = useState([
    { id: 1, type: 'info', text: 'Welcome to Apex Colab! Use the Apex AI co-pilot helper in the bottom left at any time.' }
  ]);

  const addToast = (text, type = 'info') => {
    const newToast = { id: Date.now(), text, type };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogin = (userData) => {
    if (userData?.role) setRoleMode(userData.role);
    if (userData?.role === 'investor') setTab('investor-dashboard');
    else setTab('dashboard');
    setIsAuthenticated(true);
    addToast(`Welcome back, Krushanth M! Entered as ${userData?.role === 'investor' ? 'Investor' : 'Maker'}.`, 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    addToast('Logged out of Apex Colab.', 'info');
  };

  if (booting) {
    return <BootScreen onComplete={() => setBooting(false)} />;
  }

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      background: '#020202',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0px',
      boxSizing: 'border-box'
    }}>
      {/* Dynamic fluid particle background */}
      <FluidBackground />

      {!isAuthenticated ? (
        <div style={{ zIndex: 10, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Auth onLogin={handleLogin} />
        </div>
      ) : (
        /* Full Screen Container */
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 10,
          background: 'var(--bg)'
        }}>
          {/* Navigation Sidebar */}
          <Sidebar tab={tab} setTab={setTab} user={CURRENT_USER} onLogout={handleLogout} roleMode={roleMode} lightMode={lightMode} setLightMode={setLightMode} />

          {/* Core Content Area */}
          <main style={{
            flex: 1,
            height: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 5,
            boxSizing: 'border-box'
          }}>
            {tab === 'dashboard' && <Dashboard />}
            {tab === 'profile' && <Profile />}
            {tab === 'team' && <TeamBuilder />}
            {tab === 'rooms' && <VirtualRooms />}
            {tab === 'startup' && <StartupHub />}
            {tab === 'hackathon' && <HackathonPortal />}
            {tab === 'mentor' && <MentorConnect />}
            {tab === 'aitools' && <AITools />}
            {tab === 'leaderboard' && <Leaderboard />}
            {tab === 'analytics' && <Analytics />}
            {tab === 'investor-dashboard' && <InvestorDashboard setTab={setTab} />}
            {tab === 'investor-startups' && <InvestorStartups />}
            {tab === 'investor-ai-matches' && <InvestorAIMatches />}
          </main>

          {/* Conversation AI copilot */}
          <AIChat />
        </div>
      )}

      {/* Global notifications Stack */}
      <Toast toasts={toasts} dismiss={removeToast} />
    </div>
  );
}
