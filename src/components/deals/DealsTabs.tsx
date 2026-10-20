import React from 'react';
import { Sparkles, Calendar, AlertCircle, LayoutGrid, Layers } from 'lucide-react';
import type { FilterTab } from '../../types/deals.ts';

interface DealsTabsProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  counts: {
    all: number;
    today: number;
    week: number;
    limited: number;
    collection: number;
  };
}

export const DealsTabs: React.FC<DealsTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs: Array<{
    id: FilterTab;
    label: string;
    count: number;
    icon: React.ElementType;
  }> = [
    {
      id: 'all',
      label: 'Hamısı',
      count: counts.all,
      icon: LayoutGrid,
    },
    {
      id: 'collection',
      label: 'Kolleksiyalar',
      count: counts.collection,
      icon: Layers,
    },
    {
      id: 'today',
      label: 'Bu gün',
      count: counts.today,
      icon: Sparkles,
    },
    {
      id: 'week',
      label: 'Bu həftə',
      count: counts.week,
      icon: Calendar,
    },
    {
      id: 'limited',
      label: 'Məhdud',
      count: counts.limited,
      icon: AlertCircle,
    },
  ];

  return (
    <div className="w-full">
      {/* Scrollable container for mobile */}
      <div 
        className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-0.5"
        role="tablist"
        aria-label="Fürsət kateqoriyaları"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isEmpty = tab.count === 0;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`
                min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 cursor-pointer
                focus:outline-hidden focus:ring-2 focus:ring-emerald-500
                ${isActive
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-700/20'
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }
                ${isEmpty && !isActive ? 'opacity-55 hover:opacity-80' : ''}
              `}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-stone-500 dark:text-stone-400'}`} />
              <span>{tab.label}</span>
              <span
                className={`
                  text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold tabular-nums
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }
                `}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
