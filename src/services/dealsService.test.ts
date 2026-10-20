import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeFlashSaleItem,
  normalizeProduct,
  findEarliestCampaign,
  mergeDeals,
} from './dealsService.ts';
import type { FlashSaleCampaign, ApiProduct, FlashSaleItem } from '../types/deals.ts';

test('normalizeFlashSaleItem sets category limited if stock <= 5, today otherwise', () => {
  const item1: FlashSaleItem = {
    id: 'f1',
    promoPrice: 80,
    originalPrice: 100,
    discountPercent: 20,
    remainingStock: 3,
    sold: 10,
    product: {
      id: 1,
      name: 'Test 1',
      slug: 'test-1',
      price: 80,
      seller: 'Satıcı A',
    },
  };
  const d1 = normalizeFlashSaleItem(item1);
  assert.equal(d1.category, 'limited');
  assert.equal(d1.stock, 3);
  assert.equal(d1.discount, 20);

  const item2: FlashSaleItem = {
    id: 'f2',
    promoPrice: 50,
    originalPrice: 100,
    discountPercent: 50,
    remainingStock: 15,
    sold: 20,
    product: {
      id: 2,
      name: 'Test 2',
      slug: 'test-2',
      price: 50,
      seller: 'Satıcı B',
    },
  };
  const d2 = normalizeFlashSaleItem(item2);
  assert.equal(d2.category, 'today');
});

test('findEarliestCampaign selects the campaign with minimum secondsRemaining > 0', () => {
  const campaigns: FlashSaleCampaign[] = [
    {
      id: 'c1',
      title: 'Kampaniya 1 (5 saat)',
      secondsRemaining: 18000,
      items: [],
    },
    {
      id: 'c2',
      title: 'Kampaniya 2 (1 saat)',
      secondsRemaining: 3600,
      items: [],
    },
    {
      id: 'c3',
      title: 'Bitmiş Kampaniya',
      secondsRemaining: 0,
      items: [],
    },
  ];

  const earliest = findEarliestCampaign(campaigns);
  assert.ok(earliest);
  assert.equal(earliest?.id, 'c2');
  assert.equal(earliest?.title, 'Kampaniya 2 (1 saat)');
});

test('mergeDeals: when same product exists in both sources, flash sale promo price wins', () => {
  const sharedProductId = 999;

  const flashCampaign: FlashSaleCampaign = {
    id: 'flash-1',
    title: 'Günün Flaş Endirimi',
    secondsRemaining: 7200,
    items: [
      {
        id: 'f-item-999',
        promoPrice: 40.00, // Flash promo price is 40 AZN
        originalPrice: 100.00,
        discountPercent: 60,
        remainingStock: 10,
        sold: 50,
        product: {
          id: sharedProductId,
          name: 'Duplikasiya Olan Məhsul',
          slug: 'duplikasiya-olan-mehsul',
          price: 40.00,
          originalPrice: 100.00,
          seller: 'Test Mağaza',
        },
      },
    ],
  };

  const onSaleProducts: ApiProduct[] = [
    {
      id: sharedProductId,
      name: 'Duplikasiya Olan Məhsul',
      slug: 'duplikasiya-olan-mehsul',
      price: 65.00, // Normal on-sale price is 65 AZN
      originalPrice: 100.00,
      discount: 35,
      seller: 'Test Mağaza',
      stock: 10,
    },
    {
      id: 888,
      name: 'Yalnız Həftəlik Məhsul',
      slug: 'yalniz-heftelik-mehsul',
      price: 25.00,
      originalPrice: 35.00,
      discount: 28,
      seller: 'İkinci Mağaza',
      stock: 20,
    },
  ];

  const { deals } = mergeDeals([flashCampaign], onSaleProducts);

  assert.equal(deals.length, 2);
  const winner = deals.find(d => d.id === sharedProductId);
  assert.ok(winner);
  assert.equal(winner?.price, 40.00, 'Flash campaign price must win over standard on-sale price');
  assert.equal(winner?.discount, 60);
});
