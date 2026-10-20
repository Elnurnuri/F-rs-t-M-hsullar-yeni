import React, { useState } from 'react';
import { ShoppingBag, Heart, Sun, Moon, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import type { MockScenario } from '../../types/deals.ts';

interface DealsHeaderProps {
  cartCount: number;
  favoriteCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  scenario: MockScenario;
  onScenarioChange: (scenario: MockScenario) => void;
}

export const DealsHeader: React.FC<DealsHeaderProps> = ({
  cartCount,
  favoriteCount,
  darkMode,
  onToggleDarkMode,
  scenario,
  onScenarioChange,
}) => {
  const [showScenarioMenu, setShowScenarioMenu] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const scenarios: Array<{ id: MockScenario; label: string; desc: string }> = [
    {
      id: 'default',
      label: 'Standart (Aktiv kampaniya + 14 məhsul)',
      desc: 'Flaş kampaniya və həftəlik endirimlər',
    },
    {
      id: 'no_campaign',
      label: 'Kampaniyasız vəziyyət',
      desc: 'Geri sayım yoxdur, yalnız həftəlik fürsətlər',
    },
    {
      id: 'empty',
      label: 'Tam boş vəziyyət',
      desc: 'Heç bir endirim və kampaniya yoxdur',
    },
    {
      id: 'flash_error',
      label: 'Flaş API xətası',
      desc: 'Flaş xətadır, həftəlik məhsullar göstərilir',
    },
    {
      id: 'products_error',
      label: 'Məhsul API xətası',
      desc: 'Məhsullar xətadır, flaş məhsullar göstərilir',
    },
    {
      id: 'both_error',
      label: 'Ümumi xəta vəziyyəti',
      desc: 'Hər iki mənbə xətadır, yenidən yoxla düyməsi',
    },
  ];

  const handleActionClick = (name: string) => {
    setShowToast(name);
    setTimeout(() => setShowToast(null), 2500);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <a 
              href="/" 
              className="flex items-center gap-1.5 focus:outline-hidden shrink-0"
              aria-label="Panshop Ana səhifə"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-extrabold text-sm sm:text-base shadow-xs">
                P
              </div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-stone-900 dark:text-stone-50">
                panshop<span className="text-emerald-600">.az</span>
              </span>
            </a>

            {/* Navigation links (Desktop) */}
            <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleActionClick('Ana səhifə'); }}
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                Ana səhifə
              </a>
              <a 
                href="/deals" 
                className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5"
                aria-current="page"
              >
                <Sparkles className="w-4 h-4" />
                Fürsət məhsulları
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleActionClick('Kateqoriyalar'); }}
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                Kateqoriyalar
              </a>
            </nav>
          </div>

          {/* Right actions: Scenario switcher, Dark mode, Favorites, Cart */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* Scenario switcher dropdown for testing different data states */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowScenarioMenu(prev => !prev)}
                className="min-h-[40px] sm:min-h-[44px] px-2 sm:px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-750 text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition cursor-pointer"
                aria-expanded={showScenarioMenu}
                aria-label="Test ssenarilərini seç"
                title="API və məlumat vəziyyətlərini test et"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="hidden sm:inline">Məlumat rejimi</span>
              </button>

              {showScenarioMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowScenarioMenu(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl z-50 p-2 space-y-1">
                    <div className="px-3 py-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800">
                      API və Ssenari Simulyasiyası
                    </div>
                    {scenarios.map((sc) => {
                      const isSelected = scenario === sc.id;
                      return (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => {
                            onScenarioChange(sc.id);
                            setShowScenarioMenu(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-start justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold'
                              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{sc.label}</div>
                            <div className="text-[11px] text-stone-600 dark:text-stone-300 mt-0.5">{sc.desc}</div>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              aria-label={darkMode ? "İşıqlı rejimə keç" : "Qaranlıq rejimə keç"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-stone-600" />
              )}
            </button>

            {/* Favorites button */}
            <button
              type="button"
              onClick={() => handleActionClick(`Sevimlilər (${favoriteCount})`)}
              className="relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              aria-label={`Sevimlilər: ${favoriteCount} məhsul`}
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Cart button */}
            <button
              type="button"
              onClick={() => handleActionClick(`Səbət (${cartCount})`)}
              className="relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition cursor-pointer"
              aria-label={`Səbət: ${cartCount} məhsul`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Action toast */}
      {showToast && (
        <div 
          className="fixed bottom-5 right-5 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-bounce"
          role="status"
        >
          <span>{showToast}</span>
        </div>
      )}
    </header>
  );
};
