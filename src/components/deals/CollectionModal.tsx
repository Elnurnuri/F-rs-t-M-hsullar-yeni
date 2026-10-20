import React, { useState } from 'react';
import { X, Check, ShoppingBag, Sparkles, Plus, ShieldCheck, Tag } from 'lucide-react';
import type { CollectionBundle, CollectionBundleItem } from '../../types/deals.ts';
import { formatAZN } from '../../utils/formatters.ts';

interface CollectionModalProps {
  bundle: CollectionBundle | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCartBundle: (bundle: CollectionBundle) => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
  bundle,
  isOpen,
  onClose,
  onAddToCartBundle,
}) => {
  const [added, setAdded] = useState(false);

  if (!isOpen || !bundle) return null;

  const handleAddBoth = () => {
    setAdded(true);
    onAddToCartBundle(bundle);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1400);
  };

  const savingsAmount = bundle.originalPrice - bundle.bundlePrice;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="collection-modal-title"
    >
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-6 shadow-2xl z-10 max-h-[92dvh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-200/90 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{bundle.tag}</span>
            </div>
            <h2 id="collection-modal-title" className="text-lg sm:text-2xl font-black text-stone-900 dark:text-stone-50 tracking-tight">
              {bundle.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5">
              {bundle.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] -m-2 flex items-center justify-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Bağla"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Products Side-by-Side Area (İkisi bir yerdə) */}
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-stretch relative">
            {bundle.items.map((item: CollectionBundleItem, index: number) => (
              <div
                key={item.id}
                className="bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-750 rounded-2xl p-3.5 flex flex-col justify-between relative shadow-2xs"
              >
                <div>
                  {/* Item Image */}
                  <div className="relative aspect-[4/3] w-full bg-white dark:bg-stone-900 rounded-xl overflow-hidden flex items-center justify-center p-3 mb-3 border border-stone-100 dark:border-stone-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                    {item.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-700 text-white text-[10px] font-bold rounded-md shadow-2xs">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Brand & Title */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    {item.brand}
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Single Item Value */}
                <div className="pt-3 mt-3 border-t border-stone-200/70 dark:border-stone-700 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Tək qiyməti:</span>
                    <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100 tabular-nums">
                      {formatAZN(item.price)}
                    </span>
                    <span className="text-[11px] text-stone-600 dark:text-stone-300 line-through ml-1.5 tabular-nums">
                      {formatAZN(item.originalPrice)}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    <Check className="w-3.5 h-3.5" /> Dəstə daxildir
                  </span>
                </div>
              </div>
            ))}

            {/* Visual connector icon in desktop center */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-600 text-white items-center justify-center shadow-md font-black text-sm z-10 pointer-events-none">
              +
            </div>
          </div>
        </div>

        {/* Total Bundle Pricing & CTA Bar */}
        <div className="mt-2 pt-4 border-t border-stone-100 dark:border-stone-800 bg-emerald-50/60 dark:bg-emerald-950/30 -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 p-4 sm:p-6 rounded-b-3xl">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            
            {/* Price calculation */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-50 tabular-nums">
                  {formatAZN(bundle.bundlePrice)}
                </span>
                <span className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-through tabular-nums">
                  {formatAZN(bundle.originalPrice)}
                </span>
                <span className="px-1.5 py-0.5 bg-rose-600 text-white text-xs font-bold rounded-md tabular-nums">
                  -{bundle.discountPercent}%
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-stone-600 dark:text-stone-300">
                <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                  {formatAZN(savingsAmount)} ümumi qənaət
                </span>
                <span>• Hər iki məhsul bir ünvana birlikdə çatdırılır</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleAddBoth}
              className={`
                min-h-[46px] px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98] shrink-0
                ${added
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white'
                }
              `}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Hər ikisi əlavə olundu!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>İkisini bir yerdə səbətə at ({formatAZN(bundle.bundlePrice)})</span>
                </>
              )}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
