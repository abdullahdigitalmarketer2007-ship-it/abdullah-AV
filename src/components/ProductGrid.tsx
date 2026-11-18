import React, { useMemo, useState } from 'react';
import { Bot, Check, Package, Plus, Search, X } from 'lucide-react';
import { formatBdt, type StoreStrings } from '../data/storeStrings';
import type { Product, ProductCategoryId, StoreLanguage } from '../types/store';

interface ProductGridProps {
  products: Product[];
  language: StoreLanguage;
  strings: StoreStrings['catalog'];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, variant: string, quantity: number) => void;
  onAskAiAboutProduct: (product: Product) => void;
}

const ProductCardImage: React.FC<{
  src: string;
  alt: string;
  title: string;
}> = ({ src, alt, title }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] p-6 text-center dark:from-[#0F172A] dark:to-[#1E293B]">
        <Package className="h-8 w-8 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
        <p className="mt-2 line-clamp-2 text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
          {title}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
    />
  );
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  language,
  strings,
  onSelectProduct,
  onAddToCart,
  onAskAiAboutProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | ProductCategoryId>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      if (activeCategory !== 'all' && product.categoryId !== activeCategory) {
        return false;
      }
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      if (!query) return true;
      const haystack = `${product.nameEn} ${product.nameBn} ${product.categoryEn} ${product.categoryBn} ${product.sku} ${product.descriptionEn} ${product.descriptionBn}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [products, activeCategory, inStockOnly, searchQuery]);

  const handleQuickAdd = (product: Product) => {
    if (product.stock <= 0) return;
    onAddToCart(product, product.variants[0] || 'Standard', 1);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  return (
    <section
      id="products"
      className="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#0B1220]"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
            {strings.kicker}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142033] dark:text-[#F1F5F9] sm:text-3xl">
            {strings.heading}
          </h2>
          <p className="mt-3 text-base text-[#52627A] dark:text-[#94A3B8]">{strings.subheading}</p>
        </div>

        {/* Search + Category Filters + In-Stock Toggle */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52627A] dark:text-[#94A3B8]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={strings.searchPlaceholder}
                aria-label={strings.searchPlaceholder}
                className="min-h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] pl-10 pr-9 text-sm text-[#142033] placeholder:text-[#52627A] focus:border-[#1D4ED8] focus:outline-none dark:border-[#1E293B] dark:bg-[#111B2E] dark:text-[#F1F5F9] dark:placeholder:text-[#94A3B8] dark:focus:border-[#60A5FA]"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9] cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setInStockOnly((prev) => !prev)}
              aria-pressed={inStockOnly}
              className={`inline-flex min-h-[40px] items-center gap-2 self-start rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer sm:self-auto ${
                inStockOnly
                  ? 'border-[#0F766E] bg-[#0F766E]/10 text-[#0F766E] dark:border-[#2DD4BF] dark:bg-[#2DD4BF]/10 dark:text-[#2DD4BF]'
                  : 'border-[#E2E8F0] bg-[#FFFFFF] text-[#52627A] hover:text-[#142033] dark:border-[#1E293B] dark:bg-[#111B2E] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
              }`}
            >
              <span>{strings.inStockOnly}</span>
            </button>
          </div>

          <div
            role="group"
            aria-label="Product categories"
            className="flex flex-wrap items-center gap-1.5 self-start rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-1 dark:border-[#1E293B] dark:bg-[#111B2E]"
          >
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              aria-pressed={activeCategory === 'all'}
              className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#142033] text-white dark:bg-[#1D4ED8]'
                  : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
              }`}
            >
              {strings.allCategories}
            </button>

            {strings.categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={active}
                  className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#142033] text-white dark:bg-[#1D4ED8]'
                      : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-12 text-center dark:border-[#1E293B] dark:bg-[#111B2E]">
            <p className="text-base font-bold text-[#142033] dark:text-[#F1F5F9]">
              {strings.emptyTitle}
            </p>
            <p className="mt-1.5 text-sm text-[#52627A] dark:text-[#94A3B8]">
              {strings.emptySubtitle}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setInStockOnly(false);
              }}
              className="mt-5 inline-flex min-h-[40px] items-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E40AF] cursor-pointer"
            >
              {strings.resetFilters}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const title = language === 'bn' ? product.nameBn : product.nameEn;
              const categoryLabel = language === 'bn' ? product.categoryBn : product.categoryEn;
              const unit = language === 'bn' ? product.unitBn : product.unitEn;
              const desc = language === 'bn' ? product.descriptionBn : product.descriptionEn;
              const isOutOfStock = product.stock <= 0;
              const isLowStock = product.stock > 0 && product.stock <= 5;
              const stockLabel = isOutOfStock
                ? strings.outOfStockText
                : isLowStock
                ? strings.lowStockText(product.stock, unit)
                : strings.inStockText(product.stock, unit);

              const addedNow = recentlyAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:shadow-md motion-reduce:hover:translate-y-0 dark:border-[#1E293B] dark:bg-[#111B2E] dark:hover:border-[#334155]"
                >
                  <div>
                    {/* Product Image (4:3 uniform aspect) */}
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      aria-label={`${strings.viewDetails}: ${title}`}
                      className="block aspect-[4/3] w-full overflow-hidden border-b border-[#E2E8F0] bg-[#F8FAFC] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1D4ED8] cursor-pointer dark:border-[#1E293B] dark:bg-[#0F172A]"
                    >
                      <ProductCardImage src={product.image} alt={title} title={title} />
                    </button>

                    {/* Clean Unboxed Metadata + Title + Price */}
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="font-semibold uppercase tracking-wide text-[#52627A] dark:text-[#94A3B8]">
                          {categoryLabel}
                        </span>
                        <span aria-hidden="true" className="text-[#CBD5E1] dark:text-[#334155]">
                          ·
                        </span>
                        <span
                          className={`font-semibold tabular-nums ${
                            isOutOfStock
                              ? 'text-red-600 dark:text-red-400'
                              : isLowStock
                              ? 'text-amber-700 dark:text-amber-400'
                              : 'text-[#0F766E] dark:text-[#2DD4BF]'
                          }`}
                        >
                          {stockLabel}
                        </span>
                      </div>

                      <div className="mt-2 flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold leading-snug text-[#142033] dark:text-[#F1F5F9]">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="text-left transition-colors hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] cursor-pointer"
                          >
                            {title}
                          </button>
                        </h3>
                        <p className="shrink-0 font-mono text-base font-bold tabular-nums text-[#142033] dark:text-[#F1F5F9]">
                          {formatBdt(product.priceBdt, language)}
                        </p>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Actions: Add to Bag + Ask AI */}
                  <div className="border-t border-[#E2E8F0] px-5 py-4 sm:px-6 dark:border-[#1E293B]">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        disabled={isOutOfStock}
                        onClick={() => handleQuickAdd(product)}
                        className={`inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                          isOutOfStock
                            ? 'cursor-not-allowed border border-[#E2E8F0] bg-[#F8FAFC] text-[#94A3B8] dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#64748B]'
                            : addedNow
                            ? 'bg-[#0F766E] text-white cursor-pointer'
                            : 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF] cursor-pointer'
                        }`}
                      >
                        {addedNow ? (
                          <>
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{strings.addedToBag}</span>
                          </>
                        ) : (
                          <>
                            {!isOutOfStock ? <Plus className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                            <span>{isOutOfStock ? strings.outOfStockText : strings.addToBag}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onAskAiAboutProduct(product)}
                        className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#142033] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8] whitespace-nowrap shrink-0 cursor-pointer dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                      >
                        <Bot className="h-3.5 w-3.5 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                        <span>{strings.askAi}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
