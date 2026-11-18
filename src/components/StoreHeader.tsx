import React, { useState } from 'react';
import { Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react';
import type { StoreStrings } from '../data/storeStrings';
import type { StoreLanguage } from '../types/store';

interface StoreHeaderProps {
  storeName: string;
  language: StoreLanguage;
  onLanguageChange: (lang: StoreLanguage) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  strings: StoreStrings['nav'];
  cartCount: number;
  onOpenCart: () => void;
  onOpenManager: () => void;
  onOpenAi: () => void;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  storeName,
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  strings,
  cartCount,
  onOpenCart,
  onOpenManager,
  onOpenAi,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-[#FFFFFF]/95 backdrop-blur-md dark:border-[#1E293B] dark:bg-[#0B1220]/95">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Store Wordmark */}
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-[#142033] whitespace-nowrap shrink-0 dark:text-[#F1F5F9]"
        >
          {storeName}
        </a>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#52627A] dark:text-[#94A3B8]"
        >
          <a
            href="#products"
            className="transition-colors hover:text-[#142033] hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-[#F1F5F9]"
          >
            {strings.products}
          </a>
          <a
            href="#about"
            className="transition-colors hover:text-[#142033] hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-[#F1F5F9]"
          >
            {strings.about}
          </a>
          <button
            type="button"
            onClick={onOpenManager}
            className="transition-colors hover:text-[#142033] hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer dark:hover:text-[#F1F5F9]"
          >
            {strings.manage}
          </button>
          <button
            type="button"
            onClick={onOpenAi}
            className="transition-colors hover:text-[#1D4ED8] hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer dark:hover:text-[#60A5FA]"
          >
            {strings.aiChat}
          </button>
        </nav>

        {/* Zone 3: Utility toggles & Shopping Bag Primary CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-0.5 dark:border-[#1E293B] dark:bg-[#111B2E]"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('bn')}
              aria-pressed={language === 'bn'}
              className={`min-h-[32px] rounded-md px-2 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                language === 'bn'
                  ? 'bg-[#FFFFFF] text-[#142033] shadow-xs dark:bg-[#1E293B] dark:text-[#F1F5F9]'
                  : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
              }`}
            >
              বাং
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              aria-pressed={language === 'en'}
              className={`min-h-[32px] rounded-md px-2 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                language === 'en'
                  ? 'bg-[#FFFFFF] text-[#142033] shadow-xs dark:bg-[#1E293B] dark:text-[#F1F5F9]'
                  : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? strings.switchToLight : strings.switchToDark}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] text-[#52627A] transition-colors hover:text-[#142033] dark:border-[#1E293B] dark:bg-[#111B2E] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9] cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex min-h-[38px] items-center gap-2 rounded-lg bg-[#142033] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E293B] whitespace-nowrap shrink-0 cursor-pointer dark:bg-[#1D4ED8] dark:hover:bg-[#1E40AF]"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>{strings.bag}</span>
            <span className="font-mono tabular-nums">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? strings.menuClose : strings.menuOpen}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#142033] md:hidden dark:border-[#1E293B] dark:text-[#F1F5F9] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen ? (
        <div className="border-t border-[#E2E8F0] bg-[#FFFFFF] px-4 py-3 md:hidden dark:border-[#1E293B] dark:bg-[#0B1220]">
          <nav className="flex flex-col gap-1.5 text-sm font-medium text-[#142033] dark:text-[#F1F5F9]">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 hover:bg-[#F8FAFC] dark:hover:bg-[#111B2E]"
            >
              {strings.products}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 hover:bg-[#F8FAFC] dark:hover:bg-[#111B2E]"
            >
              {strings.about}
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenManager();
              }}
              className="rounded-lg px-3 py-2.5 text-left hover:bg-[#F8FAFC] dark:hover:bg-[#111B2E] cursor-pointer"
            >
              {strings.manage}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAi();
              }}
              className="rounded-lg px-3 py-2.5 text-left text-[#1D4ED8] hover:bg-[#F8FAFC] dark:text-[#60A5FA] dark:hover:bg-[#111B2E] cursor-pointer"
            >
              {strings.aiChat}
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
};
