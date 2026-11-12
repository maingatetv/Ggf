import React from 'react';
import { AppTab, UnlockedState } from '../../types/index.ts';
import { Home, ShieldAlert, Sparkles, Building, Video, Unlock, RotateCcw } from 'lucide-react';

interface HeaderNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  unlocked: UnlockedState;
  onResetUnlocks: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  onTabChange,
  unlocked,
  onResetUnlocks,
}) => {
  const tabs = [
    {
      id: 'house-generator' as AppTab,
      name: 'Oskayi House Generated',
      shortName: 'House Plans',
      icon: Home,
      price: '$35',
      badgeColor: 'border-amber-400/40 text-amber-500 bg-amber-50/50',
      activeColor: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20',
    },
    {
      id: 'cost-killer' as AppTab,
      name: 'Oskayi House Cost Killer',
      shortName: 'Cost Killer',
      icon: ShieldAlert,
      price: '2% Fee',
      badgeColor: 'border-red-400/40 text-red-500 bg-red-50/50',
      activeColor: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/20',
    },
    {
      id: 'renovation' as AppTab,
      name: 'Before & After Renovation',
      shortName: 'Renovation AI',
      icon: Sparkles,
      price: '$15',
      badgeColor: 'border-amber-400/40 text-amber-500 bg-amber-50/50',
      activeColor: 'bg-gradient-to-r from-neutral-900 to-amber-950 text-amber-400 border border-amber-500/40 shadow-md',
    },
    {
      id: 'smart-city' as AppTab,
      name: 'Smart City Planner',
      shortName: 'Smart City',
      icon: Building,
      price: '$500',
      badgeColor: 'border-sky-400/40 text-sky-600 bg-sky-50/50',
      activeColor: 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md shadow-sky-600/20',
    },
    {
      id: 'influencer-clone' as AppTab,
      name: 'AI Influencer Clone',
      shortName: 'Influencer Clone',
      icon: Video,
      price: '$30/mo',
      badgeColor: 'border-pink-400/40 text-pink-600 bg-pink-50/50',
      activeColor: 'bg-gradient-to-r from-pink-600 to-rose-700 text-white shadow-md shadow-pink-600/20',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Top brand line */}
        <div className="py-2.5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-black text-sm shadow-sm">
              O
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">OSKAYI CONSULT</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold border border-amber-300">
                  AI Engineering Suite
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                All Transactions in USD via Paystack • Instant Automated Architectural Delivery
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onResetUnlocks}
              title="Reset all unlocked states for testing"
              className="text-[11px] text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Paywalls</span>
            </button>
            <div className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>USD ONLY</span>
            </div>
          </div>
        </div>

        {/* 5 App Tabs Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isUnlocked = unlocked[tab.id];

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? tab.activeColor
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-current' : 'text-slate-500'}`} />
                <span>{tab.shortName}</span>
                {isUnlocked ? (
                  <span className="inline-flex items-center text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold ml-1">
                    <Unlock className="w-2.5 h-2.5 mr-0.5" /> Unlocked
                  </span>
                ) : (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 border rounded-md font-medium ml-1 ${
                      isActive ? 'bg-white/20 text-white border-white/30' : tab.badgeColor
                    }`}
                  >
                    {tab.price}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
