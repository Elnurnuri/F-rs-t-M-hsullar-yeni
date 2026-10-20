import React from 'react';
import { ArrowDownUp, Search, X, LayoutGrid, List } from 'lucide-react';
import type { SortMode, ViewMode } from '../../types/deals.ts';

interface DealsToolbarProps {
  sortMode: SortMode;
  onSortChange: (sort: SortMode) => void;
  viewMode?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFilteredCount: number;
}

export const DealsToolbar: React.FC<DealsToolbarProps> = ({
  sortMode,
  onSortChange,
  viewMode = 'grid',
  onViewChange,
  searchQuery,
  onSearchChange,
  totalFilteredCount,
}) => {
  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-600 dark:text-stone-300">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Fürsət məhsulları və ya mağaza axtar..."
            aria-label="Fürsət məhsulları axtar"
            className="w-full min-h-[40px] sm:min-h-[44px] pl-9 pr-8 py-2 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-600 dark:placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-stone-800 transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              aria-label="Axtarışı təmizlə"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right side controls: Count, Sorting, View Toggle */}
        <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3">
          
          {/* Filtered count badge */}
          <span className="text-[11px] sm:text-xs font-medium text-stone-600 dark:text-stone-300 whitespace-nowrap">
            <span className="font-bold text-stone-900 dark:text-stone-100 tabular-nums">
              {totalFilteredCount}
            </span>{' '}
            məhsul tapıldı
          </span>

          <div className="h-4 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block" />

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 min-w-[130px] sm:min-w-[170px]">
            <label htmlFor="sort-select" className="sr-only">
              Məhsulları sırala
            </label>
            <div className="relative w-full">
              <select
                id="sort-select"
                value={sortMode}
                onChange={(e) => onSortChange(e.target.value as SortMode)}
                className="w-full min-h-[38px] sm:min-h-[42px] appearance-none pl-7 pr-7 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="discount_desc">Ən böyük endirim</option>
                <option value="price_asc">Ən ucuz</option>
                <option value="sold_desc">Ən çox satılan</option>
                <option value="stock_asc">Ən az stok</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-stone-400">
                <ArrowDownUp className="w-3.5 h-3.5" />
              </div>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-stone-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* View mode toggle (Grid / List) */}
          {onViewChange && (
            <div className="flex items-center rounded-xl border border-stone-200 dark:border-stone-750 p-0.5 bg-stone-50 dark:bg-stone-800 shrink-0">
              <button
                type="button"
                onClick={() => onViewChange('grid')}
                className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-stone-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
                aria-label="Şəbəkə görünüşü"
                title="Şəbəkə görünüşü"
              >
                <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => onViewChange('list')}
                className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-stone-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
                aria-label="Siyahı görünüşü"
                title="Siyahı görünüşü"
              >
                <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
