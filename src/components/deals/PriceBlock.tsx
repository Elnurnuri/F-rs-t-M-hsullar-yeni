import React from 'react';
import { formatAZN, calculateSavings, formatSavings, formatDiscount } from '../../utils/formatters.ts';

interface PriceBlockProps {
  price: number;
  originalPrice: number;
  discount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceBlock: React.FC<PriceBlockProps> = ({
  price,
  originalPrice,
  discount,
  size = 'md',
}) => {
  const savings = calculateSavings(originalPrice, price);
  const hasSavings = savings > 0;

  // Calculate or use provided discount
  const effectiveDiscount =
    typeof discount === 'number' && discount > 0
      ? discount
      : originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const currentPriceSize = size === 'lg' 
    ? 'text-xl sm:text-2xl md:text-3xl' 
    : size === 'sm' 
    ? 'text-sm sm:text-base' 
    : 'text-base sm:text-lg md:text-xl';

  return (
    <div className="space-y-1">
      {/* Top: Current Promo Price and Original Strikethrough Price */}
      <div className="flex flex-wrap items-baseline gap-1 sm:gap-1.5">
        <span className={`${currentPriceSize} font-extrabold text-stone-900 dark:text-stone-50 tabular-nums tracking-tight`}>
          {formatAZN(price)}
        </span>
        
        {hasSavings && (
          <span className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 line-through tabular-nums">
            {formatAZN(originalPrice)}
          </span>
        )}
      </div>

      {/* Bottom: Discount percentage (-35%) & Savings pill side-by-side (yan-yana) */}
      {(effectiveDiscount > 0 || hasSavings) && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {effectiveDiscount > 0 && (
            <span className="px-1.5 py-0.5 bg-rose-600 text-white text-[10px] sm:text-[11px] font-bold rounded-md shadow-2xs tabular-nums shrink-0 whitespace-nowrap">
              {formatDiscount(effectiveDiscount)}
            </span>
          )}

          {hasSavings && (
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-900/40 px-1.5 py-0.5 rounded-md tabular-nums shrink-0 whitespace-nowrap">
              {formatSavings(savings)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
