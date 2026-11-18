import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Product, StoreData, StoreProfile } from '../src/types/store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
export const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const STORE_DATA_FILE = path.join(DATA_DIR, 'store-data.json');

export const INITIAL_STORE_DATA: StoreData = {
  profile: {
    storeNameEn: 'Abdullah Essentials',
    storeNameBn: 'আবদুল্লাহ এসেনশিয়ালস',
    ownerNameEn: 'Abdullah',
    ownerNameBn: 'আবদুল্লাহ',
    taglineEn: 'Curated everyday tech, leather goods, workspace gear & lifestyle essentials in Bangladesh.',
    taglineBn: 'বাংলাদেশে মানসম্মত টেক গ্যাজেট, লেদার অ্যাক্সেসরিজ, ওয়ার্কস্পেস এবং লাইফস্টাইল প্রোডাক্টের বিশ্বস্ত সংগ্রহ।',
    aboutEn:
      'I am Abdullah, founder of Abdullah Essentials based in Dhaka, Bangladesh. I curate and test every product personally before listing—focusing on reliable build quality, honest stock availability, and straightforward Cash on Delivery across Bangladesh.',
    aboutBn:
      'আমি আবদুল্লাহ, ঢাকার আবদুল্লাহ এসেনশিয়ালস-এর প্রতিষ্ঠাতা। প্রতিটি প্রোডাক্ট স্টকে আনার আগে আমি নিজে মান যাচাই করি—যাতে ক্রেতারা সঠিক দাম, আসল স্টকের তথ্য এবং সারা বাংলাদেশে নিশ্চিন্ত ক্যাশ অন ডেলিভারি সুবিধা পান।',
    locationEn: 'Dhaka, Bangladesh',
    locationBn: 'ঢাকা, বাংলাদেশ',
    deliveryPolicyEn: 'Inside Dhaka: ৳70 (24–48 hours) · Outside Dhaka: ৳130 (2–4 business days). Cash on Delivery available nationwide.',
    deliveryPolicyBn: 'ঢাকার ভেতরে: ৳৭০ (২৪–৪৮ ঘণ্টা) · ঢাকার বাইরে: ৳১৩০ (২–৪ কার্যদিবস)। সারা দেশে ক্যাশ অন ডেলিভারি সুবিধা রয়েছে।',
    returnPolicyEn: '7-day easy replacement guarantee for any manufacturing defect or wrong item delivered.',
    returnPolicyBn: 'কোনো ম্যানুফ্যাকচারিং ত্রুটি বা ভুল প্রোডাক্ট ডেলিভারি হলে ৭ দিনের মধ্যে সহজ রিপ্লেসমেন্ট সুবিধা।',
    phone: '+880 1700-000000',
    whatsapp: '+880 1700-000000',
    email: 'abdullahdigitalmarketer2007@gmail.com',
  },
  products: [
    {
      id: 'anc-studio-headphones',
      sku: 'AE-AUD-101',
      nameEn: 'Matte Navy ANC Studio Headphones',
      nameBn: 'ম্যাট নেভি এএনসি স্টুডিও হেডফোন',
      categoryId: 'audio-tech',
      categoryEn: 'Audio & Tech',
      categoryBn: 'অডিও ও টেক',
      priceBdt: 4850,
      stock: 14,
      unitEn: 'pcs',
      unitBn: 'টি',
      descriptionEn:
        'Over-ear wireless headphones with hybrid active noise cancellation, brushed aluminum hinges, and 40-hour battery life with USB-C fast charging.',
      descriptionBn:
        'হাইব্রিড অ্যাক্টিভ নয়েজ ক্যান্সেলেশন, ব্রাশড অ্যালুমিনিয়াম ফ্রেম এবং ইউএসবি-সি ফাস্ট চার্জিংসহ ৪০ ঘণ্টা ব্যাটারি ব্যাকআপের প্রিমিয়াম ওয়্যারলেস হেডফোন।',
      specsEn: ['Bluetooth 5.3 dual-device pairing', '40h playback with ANC on', 'Memory foam ear cushions'],
      specsBn: ['ব্লুটুথ ৫.৩ ডুয়াল ডিভাইস পেয়ারিং', 'ANC সহ ৪০ ঘণ্টা প্লেব্যাক', 'সফট মেমোরি ফোম ইয়ার কুশন'],
      variants: ['Matte Navy', 'Charcoal Slate'],
      image: '/src/assets/images/product_wireless_headphones_1794994505931.jpg',
    },
    {
      id: 'titanium-smart-watch',
      sku: 'AE-WRB-204',
      nameEn: 'Titanium Minimalist Smart Watch',
      nameBn: 'টাইটেনিয়াম মিনিমালিস্ট স্মার্টওয়াচ',
      categoryId: 'wearables',
      categoryEn: 'Wearables',
      categoryBn: 'ওয়্যারেবলস',
      priceBdt: 6200,
      stock: 4,
      unitEn: 'pcs',
      unitBn: 'টি',
      descriptionEn:
        'Lightweight titanium-alloy smartwatch featuring a crisp always-on AMOLED dial, breathable woven nylon strap, and 10-day battery autonomy.',
      descriptionBn:
        'ক্রিস্প অলওয়েজ-অন AMOLED ডিসপ্লে, ব্রেথেবল ওভেন নাইলন স্ট্র্যাপ এবং ১০ দিনের ব্যাটারি ব্যাকআপসহ হালকা টাইটেনিয়াম স্মার্টওয়াচ।',
      specsEn: ['1.43" AMOLED sapphire-coated glass', '5ATM water resistance', 'Heart rate & sleep tracking'],
      specsBn: ['১.৪৩" AMOLED স্ক্রিন', '5ATM ওয়াটার রেজিস্ট্যান্স', 'হার্ট রেট ও স্লিপ ট্র্যাকিং'],
      variants: ['Slate Strap (44mm)', 'Olive Strap (44mm)'],
      image: '/src/assets/images/product_smart_watch_1794994506611.jpg',
    },
    {
      id: 'cognac-leather-sleeve',
      sku: 'AE-LTH-302',
      nameEn: 'Full-Grain Leather Laptop Sleeve & Cardholder',
      nameBn: 'ফুল-গ্রেইন লেদার ল্যাপটপ স্লিভ ও কার্ডহোল্ডার',
      categoryId: 'leather-carry',
      categoryEn: 'Leather & Carry',
      categoryBn: 'লেদার ও ক্যারি',
      priceBdt: 3400,
      stock: 9,
      unitEn: 'sets',
      unitBn: 'সেট',
      descriptionEn:
        'Handcrafted vegetable-tanned cognac leather sleeve lined with soft microfiber to fit 13"–14" laptops, paired with a matching 4-slot slim cardholder.',
      descriptionBn:
        '১৩"–১৪" ল্যাপটপের উপযোগী সফট মাইক্রোফাইবার লাইনিংসহ খাঁটি ফুল-গ্রেইন কগন্যাক লেদার স্লিভ এবং ম্যাচিং ৪-স্লট কার্ডহোল্ডার সেট।',
      specsEn: ['Fits 13" and 14" laptops', '100% full-grain cowhide leather', 'Includes matching cardholder'],
      specsBn: ['১৩" ও ১৪" ল্যাপটপের জন্য উপযুক্ত', '১০০% খাঁটি ফুল-গ্রেইন লেদার', 'ম্যাচিং কার্ডহোল্ডার অন্তর্ভুক্ত'],
      variants: ['Cognac Tan', 'Espresso Brown'],
      image: '/src/assets/images/product_leather_sleeve_1794994507303.jpg',
    },
    {
      id: 'tactile-wireless-keyboard',
      sku: 'AE-WRK-408',
      nameEn: '75% Aluminum Wireless Mechanical Keyboard',
      nameBn: '৭৫% অ্যালুমিনিয়াম ওয়্যারলেস মেকানিক্যাল কিবোর্ড',
      categoryId: 'workspace',
      categoryEn: 'Workspace Tech',
      categoryBn: 'ওয়ার্কস্পেস টেক',
      priceBdt: 7450,
      stock: 6,
      unitEn: 'pcs',
      unitBn: 'টি',
      descriptionEn:
        'Gasket-mounted 75% mechanical keyboard with hot-swappable tactile switches, rotary volume knob, and tri-mode wireless connectivity for Mac & Windows.',
      descriptionBn:
        'হট-সোয়্যাপেবল ট্যাকটাইল সুইচ, রোটারি ভলিউম নব এবং Mac ও Windows-এর জন্য ট্রাই-মোড কানেক্টিভিটিসহ ৭৫% মেকানিক্যাল কিবোর্ড।',
      specsEn: ['Tri-mode: 2.4GHz, Bluetooth & USB-C', 'PBT double-shot keycaps', '4000mAh rechargeable battery'],
      specsBn: ['ট্রাই-মোড: 2.4GHz, ব্লুটুথ ও USB-C', 'PBT ডাবল-শট কিক্যাপ', '৪০০০mAh রিচার্জেবল ব্যাটারি'],
      variants: ['Cream & Charcoal (Tactile)', 'Cream & Charcoal (Linear)'],
      image: '/src/assets/images/product_mechanical_keyboard_1794994508040.jpg',
    },
    {
      id: 'botanical-face-serum',
      sku: 'AE-PRC-510',
      nameEn: 'Botanical Daily Hydration Serum (30ml)',
      nameBn: 'বোটানিক্যাল ডেইলি হাইড্রেশন সিরাম (৩০ মিলি)',
      categoryId: 'personal-care',
      categoryEn: 'Personal Care',
      categoryBn: 'পার্সোনাল কেয়ার',
      priceBdt: 1650,
      stock: 18,
      unitEn: 'bottles',
      unitBn: 'বোতল',
      descriptionEn:
        'Lightweight, fragrance-free botanical hydration serum enriched with hyaluronic acid, niacinamide, and cold-pressed jojoba oil for daily skin barrier support.',
      descriptionBn:
        'হায়ালুরোনিক অ্যাসিড, নিয়াসিনামাইড এবং কোল্ড-প্রেসড জোজোবা অয়েল সমৃদ্ধ হালকা ও ফ্র্যাগ্র্যান্স-ফ্রি দৈনন্দিন হাইড্রেশন সিরাম।',
      specsEn: ['Dermatologically tested formula', 'UV-protected amber glass bottle', 'Suitable for all skin types'],
      specsBn: ['সব ধরনের ত্বকের জন্য উপযোগী', 'UV-প্রটেক্টেড অ্যাম্বার গ্লাস বোতল', '৩০ মিলি ড্রপার বোতল'],
      variants: ['30ml Standard Bottle'],
      image: '/src/assets/images/product_amber_serum_1794994507793.jpg',
    },
    {
      id: 'ceramic-pour-over-set',
      sku: 'AE-HML-612',
      nameEn: 'Insulated Ceramic Tumbler & Pour-Over Set',
      nameBn: 'ইনসুলেটেড সিরামিক টাম্বলার ও পোর-ওভার সেট',
      categoryId: 'home-living',
      categoryEn: 'Home & Living',
      categoryBn: 'হোম ও লিভিং',
      priceBdt: 2950,
      stock: 0,
      unitEn: 'sets',
      unitBn: 'সেট',
      descriptionEn:
        'Matte slate-teal double-wall ceramic-lined travel tumbler paired with a stoneware pour-over dripper and borosilicate carafe.',
      descriptionBn:
        'ম্যাট স্লেট-টিল ডাবল-ওয়াল সিরামিক ট্রাভেল টাম্বলার এবং স্টোনওয়্যার পোর-ওভার কফি ড্রিপার ও গ্লাস কারাফ সেট।',
      specsEn: ['350ml ceramic-coated interior', 'Keeps drinks hot up to 6 hours', 'Includes dripper & glass server'],
      specsBn: ['৩৫০ মিলি সিরামিক-কোটেড ইন্টেরিয়র', '৬ ঘণ্টা পর্যন্ত গরম থাকে', 'ড্রিপার ও গ্লাস সার্ভার অন্তর্ভুক্ত'],
      variants: ['Slate Teal Set'],
      image: '/src/assets/images/product_ceramic_tumbler_1794994507989.jpg',
    },
  ],
};

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function loadStoreData(): StoreData {
  ensureDataDir();
  if (!fs.existsSync(STORE_DATA_FILE)) {
    fs.writeFileSync(STORE_DATA_FILE, JSON.stringify(INITIAL_STORE_DATA, null, 2), 'utf-8');
    return structuredClone(INITIAL_STORE_DATA);
  }
  try {
    const raw = fs.readFileSync(STORE_DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<StoreData>;
    if (!parsed || !parsed.profile || !Array.isArray(parsed.products)) {
      return structuredClone(INITIAL_STORE_DATA);
    }
    return {
      profile: { ...INITIAL_STORE_DATA.profile, ...parsed.profile },
      products: parsed.products,
    };
  } catch {
    return structuredClone(INITIAL_STORE_DATA);
  }
}

export function saveStoreData(data: StoreData): void {
  ensureDataDir();
  fs.writeFileSync(STORE_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function updateStoreProfile(partial: Partial<StoreProfile>): StoreData {
  const current = loadStoreData();
  current.profile = {
    ...current.profile,
    ...partial,
  };
  saveStoreData(current);
  return current;
}

export function addProduct(product: Product): StoreData {
  const current = loadStoreData();
  current.products.unshift(product);
  saveStoreData(current);
  return current;
}

export function updateProduct(
  id: string,
  updates: Partial<Pick<Product, 'stock' | 'priceBdt' | 'nameEn' | 'nameBn' | 'descriptionEn' | 'descriptionBn' | 'image'>>
): Product | null {
  const current = loadStoreData();
  const idx = current.products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  current.products[idx] = {
    ...current.products[idx],
    ...updates,
  };
  saveStoreData(current);
  return current.products[idx];
}

export function deleteProduct(id: string): boolean {
  const current = loadStoreData();
  const next = current.products.filter((p) => p.id !== id);
  if (next.length === current.products.length) return false;
  current.products = next;
  saveStoreData(current);
  return true;
}

export function buildStoreSystemPrompt(data: StoreData, focusedProductId?: string): string {
  const { profile, products } = data;
  const focusedProduct = focusedProductId ? products.find((p) => p.id === focusedProductId) : undefined;

  const inventoryLines = products
    .map((p) => {
      const stockStatus =
        p.stock <= 0 ? 'OUT OF STOCK (0 left)' : p.stock <= 5 ? `LOW STOCK (${p.stock} ${p.unitEn} left)` : `IN STOCK (${p.stock} ${p.unitEn} available)`;
      return `- [${p.sku}] ${p.nameEn} (${p.nameBn}) | Category: ${p.categoryEn} (${p.categoryBn}) | Price: ৳${p.priceBdt} BDT | Stock: ${stockStatus} | Variants: ${p.variants.join(', ')} | Details: ${p.descriptionEn} / ${p.descriptionBn}`;
    })
    .join('\n');

  const focusContext = focusedProduct
    ? `\nThe customer is currently viewing this product: "${focusedProduct.nameEn}" (${focusedProduct.nameBn}), SKU ${focusedProduct.sku}, Price ৳${focusedProduct.priceBdt}, Stock: ${focusedProduct.stock}.`
    : '';

  return `You are the official AI Product & Store Assistant for "${profile.storeNameEn}" (${profile.storeNameBn}), owned by ${profile.ownerNameEn} (${profile.ownerNameBn}).

LANGUAGE RULE:
- Detect the customer's language automatically.
- If they write in Bangla (বাংলা), reply in clear, warm, natural Bangla.
- If they write in Banglish (Bengali written in English letters), reply in polite, easy-to-read Bangla or friendly Banglish.
- If they write in English, reply in clear, concise English.

STRICT ACCURACY RULE:
- Answer ONLY using the live Store Profile and Live Product Inventory below.
- NEVER invent products, prices, discounts, warranties, or stock numbers that are not listed below.
- If a product has stock = 0, clearly tell the customer it is currently out of stock and suggest similar in-stock items from the catalog.
- Keep answers concise, friendly, and well-structured with bullet points when listing multiple products or specs.

STORE & OWNER INFORMATION:
- Store Name: ${profile.storeNameEn} (${profile.storeNameBn})
- Owner: ${profile.ownerNameEn} (${profile.ownerNameBn})
- Location: ${profile.locationEn} (${profile.locationBn})
- About Owner & Store (EN): ${profile.aboutEn}
- About Owner & Store (BN): ${profile.aboutBn}
- Delivery Policy (EN): ${profile.deliveryPolicyEn}
- Delivery Policy (BN): ${profile.deliveryPolicyBn}
- Return Policy (EN): ${profile.returnPolicyEn}
- Return Policy (BN): ${profile.returnPolicyBn}
- Phone / WhatsApp: ${profile.phone} / ${profile.whatsapp}
- Email: ${profile.email}

LIVE PRODUCT INVENTORY (${products.length} total products):
${inventoryLines}${focusContext}`;
}
