import React from 'react';
import { Flame, ArrowDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { FlashCountdown } from './FlashCountdown.tsx';
import type { FlashSaleCampaign } from '../../types/deals.ts';

interface DealsHeroProps {
  activeCampaign: FlashSaleCampaign | null;
  onExploreClick: () => void;
  onOpenRulesClick: () => void;
}

export const DealsHero: React.FC<DealsHeroProps> = ({
  activeCampaign,
  onExploreClick,
  onOpenRulesClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-stone-50 to-stone-50 dark:from-emerald-950/20 dark:via-stone-950 dark:to-stone-950 border-b border-stone-200/80 dark:border-stone-800/80 py-6 sm:py-10 lg:py-14">
      {/* Decorative background subtle glow */}
      <div 
        className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 -right-24 w-80 h-80 bg-rose-400/10 dark:bg-rose-500/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Heading, description, actions */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
            {/* Pill/Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-200/90 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Məhdud müddətli endirimlər</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
              Fürsət Məhsulları
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
              Panshop satıcılarının aktiv flaş kampaniyaları, həftəlik xüsusi endirimli məhsulları və son an stok fürsətləri bir ünvanda.
            </p>

            {/* Micro value props */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-[11px] sm:text-sm text-stone-600 dark:text-stone-300">
              <span className="flex items-center gap-1 sm:gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                Yoxlanılmış satıcılar
              </span>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span>Dürüst qiymət siyasəti</span>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span>Təhlükəsiz çatdırılma</span>
            </div>

            {/* CTA Buttons - always side by side (yan-yana) */}
            <div className="flex flex-row items-center gap-2 sm:gap-3 pt-1 sm:pt-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onExploreClick}
                className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm md:text-base shadow-sm hover:shadow transition cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 whitespace-nowrap text-center"
              >
                <span>Fürsətləri kəşf et</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                type="button"
                id="rules-btn"
                onClick={onOpenRulesClick}
                className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 min-h-[44px] rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-medium text-xs sm:text-sm md:text-base transition cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-stone-400 whitespace-nowrap shadow-xs text-center"
              >
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-stone-500 dark:text-stone-400" />
                <span>Kampaniya qaydaları</span>
              </button>
            </div>
          </div>

          {/* Right Column: Flash Countdown (ONLY rendered if active campaign exists) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            {activeCampaign && activeCampaign.secondsRemaining > 0 ? (
              <div className="w-full max-w-md">
                <FlashCountdown
                  title={activeCampaign.title}
                  initialSecondsRemaining={activeCampaign.secondsRemaining}
                />
              </div>
            ) : (
              <div className="w-full max-w-md p-5 bg-white/70 dark:bg-stone-900/60 border border-stone-200/70 dark:border-stone-800/70 rounded-2xl text-stone-600 dark:text-stone-400 text-sm">
                <p className="font-semibold text-stone-800 dark:text-stone-200 mb-1">
                  Aktiv flaş kampaniya hazırda yoxdur
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  Həftəlik endirimli və stok fürsəti olan bütün məhsullar aşağıdakı siyahıda təqdim olunur.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
