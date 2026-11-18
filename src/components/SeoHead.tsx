import { useEffect } from 'react';
import type { BlogArticle } from '../data/blogPosts';
import type { Language } from '../data/content';

interface SeoHeadProps {
  language: Language;
  title: string;
  description: string;
  path: string;
  activeArticle?: BlogArticle | null;
}

export function SeoHead({ language, title, description, path, activeArticle }: SeoHeadProps) {
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = title;

    const updateMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const upsertLink = (selector: string, attrs: Record<string, string>) => {
      let el = document.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        document.head.appendChild(el);
      }
      for (const [k, v] of Object.entries(attrs)) {
        el.setAttribute(k, v);
      }
    };

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${cleanPath}`;

    updateMeta('meta[name="description"]', 'name', 'description', description);
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:locale"]', 'property', 'og:locale', language === 'bn' ? 'bn_BD' : 'en_US');
    updateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
    upsertLink('link[rel="alternate"][hreflang="en"]', {
      rel: 'alternate',
      hreflang: 'en',
      href: `${canonicalUrl}?lang=en`,
    });
    upsertLink('link[rel="alternate"][hreflang="bn"]', {
      rel: 'alternate',
      hreflang: 'bn',
      href: `${canonicalUrl}?lang=bn`,
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: canonicalUrl,
    });

    // Dynamic Route BreadcrumbList + optional BlogPosting Schema
    const breadcrumbItems: Array<{ '@type': string; position: number; name: string; item: string }> = [
      {
        '@type': 'ListItem',
        position: 1,
        name: language === 'bn' ? 'হোম' : 'Home',
        item: `${origin}/`,
      },
    ];

    if (cleanPath !== '/') {
      const segments = cleanPath.split('/').filter(Boolean);
      if (segments[0] === 'blog' && activeArticle) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: language === 'bn' ? 'ব্লগ' : 'Blog',
          item: `${origin}/blog`,
        });
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: activeArticle.title[language],
          item: canonicalUrl,
        });
      } else {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: title.split('|')[0].trim(),
          item: canonicalUrl,
        });
      }
    }

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems,
      },
    ];

    if (activeArticle) {
      graph.push({
        '@type': 'BlogPosting',
        headline: activeArticle.title[language],
        description: activeArticle.excerpt[language],
        inLanguage: language,
        mainEntityOfPage: canonicalUrl,
        author: {
          '@type': 'Person',
          name: 'Abdullah',
        },
        publisher: {
          '@type': 'Person',
          name: 'Abdullah',
        },
      });
    }

    let ldScript = document.getElementById('dynamic-route-jsonld') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'dynamic-route-jsonld';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [language, title, description, path, activeArticle]);

  return null;
}
