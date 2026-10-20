/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import type {
  Deal,
  FilterTab,
  SortMode,
  ViewMode,
  MockScenario,
  FlashSaleCampaign,
  ProductSaveState,
} from './types/deals.ts';
import { fetchDealsData } from './services/dealsService.ts';
import { computeDealsStats } from './utils/formatters.ts';

import { DealsHero } from './components/deals/DealsHero.tsx';
import { DealsStats } from './components/deals/DealsStats.tsx';
import { DealsTabs } from './components/deals/DealsTabs.tsx';
import { DealsToolbar } from './components/deals/DealsToolbar.tsx';
import { DealCard } from './components/deals/DealCard.tsx';
import { EmptyState } from './components/deals/EmptyState.tsx';
import { LoadMore } from './components/deals/LoadMore.tsx';
import { DealsSkeleton } from './components/deals/DealsSkeleton.tsx';
import { RulesModal } from './components/deals/RulesModal.tsx';
import { SaveToModal } from './components/deals/SaveToModal.tsx';
import { AlertCircle, ShoppingBag, Sparkles } from 'lucide-react';

export default function App() {
  // Scenario state (for testing data states)
  const [scenario, setScenario] = useState<MockScenario>('default');

  // Core data states
  const [loading, setLoading] = useState<boolean>(true);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<FlashSaleCampaign | null>(null);
  const [hasFlashError, setHasFlashError] = useState<boolean>(false);
  const [hasProductsError, setHasProductsError] = useState<boolean>(false);
  const [isTotalError, setIsTotalError] = useState<boolean>(false);

  // Tab & URL synchronization (?tab=)
  const [activeTab, setActiveTab] = useState<FilterTab>(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('tab');
      if (param === 'today' || param === 'week' || param === 'limited' || param === 'all') {
        return param as FilterTab;
      }
    }
    return 'all';
  });

  // Filter, sort, pagination, and view states
  const [sortMode, setSortMode] = useState<SortMode>('discount_desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // User interactions
  const [cartCount, setCartCount] = useState<number>(0);
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set());
  const [followedSellers, setFollowedSellers] = useState<Set<string>>(new Set());
  const [rulesOpen, setRulesOpen] = useState<boolean>(false);

  // Kolleksiyalar, AI Mirror, AI Dekor Save Modal state
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedDealForSave, setSelectedDealForSave] = useState<Deal | null>(null);
  const [allCollections, setAllCollections] = useState<string[]>([
    'Sevimlilər',
    'Alış-veriş siyahısı',
    'Xüsusi fürsətlər',
  ]);
  const [productSaveStates, setProductSaveStates] = useState<Record<string | number, ProductSaveState>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia?.('(prefers-color-scheme: dark)').matches ||
        document.documentElement.classList.contains('dark')
      );
    }
    return false;
  });

  const dealsSectionRef = useRef<HTMLDivElement>(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle URL history state for tab
  useEffect(() => {
    const handlePopState = () => {
      const param = new URLSearchParams(window.location.search).get('tab');
      if (param === 'today' || param === 'week' || param === 'limited' || param === 'all') {
        setActiveTab(param as FilterTab);
      } else {
        setActiveTab('all');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (tab: FilterTab) => {
    setActiveTab(tab);
    setVisibleCount(12);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (tab === 'all') {
        url.searchParams.delete('tab');
      } else {
        url.searchParams.set('tab', tab);
      }
      window.history.pushState(null, '', url.toString());
    }
  };

  // Load deals data whenever scenario changes
  const loadData = async (sc: MockScenario = scenario) => {
    setLoading(true);
    try {
      const result = await fetchDealsData(sc);
      setDeals(result.deals);
      setActiveCampaign(result.activeCampaign);
      setHasFlashError(result.hasFlashError);
      setHasProductsError(result.hasProductsError);
      setIsTotalError(result.isTotalError);
    } catch {
      setIsTotalError(true);
    } finally {
      setLoading(false);
      setVisibleCount(12);
    }
  };

  useEffect(() => {
    loadData(scenario);
  }, [scenario]);

  // Compute 4 global stats from all available deals
  const stats = useMemo(() => computeDealsStats(deals), [deals]);

  // Compute counts for tabs
  const tabCounts = useMemo(() => {
    return {
      all: deals.length,
      collection: deals.filter(d => d.category === 'collection').length,
      today: deals.filter(d => d.category === 'today').length,
      week: deals.filter(d => d.category === 'week').length,
      limited: deals.filter(d => d.stock <= 5 || d.category === 'limited').length,
    };
  }, [deals]);

  // Filter & Sort deals
  const filteredDeals = useMemo(() => {
    let result = [...deals];

    // 1. Tab filter
    if (activeTab === 'collection') {
      result = result.filter(d => d.category === 'collection');
    } else if (activeTab === 'today') {
      result = result.filter(d => d.category === 'today');
    } else if (activeTab === 'week') {
      result = result.filter(d => d.category === 'week');
    } else if (activeTab === 'limited') {
      result = result.filter(d => d.stock <= 5 || d.category === 'limited');
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        d => d.name.toLowerCase().includes(q) || d.seller.toLowerCase().includes(q)
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortMode === 'discount_desc') {
        return (b.discount || 0) - (a.discount || 0);
      }
      if (sortMode === 'price_asc') {
        return a.price - b.price;
      }
      if (sortMode === 'sold_desc') {
        return (b.sold || 0) - (a.sold || 0);
      }
      if (sortMode === 'stock_asc') {
        return a.stock - b.stock;
      }
      return 0;
    });

    return result;
  }, [deals, activeTab, searchQuery, sortMode]);

  // Paginated slice
  const displayedDeals = useMemo(() => {
    return filteredDeals.slice(0, visibleCount);
  }, [filteredDeals, visibleCount]);

  // User actions
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleToggleFavorite = (dealId: string | number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      const isFav = next.has(dealId);
      if (isFav) {
        next.delete(dealId);
        showToast('«Sevimlilər» siyahısından çıxarıldı');
      } else {
        next.add(dealId);
        showToast('«Sevimlilər» siyahısına əlavə olundu');
      }
      return next;
    });

    // Also sync the "Sevimlilər" collection in productSaveStates
    setProductSaveStates(prev => {
      const current = prev[dealId] || { collections: [], inAiMirror: false, inAiDecor: false };
      const hasFavorites = current.collections.includes('Sevimlilər');
      const updatedCollections = hasFavorites
        ? current.collections.filter(c => c !== 'Sevimlilər')
        : [...current.collections, 'Sevimlilər'];
      return {
        ...prev,
        [dealId]: {
          ...current,
          collections: updatedCollections,
        },
      };
    });
  };

  const handleToggleFollow = (seller: string) => {
    setFollowedSellers(prev => {
      const next = new Set(prev);
      if (next.has(seller)) {
        next.delete(seller);
      } else {
        next.add(seller);
      }
      return next;
    });
  };

  const handleOpenSaveModal = (deal: Deal) => {
    setSelectedDealForSave(deal);
    setSaveModalOpen(true);
  };

  const handleToggleCollection = (dealId: string | number, collectionName: string) => {
    if (collectionName === 'Sevimlilər') {
      setFavorites(prev => {
        const next = new Set(prev);
        if (next.has(dealId)) {
          next.delete(dealId);
        } else {
          next.add(dealId);
        }
        return next;
      });
    }

    setProductSaveStates(prev => {
      const current = prev[dealId] || { collections: [], inAiMirror: false, inAiDecor: false };
      const exists = current.collections.includes(collectionName);
      const updated = exists
        ? current.collections.filter(c => c !== collectionName)
        : [...current.collections, collectionName];
      return {
        ...prev,
        [dealId]: {
          ...current,
          collections: updated,
        },
      };
    });
  };

  const handleToggleAiMirror = (dealId: string | number) => {
    setProductSaveStates(prev => {
      const current = prev[dealId] || { collections: [], inAiMirror: false, inAiDecor: false };
      return {
        ...prev,
        [dealId]: {
          ...current,
          inAiMirror: !current.inAiMirror,
        },
      };
    });
  };

  const handleToggleAiDecor = (dealId: string | number) => {
    setProductSaveStates(prev => {
      const current = prev[dealId] || { collections: [], inAiMirror: false, inAiDecor: false };
      return {
        ...prev,
        [dealId]: {
          ...current,
          inAiDecor: !current.inAiDecor,
        },
      };
    });
  };

  const handleCreateCollection = (name: string) => {
    if (!allCollections.includes(name)) {
      setAllCollections(prev => [...prev, name]);
    }
  };

  const handleExploreScroll = () => {
    dealsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200">
      <main className="flex-1 pb-16">
        {/* Hero Section with Flash Countdown */}
        <DealsHero
          activeCampaign={activeCampaign}
          onExploreClick={handleExploreScroll}
          onOpenRulesClick={() => setRulesOpen(true)}
        />

        {/* 4 Stats Cards */}
        <DealsStats stats={stats} />

        {/* Partial API Failure Notice (Resilience requirement) */}
        {(hasFlashError || hasProductsError) && !isTotalError && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6">
            <div 
              className="p-3 sm:p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs sm:text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2.5"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>
                {hasFlashError
                  ? 'Flaş kampaniyalar xidməti müvəqqəti yenilənir. Digər endirimli məhsullar tam şəkildə təqdim olunur.'
                  : 'Məhsul kataloqu qismən cavab verir. Aktiv flaş fürsətləri fasiləsiz göstərilir.'}
              </span>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <section 
          ref={dealsSectionRef} 
          className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8 lg:pt-10 space-y-4 sm:space-y-6"
          id="deals-content"
          aria-label="Fürsət məhsulları siyahısı"
        >
          {/* Controls: Filter Tabs & Toolbar */}
          <div className="space-y-4">
            <DealsTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              counts={tabCounts}
            />

            <DealsToolbar
              sortMode={sortMode}
              onSortChange={setSortMode}
              viewMode={viewMode}
              onViewChange={setViewMode}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalFilteredCount={filteredDeals.length}
            />
          </div>

          {/* Deals Grid / List / States */}
          {loading ? (
            <DealsSkeleton viewMode={viewMode} count={8} />
          ) : isTotalError ? (
            <EmptyState
              type="error"
              onReset={() => {
                setScenario('default');
                loadData('default');
              }}
            />
          ) : deals.length === 0 ? (
            /* Honest Empty State when no deals exist */
            <EmptyState
              type="no_campaign"
              onReset={() => {
                setScenario('default');
                loadData('default');
              }}
            />
          ) : filteredDeals.length === 0 ? (
            /* Tab or search empty state */
            <EmptyState
              type={searchQuery ? 'search_empty' : 'tab_empty'}
              tabLabel={
                activeTab === 'today'
                  ? 'Bu gün (Flaş)'
                  : activeTab === 'week'
                  ? 'Bu həftə'
                  : activeTab === 'limited'
                  ? 'Məhdud stok'
                  : 'Seçilmiş bölmə'
              }
              onReset={() => {
                setSearchQuery('');
                handleTabChange('all');
              }}
            />
          ) : (
            <div>
              {/* Product Cards Container */}
              {viewMode === 'grid' ? (
                <div 
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3"
                  role="region"
                  aria-label="Məhsul toru"
                >
                  {displayedDeals.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      viewMode="grid"
                      onAddToCart={handleAddToCart}
                      onOpenSaveModal={handleOpenSaveModal}
                      saveState={productSaveStates[deal.id]}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.has(deal.id) || Boolean(productSaveStates[deal.id]?.collections?.includes('Sevimlilər'))}
                      onToggleFollow={handleToggleFollow}
                      isFollowed={followedSellers.has(deal.seller)}
                    />
                  ))}
                </div>
              ) : (
                <div 
                  className="space-y-2 sm:space-y-2.5"
                  role="region"
                  aria-label="Məhsul siyahısı"
                >
                  {displayedDeals.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      viewMode="list"
                      onAddToCart={handleAddToCart}
                      onOpenSaveModal={handleOpenSaveModal}
                      saveState={productSaveStates[deal.id]}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.has(deal.id) || Boolean(productSaveStates[deal.id]?.collections?.includes('Sevimlilər'))}
                      onToggleFollow={handleToggleFollow}
                      isFollowed={followedSellers.has(deal.seller)}
                    />
                  ))}
                </div>
              )}

              {/* Load More Pagination (12-12) */}
              <LoadMore
                currentCount={displayedDeals.length}
                totalCount={filteredDeals.length}
                onLoadMore={() => setVisibleCount(prev => prev + 12)}
                pageSize={12}
              />
            </div>
          )}
        </section>
      </main>

      {/* Campaign Rules Modal */}
      <RulesModal
        isOpen={rulesOpen}
        onClose={() => setRulesOpen(false)}
      />

      {/* Save to Kolleksiyalar / AI Mirror / AI Dekor Modal */}
      <SaveToModal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        deal={selectedDealForSave}
        saveState={
          selectedDealForSave
            ? productSaveStates[selectedDealForSave.id] || { collections: [], inAiMirror: false, inAiDecor: false }
            : { collections: [], inAiMirror: false, inAiDecor: false }
        }
        onToggleCollection={handleToggleCollection}
        onToggleAiMirror={handleToggleAiMirror}
        onToggleAiDecor={handleToggleAiDecor}
        allCollections={allCollections}
        onCreateCollection={handleCreateCollection}
        onShowToast={showToast}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 dark:bg-stone-100/95 text-white dark:text-stone-900 px-4 py-2.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200"
          role="status"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating cart pill if items added */}
      {cartCount > 0 && (
        <div className="fixed bottom-5 right-5 z-40 animate-bounce">
          <div className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold transition">
            <ShoppingBag className="w-4 h-4" />
            <span>Səbət: {cartCount} məhsul</span>
          </div>
        </div>
      )}
    </div>
  );
}
