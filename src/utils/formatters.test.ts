import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatAZN,
  calculateSavings,
  formatSavings,
  formatDiscount,
  formatTimeRemaining,
  computeDealsStats,
  formatStatValue,
  getStockStatus,
  calculateSoldRatio,
} from './formatters.ts';
import type { Deal } from '../types/deals.ts';

test('formatAZN formats numbers in Azerbaijani currency format with ₼ after number', () => {
  assert.equal(formatAZN(1008.52), '1.008,52 ₼');
  assert.equal(formatAZN(0), '0,00 ₼');
  assert.equal(formatAZN(45), '45,00 ₼');
  assert.equal(formatAZN(1234567.89), '1.234.567,89 ₼');
});

test('calculateSavings returns difference or 0 if not saving', () => {
  assert.equal(calculateSavings(100, 75), 25);
  assert.equal(calculateSavings(50, 50), 0);
  assert.equal(calculateSavings(30, 40), 0);
  assert.equal(formatSavings(25), '25,00 ₼ qənaət');
});

test('formatDiscount rounds and adds minus and percentage sign', () => {
  assert.equal(formatDiscount(23.4), '-23%');
  assert.equal(formatDiscount(50.8), '-51%');
});

test('formatTimeRemaining handles countdown and completion', () => {
  const t1 = formatTimeRemaining(8040); // 2 hours 14 mins
  assert.equal(t1.hours, '02');
  assert.equal(t1.minutes, '14');
  assert.equal(t1.seconds, '00');
  assert.equal(t1.isEnded, false);

  const t0 = formatTimeRemaining(0);
  assert.equal(t0.hours, '00');
  assert.equal(t0.minutes, '00');
  assert.equal(t0.seconds, '00');
  assert.equal(t0.isEnded, true);
});

test('formatStatValue returns dash «—» when value is 0', () => {
  assert.equal(formatStatValue(0), '—');
  assert.equal(formatStatValue(0, '%'), '—');
  assert.equal(formatStatValue(15), '15');
  assert.equal(formatStatValue(40, '%'), '40%');
});

test('getStockStatus returns correct labels and tones', () => {
  assert.deepEqual(getStockStatus(3), { label: 'Son 3 məhsul', tone: 'danger' });
  assert.deepEqual(getStockStatus(5), { label: 'Son 5 məhsul', tone: 'danger' });
  assert.deepEqual(getStockStatus(12), { label: 'Tükənir', tone: 'warning' });
  assert.deepEqual(getStockStatus(20), { label: 'Anbarda var', tone: 'success' });
});

test('calculateSoldRatio calculates ratio or returns null if no sold count', () => {
  assert.equal(calculateSoldRatio(0, 10), null);
  assert.equal(calculateSoldRatio(10, 10), 0.5);
  assert.equal(calculateSoldRatio(30, 10), 0.75);
});

test('computeDealsStats calculates 4 summary metrics accurately', () => {
  const dummyDeals: Deal[] = [
    {
      id: 1,
      name: 'Deal 1',
      slug: 'deal-1',
      originalPrice: 100,
      price: 70,
      discount: 30,
      image: null,
      rating: 4.5,
      sold: 10,
      stock: 4, // limited
      category: 'today', // campaign
      seller: 'Aysu Elektronika',
      sellerSlug: 'aysu-elektronika',
    },
    {
      id: 2,
      name: 'Deal 2',
      slug: 'deal-2',
      originalPrice: 200,
      price: 100,
      discount: 50,
      image: null,
      rating: 4.8,
      sold: 25,
      stock: 12,
      category: 'week',
      seller: 'Nərgiz Ev Dünyası',
      sellerSlug: 'nergiz-ev-dunyasi',
    },
  ];

  const stats = computeDealsStats(dummyDeals);
  assert.equal(stats.discountedCount, 2);
  assert.equal(stats.maxDiscount, 50);
  assert.equal(stats.campaignItemsCount, 1);
  assert.equal(stats.limitedStockCount, 1);
});
