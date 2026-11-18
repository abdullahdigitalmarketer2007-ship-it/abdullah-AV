import React, { useEffect, useState } from 'react';
import { Check, Loader2, Plus, Trash2, Upload, X } from 'lucide-react';
import type { StoreStrings } from '../data/storeStrings';
import type { Product, ProductCategoryId, StoreData, StoreLanguage, StoreProfile } from '../types/store';

interface StoreManagerModalProps {
  open: boolean;
  store: StoreData;
  language: StoreLanguage;
  strings: StoreStrings['manager'];
  catalogStrings: StoreStrings['catalog'];
  onClose: () => void;
  onStoreUpdated: (next: StoreData) => void;
}

export const StoreManagerModal: React.FC<StoreManagerModalProps> = ({
  open,
  store,
  language,
  strings,
  catalogStrings,
  onClose,
  onStoreUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'add' | 'profile'>('inventory');
  const [draftStocks, setDraftStocks] = useState<Record<string, number>>({});
  const [draftPrices, setDraftPrices] = useState<Record<string, number>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Add Product Form State
  const [newNameEn, setNewNameEn] = useState('');
  const [newNameBn, setNewNameBn] = useState('');
  const [newCategoryId, setNewCategoryId] = useState<ProductCategoryId>('audio-tech');
  const [newPriceBdt, setNewPriceBdt] = useState('');
  const [newStock, setNewStock] = useState('10');
  const [newVariant, setNewVariant] = useState('Standard');
  const [newDescEn, setNewDescEn] = useState('');
  const [newDescBn, setNewDescBn] = useState('');
  const [newImageDataUrl, setNewImageDataUrl] = useState('');
  const [addingProduct, setAddingProduct] = useState(false);

  // Store Profile Form State
  const [profileDraft, setProfileDraft] = useState<StoreProfile>(store.profile);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    const stocks: Record<string, number> = {};
    const prices: Record<string, number> = {};
    for (const p of store.products) {
      stocks[p.id] = p.stock;
      prices[p.id] = p.priceBdt;
    }
    setDraftStocks(stocks);
    setDraftPrices(prices);
    setProfileDraft(store.profile);
  }, [store]);

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

  const showSavedToast = (msg: string) => {
    setStatusMessage(msg);
    window.setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleSaveProductRow = async (product: Product) => {
    setErrorMessage('');
    setSavingId(product.id);
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(product.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stock: Math.max(0, Number(draftStocks[product.id] ?? product.stock)),
          priceBdt: Math.max(1, Number(draftPrices[product.id] ?? product.priceBdt)),
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        store?: StoreData;
        message?: string;
      } | null;
      if (!res.ok || !data?.success || !data.store) {
        setErrorMessage(data?.message || 'Failed to update product.');
      } else {
        onStoreUpdated(data.store);
        showSavedToast(strings.savedMsg);
      }
    } catch {
      setErrorMessage('Network error updating product.');
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setErrorMessage('');
    setSavingId(id);
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        store?: StoreData;
      } | null;
      if (res.ok && data?.success && data.store) {
        onStoreUpdated(data.store);
        showSavedToast(strings.savedMsg);
      }
    } catch {
      setErrorMessage('Network error deleting product.');
    } finally {
      setSavingId(null);
    }
  };

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size must be under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewImageDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setAddingProduct(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameEn: newNameEn,
          nameBn: newNameBn || newNameEn,
          categoryId: newCategoryId,
          priceBdt: Number(newPriceBdt),
          stock: Number(newStock),
          variant: newVariant,
          descriptionEn: newDescEn,
          descriptionBn: newDescBn || newDescEn,
          imageDataUrl: newImageDataUrl || undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        store?: StoreData;
        message?: string;
      } | null;

      if (!res.ok || !data?.success || !data.store) {
        setErrorMessage(data?.message || 'Unable to add product.');
      } else {
        onStoreUpdated(data.store);
        setNewNameEn('');
        setNewNameBn('');
        setNewPriceBdt('');
        setNewStock('10');
        setNewDescEn('');
        setNewDescBn('');
        setNewImageDataUrl('');
        setActiveTab('inventory');
        showSavedToast(strings.savedMsg);
      }
    } catch {
      setErrorMessage('Network error adding product.');
    } finally {
      setAddingProduct(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSavingProfile(true);
    try {
      const res = await fetch('/api/store-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileDraft),
      });
      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        store?: StoreData;
      } | null;
      if (!res.ok || !data?.success || !data.store) {
        setErrorMessage('Unable to save store profile.');
      } else {
        onStoreUpdated(data.store);
        showSavedToast(strings.savedMsg);
      }
    } catch {
      setErrorMessage('Network error saving profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-manager-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0B1220]/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="my-6 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-2xl dark:border-[#1E293B] dark:bg-[#111B2E]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] px-6 py-5 dark:border-[#1E293B]">
          <div>
            <h2
              id="store-manager-title"
              className="text-lg font-bold text-[#142033] dark:text-[#F1F5F9]"
            >
              {strings.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
              {strings.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={strings.close}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#334155] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-3 dark:border-[#1E293B] dark:bg-[#0F172A]">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#142033] text-white dark:bg-[#1D4ED8]'
                : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
            }`}
          >
            {strings.tabs.inventory}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('add')}
            className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'add'
                ? 'bg-[#142033] text-white dark:bg-[#1D4ED8]'
                : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
            }`}
          >
            {strings.tabs.addProduct}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#142033] text-white dark:bg-[#1D4ED8]'
                : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
            }`}
          >
            {strings.tabs.storeInfo}
          </button>
        </div>

        {/* Notifications */}
        {statusMessage ? (
          <div className="mx-6 mt-4 flex items-center gap-2 rounded-lg border border-[#0F766E]/30 bg-[#0F766E]/10 px-3.5 py-2 text-xs font-semibold text-[#0F766E] dark:border-[#2DD4BF]/30 dark:text-[#2DD4BF]">
            <Check className="h-4 w-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        ) : null}
        {errorMessage ? (
          <div className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {errorMessage}
          </div>
        ) : null}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'inventory' ? (
            <div className="space-y-3">
              {store.products.map((product) => {
                const title = language === 'bn' ? product.nameBn : product.nameEn;
                const isBusy = savingId === product.id;

                return (
                  <div
                    key={product.id}
                    className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between dark:border-[#1E293B] dark:bg-[#0F172A]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                        {title}
                      </p>
                      <p className="mt-0.5 text-xs text-[#52627A] dark:text-[#94A3B8]">
                        {product.sku} · {language === 'bn' ? product.categoryBn : product.categoryEn}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <label className="flex items-center gap-1.5 text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                        <span>{strings.priceLabel}</span>
                        <input
                          type="number"
                          min={1}
                          value={draftPrices[product.id] ?? product.priceBdt}
                          onChange={(e) =>
                            setDraftPrices((prev) => ({
                              ...prev,
                              [product.id]: Number(e.target.value),
                            }))
                          }
                          className="h-9 w-24 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-2 font-mono text-xs tabular-nums text-[#142033] dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#F1F5F9]"
                        />
                      </label>

                      <label className="flex items-center gap-1.5 text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                        <span>{strings.stockLabel}</span>
                        <input
                          type="number"
                          min={0}
                          value={draftStocks[product.id] ?? product.stock}
                          onChange={(e) =>
                            setDraftStocks((prev) => ({
                              ...prev,
                              [product.id]: Number(e.target.value),
                            }))
                          }
                          className="h-9 w-20 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-2 font-mono text-xs tabular-nums text-[#142033] dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#F1F5F9]"
                        />
                      </label>

                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleSaveProductRow(product)}
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#1D4ED8] px-3 text-xs font-semibold text-white hover:bg-[#1E40AF] disabled:opacity-60 cursor-pointer"
                      >
                        {isBusy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                        <span>{strings.saveBtn}</span>
                      </button>

                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleDeleteProduct(product.id)}
                        aria-label={`${strings.deleteBtn}: ${title}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] text-[#52627A] hover:border-red-300 hover:text-red-600 dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#94A3B8] dark:hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {activeTab === 'add' ? (
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.addForm.nameEn}
                </label>
                <input
                  type="text"
                  required
                  value={newNameEn}
                  onChange={(e) => setNewNameEn(e.target.value)}
                  className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.addForm.nameBn}
                </label>
                <input
                  type="text"
                  value={newNameBn}
                  onChange={(e) => setNewNameBn(e.target.value)}
                  className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.addForm.category}
                </label>
                <select
                  value={newCategoryId}
                  onChange={(e) => setNewCategoryId(e.target.value as ProductCategoryId)}
                  className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                >
                  {catalogStrings.categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {strings.addForm.priceBdt}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newPriceBdt}
                    onChange={(e) => setNewPriceBdt(e.target.value)}
                    className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 font-mono text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {strings.addForm.stock}
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 font-mono text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.addForm.variant}
                </label>
                <input
                  type="text"
                  value={newVariant}
                  onChange={(e) => setNewVariant(e.target.value)}
                  className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.addForm.imageLabel}
                </label>
                <label className="mt-1 flex min-h-[40px] items-center gap-2 rounded-lg border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-3 text-xs font-medium text-[#52627A] hover:border-[#1D4ED8] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#94A3B8] cursor-pointer">
                  <Upload className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {newImageDataUrl ? 'Image selected' : 'PNG, JPG, WebP'}
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImagePick}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.addForm.descEn}
                </label>
                <textarea
                  rows={2}
                  value={newDescEn}
                  onChange={(e) => setNewDescEn(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.addForm.descBn}
                </label>
                <textarea
                  rows={2}
                  value={newDescBn}
                  onChange={(e) => setNewDescBn(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={addingProduct}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF] disabled:opacity-60 cursor-pointer"
                >
                  {addingProduct ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  <span>{addingProduct ? strings.addForm.submitting : strings.addForm.submitBtn}</span>
                </button>
              </div>
            </form>
          ) : null}

          {activeTab === 'profile' ? (
            <form onSubmit={handleSaveProfile} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.profileForm.storeNameBn}
                </label>
                <input
                  type="text"
                  value={profileDraft.storeNameBn}
                  onChange={(e) => setProfileDraft({ ...profileDraft, storeNameBn: e.target.value })}
                  className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.profileForm.storeNameEn}
                </label>
                <input
                  type="text"
                  value={profileDraft.storeNameEn}
                  onChange={(e) => setProfileDraft({ ...profileDraft, storeNameEn: e.target.value })}
                  className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.profileForm.ownerNameBn}
                </label>
                <input
                  type="text"
                  value={profileDraft.ownerNameBn}
                  onChange={(e) => setProfileDraft({ ...profileDraft, ownerNameBn: e.target.value })}
                  className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.profileForm.ownerNameEn}
                </label>
                <input
                  type="text"
                  value={profileDraft.ownerNameEn}
                  onChange={(e) => setProfileDraft({ ...profileDraft, ownerNameEn: e.target.value })}
                  className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.profileForm.aboutBn}
                </label>
                <textarea
                  rows={3}
                  value={profileDraft.aboutBn}
                  onChange={(e) => setProfileDraft({ ...profileDraft, aboutBn: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.profileForm.aboutEn}
                </label>
                <textarea
                  rows={3}
                  value={profileDraft.aboutEn}
                  onChange={(e) => setProfileDraft({ ...profileDraft, aboutEn: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.profileForm.deliveryBn}
                </label>
                <textarea
                  rows={2}
                  value={profileDraft.deliveryPolicyBn}
                  onChange={(e) =>
                    setProfileDraft({ ...profileDraft, deliveryPolicyBn: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.profileForm.deliveryEn}
                </label>
                <textarea
                  rows={2}
                  value={profileDraft.deliveryPolicyEn}
                  onChange={(e) =>
                    setProfileDraft({ ...profileDraft, deliveryPolicyEn: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.profileForm.phone}
                </label>
                <input
                  type="text"
                  value={profileDraft.phone}
                  onChange={(e) => setProfileDraft({ ...profileDraft, phone: e.target.value })}
                  className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  {strings.profileForm.email}
                </label>
                <input
                  type="email"
                  value={profileDraft.email}
                  onChange={(e) => setProfileDraft({ ...profileDraft, email: e.target.value })}
                  className="mt-1 min-h-[40px] w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-sm text-[#142033] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF] disabled:opacity-60 cursor-pointer"
                >
                  {savingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  <span>{strings.profileForm.saveProfileBtn}</span>
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};
