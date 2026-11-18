import React from 'react';
import { Bot, Mail, MapPin, Phone, Settings2, ShieldCheck, Truck } from 'lucide-react';
import type { StoreStrings } from '../data/storeStrings';
import type { StoreLanguage, StoreProfile } from '../types/store';

interface AboutStoreSectionProps {
  profile: StoreProfile;
  language: StoreLanguage;
  strings: StoreStrings['about'];
  onOpenManager: () => void;
  onOpenAiForStore: () => void;
}

export const AboutStoreSection: React.FC<AboutStoreSectionProps> = ({
  profile,
  language,
  strings,
  onOpenManager,
  onOpenAiForStore,
}) => {
  const storeName = language === 'bn' ? profile.storeNameBn : profile.storeNameEn;
  const ownerName = language === 'bn' ? profile.ownerNameBn : profile.ownerNameEn;
  const aboutText = language === 'bn' ? profile.aboutBn : profile.aboutEn;
  const location = language === 'bn' ? profile.locationBn : profile.locationEn;
  const delivery = language === 'bn' ? profile.deliveryPolicyBn : profile.deliveryPolicyEn;
  const returns = language === 'bn' ? profile.returnPolicyBn : profile.returnPolicyEn;

  return (
    <section
      id="about"
      className="border-b border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0B1220]"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Seller Story & Direct Actions */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
              {strings.kicker}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142033] dark:text-[#F1F5F9] sm:text-3xl">
              {strings.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
              {aboutText}
            </p>

            <div className="mt-6 flex flex-wrap gap-6 border-t border-[#E2E8F0] pt-5 text-sm dark:border-[#1E293B]">
              <div>
                <p className="text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                  {strings.ownerLabel}
                </p>
                <p className="mt-1 font-bold text-[#142033] dark:text-[#F1F5F9]">
                  {ownerName} · {storeName}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                  {strings.locationLabel}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 font-semibold text-[#142033] dark:text-[#F1F5F9]">
                  <MapPin className="h-3.5 w-3.5 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                  <span>{location}</span>
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAiForStore}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E40AF] cursor-pointer"
              >
                <Bot className="h-4 w-4" aria-hidden="true" />
                <span>{strings.askAiCta}</span>
              </button>

              <button
                type="button"
                onClick={onOpenManager}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-xs font-semibold text-[#142033] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8] cursor-pointer dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
              >
                <Settings2 className="h-4 w-4 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                <span>{strings.manageCta}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Policy & Contact Grid */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-6">
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#1E293B] dark:bg-[#111B2E]">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                    {strings.deliveryHeading}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                    {delivery}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#1E293B] dark:bg-[#111B2E]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                    {strings.returnHeading}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                    {returns}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#1E293B] dark:bg-[#111B2E]">
              <h3 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                {strings.contactHeading}
              </h3>
              <div className="mt-3 flex flex-col gap-2 text-sm text-[#52627A] dark:text-[#94A3B8]">
                <p className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                  <span className="font-mono tabular-nums">{profile.phone}</span>
                </p>
                <p className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                  <span>{profile.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
