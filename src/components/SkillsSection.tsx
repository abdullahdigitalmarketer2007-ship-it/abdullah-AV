import React from 'react';
import { Check } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import type { LocalizedContent } from '../data/content';
import { EditorialImage } from './EditorialImage';

interface SkillsSectionProps {
  content: LocalizedContent['skills'];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ content }) => {
  return (
    <section id="skills" className="border-b border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0B1220]">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
              {content.kicker}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142033] dark:text-[#F1F5F9] sm:text-3xl">
              {content.heading}
            </h2>
            <p className="mt-3 max-w-[65ch] text-base text-[#52627A] dark:text-[#94A3B8]">
              {content.subheading}
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <div className="flex items-center gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#334155] dark:bg-[#0F172A]">
                <EditorialImage
                  src={siteConfig.assets.seoServiceVisual}
                  alt={content.imageAlt}
                  aspectClass="aspect-square"
                  fallbackTitle="SEO"
                />
              </div>
              <p className="text-xs leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                {content.confirmationNote}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {content.groups.map((group, idx) => (
            <div
              key={group.id}
              className="flex flex-col rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-6"
            >
              <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
                <p className="font-mono text-xs font-medium text-[#1D4ED8] dark:text-[#60A5FA] tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1.5 text-xl font-bold text-[#142033] dark:text-[#F1F5F9]">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#52627A] dark:text-[#94A3B8]">
                  {group.subtitle}
                </p>
              </div>

              <ul className="mt-4 divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-start gap-3 py-3 first:pt-1 last:pb-0">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E] dark:text-[#2DD4BF]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#142033] dark:text-[#F1F5F9]">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                        {item.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
