import type {
  FlashSalesApiResponse,
  ProductsApiResponse,
  FlashSaleCampaign,
  ApiProduct,
  CollectionBundle,
} from '../types/deals.ts';

// Realistic product SVG illustrations as clean data URIs
export const PRODUCT_IMAGE_PLACEHOLDERS = {
  headphones: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <circle cx="150" cy="180" r="100" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
      <path d="M90 190 C90 125, 210 125, 210 190" stroke="#0f172a" stroke-width="12" stroke-linecap="round" fill="none"/>
      <path d="M100 160 C100 130, 200 130, 200 160" stroke="#059669" stroke-width="4" stroke-linecap="round" fill="none"/>
      <!-- Left Earcup -->
      <rect x="70" y="180" width="34" height="65" rx="17" fill="#1e293b"/>
      <rect x="80" y="188" width="14" height="49" rx="7" fill="#334155"/>
      <circle cx="87" cy="212" r="4" fill="#10b981"/>
      <!-- Right Earcup -->
      <rect x="196" y="180" width="34" height="65" rx="17" fill="#1e293b"/>
      <rect x="206" y="188" width="14" height="49" rx="7" fill="#334155"/>
      <circle cx="213" cy="212" r="4" fill="#10b981"/>
    </svg>
  `)}`,
  smartwatch: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Straps -->
      <rect x="120" y="50" width="60" height="90" rx="10" fill="#334155"/>
      <rect x="120" y="235" width="60" height="90" rx="10" fill="#334155"/>
      <!-- Watch Case -->
      <rect x="100" y="125" width="100" height="125" rx="24" fill="#0f172a" stroke="#475569" stroke-width="3"/>
      <!-- Screen -->
      <rect x="110" y="135" width="80" height="105" rx="16" fill="#020617"/>
      <!-- Time display -->
      <text x="150" y="185" fill="#10b981" font-size="24" font-weight="bold" font-family="sans-serif" text-anchor="middle">10:45</text>
      <circle cx="150" cy="215" r="14" fill="#059669" fill-opacity="0.2"/>
      <path d="M145 215 L149 219 L156 211" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `)}`,
  vacuum: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Main circular body -->
      <circle cx="150" cy="187" r="95" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
      <circle cx="150" cy="187" r="85" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <!-- LiDAR turret -->
      <circle cx="150" cy="150" r="26" fill="#0f172a"/>
      <circle cx="150" cy="150" r="16" fill="#1e293b"/>
      <line x1="140" y1="150" x2="160" y2="150" stroke="#ef4444" stroke-width="2"/>
      <!-- Buttons -->
      <circle cx="150" cy="235" r="12" fill="#059669"/>
      <path d="M147 235 L153 235" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <path d="M150 232 L150 238" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `)}`,
  coffee: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Coffee machine base -->
      <rect x="90" y="80" width="120" height="215" rx="14" fill="#1e293b"/>
      <rect x="100" y="95" width="100" height="60" rx="8" fill="#334155"/>
      <!-- Spout -->
      <rect x="135" y="160" width="30" height="25" rx="4" fill="#475569"/>
      <rect x="145" y="185" width="10" height="8" fill="#94a3b8"/>
      <!-- Cup -->
      <path d="M125 210 L175 210 L170 260 L130 260 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <path d="M175 220 C185 220, 185 240, 172 245" stroke="#cbd5e1" stroke-width="3" fill="none"/>
      <!-- Coffee drop -->
      <circle cx="150" cy="200" r="3" fill="#b45309"/>
    </svg>
  `)}`,
  keyboard: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Keyboard base -->
      <rect x="40" y="130" width="220" height="115" rx="12" fill="#0f172a" stroke="#334155" stroke-width="3"/>
      <!-- Key rows with RGB tint -->
      <rect x="52" y="142" width="196" height="15" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
      <rect x="52" y="162" width="196" height="15" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
      <rect x="52" y="182" width="196" height="15" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
      <rect x="52" y="202" width="196" height="15" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1"/>
      <!-- Spacebar -->
      <rect x="95" y="222" width="110" height="14" rx="3" fill="#334155" stroke="#059669" stroke-width="1.5"/>
    </svg>
  `)}`,
  webcam: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Mount clip -->
      <path d="M110 240 L190 240 L180 290 L120 290 Z" fill="#334155"/>
      <rect x="140" y="210" width="20" height="30" fill="#475569"/>
      <!-- Camera cylindrical body -->
      <rect x="75" y="130" width="150" height="85" rx="42" fill="#0f172a" stroke="#1e293b" stroke-width="3"/>
      <!-- Lens glass -->
      <circle cx="150" cy="172" r="32" fill="#1e293b" stroke="#475569" stroke-width="3"/>
      <circle cx="150" cy="172" r="22" fill="#020617"/>
      <circle cx="150" cy="172" r="14" fill="#0369a1"/>
      <circle cx="155" cy="167" r="4" fill="#ffffff" fill-opacity="0.8"/>
      <!-- Status LED -->
      <circle cx="115" cy="172" r="3" fill="#10b981"/>
    </svg>
  `)}`,
  kettle: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Base plate -->
      <rect x="80" y="270" width="140" height="18" rx="8" fill="#1e293b"/>
      <!-- Glass body -->
      <path d="M100 270 L108 120 L192 120 L200 270 Z" fill="#e0f2fe" fill-opacity="0.7" stroke="#38bdf8" stroke-width="2"/>
      <!-- Water level line & LED light -->
      <line x1="104" y1="260" x2="196" y2="260" stroke="#0284c7" stroke-width="4"/>
      <!-- Handle -->
      <path d="M192 135 C235 150, 235 240, 198 255" stroke="#1e293b" stroke-width="16" stroke-linecap="round" fill="none"/>
      <!-- Spout and lid -->
      <path d="M108 120 L92 135 L106 148" fill="#1e293b"/>
      <rect x="105" y="105" width="90" height="18" rx="6" fill="#1e293b"/>
    </svg>
  `)}`,
  carMount: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Vent clip -->
      <rect x="135" y="250" width="30" height="50" rx="6" fill="#475569"/>
      <!-- Wireless charging pad -->
      <rect x="90" y="110" width="120" height="150" rx="20" fill="#0f172a" stroke="#334155" stroke-width="3"/>
      <circle cx="150" cy="180" r="35" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="6 4"/>
      <path d="M148 165 L143 180 L153 180 L148 195" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Gripping arms -->
      <rect x="75" y="155" width="16" height="50" rx="6" fill="#1e293b"/>
      <rect x="209" y="155" width="16" height="50" rx="6" fill="#1e293b"/>
    </svg>
  `)}`,
  lamp: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Base -->
      <ellipse cx="150" cy="285" rx="55" ry="16" fill="#1e293b"/>
      <!-- Touch button -->
      <circle cx="150" cy="282" r="6" fill="#10b981"/>
      <!-- Stem -->
      <path d="M150 280 L150 140 L210 100" stroke="#334155" stroke-width="8" stroke-linecap="round" fill="none"/>
      <!-- LED Bar -->
      <rect x="155" y="85" width="85" height="16" rx="6" transform="rotate(10 155 85)" fill="#0f172a"/>
      <!-- Warm light cone -->
      <polygon points="170,105 130,260 250,260 230,115" fill="#fef08a" fill-opacity="0.35"/>
    </svg>
  `)}`,
  bag: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Handle -->
      <path d="M115 140 C115 85, 185 85, 185 140" stroke="#78350f" stroke-width="8" stroke-linecap="round" fill="none"/>
      <!-- Bag body -->
      <path d="M90 140 L210 140 L220 280 L80 280 Z" fill="#92400e" stroke="#78350f" stroke-width="3"/>
      <!-- Flap & Clasp -->
      <path d="M90 140 L210 140 L200 195 L100 195 Z" fill="#78350f"/>
      <rect x="140" y="185" width="20" height="20" rx="4" fill="#fbbf24"/>
    </svg>
  `)}`,
  perfume: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Cap -->
      <rect x="135" y="75" width="30" height="40" rx="4" fill="#0f172a"/>
      <rect x="142" y="115" width="16" height="15" fill="#fbbf24"/>
      <!-- Bottle Glass -->
      <rect x="95" y="130" width="110" height="160" rx="18" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
      <!-- Liquid -->
      <rect x="103" y="160" width="94" height="120" rx="10" fill="#a7f3d0" fill-opacity="0.6"/>
      <!-- Minimalist Label -->
      <rect x="115" y="180" width="70" height="50" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="150" y="202" fill="#065f46" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">XƏZƏR</text>
      <text x="150" y="217" fill="#64748b" font-size="7" font-family="sans-serif" text-anchor="middle">PARFÜM</text>
    </svg>
  `)}`,
  speaker: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Pill shaped waterproof speaker -->
      <rect x="80" y="100" width="140" height="180" rx="45" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
      <!-- Fabric texture dots simulation -->
      <circle cx="150" cy="150" r="30" fill="#334155"/>
      <circle cx="150" cy="225" r="30" fill="#334155"/>
      <!-- + / - controls -->
      <path d="M142 150 L158 150 M150 142 L150 158" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <path d="M142 225 L158 225" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <!-- Rugged strap loop -->
      <path d="M190 105 C210 100, 225 110, 220 135" stroke="#ea580c" stroke-width="6" stroke-linecap="round" fill="none"/>
    </svg>
  `)}`,
  juicer: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Machine body -->
      <path d="M110 90 L190 90 L180 280 L120 280 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>
      <!-- Feeder tube -->
      <rect x="135" y="50" width="30" height="40" fill="#64748b"/>
      <!-- Juice spout & cup -->
      <rect x="180" y="180" width="20" height="10" fill="#475569"/>
      <rect x="190" y="190" width="35" height="50" rx="4" fill="#fed7aa" stroke="#f97316"/>
      <line x1="185" y1="188" x2="195" y2="200" stroke="#ea580c" stroke-width="2"/>
    </svg>
  `)}`,
  mensBelt: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Belt coiled loops -->
      <circle cx="150" cy="190" r="85" stroke="#18181b" stroke-width="24" fill="none"/>
      <circle cx="150" cy="190" r="58" stroke="#27272a" stroke-width="22" fill="none"/>
      <!-- Stitching details -->
      <circle cx="150" cy="190" r="92" stroke="#71717a" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/>
      <!-- Silver buckle -->
      <rect x="130" y="80" width="70" height="52" rx="8" fill="#e4e4e7" stroke="#71717a" stroke-width="4"/>
      <rect x="144" y="92" width="42" height="28" rx="4" fill="#18181b"/>
      <line x1="165" y1="80" x2="165" y2="128" stroke="#71717a" stroke-width="5" stroke-linecap="round"/>
      <!-- Belt tip -->
      <path d="M128 106 L95 106 C88 106, 82 112, 82 120 C82 128, 88 134, 95 134 L128 134 Z" fill="#18181b"/>
      <circle cx="105" cy="120" r="3" fill="#71717a"/>
      <circle cx="118" cy="120" r="3" fill="#71717a"/>
    </svg>
  `)}`,
  mensWallet: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Shadow -->
      <ellipse cx="150" cy="275" rx="90" ry="14" fill="#cbd5e1" fill-opacity="0.5"/>
      <!-- Leather bifold wallet body -->
      <rect x="65" y="115" width="170" height="135" rx="14" fill="#1c1917" stroke="#0c0a09" stroke-width="3"/>
      <!-- Outer flap fold -->
      <path d="M65 135 L235 125 L235 240 L65 250 Z" fill="#292524" stroke="#44403c" stroke-width="2"/>
      <!-- Perimeter perimeter stitching -->
      <rect x="72" y="122" width="156" height="121" rx="10" stroke="#78716c" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/>
      <!-- Peaking credit cards -->
      <rect x="130" y="88" width="85" height="40" rx="6" fill="#047857" stroke="#065f46" stroke-width="1.5"/>
      <rect x="145" y="80" width="80" height="35" rx="6" fill="#b45309" stroke="#92400e" stroke-width="1.5"/>
      <!-- RFID Shield Emblem -->
      <circle cx="195" cy="210" r="14" fill="#0c0a09" stroke="#78716c" stroke-width="1.5"/>
      <path d="M190 210 A5 5 0 0 1 195 205 A5 5 0 0 1 200 210" stroke="#10b981" stroke-width="1.5" fill="none"/>
      <path d="M187 210 A9 9 0 0 1 195 201 A9 9 0 0 1 203 210" stroke="#10b981" stroke-width="1.5" fill="none"/>
    </svg>
  `)}`,
  mensCombo: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 375" fill="none">
      <rect width="300" height="375" fill="#f8fafc"/>
      <!-- Soft gradient background glow -->
      <circle cx="150" cy="187" r="120" fill="#f1f5f9"/>
      <!-- Belt coiled on left/top -->
      <g transform="translate(-15, -20) scale(0.85)">
        <circle cx="140" cy="165" r="70" stroke="#18181b" stroke-width="20" fill="none"/>
        <rect x="125" y="70" width="60" height="44" rx="6" fill="#e4e4e7" stroke="#71717a" stroke-width="3"/>
        <line x1="155" y1="70" x2="155" y2="114" stroke="#71717a" stroke-width="4"/>
      </g>
      <!-- Wallet on right/bottom overlapping -->
      <g transform="translate(15, 30) scale(0.85)">
        <rect x="110" y="145" width="140" height="110" rx="12" fill="#292524" stroke="#1c1917" stroke-width="3"/>
        <rect x="116" y="151" width="128" height="98" rx="8" stroke="#78716c" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/>
        <rect x="160" y="122" width="70" height="35" rx="5" fill="#047857"/>
        <circle cx="215" cy="218" r="12" fill="#0c0a09"/>
        <path d="M211 218 A4 4 0 0 1 215 214 A4 4 0 0 1 219 218" stroke="#10b981" stroke-width="1.5" fill="none"/>
      </g>
      <!-- Plus badge in center -->
      <circle cx="150" cy="187" r="16" fill="#059669" stroke="#ffffff" stroke-width="2"/>
      <path d="M144 187 L156 187 M150 141 L150 153" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M150 181 L150 193" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `)}`,
};

