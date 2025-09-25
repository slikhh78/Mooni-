
import React, { useState, useCallback } from 'react';
import { NavView, DreamEntry, SleepData } from './types';
import { Moon, Bed, Headphones, BrainCircuit, BookOpen } from 'lucide-react';

import Dashboard from './components/Dashboard';
import SleepSounds from './components/SleepSounds';
import SleepTracker from './components/SleepTracker';
import AiCoach from './components/AiCoach';
import DreamJournal from './components/DreamJournal';

const StarryBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-white rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          animation: `twinkle ${Math.random() * 5 + 3}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavView>(NavView.Dashboard);
  const [dreamEntries, setDreamEntries] = useState<DreamEntry[]>([]);
  const [sleepData, setSleepData] = useState<SleepData | null>(null);

  const handleAddDreamEntry = (entry: DreamEntry) => {
    setDreamEntries(prev => [entry, ...prev]);
    setCurrentView(NavView.Dashboard);
  };
  
  const handleSleepSessionComplete = useCallback((data: SleepData) => {
    setSleepData(data);
    setCurrentView(NavView.AiCoach);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case NavView.Dashboard:
        return <Dashboard sleepData={sleepData} />;
      case NavView.Sounds:
        return <SleepSounds />;
      case NavView.Sleep:
        return <SleepTracker onSessionComplete={handleSleepSessionComplete} />;
      case NavView.AiCoach:
        return <AiCoach sleepData={sleepData} />;
      case NavView.Journal:
        return <DreamJournal onAddEntry={handleAddDreamEntry} />;
      default:
        return <Dashboard sleepData={sleepData} />;
    }
  };

  const NavItem: React.FC<{
    view: NavView;
    icon: React.ReactNode;
    label: string;
  }> = ({ view, icon, label }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center w-full transition-colors duration-300 ${
        currentView === view ? 'text-lunar-gold' : 'text-lavender-mist hover:text-white'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  return (
    <div className="bg-deep-purple text-lavender-mist min-h-screen font-sans flex flex-col">
      <StarryBackground />
      <main className="flex-grow container mx-auto p-4 sm:p-6 pb-24">
        {renderView()}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-space-cadet/80 backdrop-blur-lg border-t border-celestial-blue/30 shadow-lg">
        <div className="container mx-auto flex justify-around items-center h-16">
          <NavItem view={NavView.Dashboard} icon={<Moon size={24} />} label="Home" />
          <NavItem view={NavView.Sounds} icon={<Headphones size={24} />} label="Sounds" />
          <NavItem view={NavView.Sleep} icon={<Bed size={24} />} label="Sleep" />
          <NavItem view={NavView.AiCoach} icon={<BrainCircuit size={24} />} label="Coach" />
          <NavItem view={NavView.Journal} icon={<BookOpen size={24} />} label="Journal" />
        </div>
      </nav>
    </div>
  );
};

export default App;
