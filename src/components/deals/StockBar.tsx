import React, { useState, useEffect } from 'react';
import { calculateSoldRatio } from '../../utils/formatters.ts';

interface StockBarProps {
  sold?: number;
  stock: number;
}

export const StockBar: React.FC<StockBarProps> = ({ sold = 0, stock }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ratio = calculateSoldRatio(sold, stock);

  useEffect(() => {
    // Soft initial fill transition on mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // If sold is not known or 0, do not show bar
  if (ratio === null || sold <= 0) {
    return null;
  }

  const percent = Math.round(ratio * 100);

  const barColor =
    percent >= 80
      ? 'bg-rose-500 dark:bg-rose-600'
      : percent >= 50
      ? 'bg-amber-500 dark:bg-amber-600'
      : 'bg-emerald-500 dark:bg-emerald-600';

  return (
    <div className="w-full space-y-1">
      <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 font-medium">
        <span className="tabular-nums">
          <strong className="text-stone-700 dark:text-stone-300 font-semibold">{sold}</strong> satılıb
        </span>
        <span className="tabular-nums text-[10px] text-stone-400 dark:text-stone-500">
          %{percent}
        </span>
      </div>
      <div 
        className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden relative shadow-inner" 
        role="progressbar" 
        aria-valuenow={percent} 
        aria-valuemin={0} 
        aria-valuemax={100}
        aria-label={`${sold} satılıb, stok nisbəti %${percent}`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-800 ease-out relative overflow-hidden ${barColor}`}
          style={{ width: isLoaded ? `${percent}%` : '0%' }}
        >
          {/* Moving light sheen effect across the filled bar */}
          <span 
            className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white/50 dark:via-white/40 to-transparent animate-stock-sheen pointer-events-none" 
            aria-hidden="true" 
          />
        </div>
      </div>
    </div>
  );
};
