import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import type { Language, LocalizedContent } from '../data/content';
import { BrandMark } from './BrandMark';

export type SectionKey =
  | 'home'
  | 'about'
  | 'skills'
  | 'services'
  | 'portfolio'
  | 'dashboard'
  | 'blog'
  | 'contact';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  content: LocalizedContent['nav'];
  activeSection: SectionKey;
  onNavigate: (section: SectionKey, path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  content,
  activeSection,
  onNavigate,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navItems: { key: SectionKey; label: string; path: string }[] = [
    { key: 'home', label: content.home, path: '/' },
    { key: 'about', label: content.about, path: '/about' },
    { key: 'skills', label: content.skills, path: '/skills' },
    { key: 'services', label: content.services, path: '/services' },
    { key: 'portfolio', label: content.portfolio, path: '/portfolio' },
    { key: 'dashboard', label: content.dashboard, path: '/dashboard' },
    { key: 'blog', label: content.blog, path: '/blog' },
    { key: 'contact', label: content.contact, path: '/contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, key: SectionKey, path: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(key, path);
  };

  const themeToggleLabel = theme === 'dark' ? content.switchToLight : content.switchToDark;

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-[#FFFFFF]/95 dark:border-[#1E293B] dark:bg-[#0B1220]/95 backdrop-blur-sm transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, 'home', '/')}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#142033] dark:text-[#F1F5F9] whitespace-nowrap shrink-0"
        >
          <BrandMark className="h-7 w-7 shrink-0" />
          <span>{siteConfig.brandWordmark}</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <a
                key={item.key}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.key, item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#1D4ED8] dark:text-[#60A5FA]'
                    : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
                }`}
              >
                {item.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#1D4ED8] dark:bg-[#60A5FA]"
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle + Language switcher + Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={themeToggleLabel}
            aria-pressed={theme === 'dark'}
            title={themeToggleLabel}
            className="inline-flex h-9 w-9 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#142033] transition-colors hover:border-[#CBD5E1] hover:bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E] dark:text-[#F1F5F9] dark:hover:border-[#334155] dark:hover:bg-[#162238] cursor-pointer shrink-0"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-[#FBBF24]" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-[#142033]" aria-hidden="true" />
            )}
          </button>

          <div
            role="group"
            aria-label="Language switcher"
            className="hidden sm:inline-flex items-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-0.5"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              aria-pressed={language === 'en'}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                language === 'en'
                  ? 'bg-[#FFFFFF] text-[#142033] shadow-xs dark:bg-[#1E293B] dark:text-[#F1F5F9]'
                  : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('bn')}
              aria-pressed={language === 'bn'}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                language === 'bn'
                  ? 'bg-[#FFFFFF] text-[#142033] shadow-xs dark:bg-[#1E293B] dark:text-[#F1F5F9]'
                  : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
              }`}
            >
              বাংলা
            </button>
          </div>

          <a
            href="/contact"
            onClick={(e) => handleNavClick(e, 'contact', '/contact')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] whitespace-nowrap shrink-0"
          >
            {content.hireMe}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? content.menuClose : content.menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#142033] dark:border-[#1E293B] dark:text-[#F1F5F9] lg:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen ? (
        <div
          id="mobile-nav-drawer"
          className="border-t border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0B1220] px-4 py-4 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.key;
              return (
                <a
                  key={item.key}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.key, item.path)}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F8FAFC] text-[#1D4ED8] dark:bg-[#111B2E] dark:text-[#60A5FA]'
                      : 'text-[#142033] hover:bg-[#F8FAFC] dark:text-[#F1F5F9] dark:hover:bg-[#111B2E]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-4">
            <div
              role="group"
              aria-label="Mobile language switcher"
              className="inline-flex items-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-0.5"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                aria-pressed={language === 'en'}
                className={`min-h-[40px] rounded-md px-3 text-xs font-semibold transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#FFFFFF] text-[#142033] shadow-xs dark:bg-[#1E293B] dark:text-[#F1F5F9]'
                    : 'text-[#52627A] dark:text-[#94A3B8]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('bn')}
                aria-pressed={language === 'bn'}
                className={`min-h-[40px] rounded-md px-3 text-xs font-semibold transition-colors cursor-pointer ${
                  language === 'bn'
                    ? 'bg-[#FFFFFF] text-[#142033] shadow-xs dark:bg-[#1E293B] dark:text-[#F1F5F9]'
                    : 'text-[#52627A] dark:text-[#94A3B8]'
                }`}
              >
                বাংলা
              </button>
            </div>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={themeToggleLabel}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-xs font-semibold text-[#142033] dark:border-[#1E293B] dark:bg-[#111B2E] dark:text-[#F1F5F9] cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-4 w-4 text-[#FBBF24]" aria-hidden="true" />
                  <span>{content.lightLabel}</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-[#142033]" aria-hidden="true" />
                  <span>{content.darkLabel}</span>
                </>
              )}
            </button>

            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, 'contact', '/contact')}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF] whitespace-nowrap"
            >
              {content.hireMe}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
};
