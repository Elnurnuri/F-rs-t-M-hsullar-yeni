import type {
  Deal,
  DealCategory,
  FlashSaleCampaign,
  FlashSaleItem,
  FlashSalesApiResponse,
  ProductsApiResponse,
  ApiProduct,
  MockScenario,
} from '../types/deals.ts';
import {
  MOCK_ACTIVE_FLASH_SALES,
  MOCK_ON_SALE_PRODUCTS,
} from '../data/mockDealsData.ts';

/**
 * Normalizes a flash campaign item into a Deal.
 */
export function normalizeFlashSaleItem(item: FlashSaleItem): Deal {
  const stock = item.remainingStock ?? item.product?.stock ?? 0;
  const originalPrice = item.originalPrice ?? item.product?.originalPrice ?? item.promoPrice;
  const promoPrice = item.promoPrice;
  const calculatedDiscount = originalPrice > 0 
    ? Math.round(((originalPrice - promoPrice) / originalPrice) * 100) 
    : 0;
  const discount = item.discountPercent || calculatedDiscount;

  // Category determination:
  // limited if stock 1..5; else 'today' for active flash items
  const category: DealCategory = (stock > 0 && stock <= 5) ? 'limited' : 'today';

  return {
    id: item.product?.id ?? item.id,
    name: item.product?.name ?? 'Fürsət Məhsulu',
    slug: item.product?.slug ?? `deal-${item.id}`,
    originalPrice,
    price: promoPrice,
    discount,
    image: item.product?.image ?? null,
    rating: item.product?.rating ?? 0,
    sold: item.sold ?? item.product?.sold ?? 0,
    stock,
    category,
    badge: item.badge ?? item.product?.badge,
    seller: item.product?.seller ?? 'Panshop Satıcısı',
    sellerSlug: item.product?.sellerSlug ?? null,
    gift: item.product?.gift,
  };
}

/**
 * Normalizes an on-sale product into a Deal.
 */
export function normalizeProduct(product: ApiProduct): Deal {
  const stock = product.stock ?? 0;
  const originalPrice = product.originalPrice ?? product.price;
  const promoPrice = product.price;
  const calculatedDiscount = originalPrice > 0 
    ? Math.round(((originalPrice - promoPrice) / originalPrice) * 100) 
    : 0;
  const discount = product.discount || calculatedDiscount;

  // Category determination:
  // if collectionBundle is present -> 'collection';
  // limited if stock 1..5; else 'week' for regular on-sale products
  const category: DealCategory = product.collectionBundle
    ? 'collection'
    : (stock > 0 && stock <= 5)
    ? 'limited'
    : 'week';

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    originalPrice,
    price: promoPrice,
    discount,
    image: product.image ?? null,
    rating: product.rating ?? 0,
    sold: product.sold ?? 0,
    stock,
    category,
    badge: product.badge,
    seller: product.seller,
    sellerSlug: product.sellerSlug ?? null,
    gift: product.gift,
    collectionBundle: product.collectionBundle,
  };
}

/**
 * Finds the active campaign ending earliest (minimum secondsRemaining > 0).
 */
export function findEarliestCampaign(campaigns: FlashSaleCampaign[]): FlashSaleCampaign | null {
  if (!campaigns || campaigns.length === 0) return null;
  const activeCampaigns = campaigns.filter(c => c.secondsRemaining > 0);
  if (activeCampaigns.length === 0) return null;

  return activeCampaigns.reduce((earliest, current) => {
    return current.secondsRemaining < earliest.secondsRemaining ? current : earliest;
  }, activeCampaigns[0]);
}

/**
 * Merges flash sale items and on-sale products.
 * Rule: "Eyni məhsul hər ikisində varsa, kampaniya qiyməti qalib gəlir."
 */
export function mergeDeals(
  flashSales: FlashSaleCampaign[] = [],
  onSaleProducts: ApiProduct[] = []
): { deals: Deal[]; activeCampaign: FlashSaleCampaign | null } {
  const earliestCampaign = findEarliestCampaign(flashSales);
  const flashItemDeals: Deal[] = [];
  const seenProductIds = new Set<string | number>();

  // 1. Process flash sales first (they take priority)
  for (const campaign of flashSales) {
    if (campaign.secondsRemaining > 0) {
      for (const item of campaign.items) {
        const deal = normalizeFlashSaleItem(item);
        flashItemDeals.push(deal);
        seenProductIds.add(deal.id);
      }
    }
  }

  // 2. Process on-sale products, ignoring items already present in flash sales
  const productDeals: Deal[] = [];
  for (const prod of onSaleProducts) {
    if (!seenProductIds.has(prod.id)) {
      const deal = normalizeProduct(prod);
      productDeals.push(deal);
      seenProductIds.add(deal.id);
    }
  }

  const allDeals = [...flashItemDeals, ...productDeals];

  return {
    deals: allDeals,
    activeCampaign: earliestCampaign,
  };
}

export interface FetchDealsResult {
  deals: Deal[];
  activeCampaign: FlashSaleCampaign | null;
  hasFlashError: boolean;
  hasProductsError: boolean;
  isTotalError: boolean;
}

/**
 * Fetches and merges deals from both data sources.
 * Supports partial failures resiliently.
 */
export async function fetchDealsData(scenario: MockScenario = 'default'): Promise<FetchDealsResult> {
  // Simulate network latency (250ms) for realistic UX
  await new Promise(resolve => setTimeout(resolve, 250));

  let flashData: FlashSalesApiResponse | null = null;
  let productsData: ProductsApiResponse | null = null;
  let hasFlashError = false;
  let hasProductsError = false;

  switch (scenario) {
    case 'no_campaign':
      flashData = { sales: [] };
      productsData = MOCK_ON_SALE_PRODUCTS;
      break;

    case 'empty':
      flashData = { sales: [] };
      productsData = { count: 0, results: [] };
      break;

    case 'flash_error':
      hasFlashError = true;
      flashData = null;
      productsData = MOCK_ON_SALE_PRODUCTS;
      break;

    case 'products_error':
      flashData = MOCK_ACTIVE_FLASH_SALES;
      hasProductsError = true;
      productsData = null;
      break;

    case 'both_error':
      hasFlashError = true;
      hasProductsError = true;
      flashData = null;
      productsData = null;
      break;

    case 'default':
    default:
      flashData = MOCK_ACTIVE_FLASH_SALES;
      productsData = MOCK_ON_SALE_PRODUCTS;
      break;
  }

  if (hasFlashError && hasProductsError) {
    return {
      deals: [],
      activeCampaign: null,
      hasFlashError: true,
      hasProductsError: true,
      isTotalError: true,
    };
  }

  const campaigns = flashData?.sales || [];
  const products = productsData?.results || [];

  const { deals, activeCampaign } = mergeDeals(campaigns, products);

  return {
    deals,
    activeCampaign,
    hasFlashError,
    hasProductsError,
    isTotalError: false,
  };
}
