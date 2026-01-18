
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const tabs = [
    { id: AppTab.DASHBOARD, label: 'Dashboard', icon: '📊' },
    { id: AppTab.TRANSACTIONS, label: 'Transactions', icon: '💸' },
    { id: AppTab.BUDGETS, label: 'Budgets', icon: '🎯' },
    { id: AppTab.ADVISOR, label: 'AI Advisor', icon: '🤖' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 space-y-8 sticky top-0 h-screen">
        <div className="flex items-center space-x-2 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">G</span>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">FinancePro</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id 
                ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white">
            <p className="text-sm opacity-90">Powered by</p>
            <p className="font-bold">Gemini 3 Pro</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800">
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <span className="text-xl">🔔</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
               <img src="https://picsum.photos/seed/user123/100/100" alt="Avatar" />
            </div>
          </div>
        </header>
        
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Nav - Bottom Sticky */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 rounded-lg ${
              activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
