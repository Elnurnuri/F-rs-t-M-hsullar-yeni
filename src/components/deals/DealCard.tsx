import React, { useState } from 'react';
import { Star, ShoppingBag, Gift, Package, Check, Plus, Bookmark, BookmarkCheck } from 'lucide-react';
import type { Deal, ViewMode, ProductSaveState } from '../../types/deals.ts';
import { getStockStatus } from '../../utils/formatters.ts';
import { StockBar } from './StockBar.tsx';
import { PriceBlock } from './PriceBlock.tsx';

interface DealCardProps {
  deal: Deal;
  viewMode?: ViewMode;
  onAddToCart?: (deal: Deal) => void;
  onOpenSaveModal?: (deal: Deal) => void;
  saveState?: ProductSaveState;
  onToggleFavorite?: (dealId: string | number) => void;
  isFavorite?: boolean;
  onToggleFollow?: (seller: string) => void;
  isFollowed?: boolean;
}

export const DealCard: React.FC<DealCardProps> = ({
  deal,
  viewMode = 'grid',
  onAddToCart,
  onOpenSaveModal,
  saveState,
  onToggleFavorite,
  isFavorite = false,
  onToggleFollow,
  isFollowed = false,
}) => {
  const [localFollowed, setLocalFollowed] = useState(false);
  const [added, setAdded] = useState(false);
  const [showGiftTooltip, setShowGiftTooltip] = useState(false);

  const isStoreFollowed = isFollowed || localFollowed;

  const stockInfo = getStockStatus(deal.stock);
  const sellerInitial = deal.seller ? deal.seller.trim().charAt(0) : 'P';

  const isSavedAnywhere = saveState
    ? (saveState.collections.length > 0 || saveState.inAiMirror || saveState.inAiDecor)
    : isFavorite;

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    onAddToCart?.(deal);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(deal.id);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenSaveModal) {
      onOpenSaveModal(deal);
    } else {
      onToggleFavorite?.(deal.id);
    }
  };

  const handleSellerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Links to /vendor-detail/<sellerSlug>
  };

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFollow) {
      onToggleFollow(deal.seller);
    } else {
      setLocalFollowed(prev => !prev);
    }
  };

  // Stock tone styles
  const stockToneClasses = {
    danger: 'text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900',
    warning: 'text-amber-800 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900',
    success: 'text-emerald-800 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900',
  }[stockInfo.tone];

  // ==========================================
  // LIST VIEW LAYOUT
  // ==========================================
  if (viewMode === 'list') {
    return (
      <article
        className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-2.5 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch"
        data-testid={`deal-card-${deal.id}`}
      >
        {/* Product image */}
        <div className="relative w-full sm:w-44 md:w-48 aspect-[16/9] sm:aspect-square shrink-0 bg-stone-100/80 dark:bg-stone-800/60 rounded-xl overflow-hidden flex items-center justify-center p-2.5 sm:p-3">
          {deal.image ? (
            <img
              src={deal.image}
              alt={deal.name}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 gap-1.5 p-4 text-center">
              <Package className="w-8 h-8 stroke-1" />
              <span className="text-[11px] font-medium">Şəkil mövcud deyil</span>
            </div>
          )}

          {/* Optional badge on image */}
          {deal.badge && (
            <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
              <span className="px-1.5 py-0.5 bg-stone-900/80 dark:bg-stone-100/90 text-white dark:text-stone-900 text-[10px] font-semibold rounded-md backdrop-blur-xs">
                {deal.badge}
              </span>
            </div>
          )}

          {/* Gift indicator */}
          {deal.gift && (
            <div className="absolute bottom-2.5 left-2.5">
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setShowGiftTooltip(true)}
                onMouseLeave={() => setShowGiftTooltip(false)}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGiftTooltip((prev) => !prev);
                }}
              >
                <span className="flex items-center gap-1 px-2 py-1 bg-amber-500 text-stone-950 text-[10px] font-bold rounded-lg shadow-sm">
                  <Gift className="w-3 h-3" /> Hədiyyə
                </span>
                {showGiftTooltip && (
                  <div className="absolute bottom-full left-0 mb-1 z-30 w-44 p-2 bg-stone-900 text-white text-[11px] rounded-lg shadow-lg pointer-events-none">
                    {deal.gift.name}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content details */}
        <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
          <div className="space-y-2">
            
            {/* Seller row with follow button & Favorite button */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={deal.sellerSlug ? `/vendor-detail/${deal.sellerSlug}` : '#'}
                  onClick={handleSellerClick}
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800/90 dark:hover:bg-emerald-950/60 border border-stone-200/90 hover:border-emerald-300 dark:border-stone-700 dark:hover:border-emerald-800 transition-all group/seller"
                  title={deal.seller}
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 shadow-xs">
                    {sellerInitial}
                  </span>
                  <span className="truncate max-w-[200px] text-xs font-semibold text-stone-700 dark:text-stone-300 group-hover/seller:text-emerald-700 dark:group-hover/seller:text-emerald-300">
                    {deal.seller}
                  </span>
                </a>

                {/* Follow Store Button */}
                <button
                  type="button"
                  onClick={handleFollowClick}
                  aria-label={isStoreFollowed ? `${deal.seller} mağazasını izləməkdən çıx` : `${deal.seller} mağazasını izlə`}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer min-h-[30px] ${
                    isStoreFollowed
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shadow-2xs'
                      : 'bg-stone-100 hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 dark:bg-stone-800 dark:hover:bg-stone-750 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                  }`}
                  title={isStoreFollowed ? 'Mağaza izlənilir' : 'Mağazanı izlə'}
                >
                  {isStoreFollowed ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>İzlənilir</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      <span>İzlə</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveClick}
                aria-label={`${deal.name} kolleksiyaya və ya AI alətlərinə qeyd et`}
                className={`min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition cursor-pointer shadow-2xs ${
                  isSavedAnywhere
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600 dark:bg-stone-800 dark:hover:bg-stone-750 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
                title="Kolleksiyalar, AI Mirror və AI Dekor-a qeyd et"
              >
                {isSavedAnywhere ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Qeyd edilib</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-stone-400" />
                    <span className="hidden sm:inline">Kolleksiya & AI</span>
                    <span className="sm:hidden">Qeyd</span>
                  </>
                )}
              </button>
            </div>

            {/* Product Name: Single line strictly truncated */}
            <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 truncate whitespace-nowrap overflow-hidden group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors" title={deal.name}>
              <a href={`/product/${deal.slug}`} className="focus:outline-hidden focus:underline">
                {deal.name}
              </a>
            </h3>

            {/* Rating (ONLY if > 0) & Stock Badge in dedicated fixed slots */}
            <div className="flex items-center gap-2.5 pt-0.5">
              {deal.rating > 0 && (
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 shrink-0 whitespace-nowrap">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums text-stone-800 dark:text-stone-200">
                    {deal.rating.toFixed(1)}
                  </span>
                </div>
              )}

              <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md border shrink-0 whitespace-nowrap ${stockToneClasses}`}>
                {stockInfo.label}
              </span>
            </div>
          </div>

          {/* Bottom row: Price, StockBar, and CTA Button */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div className="space-y-2 min-w-[200px]">
              <PriceBlock price={deal.price} originalPrice={deal.originalPrice} discount={deal.discount} size="lg" />
              <div className="max-w-xs">
                <StockBar sold={deal.sold} stock={deal.stock} />
              </div>
            </div>

            <button
              type="button"
              onClick={handleCartClick}
              disabled={deal.stock <= 0}
              className={`
                min-h-[44px] px-5 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs
                ${deal.stock <= 0
                  ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white hover:shadow'
                }
              `}
              aria-label={`${deal.name} səbətə at`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Əlavə olundu</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Səbətə at</span>
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    );
  }

  // ==========================================
  // GRID VIEW LAYOUT (4 cols desktop, 3 tablet, 2 mobile)
  // ==========================================
  return (
    <article
      className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-2.5 sm:p-3 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
      data-testid={`deal-card-${deal.id}`}
    >
      <div>
        {/* Product Image: 4:5 aspect ratio, contain, neutral background */}
        <div className="relative aspect-[4/5] w-full bg-stone-100/80 dark:bg-stone-800/60 rounded-lg overflow-hidden flex items-center justify-center p-2.5 mb-2.5">
          {deal.image ? (
            <img
              src={deal.image}
              alt={deal.name}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 gap-1.5 p-2 text-center">
              <Package className="w-7 h-7 stroke-1" />
              <span className="text-[10px] font-medium">Şəkil yoxdur</span>
            </div>
          )}

          {/* Top-left: Optional product badge */}
          {deal.badge && (
            <div className="absolute top-2 left-2 z-10 pointer-events-none max-w-[calc(100%-52px)] overflow-hidden">
              <span className="px-1.5 py-0.5 bg-stone-900/80 dark:bg-stone-100/90 text-white dark:text-stone-900 text-[10px] font-semibold rounded-md backdrop-blur-xs truncate max-w-full whitespace-nowrap shrink-0 block">
                {deal.badge}
              </span>
            </div>
          )}

          {/* Top-right: Save to Collections / AI Mirror / AI Dekor button (opens popup with Heart inside) */}
          <button
            type="button"
            onClick={handleSaveClick}
            aria-label={`${deal.name} kolleksiyaya və ya AI alətlərinə qeyd et`}
            className={`absolute top-1 sm:top-1.5 right-1 sm:right-1.5 min-h-[38px] min-w-[38px] sm:min-h-[42px] sm:min-w-[42px] p-1.5 sm:p-2 flex items-center justify-center rounded-full backdrop-blur-xs shadow-xs transition cursor-pointer z-10 ${
              isSavedAnywhere
                ? 'bg-emerald-600 text-white shadow-emerald-700/25 ring-2 ring-emerald-400/50'
                : 'bg-white/90 dark:bg-stone-900/90 text-stone-500 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-105'
            }`}
            title={
              isSavedAnywhere
                ? 'Qeyd edilib (Kolleksiyalar, AI Mirror, AI Dekor)'
                : 'Kolleksiyalar, AI Mirror və AI Dekor-a qeyd et'
            }
          >
            {isSavedAnywhere ? (
              <BookmarkCheck className="w-4 h-4 fill-current" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          {/* Gift badge if product includes a gift */}
          {deal.gift && (
            <div className="absolute bottom-2 left-2 z-10">
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setShowGiftTooltip(true)}
                onMouseLeave={() => setShowGiftTooltip(false)}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGiftTooltip((prev) => !prev);
                }}
              >
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-500 text-stone-950 text-[10px] font-bold rounded-md shadow-xs">
                  <Gift className="w-3 h-3" /> Hədiyyə
                </span>
                {showGiftTooltip && (
                  <div className="absolute bottom-full left-0 mb-1 z-30 w-36 p-1.5 bg-stone-900 text-white text-[10px] rounded shadow-lg pointer-events-none">
                    {deal.gift.name}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Store row: Prominent accent badge with solid initial circle + 'İzlə' button */}
        <div className="flex items-center justify-between gap-1.5 mb-2">
          <a
            href={deal.sellerSlug ? `/vendor-detail/${deal.sellerSlug}` : '#'}
            onClick={handleSellerClick}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 min-w-0 max-w-[calc(100%-52px)] rounded-md bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800/90 dark:hover:bg-emerald-950/60 border border-stone-200/90 hover:border-emerald-300 dark:border-stone-700 dark:hover:border-emerald-800 transition-all group/seller shadow-2xs"
            title={deal.seller}
          >
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-extrabold text-[9px] flex items-center justify-center shrink-0 shadow-xs">
              {sellerInitial}
            </span>
            <span className="truncate text-[11px] font-semibold text-stone-700 dark:text-stone-300 group-hover/seller:text-emerald-700 dark:group-hover/seller:text-emerald-300">
              {deal.seller}
            </span>
          </a>

          {/* Follow Store Button */}
          <button
            type="button"
            onClick={handleFollowClick}
            aria-label={isStoreFollowed ? `${deal.seller} mağazasını izləməkdən çıx` : `${deal.seller} mağazasını izlə`}
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold transition-all shrink-0 cursor-pointer min-h-[22px] ${
              isStoreFollowed
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                : 'bg-stone-100 hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
            }`}
            title={isStoreFollowed ? 'Mağaza izlənilir' : 'Mağazanı izlə'}
          >
            {isStoreFollowed ? (
              <>
                <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[9px]">İzlənir</span>
              </>
            ) : (
              <>
                <Plus className="w-2.5 h-2.5" />
                <span className="text-[9px]">İzlə</span>
              </>
            )}
          </button>
        </div>

        {/* Product Name: Single line strictly truncated, no drop to second line */}
        <div className="mb-1.5 overflow-hidden">
          <h3 
            className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 truncate whitespace-nowrap overflow-hidden leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors block"
            title={deal.name}
          >
            <a href={`/product/${deal.slug}`} className="focus:outline-hidden focus:underline">
              {deal.name}
            </a>
          </h3>
        </div>

        {/* Rating row & Stock status badge in dedicated fixed slots */}
        <div className="flex items-center justify-between gap-1.5 mb-2 h-5">
          {deal.rating > 0 ? (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 shrink-0 whitespace-nowrap">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="tabular-nums text-stone-800 dark:text-stone-200">
                {deal.rating.toFixed(1)}
              </span>
            </div>
          ) : (
            <span className="shrink-0" />
          )}

          {/* Stock status badge: stays in its own dedicated space */}
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border shrink-0 whitespace-nowrap ${stockToneClasses}`}>
            {stockInfo.label}
          </span>
        </div>

        {/* Stock progress bar */}
        <div className="mb-2.5">
          <StockBar sold={deal.sold} stock={deal.stock} />
        </div>
      </div>

      {/* Bottom section: Price & Cart Button */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 space-y-2">
        <PriceBlock price={deal.price} originalPrice={deal.originalPrice} discount={deal.discount} size="md" />

        <button
          type="button"
          onClick={handleCartClick}
          disabled={deal.stock <= 0}
          className={`
            w-full min-h-[44px] py-2 px-3 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs
            ${deal.stock <= 0
              ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
              : added
              ? 'bg-emerald-700 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white hover:shadow'
            }
          `}
          aria-label={`${deal.name} səbətə at`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Əlavə olundu</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Səbətə at</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
