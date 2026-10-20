import React from 'react';
import type { ViewMode } from '../../types/deals.ts';

interface DealsSkeletonProps {
  viewMode?: ViewMode;
  count?: number;
}

export const DealsSkeleton: React.FC<DealsSkeletonProps> = ({
  viewMode = 'grid',
  count = 8,
}) => {
  const items = Array.from({ length: count });

  if (viewMode === 'list') {
    return (
      <div className="space-y-2 sm:space-y-2.5" role="status" aria-label="Fürsətlər yüklənir...">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row gap-3.5 animate-pulse"
          >
            <div className="w-full sm:w-44 aspect-[16/9] sm:aspect-square bg-stone-200 dark:bg-stone-800 rounded-xl shrink-0" />
            <div className="flex-1 flex flex-col justify-between py-1 space-y-3">
              <div className="space-y-2">
                <div className="w-28 h-4 bg-stone-200 dark:bg-stone-800 rounded" />
                <div className="w-3/4 h-5 bg-stone-200 dark:bg-stone-800 rounded" />
                <div className="w-1/2 h-4 bg-stone-200 dark:bg-stone-800 rounded" />
              </div>
              <div className="flex items-end justify-between pt-3">
                <div className="w-32 h-7 bg-stone-200 dark:bg-stone-800 rounded" />
                <div className="w-28 h-10 bg-stone-200 dark:bg-stone-800 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3"
      role="status" 
      aria-label="Fürsətlər yüklənir..."
    >
      {items.map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-2.5 sm:p-3 animate-pulse flex flex-col justify-between"
        >
          <div>
            <div className="aspect-[4/5] w-full bg-stone-200 dark:bg-stone-800 rounded-lg mb-2.5" />
            <div className="w-24 h-3.5 bg-stone-200 dark:bg-stone-800 rounded mb-2" />
            <div className="w-4/5 h-4 bg-stone-200 dark:bg-stone-800 rounded mb-2.5" />
            <div className="w-20 h-3 bg-stone-200 dark:bg-stone-800 rounded mb-2.5" />
          </div>
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2">
            <div className="w-28 h-5 bg-stone-200 dark:bg-stone-800 rounded" />
            <div className="w-full h-10 bg-stone-200 dark:bg-stone-800 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