// 1 ACTIVE FLASH CAMPAIGN: «Həftəsonu flaş», 2 saat 14 dəq (8040 saniyə), 6 məhsul.
// Biri remainingStock: 3 -> limited.
export const MOCK_ACTIVE_FLASH_SALES: FlashSalesApiResponse = {
  sales: [
    {
      id: 'flash-wknd-2026',
      title: 'Həftəsonu flaş',
      secondsRemaining: 8040, // 2 saat 14 dəq
      items: [
        {
          id: 'flash-item-1',
          promoPrice: 89.90,
          originalPrice: 149.90,
          discountPercent: 40,
          remainingStock: 18,
          sold: 42,
          badge: 'Hot',
          product: {
            id: 101,
            name: 'Simsiz Səs-Küy Ləğvedici Qulaqlıq Pro ANC',
            slug: 'simsiz-ses-kuy-legvedici-qulaqliq-pro',
            price: 89.90,
            originalPrice: 149.90,
            discount: 40,
            image: PRODUCT_IMAGE_PLACEHOLDERS.headphones,
            rating: 4.8,
            sold: 42,
            stock: 18,
            seller: 'Aysu Elektronika',
            sellerSlug: 'aysu-elektronika',
            badge: 'Hot',
          },
        },
        {
          id: 'flash-item-2',
          promoPrice: 45.00,
          originalPrice: 75.00,
          discountPercent: 40,
          remainingStock: 8,
          sold: 92,
          badge: 'Yeni',
          product: {
            id: 102,
            name: 'Ağıllı Qolbaq FitTrack v4 Ürək Döyüntüsü və Addımölçən',
            slug: 'agilli-qolbaq-fittrack-v4',
            price: 45.00,
            originalPrice: 75.00,
            discount: 40,
            image: PRODUCT_IMAGE_PLACEHOLDERS.smartwatch,
            rating: 4.6,
            sold: 92,
            stock: 8,
            seller: 'Baku Kompüter Mərkəzi',
            sellerSlug: 'baku-komputer-merkezi',
            badge: 'Yeni',
          },
        },
        {
          id: 'flash-item-3',
          promoPrice: 389.00,
          originalPrice: 599.00,
          discountPercent: 35,
          remainingStock: 3, // Limited stock!
          sold: 47,
          badge: 'Məhdud Sayda',
          product: {
            id: 103,
            name: 'Robot Tozsoran SmartClean 360 Nəm və Quru Təmizləmə',
            slug: 'robot-tozsoran-smartclean-360',
            price: 389.00,
            originalPrice: 599.00,
            discount: 35,
            image: PRODUCT_IMAGE_PLACEHOLDERS.vacuum,
            rating: 4.9,
            sold: 47,
            stock: 3, // limited <= 5
            seller: 'Nərgiz Ev Dünyası',
            sellerSlug: 'nergiz-ev-dunyasi',
            badge: 'Məhdud Sayda',
          },
        },
        {
          id: 'flash-item-4',
          promoPrice: 62.50,
          originalPrice: 95.00,
          discountPercent: 34,
          remainingStock: 14,
          sold: 36,
          product: {
            id: 104,
            name: 'Portativ Qəhvə Dəmləyici EspressoGo 15 Bar',
            slug: 'portativ-qehve-demleyici-espressogo',
            price: 62.50,
            originalPrice: 95.00,
            discount: 34,
            image: PRODUCT_IMAGE_PLACEHOLDERS.coffee,
            rating: 4.5,
            sold: 36,
            stock: 14,
            seller: 'Nərgiz Ev Dünyası',
            sellerSlug: 'nergiz-ev-dunyasi',
          },
        },
        {
          id: 'flash-item-5',
          promoPrice: 79.99,
          originalPrice: 129.99,
          discountPercent: 38,
          remainingStock: 6,
          sold: 54,
          badge: 'Qeyminq',
          product: {
            id: 105,
            name: 'Mexaniki Qeyminq Klaviaturası RGB Mavi Sviçlər',
            slug: 'mexaniki-qeyming-klaviaturasi-rgb',
            price: 79.99,
            originalPrice: 129.99,
            discount: 38,
            image: PRODUCT_IMAGE_PLACEHOLDERS.keyboard,
            rating: 4.7,
            sold: 54,
            stock: 6,
            seller: 'Xəzər Texno Servis',
            sellerSlug: 'xezer-texno-servis',
            badge: 'Qeyminq',
          },
        },
        {
          id: 'flash-item-6',
          promoPrice: 52.00,
          originalPrice: 85.00,
          discountPercent: 39,
          remainingStock: 11,
          sold: 29,
          product: {
            id: 106,
            name: '4K Vebkamera UltraClear Pro İkili Mikrofon ilə',
            slug: '4k-vebkamera-ultraclear-pro',
            price: 52.00,
            originalPrice: 85.00,
            discount: 39,
            image: PRODUCT_IMAGE_PLACEHOLDERS.webcam,
            rating: 4.4,
            sold: 29,
            stock: 11,
            seller: 'Aysu Elektronika',
            sellerSlug: 'aysu-elektronika',
          },
        },
      ],
    },
  ],
};

