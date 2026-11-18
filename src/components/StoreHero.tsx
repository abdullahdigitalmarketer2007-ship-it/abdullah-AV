import React, { useState } from 'react';
import { ArrowDownRight, Bot, Package } from 'lucide-react';
import type { StoreStrings } from '../data/storeStrings';

interface StoreHeroProps {
  strings: StoreStrings['hero'];
  storeTagline: string;
  onOpenAi: () => void;
}

const HERO_IMAGE_PATH = '/src/assets/images/hero_storefront_showcase_1794994505594.jpg';

export const StoreHero: React.FC<StoreHeroProps> = ({
  strings,
  storeTagline,
  onOpenAi,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="border-b border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0B1220]"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Focal Headline + Value Prop + Dual CTAs */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-semibold tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
              {strings.kicker}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#142033] dark:text-[#F1F5F9] sm:text-4xl lg:text-[2.65rem]">
              {strings.headline}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
              {storeTagline || strings.subheadline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#products"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] whitespace-nowrap shrink-0"
              >
                <span>{strings.browseBtn}</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenAi}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-2.5 text-sm font-semibold text-[#142033] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8] whitespace-nowrap shrink-0 cursor-pointer dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
              >
                <Bot className="h-4 w-4 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                <span>{strings.askAiBtn}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Full-Bleed Architectural Storefront Showcase */}
          <div className="lg:col-span-6">
            <div className="h-full min-h-[260px] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E]">
              {!imgError ? (
                <img
                  src={HERO_IMAGE_PATH}
                  alt="Curated wireless headphones, leather laptop sleeve, and smartwatch"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[260px] flex-col items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] p-8 text-center dark:from-[#111B2E] dark:to-[#0F172A]">
                  <Package className="h-10 w-10 text-[#0F766E] dark:text-[#2DD4BF]" />
                  <p className="mt-3 text-sm font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {strings.headline}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-Width 3-Column Store Highlights Strip Below Split */}
        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-[#E2E8F0] pt-6 sm:grid-cols-3 dark:border-[#1E293B]">
          {strings.highlights.map((item) => (
            <div key={item.label}>
              <p className="text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-[#142033] dark:text-[#F1F5F9]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
