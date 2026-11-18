import React from 'react';
import { getWhatsAppHref, siteConfig } from '../config/siteConfig';
import type { LocalizedContent } from '../data/content';
import { BrandMark } from './BrandMark';
import type { SectionKey } from './Header';

interface FooterProps {
  navContent: LocalizedContent['nav'];
  footerContent: LocalizedContent['footer'];
  contactContent: LocalizedContent['contact'];
  onNavigate: (section: SectionKey, path: string) => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  navContent,
  footerContent,
  contactContent,
  onNavigate,
  onOpenPrivacy,
}) => {
  const year = new Date().getFullYear();
  const whatsappHref = getWhatsAppHref(siteConfig.contact.whatsappNumber);

  const navLinks: { key: SectionKey; label: string; path: string }[] = [
    { key: 'home', label: navContent.home, path: '/' },
    { key: 'about', label: navContent.about, path: '/about' },
    { key: 'skills', label: navContent.skills, path: '/skills' },
    { key: 'services', label: navContent.services, path: '/services' },
    { key: 'portfolio', label: navContent.portfolio, path: '/portfolio' },
    { key: 'dashboard', label: navContent.dashboard, path: '/dashboard' },
    { key: 'blog', label: navContent.blog, path: '/blog' },
    { key: 'contact', label: navContent.contact, path: '/contact' },
  ];

  return (
    <footer className="border-t border-[#E2E8F0] bg-[#142033] text-white dark:border-[#1E293B] dark:bg-[#070C17]">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-7 w-7 shrink-0" />
              <span className="text-lg font-bold tracking-tight text-white">
                {siteConfig.brandWordmark}
              </span>
            </div>
            <p className="mt-2 text-xs font-medium text-[#94A3B8]">{footerContent.title}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#CBD5E1]">
              {footerContent.shortIntro}
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              {footerContent.navigationHeading}
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.key, item.path);
                    }}
                    className="text-sm text-[#CBD5E1] transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-left text-sm text-[#CBD5E1] transition-colors hover:text-white cursor-pointer"
                >
                  {footerContent.privacyLink}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              {footerContent.channelsHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#CBD5E1]">
              {siteConfig.contact.email ? (
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-white"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              ) : null}
              {whatsappHref ? (
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {contactContent.whatsappLabel}
                  </a>
                </li>
              ) : null}
              {siteConfig.contact.linkedinUrl ? (
                <li>
                  <a
                    href={siteConfig.contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {contactContent.linkedinLabel}
                  </a>
                </li>
              ) : null}
              {siteConfig.contact.facebookUrl ? (
                <li>
                  <a
                    href={siteConfig.contact.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {contactContent.facebookLabel}
                  </a>
                </li>
              ) : null}
              {!siteConfig.contact.email &&
              !whatsappHref &&
              !siteConfig.contact.linkedinUrl &&
              !siteConfig.contact.facebookUrl ? (
                <li className="text-xs leading-relaxed text-[#94A3B8]">
                  {contactContent.unconfiguredLabel}
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#94A3B8] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.displayName}. {footerContent.copyrightPrefix}
          </p>
          <p>{footerContent.noFakeClaimsNote}</p>
        </div>
      </div>
    </footer>
  );
};