// 8 DISCOUNTED PRODUCTS (week):
// - Biri hədiyyəli (gift)
// - Biri şəkilsiz (image: null)
// - Birinin reytinqi 0 (rating: 0 -> no star shown)
// - Realist Azərbaycan mağazaları
export const MOCK_ON_SALE_PRODUCTS: ProductsApiResponse = {
  count: 8,
  results: [
    {
      id: 201,
      name: 'Elektrikli Çaydan Şüşə Gövdəli LED İşıqlı 1.8L',
      slug: 'elektrikli-caydan-suse-govdeli-18l',
      price: 34.50,
      originalPrice: 49.00,
      discount: 30,
      image: PRODUCT_IMAGE_PLACEHOLDERS.kettle,
      rating: 4.6,
      sold: 84,
      stock: 19,
      seller: 'Nərgiz Ev Dünyası',
      sellerSlug: 'nergiz-ev-dunyasi',
      badge: 'Çox Satılan',
      gift: {
        name: 'Xüsusi Paslanmayan Dəmləmə Süzgəci',
      },
    },
    {
      id: 202,
      name: 'Erqonomik Ofis Kreslosu Ortopedik Bel Dəstəyi ilə',
      slug: 'erqonomik-ofis-kreslosu-bel-desteyi',
      price: 185.00,
      originalPrice: 245.00,
      discount: 24,
      image: null, // ŞƏKİLSİZ MƏHSUL (neytral yer tutucu testi)
      rating: 4.7,
      sold: 16,
      stock: 7,
      seller: 'Qafqaz Mebel Qrup',
      sellerSlug: 'qafqaz-mebel-qrup',
    },
    {
      id: 203,
      name: 'Avtomobil Üçün Simsiz Fast-Charge Telefon Saxlayıcısı',
      slug: 'avtomobil-ucun-simsiz-charge-saxlayici',
      price: 28.00,
      originalPrice: 38.00,
      discount: 26,
      image: PRODUCT_IMAGE_PLACEHOLDERS.carMount,
      rating: 0, // REYTİNQİ 0 (ulduz göstərilməyəcək)
      sold: 12,
      stock: 22,
      seller: 'Elmir Avto Hissələri',
      sellerSlug: 'elmir-avto-hisseleri',
      badge: 'Yeni',
    },
    {
      id: 204,
      name: 'Ağıllı LED Stolüstü Lampa Toxunuşlu İdarəetmə və Taymer',
      slug: 'agilli-led-stolustu-lampa-toxunuslu',
      price: 39.90,
      originalPrice: 55.00,
      discount: 27,
      image: PRODUCT_IMAGE_PLACEHOLDERS.lamp,
      rating: 4.8,
      sold: 41,
      stock: 15,
      seller: 'Aysu Elektronika',
      sellerSlug: 'aysu-elektronika',
    },
    {
      id: 205,
      name: 'Klassik Dəri Qadın Çantası Qızılı Aksessuar ilə',
      slug: 'klassik-deri-qadin-cantasi-qizili',
      price: 68.00,
      originalPrice: 95.00,
      discount: 28,
      image: PRODUCT_IMAGE_PLACEHOLDERS.bag,
      rating: 4.9,
      sold: 23,
      stock: 9,
      seller: 'Buta Dəb Evi',
      sellerSlug: 'buta-deb-evi',
    },
    {
      id: 206,
      name: 'Zərif Təbii Niş Parfüm «Xəzər Mehi» 100ml',
      slug: 'zerif-tebii-nis-parfum-xezer-mehi-100ml',
      price: 74.00,
      originalPrice: 110.00,
      discount: 33,
      image: PRODUCT_IMAGE_PLACEHOLDERS.perfume,
      rating: 4.9,
      sold: 37,
      stock: 12,
      seller: 'Gənclik Parfümeriya',
      sellerSlug: 'genclik-parfumeriya',
      badge: 'Seçilmiş',
    },
    {
      id: 207,
      name: 'Bluetooth Səsgücləndirici Suya və Toza Davamlı IPX7',
      slug: 'bluetooth-sesguclendirici-suya-davamli-ipx7',
      price: 54.00,
      originalPrice: 79.00,
      discount: 32,
      image: PRODUCT_IMAGE_PLACEHOLDERS.speaker,
      rating: 4.5,
      sold: 58,
      stock: 4, // Limited stock <= 5
      seller: 'Baku Kompüter Mərkəzi',
      sellerSlug: 'baku-komputer-merkezi',
    },
    {
      id: 208,
      name: 'Kompakt Dəmir Şirəçəkən Meyvə və Tərəvəz Üçün 800W',
      slug: 'kompakt-demir-sireceken-800w',
      price: 69.50,
      originalPrice: 98.00,
      discount: 29,
      image: PRODUCT_IMAGE_PLACEHOLDERS.juicer,
      rating: 4.3,
      sold: 19,
      stock: 16,
      seller: 'Nərgiz Ev Dünyası',
      sellerSlug: 'nergiz-ev-dunyasi',
    },
    {
      id: 301,
      name: 'Kişi Kolleksiyası: Dəri Kəmər və Pulqabı (İkisi bir yerdə)',
      slug: 'kisi-kolleksiyasi-deri-kemer-ve-pulqabi-ikisi-bir-yerde',
      price: 58.00,
      originalPrice: 100.00,
      discount: 42,
      image: PRODUCT_IMAGE_PLACEHOLDERS.mensCombo,
      rating: 4.9,
      sold: 63,
      stock: 12,
      seller: 'Milano Leather Baku',
      sellerSlug: 'milano-leather-baku',
      badge: 'İkisi bir yerdə',
      collectionBundle: {
        id: 'mens-combo-1',
        title: 'Kişi Klassik Premium Dəsti',
        subtitle: 'İtalyan təbii dəri kəmər və əl işi RFID qoruyuculu dəri pulqabı bir yerdə',
        category: 'Kişi Aksessuarları',
        tag: 'İkisi bir yerdə',
        discountPercent: 42,
        bundlePrice: 58.00,
        originalPrice: 100.00,
        items: [
          {
            id: 'men-item-1',
            name: 'Təbii İtalyan Dəri Kəmər (Klassik Qara, 120 sm)',
            brand: 'Milano Leather Co.',
            image: PRODUCT_IMAGE_PLACEHOLDERS.mensBelt,
            price: 32.00,
            originalPrice: 55.00,
            description: '100% təbii kətan dəri, paslanmayan fırçalanmış polad toqqa, həm kostyum, həm də cins üçün uyğun.',
            badge: '1-ci Məhsul',
          },
          {
            id: 'men-item-2',
            name: 'Əl İşi Dəri Pulqabı və Kart Saxlayıcı (RFID Shield)',
            brand: 'Milano Leather Co.',
            image: PRODUCT_IMAGE_PLACEHOLDERS.mensWallet,
            price: 26.00,
            originalPrice: 45.00,
            description: '8 kart bölməsi, şəxsi vəsiqə pəncərəsi və nağd pul cibi. Təhlükəsiz kontaktsız ödəniş bloklanması.',
            badge: '2-ci Məhsul',
          },
        ],
      },
    },
  ],
};

