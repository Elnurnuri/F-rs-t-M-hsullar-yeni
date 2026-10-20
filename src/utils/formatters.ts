import type { Deal, DealsStatsSummary } from '../types/deals.ts';

/**
 * Format number to Azerbaijani currency style: «1.008,52 ₼»
 * - Uses dot as thousand separator
 * - Uses comma as decimal separator
 * - Symbol ₼ placed after number with space
 */
export function formatAZN(value: number): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0,00 ₼';
  }
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const parts = absValue.toFixed(2).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = parts[1];
  const formatted = `${integerPart},${decimalPart} ₼`;
  return isNegative ? `-${formatted}` : formatted;
}

/**
 * Calculate amount saved in AZN
 */
export function calculateSavings(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round((originalPrice - currentPrice) * 100) / 100;
}

/**
 * Format savings text in Azerbaijani: «X ₼ qənaət»
 */
export function formatSavings(savings: number): string {
  return `${formatAZN(savings)} qənaət`;
}

/**
 * Format discount percentage: «-23%»
 */
export function formatDiscount(discount: number): string {
  const rounded = Math.round(discount);
  return `-${rounded}%`;
}

export interface TimeRemaining {
  hours: string;
  minutes: string;
  seconds: string;
  totalSeconds: number;
  isEnded: boolean;
}

/**
 * Format seconds remaining into 2-digit hours, minutes, seconds.
 */
export function formatTimeRemaining(totalSeconds: number): TimeRemaining {
  if (totalSeconds <= 0) {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
      totalSeconds: 0,
      isEnded: true,
    };
  }

  const clamped = Math.floor(totalSeconds);
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    totalSeconds: clamped,
    isEnded: false,
  };
}

/**
 * Computes 4 overview statistics from normalized deals list.
 * "0 olan rəqəm «—» kimi göstərilsin" rule applies in formatStatValue.
 */
export function computeDealsStats(deals: Deal[]): DealsStatsSummary {
  if (!deals || deals.length === 0) {
    return {
      discountedCount: 0,
      maxDiscount: 0,
      campaignItemsCount: 0,
      limitedStockCount: 0,
    };
  }

  const discountedCount = deals.filter(d => d.discount > 0).length;
  const maxDiscount = deals.reduce((max, d) => Math.max(max, d.discount || 0), 0);
  const campaignItemsCount = deals.filter(d => d.category === 'today').length;
  const limitedStockCount = deals.filter(d => d.stock <= 5).length;

  return {
    discountedCount,
    maxDiscount: Math.round(maxDiscount),
    campaignItemsCount,
    limitedStockCount,
  };
}

/**
 * Format statistics value. Displays "—" if 0.
 */
export function formatStatValue(value: number, suffix: string = ''): string {
  if (!value || value <= 0) {
    return '—';
  }
  return `${value}${suffix}`;
}

export type StockStatusTone = 'danger' | 'warning' | 'success';

export interface StockStatusInfo {
  label: string;
  tone: StockStatusTone;
}

/**
 * Stok vəziyyəti:
 * - ≤ 5 → «Son N məhsul» (qırmızı)
 * - ≤ 15 → «Tükənir» (narıncı)
 * - əks halda → «Anbarda var» (yaşıl)
 */
export function getStockStatus(stock: number): StockStatusInfo {
  if (stock <= 5) {
    return {
      label: `Son ${stock} məhsul`,
      tone: 'danger',
    };
  }
  if (stock <= 15) {
    return {
      label: 'Tükənir',
      tone: 'warning',
    };
  }
  return {
    label: 'Anbarda var',
    tone: 'success',
  };
}

/**
 * Calculate stock sold ratio: sold / (sold + stock)
 * Returns ratio between 0 and 1, or null if invalid
 */
export function calculateSoldRatio(sold: number, stock: number): number | null {
  if (typeof sold !== 'number' || sold <= 0) {
    return null;
  }
  const total = sold + (stock || 0);
  if (total <= 0) return null;
  return Math.min(1, Math.max(0, sold / total));
}
