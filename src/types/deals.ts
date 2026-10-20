/**
 * Panshop deals types and interfaces.
 */

export type DealCategory = 'today' | 'week' | 'limited' | 'collection';

export interface CollectionBundleItem {
  id: string | number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  brand?: string;
  badge?: string;
  description?: string;
}

export interface CollectionBundle {
  id: string | number;
  title: string;
  subtitle: string;
  tag: string;
  bundlePrice: number;
  originalPrice: number;
  discountPercent: number;
  items: CollectionBundleItem[];
  category?: string;
}

export interface Deal {
  id: string | number;
  name: string;
  slug: string;
  originalPrice: number;
  price: number;
  discount: number; // percentage, real (e.g. 23 for -23%)
  image: string | null; // if null, neutral placeholder; NO generic stock photo
  rating: number; // 0 -> do not show star
  sold: number;
  stock: number;
  category: DealCategory; // 'today' = flaş kampaniya, 'week' = endirimli məhsul, 'limited' = stok 1–5, 'collection' = kolleksiya dəsti
  badge?: string; // "Hot", "Yeni", etc.
  seller: string; // Store name
  sellerSlug: string | null; // vendor slug for /vendor-detail/<sellerSlug>
  gift?: {
    name: string;
    image?: string;
  };
  collectionBundle?: CollectionBundle;
}

export interface ApiProduct {
  id: string | number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image?: string | null;
  rating?: number;
  sold?: number;
  stock?: number;
  seller: string;
  sellerSlug?: string | null;
  badge?: string;
  gift?: {
    name: string;
    image?: string;
  };
  collectionBundle?: CollectionBundle;
}

export interface FlashSaleItem {
  id: string | number;
  promoPrice: number;
  originalPrice: number;
  discountPercent: number;
  remainingStock: number;
  sold?: number;
  badge?: string;
  product: ApiProduct;
}

export interface FlashSaleCampaign {
  id: string | number;
  title: string;
  secondsRemaining: number;
  items: FlashSaleItem[];
}

export interface FlashSalesApiResponse {
  sales: FlashSaleCampaign[];
}

export interface ProductsApiResponse {
  count: number;
  results: ApiProduct[];
}

export interface DealsStatsSummary {
  discountedCount: number;
  maxDiscount: number;
  campaignItemsCount: number;
  limitedStockCount: number;
}

export type SortMode = 'discount_desc' | 'price_asc' | 'sold_desc' | 'stock_asc';
export type ViewMode = 'grid' | 'list';
export type FilterTab = 'all' | 'today' | 'week' | 'limited' | 'collection';

export type MockScenario = 
  | 'default'
  | 'no_campaign'
  | 'empty'
  | 'flash_error'
  | 'products_error'
  | 'both_error';

export interface ProductSaveState {
  collections: string[];
  inAiMirror: boolean;
  inAiDecor: boolean;
}
