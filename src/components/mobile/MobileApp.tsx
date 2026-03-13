import { useState } from 'react';
import { Home, Briefcase, FolderOpen, User, Mail } from 'lucide-react';
import MobileHome from './MobileHome';
import MobileServices from './MobileServices';
import MobilePortfolio from './MobilePortfolio';
import MobileAbout from './MobileAbout';
import MobileContact from './MobileContact';

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { id: 'about', label: 'About', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 text-gray-900 font-sans overflow-hidden">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative">
        {activeTab === 'home' && <MobileHome setActiveTab={setActiveTab} />}
        {activeTab === 'services' && <MobileServices />}
        {activeTab === 'portfolio' && <MobilePortfolio />}
        {activeTab === 'about' && <MobileAbout />}
        {activeTab === 'contact' && <MobileContact />}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-4 pb-safe flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive ? 'bg-maroon/5 text-maroon' : 'text-gray-400 hover:text-gray-600'
              }`}
              style={{ minWidth: '60px' }}
            >
              <Icon
                className={`w-5 h-5 mb-1 transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-maroon font-bold' : ''
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
