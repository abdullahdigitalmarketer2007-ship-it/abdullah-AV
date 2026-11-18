/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { AboutStoreSection } from './components/AboutStoreSection';
import { AiChatAssistant } from './components/AiChatAssistant';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductGrid } from './components/ProductGrid';
import { StoreFooter } from './components/StoreFooter';
import { StoreHeader } from './components/StoreHeader';
import { StoreHero } from './components/StoreHero';
import { StoreManagerModal } from './components/StoreManagerModal';
import { STORE_STRINGS } from './data/storeStrings';
import type { CartItem, Product, StoreData, StoreLanguage } from './types/store';

type ThemeMode = 'light' | 'dark';

const FALLBACK_STORE: StoreData = {
  profile: {
    storeNameEn: 'Abdullah Essentials',
    storeNameBn: 'আবদুল্লাহ এসেনশিয়ালস',
    ownerNameEn: 'Abdullah',
    ownerNameBn: 'আবদুল্লাহ',
    taglineEn: 'Curated everyday tech, leather goods, workspace gear & lifestyle essentials in Bangladesh.',
    taglineBn: 'বাংলাদেশে মানসম্মত টেক গ্যাজেট, লেদার অ্যাক্সেসরিজ, ওয়ার্কস্পেস এবং লাইফস্টাইল প্রোডাক্টের বিশ্বস্ত সংগ্রহ।',
    aboutEn:
      'I am Abdullah, founder of Abdullah Essentials based in Dhaka, Bangladesh. Every item is personally quality-checked before listing.',
    aboutBn:
      'আমি আবদুল্লাহ, ঢাকার আবদুল্লাহ এসেনশিয়ালস-এর প্রতিষ্ঠাতা। প্রতিটি প্রোডাক্ট স্টকে আনার আগে আমি নিজে মান যাচাই করি।',
    locationEn: 'Dhaka, Bangladesh',
    locationBn: 'ঢাকা, বাংলাদেশ',
    deliveryPolicyEn: 'Inside Dhaka: ৳70 · Outside Dhaka: ৳130. Cash on Delivery nationwide.',
    deliveryPolicyBn: 'ঢাকার ভেতরে: ৳৭০ · ঢাকার বাইরে: ৳১৩০। সারা দেশে ক্যাশ অন ডেলিভারি।',
    returnPolicyEn: '7-day easy replacement guarantee for defects or wrong items.',
    returnPolicyBn: 'ত্রুটি বা ভুল প্রোডাক্টের ক্ষেত্রে ৭ দিনের সহজ রিপ্লেসমেন্ট সুবিধা।',
    phone: '+880 1700-000000',
    whatsapp: '+880 1700-000000',
    email: 'abdullahdigitalmarketer2007@gmail.com',
  },
  products: [],
};

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  if (document.documentElement.classList.contains('dark')) return 'dark';
  try {
    const saved = window.localStorage.getItem('portfolio_theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // Ignore storage access errors
  }
  return 'light';
}

function getInitialLanguage(): StoreLanguage {
  if (typeof window === 'undefined') return 'bn';
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang === 'en' || urlLang === 'bn') return urlLang;
  try {
    const saved = window.localStorage.getItem('store_lang');
    if (saved === 'en' || saved === 'bn') return saved;
  } catch {
    // Ignore storage access errors
  }
  return 'bn';
}

