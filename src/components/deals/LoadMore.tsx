import React from 'react';
import { ChevronDown } from 'lucide-react';

interface LoadMoreProps {
  currentCount: number;
  totalCount: number;
  onLoadMore: () => void;
  pageSize?: number;
}

export const LoadMore: React.FC<LoadMoreProps> = ({
  currentCount,
  totalCount,
  onLoadMore,
  pageSize = 12,
}) => {
  // If all items are loaded, hide completely
  if (currentCount >= totalCount) {
    return null;
  }

  const remaining = totalCount - currentCount;
  const nextChunk = Math.min(pageSize, remaining);

  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-4 space-y-3">
      {/* Progress count */}
      <span className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium tabular-nums">
        <strong className="text-stone-800 dark:text-stone-200 font-bold">{currentCount}</strong> / {totalCount} məhsul göstərilir
      </span>

      {/* Load More Button */}
      <button
        type="button"
        onClick={onLoadMore}
        className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 min-h-[44px] w-full sm:w-auto rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-500 text-stone-800 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer active:scale-[0.99]"
        aria-label={`Daha ${nextChunk} məhsul yüklə`}
      >
        <span>Daha çox yüklə (+{nextChunk})</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
};
