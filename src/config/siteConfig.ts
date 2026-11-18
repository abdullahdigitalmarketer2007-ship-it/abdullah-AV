/**
 * Owner-configurable site identity, confirmed contact channels, and visual assets.
 * Leave contact fields blank until confirmed by the owner—the UI never fabricates links.
 */

export interface SiteConfig {
  displayName: string;
  brandWordmark: string;
  locationLabelEn: string;
  locationLabelBn: string;
  portraitUrl: string;
  contact: {
    email: string;
    whatsappNumber: string;
    linkedinUrl: string;
    facebookUrl: string;
    otherUrl: string;
  };
  assets: {
    heroVisual: string;
    seoServiceVisual: string;
    strategyServiceVisual: string;
    portfolioPlaceholder: string;
    blogCover: string;
  };
}

export const siteConfig: SiteConfig = {
  displayName: 'Abdullah',
  brandWordmark: 'Abdullah',
  locationLabelEn: 'Based in Bangladesh',
  locationLabelBn: 'বাংলাদেশভিত্তিক সেবা',
  // Set portraitUrl to a real owner photo path (e.g. '/assets/abdullah-portrait.jpg') when supplied.
  portraitUrl: '',
  contact: {
    email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || '',
    whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.trim() || '',
    linkedinUrl: (import.meta.env.VITE_LINKEDIN_URL as string | undefined)?.trim() || '',
    facebookUrl: (import.meta.env.VITE_FACEBOOK_URL as string | undefined)?.trim() || '',
    otherUrl: (import.meta.env.VITE_OTHER_SOCIAL_URL as string | undefined)?.trim() || '',
  },
  assets: {
    heroVisual: '/src/assets/images/hero_seo_strategy_1794992124490.jpg',
    seoServiceVisual: '/src/assets/images/service_seo_visual_1794992125389.jpg',
    strategyServiceVisual: '/src/assets/images/service_strategy_visual_1794992126224.jpg',
    portfolioPlaceholder: '/src/assets/images/portfolio_editorial_placeholder_1794992126344.jpg',
    blogCover: '/src/assets/images/blog_editorial_cover_1794992127115.jpg',
  },
};

export function getWhatsAppHref(rawNumber: string, prefillText?: string): string | null {
  const digits = rawNumber.replace(/[^0-9]/g, '');
  if (digits.length < 8) return null;
  const query = prefillText ? `?text=${encodeURIComponent(prefillText)}` : '';
  return `https://wa.me/${digits}${query}`;
}