export default function App() {
  const [language, setLanguage] = useState<StoreLanguage>(getInitialLanguage);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [store, setStore] = useState<StoreData>(FALLBACK_STORE);
  const [loadingStore, setLoadingStore] = useState(true);
  const [storeLoadError, setStoreLoadError] = useState('');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [managerOpen, setManagerOpen] = useState(false);

  const [aiOpen, setAiOpen] = useState(false);
  const [focusedProduct, setFocusedProduct] = useState<Product | null>(null);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const strings = STORE_STRINGS[language];

  const fetchStore = useCallback(async () => {
    setLoadingStore(true);
    setStoreLoadError('');
    try {
      const res = await fetch('/api/store');
      if (!res.ok) throw new Error('Unable to load store inventory.');
      const data = (await res.json()) as StoreData;
      if (data?.profile && Array.isArray(data.products)) {
        setStore(data);
      }
    } catch {
      setStoreLoadError(
        language === 'bn'
          ? 'প্রোডাক্ট তথ্য লোড করা যায়নি। অনুগ্রহ করে পেজটি রিফ্রেশ করুন।'
          : 'Could not load live product catalog. Please refresh.'
      );
    } finally {
      setLoadingStore(false);
    }
  }, [language]);

  useEffect(() => {
    void fetchStore();
  }, [fetchStore]);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem('store_lang', language);
    } catch {
      // Ignore storage access errors
    }
  }, [language]);

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    try {
      window.localStorage.setItem('portfolio_theme', theme);
    } catch {
      // Ignore storage access errors
    }
  }, [theme]);

  useEffect(() => {
    const storeTitle =
      language === 'bn'
        ? `${store.profile.storeNameBn} – প্রোডাক্ট কালেকশন ও AI অ্যাসিস্ট্যান্ট`
        : `${store.profile.storeNameEn} – Curated Products & AI Assistant`;
    document.title = storeTitle;
  }, [language, store.profile.storeNameBn, store.profile.storeNameEn]);

  const handleAddToCart = useCallback((product: Product, variant: string, quantity: number) => {
    if (product.stock <= 0) return;
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.variant === variant
      );
      if (existingIdx >= 0) {
        const next = [...prev];
        const nextQty = Math.min(product.stock, next[existingIdx].quantity + quantity);
        next[existingIdx] = { ...next[existingIdx], product, quantity: nextQty };
        return next;
      }
      return [...prev, { product, variant, quantity: Math.min(product.stock, quantity) }];
    });
  }, []);

  const handleUpdateCartQuantity = useCallback((productId: string, variant: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id !== productId || item.variant !== variant) return item;
          const nextQty = Math.min(item.product.stock, item.quantity + delta);
          return nextQty <= 0 ? null : { ...item, quantity: nextQty };
        })
        .filter((x): x is CartItem => x !== null)
    );
  }, []);

  const handleRemoveCartItem = useCallback((productId: string, variant: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.variant === variant))
    );
  }, []);

  const handleAskAiAboutProduct = useCallback(
    (product: Product) => {
      setFocusedProduct(product);
      const name = language === 'bn' ? product.nameBn : product.nameEn;
      const autoQuestion =
        language === 'bn'
          ? `"${name}" প্রোডাক্টটি সম্পর্কে বিস্তারিত বলুন—এখন কতগুলো স্টকে আছে এবং দাম কত?`
          : `Tell me about "${name}" — is it currently in stock, how many are left, and what are its key details?`;
      setPendingPrompt(autoQuestion);
      setAiOpen(true);
    },
    [language]
  );

  const handleAskAiAboutStore = useCallback(() => {
    setFocusedProduct(null);
    const autoQuestion =
      language === 'bn'
        ? 'আপনার এবং আপনার দোকান সম্পর্কে বিস্তারিত জানান, আর এখন কী কী স্টকে আছে?'
        : 'Tell me about the store owner, delivery policy, and what products are currently in stock.';
    setPendingPrompt(autoQuestion);
    setAiOpen(true);
  }, [language]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const storeName = language === 'bn' ? store.profile.storeNameBn : store.profile.storeNameEn;
  const storeTagline = language === 'bn' ? store.profile.taglineBn : store.profile.taglineEn;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#142033] transition-colors duration-200 dark:bg-[#0B1220] dark:text-[#F1F5F9]">
      <StoreHeader
        storeName={storeName}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        strings={strings.nav}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenManager={() => setManagerOpen(true)}
        onOpenAi={() => setAiOpen(true)}
      />

      <main>
        <StoreHero
          strings={strings.hero}
          storeTagline={storeTagline}
          onOpenAi={() => setAiOpen(true)}
        />

        {storeLoadError ? (
          <div className="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
              {storeLoadError}
            </div>
          </div>
        ) : null}

        {loadingStore && store.products.length === 0 ? (
          <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="h-80 animate-pulse rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E]"
                />
              ))}
            </div>
          </section>
        ) : (
          <ProductGrid
            products={store.products}
            language={language}
            strings={strings.catalog}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onAskAiAboutProduct={handleAskAiAboutProduct}
          />
        )}

        <AboutStoreSection
          profile={store.profile}
          language={language}
          strings={strings.about}
          onOpenManager={() => setManagerOpen(true)}
          onOpenAiForStore={handleAskAiAboutStore}
        />
      </main>

      <StoreFooter
        profile={store.profile}
        language={language}
        strings={strings.footer}
        navStrings={strings.nav}
        onOpenAi={() => setAiOpen(true)}
        onOpenManager={() => setManagerOpen(true)}
      />

      <ProductDetailModal
        product={selectedProduct}
        language={language}
        strings={strings.productModal}
        catalogStrings={strings.catalog}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onAskAi={handleAskAiAboutProduct}
      />

      <CartDrawer
        open={cartOpen}
        items={cart}
        language={language}
        strings={strings.cart}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOrderSuccess={(updatedStore) => {
          setStore(updatedStore);
          setCart([]);
        }}
      />

      <StoreManagerModal
        open={managerOpen}
        store={store}
        language={language}
        strings={strings.manager}
        catalogStrings={strings.catalog}
        onClose={() => setManagerOpen(false)}
        onStoreUpdated={(next) => setStore(next)}
      />

      <AiChatAssistant
        open={aiOpen}
        onOpenChange={setAiOpen}
        language={language}
        strings={strings.ai}
        profile={store.profile}
        focusedProduct={focusedProduct}
        onClearFocusedProduct={() => setFocusedProduct(null)}
        pendingPrompt={pendingPrompt}
        onConsumePendingPrompt={() => setPendingPrompt(null)}
      />
    </div>
  );
}
