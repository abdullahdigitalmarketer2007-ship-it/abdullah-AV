import React from 'react';
import type { StoreStrings } from '../data/storeStrings';
import type { StoreLanguage, StoreProfile } from '../types/store';

interface StoreFooterProps {
  profile: StoreProfile;
  language: StoreLanguage;
  strings: StoreStrings['footer'];
  navStrings: StoreStrings['nav'];
  onOpenAi: () => void;
  onOpenManager: () => void;
}

export const StoreFooter: React.FC<StoreFooterProps> = ({
  profile,
  language,
  strings,
  navStrings,
  onOpenAi,
  onOpenManager,
}) => {
  const storeName = language === 'bn' ? profile.storeNameBn : profile.storeNameEn;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#FFFFFF] dark:bg-[#0B1220]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">{storeName}</p>
          <p className="mt-1 text-xs text-[#52627A] dark:text-[#94A3B8]">
            © {year} {storeName}. {strings.rights} {strings.poweredNote}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
          <a href="#products" className="hover:text-[#142033] dark:hover:text-[#F1F5F9]">
            {navStrings.products}
          </a>
          <a href="#about" className="hover:text-[#142033] dark:hover:text-[#F1F5F9]">
            {navStrings.about}
          </a>
          <button
            type="button"
            onClick={onOpenManager}
            className="hover:text-[#142033] dark:hover:text-[#F1F5F9] cursor-pointer"
          >
            {navStrings.manage}
          </button>
          <button
            type="button"
            onClick={onOpenAi}
            className="font-semibold text-[#1D4ED8] hover:underline dark:text-[#60A5FA] cursor-pointer"
          >
            {navStrings.aiChat}
          </button>
        </div>
      </div>
    </footer>
  );
};