export const MOCK_MENS_COLLECTION: CollectionBundle = {
  id: 'mens-combo-1',
  title: 'Kişi Klassik Premium Dəsti',
  subtitle: 'İtalyan təbii dəri kəmər və əl işi RFID qoruyuculu dəri pulqabı bir yerdə',
  category: 'Kişi Aksessuarları',
  tag: 'İkisi bir yerdə',
  discountPercent: 42,
  bundlePrice: 58.00,
  originalPrice: 100.00,
  items: [
    {
      id: 'men-item-1',
      name: 'Təbii İtalyan Dəri Kəmər (Klassik Qara, 120 sm)',
      brand: 'Milano Leather Co.',
      image: PRODUCT_IMAGE_PLACEHOLDERS.mensBelt,
      price: 32.00,
      originalPrice: 55.00,
      description: '100% təbii kətan dəri, paslanmayan fırçalanmış polad toqqa, həm kostyum, həm də cins üçün uyğun.',
      badge: '1-ci Məhsul',
    },
    {
      id: 'men-item-2',
      name: 'Əl İşi Dəri Pulqabı və Kart Saxlayıcı (RFID Shield)',
      brand: 'Milano Leather Co.',
      image: PRODUCT_IMAGE_PLACEHOLDERS.mensWallet,
      price: 26.00,
      originalPrice: 45.00,
      description: '8 kart bölməsi, şəxsi vəsiqə pəncərəsi və nağd pul cibi. Təhlükəsiz kontaktsız ödəniş bloklanması.',
      badge: '2-ci Məhsul',
    },
  ],
};
