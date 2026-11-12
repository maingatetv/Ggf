/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppTab, UnlockedState } from './types/index.ts';
import { HeaderNav } from './components/common/HeaderNav.tsx';
import { OskayiFooter } from './components/common/OskayiFooter.tsx';
import { HouseGeneratorApp } from './components/house/HouseGeneratorApp.tsx';
import { CostKillerApp } from './components/costkiller/CostKillerApp.tsx';
import { RenovationApp } from './components/renovation/RenovationApp.tsx';
import { SmartCityApp } from './components/smartcity/SmartCityApp.tsx';
import { InfluencerCloneApp } from './components/influencer/InfluencerCloneApp.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('house-generator');

  // Persistence for unlocked paywall states (can be reset anytime via reset button)
  const [unlocked, setUnlocked] = useState<UnlockedState>(() => {
    try {
      const saved = localStorage.getItem('oskayi_unlocked_apps');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      'house-generator': false,
      'cost-killer': false,
      'renovation': false,
      'smart-city': false,
      'influencer-clone': false,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('oskayi_unlocked_apps', JSON.stringify(unlocked));
    } catch {
      // ignore
    }
  }, [unlocked]);

  const handleUnlock = (tab: AppTab) => {
    setUnlocked((prev) => ({
      ...prev,
      [tab]: true,
    }));
  };

  const handleResetUnlocks = () => {
    setUnlocked({
      'house-generator': false,
      'cost-killer': false,
      'renovation': false,
      'smart-city': false,
      'influencer-clone': false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white">
      {/* Top Header Navigation */}
      <HeaderNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unlocked={unlocked}
        onResetUnlocks={handleResetUnlocks}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'house-generator' && (
          <HouseGeneratorApp
            isUnlocked={unlocked['house-generator']}
            onUnlock={() => handleUnlock('house-generator')}
          />
        )}

        {activeTab === 'cost-killer' && (
          <CostKillerApp
            isUnlocked={unlocked['cost-killer']}
            onUnlock={() => handleUnlock('cost-killer')}
          />
        )}

        {activeTab === 'renovation' && (
          <RenovationApp
            isUnlocked={unlocked['renovation']}
            onUnlock={() => handleUnlock('renovation')}
          />
        )}

        {activeTab === 'smart-city' && (
          <SmartCityApp
            isUnlocked={unlocked['smart-city']}
            onUnlock={() => handleUnlock('smart-city')}
          />
        )}

        {activeTab === 'influencer-clone' && (
          <InfluencerCloneApp
            isUnlocked={unlocked['influencer-clone']}
            onUnlock={() => handleUnlock('influencer-clone')}
          />
        )}
      </main>

      {/* Statutory Ghanaian KYC Footer */}
      <OskayiFooter />
    </div>
  );
}
