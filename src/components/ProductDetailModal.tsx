import React, { useEffect, useState } from 'react';
import { Bot, Check, Minus, Package, Plus, X } from 'lucide-react';
import { formatBdt, type StoreStrings } from '../data/storeStrings';
import type { Product, StoreLanguage } from '../types/store';

interface ProductDetailModalProps {
  product: Product | null;
  language: StoreLanguage;
  strings: StoreStrings['productModal'];
  catalogStrings: StoreStrings['catalog'];
  onClose: () => void;
  onAddToCart: (product: Product, variant: string, quantity: number) => void;
  onAskAi: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  language,
  strings,
  catalogStrings,
  onClose,
  onAddToCart,
  onAskAi,
}) => {
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0] || 'Standard');
      setQuantity(1);
      setImgError(false);
    }
  }, [product]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const title = language === 'bn' ? product.nameBn : product.nameEn;
  const category = language === 'bn' ? product.categoryBn : product.categoryEn;
  const desc = language === 'bn' ? product.descriptionBn : product.descriptionEn;
  const specs = language === 'bn' ? product.specsBn : product.specsEn;
  const unit = language === 'bn' ? product.unitBn : product.unitEn;

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const stockText = isOutOfStock
    ? catalogStrings.outOfStockText
    : isLowStock
    ? catalogStrings.lowStockText(product.stock, unit)
    : catalogStrings.inStockText(product.stock, unit);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0B1220]/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="my-8 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-2xl dark:border-[#1E293B] dark:bg-[#111B2E]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Gallery */}
          <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] md:col-span-6 md:border-b-0 md:border-r dark:border-[#1E293B] dark:bg-[#0F172A]">
            <div className="aspect-[4/3] h-full w-full overflow-hidden">
              {product.image && !imgError ? (
                <img
                  src={product.image}
                  alt={title}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[260px] flex-col items-center justify-center p-8 text-center">
                  <Package className="h-10 w-10 text-[#0F766E] dark:text-[#2DD4BF]" />
                  <p className="mt-2 text-sm font-medium text-[#52627A] dark:text-[#94A3B8]">
                    {title}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="flex flex-col justify-between p-6 sm:p-7 md:col-span-6">
            <div>
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#0F766E] dark:text-[#2DD4BF]">
                  {category} · {strings.skuLabel}: {product.sku}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={strings.close}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#334155] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h3
                id="pdp-title"
                className="mt-2 text-xl font-bold leading-snug text-[#142033] dark:text-[#F1F5F9] sm:text-2xl"
              >
                {title}
              </h3>

              <div className="mt-3 flex items-baseline gap-3">
                <p className="font-mono text-2xl font-bold tabular-nums text-[#142033] dark:text-[#F1F5F9]">
                  {formatBdt(product.priceBdt, language)}
                </p>
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    isOutOfStock
                      ? 'text-red-600 dark:text-red-400'
                      : isLowStock
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-[#0F766E] dark:text-[#2DD4BF]'
                  }`}
                >
                  {stockText}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                {desc}
              </p>

              {specs.length > 0 ? (
                <div className="mt-5 border-t border-[#E2E8F0] pt-4 dark:border-[#1E293B]">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#142033] dark:text-[#F1F5F9]">
                    {strings.specsLabel}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-start gap-2 text-xs text-[#52627A] dark:text-[#94A3B8]"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F766E] dark:text-[#2DD4BF]"
                          aria-hidden="true"
                        />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Variants */}
              {product.variants.length > 0 ? (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {strings.variantLabel}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variants.map((variant) => {
                      const active = selectedVariant === variant;
                      return (
                        <button
                          key={variant}
                          type="button"
                          onClick={() => setSelectedVariant(variant)}
                          className={`min-h-[36px] rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                            active
                              ? 'border-[#1D4ED8] bg-[#1D4ED8]/10 text-[#1D4ED8] dark:border-[#60A5FA] dark:bg-[#60A5FA]/15 dark:text-[#60A5FA]'
                              : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#52627A] hover:text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
                          }`}
                        >
                          {variant}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Quantity & Actions */}
            <div className="mt-6 space-y-3 border-t border-[#E2E8F0] pt-5 dark:border-[#1E293B]">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#334155] dark:bg-[#0F172A]">
                  <button
                    type="button"
                    disabled={isOutOfStock || quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="inline-flex h-10 w-10 items-center justify-center text-[#142033] disabled:opacity-40 dark:text-[#F1F5F9] cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-[32px] text-center font-mono text-sm font-semibold tabular-nums text-[#142033] dark:text-[#F1F5F9]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    disabled={isOutOfStock || quantity >= product.stock}
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    aria-label="Increase quantity"
                    className="inline-flex h-10 w-10 items-center justify-center text-[#142033] disabled:opacity-40 dark:text-[#F1F5F9] cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => {
                    onAddToCart(product, selectedVariant || 'Standard', quantity);
                    onClose();
                  }}
                  className="inline-flex min-h-[42px] flex-1 items-center justify-center rounded-lg bg-[#1D4ED8] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] disabled:cursor-not-allowed disabled:bg-[#94A3B8] cursor-pointer"
                >
                  {isOutOfStock ? catalogStrings.outOfStockText : strings.addToBag}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onAskAi(product);
                }}
                className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-xs font-semibold text-[#142033] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8] cursor-pointer dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
              >
                <Bot className="h-4 w-4 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                <span>{strings.askAiAboutItem}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
