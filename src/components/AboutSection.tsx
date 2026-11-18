import React from 'react';
import { siteConfig } from '../config/siteConfig';
import type { LocalizedContent } from '../data/content';
import { BrandMark } from './BrandMark';
import { EditorialImage } from './EditorialImage';

interface AboutSectionProps {
  content: LocalizedContent['about'];
  locationLabel: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content, locationLabel }) => {
  const blocks = [
    { title: content.introHeading, body: content.introBody },
    { title: content.backgroundHeading, body: content.backgroundBody },
    { title: content.objectivesHeading, body: content.objectivesBody },
    { title: content.approachHeading, body: content.approachBody },
  ];

  return (
    <section id="about" className="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#0F172A]">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Visual & Profile Frame */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
              {content.kicker}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142033] dark:text-[#F1F5F9] sm:text-3xl">
              {content.heading}
            </h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E]">
              {siteConfig.portraitUrl ? (
                <EditorialImage
                  src={siteConfig.portraitUrl}
                  alt={content.portraitCaption}
                  aspectClass="aspect-[4/3]"
                  fallbackTitle={siteConfig.displayName}
                />
              ) : (
                <EditorialImage
                  src={siteConfig.assets.strategyServiceVisual}
                  alt={content.strategyImageAlt}
                  aspectClass="aspect-square"
                  fallbackTitle={siteConfig.displayName}
                />
              )}

              <div className="border-t border-[#E2E8F0] dark:border-[#1E293B] px-5 py-4">
                <div className="flex items-center gap-3">
                  <BrandMark className="h-8 w-8 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#142033] dark:text-[#F1F5F9]">
                      {content.portraitCaption}
                    </p>
                    <p className="text-xs text-[#52627A] dark:text-[#94A3B8]">{locationLabel}</p>
                  </div>
                </div>
                {!siteConfig.portraitUrl ? (
                  <p className="mt-3 text-xs text-[#52627A] dark:text-[#94A3B8]">
                    {content.portraitPlaceholderNote}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right Column: Structured 4-Part Narrative */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {blocks.map((block, index) => (
                <article
                  key={block.title}
                  className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E] p-6"
                >
                  <p className="font-mono text-xs font-medium text-[#0F766E] dark:text-[#2DD4BF] tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {block.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                    {block.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
