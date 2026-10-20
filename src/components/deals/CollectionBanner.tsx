import React from 'react';
import { Sparkles, Layers, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import type { CollectionBundle, CollectionBundleItem } from '../../types/deals.ts';
import { formatAZN } from '../../utils/formatters.ts';

interface CollectionBannerProps {
  bundle: CollectionBundle;
  onOpenBundleModal: (bundle: CollectionBundle) => void;
}

export const CollectionBanner: React.FC<CollectionBannerProps> = ({
  bundle,
  onOpenBundleModal,
}) => {
  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 text-white rounded-3xl p-4 sm:p-6 lg:p-7 shadow-lg border border-stone-800"
      aria-label="Xüsusi Kolleksiya Dəsti"
    >
      {/* Decorative ambient glow */}
      <div 
        className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
        
        {/* Left: Info & Pricing */}
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Kolleksiya Fürsəti
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              {bundle.tag}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
            {bundle.title}
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
            {bundle.subtitle}. Hər iki orijinal məhsul tək qutuda xüsusi endirimlə təqdim olunur.
          </p>

          {/* Pricing & CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
                {formatAZN(bundle.bundlePrice)}
              </span>
              <span className="text-sm sm:text-base text-stone-400 line-through tabular-nums">
                {formatAZN(bundle.originalPrice)}
              </span>
              <span className="px-1.5 py-0.5 bg-rose-600 text-white text-xs font-bold rounded-md tabular-nums">
                -{bundle.discountPercent}%
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOpenBundleModal(bundle)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 min-h-[44px] rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-stone-950 font-extrabold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>İkisinə bir yerdə bax (Pop-up)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: 2 Items Preview Side-by-Side */}
        <div className="lg:col-span-5">
          <div 
            onClick={() => onOpenBundleModal(bundle)}
            className="group cursor-pointer bg-stone-800/60 hover:bg-stone-800 border border-stone-700/80 rounded-2xl p-3 sm:p-4 transition-all"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenBundleModal(bundle);
              }
            }}
            aria-label="Kişi kolleksiyası popup-ını aç"
          >
            <div className="grid grid-cols-2 gap-2 relative items-center">
              {bundle.items.map((item: CollectionBundleItem) => (
                <div key={item.id} className="bg-stone-900/90 rounded-xl p-2.5 border border-stone-800 flex flex-col items-center text-center">
                  <div className="w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-stone-950/40 p-2 mb-2">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                    />
                  </div>
                  <span className="text-[11px] font-bold text-stone-200 line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 tabular-nums">
                    {formatAZN(item.price)}
                  </span>
                </div>
              ))}

              {/* Center plus badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center font-black text-sm shadow-md pointer-events-none">
                +
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-stone-700/60 flex items-center justify-between text-[11px] text-stone-300">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <Tag className="w-3 h-3" />
                Pop-up ilə ətraflı baxış
              </span>
              <span className="text-stone-400">
                Kliklə açılır →
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
