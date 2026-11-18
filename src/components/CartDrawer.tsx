import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { formatBdt, type StoreStrings } from '../data/storeStrings';
import type { CartItem, OrderReceipt, StoreData, StoreLanguage } from '../types/store';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  language: StoreLanguage;
  strings: StoreStrings['cart'];
  onClose: () => void;
  onUpdateQuantity: (productId: string, variant: string, delta: number) => void;
  onRemoveItem: (productId: string, variant: string) => void;
  onOrderSuccess: (updatedStore: StoreData) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  items,
  language,
  strings,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.priceBdt * item.quantity, 0);
  const deliveryFee = items.length > 0 ? (deliveryArea === 'outside' ? 130 : 70) : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          deliveryArea,
          address,
          items: items.map((item) => ({
            productId: item.product.id,
            variant: item.variant,
            quantity: item.quantity,
          })),
        }),
      });

      const payload = (await res.json().catch(() => null)) as {
        success?: boolean;
        receipt?: OrderReceipt;
        store?: StoreData;
        message?: string;
      } | null;

      if (!res.ok || !payload?.success || !payload.receipt || !payload.store) {
        setErrorMsg(payload?.message || 'Unable to place order. Please check your details.');
      } else {
        setReceipt(payload.receipt);
        setCustomerName('');
        setPhone('');
        setAddress('');
        onOrderSuccess(payload.store);
      }
    } catch {
      setErrorMsg('Network error while submitting your order.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#0B1220]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-[#E2E8F0] bg-[#FFFFFF] shadow-2xl dark:border-[#1E293B] dark:bg-[#0B1220]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-4 dark:border-[#1E293B]">
          <h2
            id="cart-drawer-title"
            className="text-base font-bold text-[#142033] dark:text-[#F1F5F9]"
          >
            {strings.title}
          </h2>
          <button
            type="button"
            onClick={() => {
              setReceipt(null);
              onClose();
            }}
            aria-label={strings.close}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#1E293B] dark:text-[#94A3B8] dark:hover:bg-[#111B2E] dark:hover:text-[#F1F5F9] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {receipt ? (
            <div className="rounded-2xl border border-[#0F766E]/30 bg-[#F8FAFC] p-6 dark:border-[#2DD4BF]/30 dark:bg-[#111B2E]">
              <CheckCircle2 className="h-9 w-9 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold text-[#142033] dark:text-[#F1F5F9]">
                {strings.orderConfirmedTitle}
              </h3>
              <p className="mt-1 font-mono text-xs font-semibold text-[#0F766E] dark:text-[#2DD4BF]">
                {strings.orderIdLabel}: {receipt.orderId}
              </p>

              <div className="mt-4 space-y-2 border-t border-[#E2E8F0] pt-4 text-xs text-[#52627A] dark:border-[#1E293B] dark:text-[#94A3B8]">
                {receipt.items.map((item) => (
                  <div key={`${item.productId}-${item.variant}`} className="flex justify-between gap-2">
                    <span>
                      {language === 'bn' ? item.nameBn : item.nameEn} ({item.variant}) × {item.quantity}
                    </span>
                    <span className="font-mono font-semibold tabular-nums text-[#142033] dark:text-[#F1F5F9]">
                      {formatBdt(item.unitPriceBdt * item.quantity, language)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[#E2E8F0] pt-2 font-bold text-[#142033] dark:border-[#1E293B] dark:text-[#F1F5F9]">
                  <span>{strings.total}</span>
                  <span className="font-mono tabular-nums">{formatBdt(receipt.totalBdt, language)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setReceipt(null);
                  onClose();
                }}
                className="mt-6 inline-flex min-h-[42px] w-full items-center justify-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E40AF] cursor-pointer"
              >
                {strings.close}
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-10 w-10 text-[#94A3B8]" aria-hidden="true" />
              <h3 className="mt-4 text-base font-bold text-[#142033] dark:text-[#F1F5F9]">
                {strings.emptyTitle}
              </h3>
              <p className="mt-1.5 max-w-xs text-sm text-[#52627A] dark:text-[#94A3B8]">
                {strings.emptySubtitle}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex min-h-[40px] items-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E40AF] cursor-pointer"
              >
                {strings.continueShopping}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Itemized Bag List */}
              <ul className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                {items.map((item) => {
                  const title = language === 'bn' ? item.product.nameBn : item.product.nameEn;
                  return (
                    <li
                      key={`${item.product.id}-${item.variant}`}
                      className="flex gap-3.5 py-4 first:pt-0"
                    >
                      <img
                        src={item.product.image}
                        alt={title}
                        referrerPolicy="no-referrer"
                        className="h-16 w-16 shrink-0 rounded-lg border border-[#E2E8F0] object-cover dark:border-[#1E293B]"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-[#142033] dark:text-[#F1F5F9]">
                              {title}
                            </p>
                            <p className="text-xs text-[#52627A] dark:text-[#94A3B8]">
                              {item.variant}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id, item.variant)}
                            aria-label={`Remove ${title}`}
                            className="rounded p-1 text-[#52627A] hover:text-red-600 dark:text-[#94A3B8] dark:hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.variant, -1)}
                              aria-label="Decrease quantity"
                              className="inline-flex h-8 w-8 items-center justify-center text-[#142033] dark:text-[#F1F5F9] cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[24px] text-center font-mono text-xs font-semibold tabular-nums text-[#142033] dark:text-[#F1F5F9]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              disabled={item.quantity >= item.product.stock}
                              onClick={() => onUpdateQuantity(item.product.id, item.variant, 1)}
                              aria-label="Increase quantity"
                              className="inline-flex h-8 w-8 items-center justify-center text-[#142033] disabled:opacity-40 dark:text-[#F1F5F9] cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <p className="font-mono text-sm font-bold tabular-nums text-[#142033] dark:text-[#F1F5F9]">
                            {formatBdt(item.product.priceBdt * item.quantity, language)}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Totals */}
              <div className="space-y-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm dark:border-[#1E293B] dark:bg-[#111B2E]">
                <div className="flex justify-between text-[#52627A] dark:text-[#94A3B8]">
                  <span>{strings.subtotal}</span>
                  <span className="font-mono tabular-nums">{formatBdt(subtotal, language)}</span>
                </div>
                <div className="flex justify-between text-[#52627A] dark:text-[#94A3B8]">
                  <span>{strings.deliveryFee}</span>
                  <span className="font-mono tabular-nums">{formatBdt(deliveryFee, language)}</span>
                </div>
                <div className="flex justify-between border-t border-[#E2E8F0] pt-2 text-base font-bold text-[#142033] dark:border-[#1E293B] dark:text-[#F1F5F9]">
                  <span>{strings.total}</span>
                  <span className="font-mono tabular-nums">{formatBdt(total, language)}</span>
                </div>
              </div>

              {/* COD Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-3.5 border-t border-[#E2E8F0] pt-5 dark:border-[#1E293B]">
                <h3 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.checkoutHeading}
                </h3>

                {errorMsg ? (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                    {errorMsg}
                  </p>
                ) : null}

                <div>
                  <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {strings.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={strings.namePlaceholder}
                    className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] focus:border-[#1D4ED8] focus:outline-none dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#F1F5F9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {strings.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={strings.phonePlaceholder}
                    className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] focus:border-[#1D4ED8] focus:outline-none dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#F1F5F9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {strings.areaLabel}
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('dhaka')}
                      className={`min-h-[38px] rounded-lg border px-2.5 text-xs font-semibold cursor-pointer ${
                        deliveryArea === 'dhaka'
                          ? 'border-[#1D4ED8] bg-[#1D4ED8]/10 text-[#1D4ED8] dark:border-[#60A5FA] dark:text-[#60A5FA]'
                          : 'border-[#E2E8F0] text-[#52627A] dark:border-[#334155] dark:text-[#94A3B8]'
                      }`}
                    >
                      {strings.dhakaOption}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('outside')}
                      className={`min-h-[38px] rounded-lg border px-2.5 text-xs font-semibold cursor-pointer ${
                        deliveryArea === 'outside'
                          ? 'border-[#1D4ED8] bg-[#1D4ED8]/10 text-[#1D4ED8] dark:border-[#60A5FA] dark:text-[#60A5FA]'
                          : 'border-[#E2E8F0] text-[#52627A] dark:border-[#334155] dark:text-[#94A3B8]'
                      }`}
                    >
                      {strings.outsideOption}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {strings.addressLabel}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={strings.addressPlaceholder}
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#142033] focus:border-[#1D4ED8] focus:outline-none dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#F1F5F9]"
                  />
                </div>

                <p className="text-[11px] text-[#52627A] dark:text-[#94A3B8]">{strings.codNote}</p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E40AF] disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  <span>{submitting ? strings.placingOrder : strings.placeOrderBtn}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
