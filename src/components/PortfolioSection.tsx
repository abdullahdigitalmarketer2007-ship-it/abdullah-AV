import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Check,
  ImagePlus,
  Info,
  Loader2,
  Trash2,
  Upload,
  X,
  ZoomIn,
} from 'lucide-react';
import type { LocalizedContent, PortfolioProject, ProjectCategoryId } from '../data/content';

interface UploadedProjectImage {
  url: string;
  fileName: string;
  uploadedAt: string;
}

interface PortfolioSectionProps {
  content: LocalizedContent['portfolio'];
  onDiscussProject: (projectTitle: string) => void;
}

const ALLOWED_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);
const MAX_FILE_BYTES = 5 * 1024 * 1024;

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  content,
  onDiscussProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategoryId>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [previewProject, setPreviewProject] = useState<PortfolioProject | null>(null);
  const [uploadedImages, setUploadedImages] = useState<Record<string, UploadedProjectImage>>({});
  const [uploadingSlug, setUploadingSlug] = useState<string | null>(null);
  const [removingSlug, setRemovingSlug] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadTargetSlugRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/portfolio-images')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { images?: Record<string, UploadedProjectImage> } | null) => {
        if (active && data?.images && typeof data.images === 'object') {
          setUploadedImages(data.images);
        }
      })
      .catch(() => {
        // Keep placeholders cleanly visible if API is unreachable
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewProject) {
          setPreviewProject(null);
        } else if (selectedProject) {
          setSelectedProject(null);
        }
      }
    };
    if (previewProject || selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewProject, selectedProject]);

  const getProjectImage = (project: PortfolioProject): string => {
    return uploadedImages[project.slug]?.url || project.image || '';
  };

  const triggerUpload = (slug: string) => {
    setUploadError('');
    uploadTargetSlugRef.current = slug;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetSlug = uploadTargetSlugRef.current;
    if (!file || !targetSlug) return;

    if (!ALLOWED_MIME_TYPES.has(file.type) || file.size === 0 || file.size > MAX_FILE_BYTES) {
      setUploadError(content.uploadLabels.fileTypeError);
      return;
    }

    setUploadError('');
    setUploadingSlug(targetSlug);

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (!dataUrl) {
        setUploadError(content.uploadLabels.uploadError);
        setUploadingSlug(null);
        return;
      }

      try {
        const res = await fetch(`/api/portfolio-images/${encodeURIComponent(targetSlug)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl, fileName: file.name }),
        });

        const payload = (await res.json().catch(() => null)) as {
          success?: boolean;
          image?: UploadedProjectImage;
          message?: string;
        } | null;

        if (!res.ok || !payload?.success || !payload.image) {
          setUploadError(payload?.message || content.uploadLabels.uploadError);
        } else {
          setUploadedImages((prev) => ({
            ...prev,
            [targetSlug]: payload.image as UploadedProjectImage,
          }));
        }
      } catch {
        setUploadError(content.uploadLabels.uploadError);
      } finally {
        setUploadingSlug(null);
      }
    };

    reader.onerror = () => {
      setUploadError(content.uploadLabels.uploadError);
      setUploadingSlug(null);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = async (slug: string) => {
    setUploadError('');
    setRemovingSlug(slug);
    try {
      const res = await fetch(`/api/portfolio-images/${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUploadedImages((prev) => {
          const next = { ...prev };
          delete next[slug];
          return next;
        });
        if (previewProject?.slug === slug) {
          setPreviewProject(null);
        }
      } else {
        setUploadError(content.uploadLabels.uploadError);
      }
    } catch {
      setUploadError(content.uploadLabels.uploadError);
    } finally {
      setRemovingSlug(null);
    }
  };

  const filteredProjects =
    activeFilter === 'all'
      ? content.projects
      : content.projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="border-b border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0B1220]"
    >
      {/* Hidden File Input for Real Project Screenshot Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        aria-hidden="true"
        onChange={handleFileChange}
      />

      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
              {content.kicker}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142033] dark:text-[#F1F5F9] sm:text-3xl">
              {content.heading}
            </h2>
            <p className="mt-3 text-base text-[#52627A] dark:text-[#94A3B8]">{content.subheading}</p>
          </div>

          {/* Interactive 6-Category Filter Bar */}
          <div
            role="group"
            aria-label="Portfolio category filters"
            className="flex flex-wrap items-center gap-1.5 self-start rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-1.5"
          >
            {content.filters.map((filter) => {
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={active}
                  className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#FFFFFF] text-[#142033] shadow-xs dark:bg-[#1E293B] dark:text-[#F1F5F9]'
                      : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Honest Owner Confirmation & Real Image Policy Notice */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] px-4 py-3 text-xs leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
          <p>{content.honestyBanner}</p>
        </div>

        {uploadError ? (
          <div
            role="alert"
            className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{uploadError}</span>
            </div>
            <button
              type="button"
              onClick={() => setUploadError('')}
              aria-label="Dismiss error"
              className="rounded p-1 hover:bg-red-100 dark:hover:bg-red-900/50 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : null}

        {/* Three-Column Desktop / Two-Column Tablet / One-Column Mobile Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-10 text-center">
            <p className="text-sm font-medium text-[#52627A] dark:text-[#94A3B8]">{content.emptyState}</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const imageUrl = getProjectImage(project);
              const isUploading = uploadingSlug === project.slug;
              const isRemoving = removingSlug === project.slug;

              return (
                <article
                  key={project.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] transition-all duration-200 hover:-translate-y-1 hover:border-[#CBD5E1] hover:shadow-lg motion-reduce:hover:translate-y-0 dark:border-[#1E293B] dark:bg-[#111B2E] dark:hover:border-[#334155]"
                >
                  <div>
                    {/* Top Screenshot Container (aspect-[16/10], object-cover) */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#0F172A]">
                      {imageUrl ? (
                        <button
                          type="button"
                          onClick={() => setPreviewProject(project)}
                          aria-label={`${content.uploadLabels.previewBtn}: ${project.title}`}
                          className="relative block h-full w-full cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1D4ED8]"
                        >
                          <img
                            src={imageUrl}
                            alt={project.imageAlt}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-[#142033]/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFFFFF]/95 px-3 py-1.5 text-xs font-semibold text-[#142033] shadow-sm dark:bg-[#0F172A]/95 dark:text-[#F1F5F9]">
                              <ZoomIn className="h-3.5 w-3.5 text-[#1D4ED8] dark:text-[#60A5FA]" aria-hidden="true" />
                              {content.uploadLabels.clickToPreview}
                            </span>
                          </div>
                        </button>
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center p-5 text-center">
                          <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-[#FFFFFF]/70 px-4 py-3 dark:border-[#334155] dark:bg-[#111B2E]/70">
                            <ImagePlus
                              className="h-6 w-6 text-[#0F766E] dark:text-[#2DD4BF]"
                              aria-hidden="true"
                            />
                            <p className="mt-2 text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                              {content.uploadLabels.placeholderTitle}
                            </p>
                            <p className="mt-1 max-w-[230px] text-[11px] leading-snug text-[#52627A] dark:text-[#94A3B8]">
                              {content.uploadLabels.placeholderSubtitle}
                            </p>
                            <button
                              type="button"
                              disabled={isUploading}
                              onClick={() => triggerUpload(project.slug)}
                              className="mt-3 inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1 text-xs font-semibold text-[#142033] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8] disabled:opacity-60 dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA] cursor-pointer"
                            >
                              {isUploading ? (
                                <>
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                                  <span>{content.uploadLabels.uploading}</span>
                                </>
                              ) : (
                                <>
                                  <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                                  <span>{content.uploadLabels.uploadBtn}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Content: Unboxed Category Label + Bold Title + Short Description */}
                    <div className="p-6">
                      <p className="text-xs font-semibold tracking-wide text-[#0F766E] dark:text-[#2DD4BF]">
                        {project.categoryLabel}
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-snug text-[#142033] transition-colors group-hover:text-[#1D4ED8] dark:text-[#F1F5F9] dark:group-hover:text-[#60A5FA]">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: View Case Study CTA + Screenshot Management */}
                  <div className="border-t border-[#E2E8F0] px-6 py-4 dark:border-[#1E293B]">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E40AF] cursor-pointer"
                      >
                        <span>{content.viewProject}</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>

                      {imageUrl ? (
                        <>
                          <button
                            type="button"
                            disabled={isUploading}
                            onClick={() => triggerUpload(project.slug)}
                            title={content.uploadLabels.replaceBtn}
                            aria-label={`${content.uploadLabels.replaceBtn}: ${project.title}`}
                            className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-medium text-[#52627A] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8] disabled:opacity-60 dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#94A3B8] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA] cursor-pointer"
                          >
                            {isUploading ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                            ) : (
                              <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                            <span className="sr-only sm:not-sr-only">{content.uploadLabels.replaceBtn}</span>
                          </button>

                          {uploadedImages[project.slug] ? (
                            <button
                              type="button"
                              disabled={isRemoving}
                              onClick={() => handleRemoveImage(project.slug)}
                              title={content.uploadLabels.removeBtn}
                              aria-label={`${content.uploadLabels.removeBtn}: ${project.title}`}
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#52627A] transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-60 dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#94A3B8] dark:hover:border-red-700 dark:hover:text-red-400 cursor-pointer"
                            >
                              {isRemoving ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                              )}
                            </button>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Clickable Full-Size Image Preview Lightbox Modal */}
      {previewProject && getProjectImage(previewProject) ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="image-preview-title"
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-[#0B1220]/80 p-4 backdrop-blur-xs"
          onClick={() => setPreviewProject(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-2xl dark:border-[#1E293B] dark:bg-[#111B2E]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] px-6 py-4 dark:border-[#1E293B]">
              <div>
                <p className="text-xs font-semibold text-[#0F766E] dark:text-[#2DD4BF]">
                  {previewProject.categoryLabel}
                </p>
                <h3
                  id="image-preview-title"
                  className="mt-0.5 text-lg font-bold text-[#142033] dark:text-[#F1F5F9]"
                >
                  {previewProject.title}
                </h3>
                {uploadedImages[previewProject.slug]?.fileName ? (
                  <p className="mt-0.5 text-xs text-[#52627A] dark:text-[#94A3B8]">
                    {uploadedImages[previewProject.slug].fileName}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => setPreviewProject(null)}
                aria-label={content.uploadLabels.closePreview}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#334155] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-[#F8FAFC] p-4 sm:p-6 dark:bg-[#0B1220]">
              <img
                src={getProjectImage(previewProject)}
                alt={previewProject.imageAlt}
                className="mx-auto max-h-[70vh] w-full rounded-xl object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] px-6 py-4 dark:border-[#1E293B]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={uploadingSlug === previewProject.slug}
                  onClick={() => triggerUpload(previewProject.slug)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-xs font-semibold text-[#142033] hover:border-[#1D4ED8] hover:text-[#1D4ED8] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA] cursor-pointer"
                >
                  <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{content.uploadLabels.replaceBtn}</span>
                </button>

                {uploadedImages[previewProject.slug] ? (
                  <button
                    type="button"
                    disabled={removingSlug === previewProject.slug}
                    onClick={() => handleRemoveImage(previewProject.slug)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-xs font-semibold text-red-600 hover:border-red-300 hover:bg-red-50 dark:border-[#334155] dark:bg-[#0F172A] dark:text-red-400 dark:hover:border-red-800 dark:hover:bg-red-950/40 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{content.uploadLabels.removeBtn}</span>
                  </button>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => setPreviewProject(null)}
                className="min-h-[40px] rounded-lg bg-[#142033] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E293B] dark:bg-[#1D4ED8] dark:hover:bg-[#1E40AF] cursor-pointer"
              >
                {content.caseStudyLabels.close}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Case Study Detail Modal */}
      {selectedProject ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#142033]/55 dark:bg-black/75 p-4 backdrop-blur-xs"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="my-8 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E] p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-5">
              <div>
                <p className="text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                  <span className="font-semibold text-[#0F766E] dark:text-[#2DD4BF]">
                    {selectedProject.categoryLabel}
                  </span>
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span>{selectedProject.statusLabel}</span>
                </p>
                <h3
                  id="case-study-title"
                  className="mt-1.5 text-2xl font-bold text-[#142033] dark:text-[#F1F5F9]"
                >
                  {selectedProject.title}
                </h3>
                <p className="mt-2 text-xs text-[#52627A] dark:text-[#94A3B8]">
                  {content.toolsLabel}: {selectedProject.tools.join(' · ')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label={content.caseStudyLabels.close}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#1E293B] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Case Study Screenshot or Clearly Labeled Upload Placeholder */}
            <div className="mt-6">
              {getProjectImage(selectedProject) ? (
                <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#0F172A]">
                  <button
                    type="button"
                    onClick={() => setPreviewProject(selectedProject)}
                    className="relative block h-full w-full cursor-zoom-in text-left"
                    aria-label={`${content.uploadLabels.previewBtn}: ${selectedProject.title}`}
                  >
                    <img
                      src={getProjectImage(selectedProject)}
                      alt={selectedProject.imageAlt}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-[#142033]/85 px-3 py-1.5 text-xs font-semibold text-white">
                      <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                      {content.uploadLabels.previewBtn}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-7 text-center dark:border-[#334155] dark:bg-[#0F172A]">
                  <ImagePlus className="h-6 w-6 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                  <p className="mt-2 text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]">
                    {content.uploadLabels.placeholderTitle}
                  </p>
                  <p className="mt-1 text-xs text-[#52627A] dark:text-[#94A3B8]">
                    {content.uploadLabels.placeholderSubtitle}
                  </p>
                  <button
                    type="button"
                    disabled={uploadingSlug === selectedProject.slug}
                    onClick={() => triggerUpload(selectedProject.slug)}
                    className="mt-3 inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-1.5 text-xs font-semibold text-[#142033] hover:border-[#1D4ED8] hover:text-[#1D4ED8] dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA] cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{content.uploadLabels.uploadBtn}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                  {content.caseStudyLabels.overview}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                  {selectedProject.caseStudy.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#0F172A] p-4">
                  <h4 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                    {content.caseStudyLabels.challenge}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                    {selectedProject.caseStudy.challenge}
                  </p>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#0F172A] p-4">
                  <h4 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                    {content.caseStudyLabels.strategy}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                    {selectedProject.caseStudy.strategy}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                  {content.caseStudyLabels.workCompleted}
                </h4>
                <ul className="mt-2.5 space-y-2">
                  {selectedProject.caseStudy.workCompleted.map((step) => (
                    <li
                      key={step}
                      className="flex items-start gap-2.5 text-sm text-[#52627A] dark:text-[#94A3B8]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E] dark:text-[#2DD4BF]"
                        aria-hidden="true"
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-6 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-5 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                    {content.caseStudyLabels.results}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                    {selectedProject.caseStudy.results}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                    {content.caseStudyLabels.keyLearnings}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                    {selectedProject.caseStudy.keyLearnings}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-5">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="min-h-[42px] rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-medium text-[#52627A] hover:bg-[#F8FAFC] hover:text-[#142033] dark:border-[#334155] dark:text-[#94A3B8] dark:hover:bg-[#1E293B] dark:hover:text-[#F1F5F9] cursor-pointer"
              >
                {content.caseStudyLabels.close}
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  onDiscussProject(title);
                }}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF] cursor-pointer"
              >
                <span>{content.caseStudyLabels.discussSimilar}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
