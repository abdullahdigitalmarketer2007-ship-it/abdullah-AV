import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import type { LocalizedContent, ServiceItem } from '../data/content';

interface ServicesSectionProps {
  content: LocalizedContent['services'];
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  content,
  onSelectServiceForContact,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
      }
    };
    if (selectedService) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  return (
    <section id="services" className="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#0F172A]">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
            {content.kicker}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142033] dark:text-[#F1F5F9] sm:text-3xl">
            {content.heading}
          </h2>
          <p className="mt-3 text-base text-[#52627A] dark:text-[#94A3B8]">{content.subheading}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {content.items.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 transition-colors hover:border-[#CBD5E1] dark:border-[#1E293B] dark:bg-[#111B2E] dark:hover:border-[#334155]"
            >
              <div>
                <p className="font-mono text-xs font-medium text-[#1D4ED8] dark:text-[#60A5FA] tabular-nums">
                  {service.number}
                </p>
                <h3 className="mt-2 text-lg font-bold text-[#142033] dark:text-[#F1F5F9]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                  {service.shortDescription}
                </p>

                <div className="mt-5 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-4">
                  <p className="text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {content.deliverablesLabel}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs leading-relaxed text-[#52627A] dark:text-[#94A3B8]"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F766E] dark:text-[#2DD4BF]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs font-semibold text-[#142033] transition-colors hover:bg-[#F8FAFC] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:bg-[#1E293B] cursor-pointer whitespace-nowrap"
                >
                  {content.learnMore}
                </button>
                <button
                  type="button"
                  onClick={() => onSelectServiceForContact(service.title)}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1 rounded-lg bg-[#1D4ED8] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E40AF] cursor-pointer whitespace-nowrap"
                >
                  <span>{content.contactBtn}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#142033]/50 dark:bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E] p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-medium text-[#0F766E] dark:text-[#2DD4BF] tabular-nums">
                  {selectedService.number}
                </p>
                <h3
                  id="service-modal-title"
                  className="mt-1 text-2xl font-bold text-[#142033] dark:text-[#F1F5F9]"
                >
                  {selectedService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label={content.modalClose}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#1E293B] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
              {selectedService.detailedOverview}
            </p>

            <div className="mt-6 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#142033] dark:text-[#F1F5F9]">
                {content.deliverablesLabel}
              </p>
              <ul className="mt-3 space-y-2">
                {selectedService.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#52627A] dark:text-[#94A3B8]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E] dark:text-[#2DD4BF]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#0F172A] p-4">
              <p className="text-xs font-semibold text-[#0F766E] dark:text-[#2DD4BF]">
                {content.modalIdealForLabel}
              </p>
              <p className="mt-1 text-sm text-[#142033] dark:text-[#F1F5F9]">
                {selectedService.idealFor}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="min-h-[42px] rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-medium text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#334155] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                {content.modalClose}
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForContact(title);
                }}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF] cursor-pointer"
              >
                <span>{content.modalDiscussCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
