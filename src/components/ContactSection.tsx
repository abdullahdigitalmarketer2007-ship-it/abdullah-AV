import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, ExternalLink, Loader2, Mail, MessageSquare, Send } from 'lucide-react';
import { getWhatsAppHref, siteConfig } from '../config/siteConfig';
import type { Language, LocalizedContent, ServiceItem } from '../data/content';

interface ContactSectionProps {
  language: Language;
  content: LocalizedContent['contact'];
  services: ServiceItem[];
  preselectedService: string;
  onEnquirySubmitted?: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  website: string;
  message: string;
  consent: boolean;
}

interface SubmissionSuccess {
  enquiryId: string;
  message: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  content,
  services,
  preselectedService,
  onEnquirySubmitted,
}) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || '',
    website: '',
    message: '',
    consent: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<SubmissionSuccess | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validateClient = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (form.name.trim().length < 2) {
      errors.name =
        language === 'bn'
          ? 'অনুগ্রহ করে আপনার নাম লিখুন (অন্তত ২ অক্ষর)।'
          : 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      errors.email =
        language === 'bn'
          ? 'সঠিক ইমেইল ঠিকানা লিখুন।'
          : 'Please enter a valid email address.';
    }
    if (form.phone.trim()) {
      const digits = form.phone.replace(/[^0-9+]/g, '');
      if (digits.length < 7 || digits.length > 18) {
        errors.phone =
          language === 'bn'
            ? 'সঠিক ফোন বা হোয়াটসঅ্যাপ নম্বর দিন।'
            : 'Please enter a valid phone number.';
      }
    }
    if (!form.service.trim()) {
      errors.service =
        language === 'bn' ? 'একটি সার্ভিস নির্বাচন করুন।' : 'Please select a service.';
    }
    if (
      form.website.trim() &&
      !/^https?:\/\//i.test(form.website.trim()) &&
      !/^[a-z0-9.-]+\.[a-z]{2,}/i.test(form.website.trim())
    ) {
      errors.website =
        language === 'bn'
          ? 'সঠিক ওয়েবসাইট বা সোশ্যাল লিংক দিন।'
          : 'Please enter a valid website or social URL.';
    }
    if (form.message.trim().length < 10) {
      errors.message =
        language === 'bn'
          ? 'আপনার প্রজেক্ট সম্পর্কে অন্তত ১০ অক্ষরের বিস্তারিত লিখুন।'
          : 'Please share a brief message (at least 10 characters).';
    }
    if (!form.consent) {
      errors.consent =
        language === 'bn'
          ? 'যোগাযোগের সম্মতি প্রদান করুন।'
          : 'Please confirm consent so I can reply to your enquiry.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setSuccessData(null);

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.errors && typeof data.errors === 'object') {
          setFieldErrors(data.errors);
        }
        setServerError(
          data.message ||
            (language === 'bn'
              ? 'বার্তা পাঠানো যায়নি। অনুগ্রহ করে তথ্য যাচাই করুন।'
              : 'Unable to submit your enquiry. Please check the fields and try again.')
        );
      } else {
        setSuccessData({
          enquiryId: data.enquiryId,
          message: data.message,
        });
        onEnquirySubmitted?.();
        setForm({
          name: '',
          email: '',
          phone: '',
          service: '',
          website: '',
          message: '',
          consent: false,
        });
      }
    } catch {
      setServerError(
        language === 'bn'
          ? 'নেটওয়ার্ক ত্রুটি হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।'
          : 'Network error while sending your enquiry. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappHref = getWhatsAppHref(
    siteConfig.contact.whatsappNumber,
    language === 'bn'
      ? 'হ্যালো আবদুল্লাহ, আমি একটি ডিজিটাল মার্কেটিং / SEO প্রজেক্ট নিয়ে কথা বলতে চাই।'
      : 'Hello Abdullah, I would like to discuss a Digital Marketing / SEO project.'
  );

  const hasAnyDirectChannel = Boolean(
    siteConfig.contact.email ||
      whatsappHref ||
      siteConfig.contact.linkedinUrl ||
      siteConfig.contact.facebookUrl
  );

  return (
    <section id="contact" className="bg-[#FFFFFF] dark:bg-[#0B1220]">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Channels & Process */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
              {content.kicker}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142033] dark:text-[#F1F5F9] sm:text-3xl">
              {content.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
              {content.subheading}
            </p>

            {/* Direct Contact Channels (Strictly Owner-Confirmed) */}
            <div className="mt-8 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-6">
              <h3 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                {content.directHeading}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                {content.directNote}
              </p>

              {hasAnyDirectChannel ? (
                <div className="mt-4 space-y-3">
                  {siteConfig.contact.email ? (
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="flex min-h-[44px] items-center justify-between rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#142033] hover:border-[#1D4ED8] hover:text-[#1D4ED8] dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                    >
                      <span className="flex items-center gap-2.5">
                        <Mail className="h-4 w-4 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                        <span>{siteConfig.contact.email}</span>
                      </span>
                      <ExternalLink className="h-4 w-4 text-[#52627A] dark:text-[#94A3B8]" aria-hidden="true" />
                    </a>
                  ) : null}

                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] items-center justify-between rounded-lg border border-[#0F766E]/30 bg-[#FFFFFF] px-4 py-2.5 text-sm font-semibold text-[#0F766E] hover:bg-[#0F766E]/5 dark:border-[#2DD4BF]/30 dark:bg-[#0F172A] dark:text-[#2DD4BF] dark:hover:bg-[#2DD4BF]/10"
                    >
                      <span className="flex items-center gap-2.5">
                        <MessageSquare className="h-4 w-4" aria-hidden="true" />
                        <span>{content.whatsappAction}</span>
                      </span>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}

                  {siteConfig.contact.linkedinUrl ? (
                    <a
                      href={siteConfig.contact.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] items-center justify-between rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#142033] hover:border-[#1D4ED8] hover:text-[#1D4ED8] dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                    >
                      <span>{content.linkedinLabel}</span>
                      <ExternalLink className="h-4 w-4 text-[#52627A] dark:text-[#94A3B8]" aria-hidden="true" />
                    </a>
                  ) : null}

                  {siteConfig.contact.facebookUrl ? (
                    <a
                      href={siteConfig.contact.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] items-center justify-between rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#142033] hover:border-[#1D4ED8] hover:text-[#1D4ED8] dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                    >
                      <span>{content.facebookLabel}</span>
                      <ExternalLink className="h-4 w-4 text-[#52627A] dark:text-[#94A3B8]" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              ) : (
                <div className="mt-4 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0F172A] px-4 py-3 text-xs text-[#52627A] dark:text-[#94A3B8]">
                  {content.unconfiguredLabel}
                </div>
              )}
            </div>

            {/* Process Expectations */}
            <div className="mt-6 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-6">
              <h3 className="text-sm font-bold text-[#142033] dark:text-[#F1F5F9]">
                {content.processHeading}
              </h3>
              <ol className="mt-3 space-y-2.5">
                {content.processSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 text-xs leading-relaxed text-[#52627A] dark:text-[#94A3B8]"
                  >
                    <span className="font-mono font-semibold text-[#1D4ED8] dark:text-[#60A5FA] tabular-nums">
                      0{index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right Column: Validated Backend Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-6 sm:p-8">
              {successData ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl border border-[#15803D]/30 bg-[#FFFFFF] dark:border-[#4ADE80]/30 dark:bg-[#0F172A] p-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#15803D] dark:text-[#4ADE80]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-base font-bold text-[#142033] dark:text-[#F1F5F9]">
                        {successData.message}
                      </p>
                      <p className="mt-2 font-mono text-xs text-[#52627A] dark:text-[#94A3B8] tabular-nums">
                        {content.form.referencePrefix}: {successData.enquiryId}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSuccessData(null)}
                        className="mt-5 inline-flex min-h-[40px] items-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-xs font-semibold text-[#142033] hover:bg-[#FFFFFF] dark:border-[#334155] dark:bg-[#111B2E] dark:text-[#F1F5F9] dark:hover:bg-[#1E293B] cursor-pointer"
                      >
                        {content.form.resetBtn}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {serverError ? (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-lg border border-[#B91C1C]/30 bg-[#FFFFFF] dark:border-[#F87171]/30 dark:bg-[#0F172A] px-4 py-3 text-xs font-medium text-[#B91C1C] dark:text-[#F87171]"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{serverError}</span>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]"
                      >
                        {content.form.nameLabel}{' '}
                        <span className="text-[#B91C1C] dark:text-[#F87171]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={content.form.namePlaceholder}
                        aria-invalid={Boolean(fieldErrors.name)}
                        className="mt-1.5 w-full rounded-lg border border-[#CBD5E1] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#142033] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-none dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:placeholder:text-[#64748B] dark:focus:border-[#60A5FA]"
                      />
                      {fieldErrors.name ? (
                        <p className="mt-1 text-xs font-medium text-[#B91C1C] dark:text-[#F87171]">
                          {fieldErrors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]"
                      >
                        {content.form.emailLabel}{' '}
                        <span className="text-[#B91C1C] dark:text-[#F87171]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={content.form.emailPlaceholder}
                        aria-invalid={Boolean(fieldErrors.email)}
                        className="mt-1.5 w-full rounded-lg border border-[#CBD5E1] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#142033] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-none dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:placeholder:text-[#64748B] dark:focus:border-[#60A5FA]"
                      />
                      {fieldErrors.email ? (
                        <p className="mt-1 text-xs font-medium text-[#B91C1C] dark:text-[#F87171]">
                          {fieldErrors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]"
                      >
                        {content.form.phoneLabel}{' '}
                        <span className="font-normal text-[#52627A] dark:text-[#94A3B8]">
                          ({content.form.optionalTag})
                        </span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder={content.form.phonePlaceholder}
                        aria-invalid={Boolean(fieldErrors.phone)}
                        className="mt-1.5 w-full rounded-lg border border-[#CBD5E1] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#142033] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-none dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:placeholder:text-[#64748B] dark:focus:border-[#60A5FA]"
                      />
                      {fieldErrors.phone ? (
                        <p className="mt-1 text-xs font-medium text-[#B91C1C] dark:text-[#F87171]">
                          {fieldErrors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]"
                      >
                        {content.form.serviceLabel}{' '}
                        <span className="text-[#B91C1C] dark:text-[#F87171]">*</span>
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        required
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        aria-invalid={Boolean(fieldErrors.service)}
                        className="mt-1.5 w-full rounded-lg border border-[#CBD5E1] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#142033] focus:border-[#1D4ED8] focus:outline-none dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:focus:border-[#60A5FA]"
                      >
                        <option value="">{content.form.servicePlaceholder}</option>
                        {services.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            {srv.title}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.service ? (
                        <p className="mt-1 text-xs font-medium text-[#B91C1C] dark:text-[#F87171]">
                          {fieldErrors.service}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-website"
                      className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]"
                    >
                      {content.form.websiteLabel}{' '}
                      <span className="font-normal text-[#52627A] dark:text-[#94A3B8]">
                        ({content.form.optionalTag})
                      </span>
                    </label>
                    <input
                      id="contact-website"
                      name="website"
                      type="url"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder={content.form.websitePlaceholder}
                      aria-invalid={Boolean(fieldErrors.website)}
                      className="mt-1.5 w-full rounded-lg border border-[#CBD5E1] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#142033] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-none dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:placeholder:text-[#64748B] dark:focus:border-[#60A5FA]"
                    />
                    {fieldErrors.website ? (
                      <p className="mt-1 text-xs font-medium text-[#B91C1C] dark:text-[#F87171]">
                        {fieldErrors.website}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#142033] dark:text-[#F1F5F9]"
                    >
                      {content.form.messageLabel}{' '}
                      <span className="text-[#B91C1C] dark:text-[#F87171]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={content.form.messagePlaceholder}
                      aria-invalid={Boolean(fieldErrors.message)}
                      className="mt-1.5 w-full rounded-lg border border-[#CBD5E1] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#142033] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-none dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:placeholder:text-[#64748B] dark:focus:border-[#60A5FA]"
                    />
                    {fieldErrors.message ? (
                      <p className="mt-1 text-xs font-medium text-[#B91C1C] dark:text-[#F87171]">
                        {fieldErrors.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-2.5 text-xs text-[#52627A] dark:text-[#94A3B8]">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1] dark:border-[#334155] dark:bg-[#0F172A] text-[#1D4ED8] focus:ring-[#1D4ED8]"
                      />
                      <span>{content.form.consentLabel}</span>
                    </label>
                    {fieldErrors.consent ? (
                      <p className="mt-1 text-xs font-medium text-[#B91C1C] dark:text-[#F87171]">
                        {fieldErrors.consent}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-[#52627A] dark:text-[#94A3B8]">
                      {content.form.requiredHint}
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] disabled:cursor-not-allowed disabled:opacity-65 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>{content.form.submittingBtn}</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          <span>{content.form.submitBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
