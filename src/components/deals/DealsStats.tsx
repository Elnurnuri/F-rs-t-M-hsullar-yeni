import React from 'react';
import { Tag, Percent, Zap, AlertTriangle } from 'lucide-react';
import type { DealsStatsSummary } from '../../types/deals.ts';
import { formatStatValue } from '../../utils/formatters.ts';

interface DealsStatsProps {
  stats: DealsStatsSummary;
}

export const DealsStats: React.FC<DealsStatsProps> = ({ stats }) => {
  const cards = [
    {
      id: 'discounted',
      label: 'Endirimli məhsul',
      value: formatStatValue(stats.discountedCount),
      sublabel: 'Aktiv təkliflər',
      icon: Tag,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderColor: 'border-stone-200 dark:border-stone-800',
    },
    {
      id: 'max-discount',
      label: 'Maks. endirim',
      value: formatStatValue(stats.maxDiscount, '%'),
      sublabel: 'Ən yüksək qənaət',
      icon: Percent,
      iconColor: 'text-rose-600 dark:text-rose-400',
      iconBg: 'bg-rose-50 dark:bg-rose-950/40',
      borderColor: 'border-stone-200 dark:border-stone-800',
    },
    {
      id: 'campaign-items',
      label: 'Flaş kampaniya',
      value: formatStatValue(stats.campaignItemsCount),
      sublabel: 'Günün təklifi',
      icon: Zap,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
      borderColor: 'border-stone-200 dark:border-stone-800',
    },
    {
      id: 'limited-stock',
      label: 'Son stok fürsəti',
      value: formatStatValue(stats.limitedStockCount),
      sublabel: '5 və daha az qalan',
      icon: AlertTriangle,
      iconColor: 'text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-50 dark:bg-orange-950/40',
      borderColor: 'border-stone-200 dark:border-stone-800',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-3.5 sm:-mt-6 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`bg-white dark:bg-stone-900 border ${card.borderColor} rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xs hover:shadow transition-shadow flex items-center sm:items-start gap-2.5 sm:gap-3`}
            >
              <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${card.iconBg} ${card.iconColor} shrink-0`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] sm:text-xs font-medium text-stone-600 dark:text-stone-400 leading-tight truncate">
                  {card.label}
                </span>
                <span className="block text-lg sm:text-2xl font-extrabold text-stone-900 dark:text-white tabular-nums tracking-tight mt-0.5">
                  {card.value}
                </span>
                <span className="block text-[9px] sm:text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                  {card.sublabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
