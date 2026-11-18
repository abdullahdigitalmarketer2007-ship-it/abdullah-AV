import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import type { LocalizedContent } from '../data/content';
import type { SectionKey } from './Header';
import { EditorialImage } from './EditorialImage';

interface HeroSectionProps {
  content: LocalizedContent['hero'];
  onNavigate: (section: SectionKey, path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content, onNavigate }) => {
  return (
    <section id="home" className="border-b border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0B1220]">
      <div className="mx-auto max-w-[1180px] px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Core Positioning & Hierarchy */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-sm font-semibold tracking-wide text-[#0F766E] dark:text-[#2DD4BF]">
              {content.name} · {content.title}
            </p>

            <h1 className="mt-4 text-[clamp(2rem,3.6vw,3.15rem)] font-bold leading-[1.15] tracking-tight text-[#142033] dark:text-[#F1F5F9]">
              {content.headline}
            </h1>

            <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-[#52627A] dark:text-[#94A3B8] sm:text-lg">
              {content.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('contact', '/contact')}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{content.ctaHire}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('portfolio', '/portfolio')}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-5 py-3 text-sm font-semibold text-[#142033] transition-colors hover:border-[#CBD5E1] hover:bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] dark:text-[#F1F5F9] dark:hover:border-[#334155] dark:hover:bg-[#162238] cursor-pointer whitespace-nowrap shrink-0"
              >
                {content.ctaExplore}
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact', '/contact')}
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-[#1D4ED8] transition-colors hover:text-[#1E40AF] dark:text-[#60A5FA] dark:hover:text-[#93C5FD] cursor-pointer whitespace-nowrap shrink-0"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{content.ctaContact}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Anchor (Portrait if supplied, otherwise editorial SEO visual) */}
          <div className="lg:col-span-6">
            <div className="h-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E]">
              {siteConfig.portraitUrl ? (
                <EditorialImage
                  src={siteConfig.portraitUrl}
                  alt={`${content.name} — ${content.title}`}
                  aspectClass="aspect-[16/10] lg:aspect-auto lg:h-full"
                  imgClassName="w-full h-full object-cover"
                  priority
                  fallbackTitle={content.name}
                />
              ) : (
                <EditorialImage
                  src={siteConfig.assets.heroVisual}
                  alt={content.imageAlt}
                  aspectClass="aspect-[16/9] lg:aspect-auto lg:h-full"
                  imgClassName="w-full h-full object-cover"
                  priority
                  fallbackTitle={content.title}
                />
              )}
            </div>
          </div>
        </div>

        {/* Full-Width Unboxed Focus Strip below the Hero Split */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.focusStrip.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-semibold text-[#0F766E] dark:text-[#2DD4BF]">
                {item.label}
              </p>
              <p className="text-sm font-medium text-[#142033] dark:text-[#F1F5F9]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
