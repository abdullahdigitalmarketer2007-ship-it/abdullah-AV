import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { BLOG_POSTS, type BlogArticle } from '../data/blogPosts';
import type { Language, LocalizedContent } from '../data/content';
import { EditorialImage } from './EditorialImage';

interface BlogSectionProps {
  language: Language;
  content: LocalizedContent['blog'];
  activeArticleSlug: string | null;
  onOpenArticle: (slug: string | null) => void;
  onDiscussTopic: (serviceId: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  language,
  content,
  activeArticleSlug,
  onOpenArticle,
  onDiscussTopic,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(BLOG_POSTS.map((post) => post.category[language])));

  const filteredPosts =
    selectedCategory === 'all'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category[language] === selectedCategory);

  const activeArticle: BlogArticle | null = activeArticleSlug
    ? BLOG_POSTS.find((post) => post.slug === activeArticleSlug) || null
    : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeArticle) {
        onOpenArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle, onOpenArticle]);

  return (
    <section id="blog" className="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#0F172A]">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
              {content.kicker}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142033] dark:text-[#F1F5F9] sm:text-3xl">
              {content.heading}
            </h2>
            <p className="mt-3 text-base text-[#52627A] dark:text-[#94A3B8]">{content.subheading}</p>
          </div>

          <div
            role="group"
            aria-label="Blog topic filters"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E] p-1"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              aria-pressed={selectedCategory === 'all'}
              className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#142033] text-white dark:bg-[#1D4ED8]'
                  : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
              }`}
            >
              {content.allCategories}
            </button>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={active}
                  className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#142033] text-white dark:bg-[#1D4ED8]'
                      : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E]"
            >
              <div>
                <EditorialImage
                  src={siteConfig.assets.blogCover}
                  alt={post.coverAlt[language]}
                  aspectClass="aspect-video"
                  fallbackTitle={post.title[language]}
                />
                <div className="p-6">
                  <p className="text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                    <span className="text-[#0F766E] dark:text-[#2DD4BF]">
                      {post.category[language]}
                    </span>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    <span>{post.readTime[language]}</span>
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-[#142033] dark:text-[#F1F5F9]">
                    {post.title[language]}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                    {post.excerpt[language]}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E2E8F0] dark:border-[#1E293B] px-6 py-4">
                <button
                  type="button"
                  onClick={() => onOpenArticle(post.slug)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] transition-colors hover:text-[#1E40AF] dark:text-[#60A5FA] dark:hover:text-[#93C5FD] cursor-pointer"
                >
                  <span>{content.readArticle}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-article-title"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#142033]/55 dark:bg-black/75 p-4 backdrop-blur-xs"
          onClick={() => onOpenArticle(null)}
        >
          <article
            className="my-8 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E] p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
              <button
                type="button"
                onClick={() => onOpenArticle(null)}
                className="inline-flex min-h-[38px] items-center gap-1.5 text-xs font-semibold text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>{content.backToBlog}</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenArticle(null)}
                aria-label={content.backToBlog}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#1E293B] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                <span className="text-[#0F766E] dark:text-[#2DD4BF]">
                  {activeArticle.category[language]}
                </span>
                <span aria-hidden="true" className="mx-1.5">·</span>
                <span>{activeArticle.readTime[language]}</span>
              </p>
              <h3
                id="blog-article-title"
                className="mt-2 text-2xl font-bold leading-snug text-[#142033] dark:text-[#F1F5F9] sm:text-3xl"
              >
                {activeArticle.title[language]}
              </h3>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-[#E2E8F0] dark:border-[#1E293B]">
              <EditorialImage
                src={siteConfig.assets.blogCover}
                alt={activeArticle.coverAlt[language]}
                aspectClass="aspect-video"
                fallbackTitle={activeArticle.title[language]}
              />
            </div>

            <div className="mt-6 space-y-6">
              {activeArticle.sections[language].map((sec) => (
                <div key={sec.heading}>
                  <h4 className="text-lg font-bold text-[#142033] dark:text-[#F1F5F9]">
                    {sec.heading}
                  </h4>
                  {sec.paragraphs.map((para) => (
                    <p
                      key={para}
                      className="mt-2.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8] sm:text-base"
                    >
                      {para}
                    </p>
                  ))}
                  {sec.bullets ? (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[#52627A] dark:text-[#94A3B8]">
                      {sec.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-5">
              <button
                type="button"
                onClick={() => onOpenArticle(null)}
                className="min-h-[42px] rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-medium text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#334155] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                {content.backToBlog}
              </button>
              <button
                type="button"
                onClick={() => {
                  const serviceId = activeArticle.relatedServiceId;
                  onOpenArticle(null);
                  onDiscussTopic(serviceId);
                }}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF] cursor-pointer"
              >
                <span>{content.discussTopic}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
};
