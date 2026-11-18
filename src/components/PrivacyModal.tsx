import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { LocalizedContent } from '../data/content';

interface PrivacyModalProps {
  open: boolean;
  content: LocalizedContent['privacy'];
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ open, content, onClose }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#142033]/55 dark:bg-black/75 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E] p-6 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
          <div>
            <p className="text-xs font-medium text-[#0F766E] dark:text-[#2DD4BF]">
              {content.updatedLabel}
            </p>
            <h2
              id="privacy-modal-title"
              className="mt-1 text-xl font-bold text-[#142033] dark:text-[#F1F5F9]"
            >
              {content.heading}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={content.closeBtn}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#1E293B] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {content.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                {section.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end border-t border-[#E2E8F0] dark:border-[#1E293B] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] rounded-lg bg-[#142033] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E293B] dark:bg-[#1D4ED8] dark:hover:bg-[#1E40AF] cursor-pointer"
          >
            {content.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
