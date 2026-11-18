import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Globe,
  Info,
  Loader2,
  Pause,
  Play,
  RefreshCw,
  Search,
} from 'lucide-react';
import type { Language, LocalizedContent } from '../data/content';

interface LiveDashboardSectionProps {
  language: Language;
  content: LocalizedContent['dashboard'];
  onGoToContact: () => void;
  refreshSignal: number;
}

type RangeKey = '7d' | '30d' | '90d';
type ChannelKey = 'all' | 'seo' | 'meta' | 'local';

interface TrendPoint {
  label: string;
  impressions: number;
  clicks: number;
  enquiries: number;
}

interface ChannelRow {
  id: Exclude<ChannelKey, 'all'>;
  nameEn: string;
  nameBn: string;
  impressions: number;
  clicks: number;
  enquiries: number;
}

interface SeoCheckResult {
  url: string;
  https: boolean;
  redirected: boolean;
  status: number;
  responseTimeMs: number;
  htmlLang: string;
  title: string;
  titleLength: number;
  metaDescription: string;
  metaDescriptionLength: number;
  h1Count: number;
  h2Count: number;
  hasCanonical: boolean;
  canonicalUrl: string;
  hasViewport: boolean;
  hasOpenGraph: boolean;
  hasTwitterCard: boolean;
  robotsMeta: string;
  xRobotsTag: string;
  contentEncoding: string;
  schemaCount: number;
  schemaTypes: string[];
  hreflangs: string[];
  robotsTxt: {
    exists: boolean;
    status: number | null;
    hasSitemapDirective: boolean;
    sitemapUrls: string[];
  };
  sitemapXml: {
    exists: boolean;
    status: number | null;
    url: string;
  };
  totalImages: number;
  imgsMissingAlt: number;
}

interface EnquiryDashboardData {
  totalEnquiries: number;
  byLanguage: { en: number; bn: number };
  byService: { service: string; count: number }[];
  recent: {
    id: string;
    service: string;
    language: 'en' | 'bn';
    createdAt: string;
    deliveredVia: 'saved' | 'webhook';
  }[];
  updatedAt: string;
}

const BASE_SERIES: Record<RangeKey, TrendPoint[]> = {
  '7d': [
    { label: 'D1', impressions: 1840, clicks: 94, enquiries: 3 },
    { label: 'D2', impressions: 2110, clicks: 112, enquiries: 4 },
    { label: 'D3', impressions: 1960, clicks: 105, enquiries: 3 },
    { label: 'D4', impressions: 2380, clicks: 134, enquiries: 5 },
    { label: 'D5', impressions: 2590, clicks: 148, enquiries: 6 },
    { label: 'D6', impressions: 2440, clicks: 141, enquiries: 5 },
    { label: 'D7', impressions: 2820, clicks: 169, enquiries: 7 },
  ],
  '30d': [
    { label: 'W1', impressions: 12400, clicks: 610, enquiries: 19 },
    { label: 'W2', impressions: 14150, clicks: 720, enquiries: 24 },
    { label: 'W3', impressions: 15800, clicks: 815, enquiries: 27 },
    { label: 'W4', impressions: 17900, clicks: 940, enquiries: 32 },
  ],
  '90d': [
    { label: 'M1', impressions: 41200, clicks: 1980, enquiries: 61 },
    { label: 'M2', impressions: 53400, clicks: 2640, enquiries: 84 },
    { label: 'M3', impressions: 64900, clicks: 3310, enquiries: 109 },
  ],
};

const CHANNEL_MULTIPLIER: Record<ChannelKey, number> = {
  all: 1,
  seo: 0.48,
  meta: 0.34,
  local: 0.18,
};

export const LiveDashboardSection: React.FC<LiveDashboardSectionProps> = ({
  language,
  content,
  onGoToContact,
  refreshSignal,
}) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'liveTools'>('simulator');
  const [range, setRange] = useState<RangeKey>('7d');
  const [channel, setChannel] = useState<ChannelKey>('all');
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [tickOffset, setTickOffset] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Live SEO Checker state
  const [seoUrl, setSeoUrl] = useState<string>('https://example.com');
  const [seoLoading, setSeoLoading] = useState<boolean>(false);
  const [seoError, setSeoError] = useState<string>('');
  const [seoResult, setSeoResult] = useState<SeoCheckResult | null>(null);

  // Live Enquiries state
  const [enquiryData, setEnquiryData] = useState<EnquiryDashboardData | null>(null);
  const [enquiryLoading, setEnquiryLoading] = useState<boolean>(false);
  const [enquiryError, setEnquiryError] = useState<string>('');

  // Simulated live stream tick (only increments small live pulse when active)
  useEffect(() => {
    if (!isStreaming) return undefined;
    const timer = window.setInterval(() => {
      setTickOffset((prev) => (prev + 1) % 24);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [isStreaming]);

  const fetchEnquiryDashboard = useCallback(async () => {
    setEnquiryLoading(true);
    setEnquiryError('');
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('Failed to load telemetry');
      const data = (await res.json()) as EnquiryDashboardData;
      setEnquiryData(data);
    } catch {
      setEnquiryError(
        language === 'bn'
          ? 'সার্ভার থেকে লাইভ ইনকোয়ারি ডেটা লোড করা যায়নি।'
          : 'Unable to load live enquiry telemetry from the server.'
      );
    } finally {
      setEnquiryLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchEnquiryDashboard();
  }, [fetchEnquiryDashboard, refreshSignal]);

  const handleRunSeoCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setSeoLoading(true);
    setSeoError('');
    try {
      const res = await fetch('/api/seo-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: seoUrl }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSeoResult(null);
        setSeoError(data.message || 'Unable to inspect URL.');
      } else {
        setSeoResult(data as SeoCheckResult);
      }
    } catch {
      setSeoResult(null);
      setSeoError(
        language === 'bn'
          ? 'URL পরীক্ষা করতে নেটওয়ার্ক ত্রুটি হয়েছে।'
          : 'Network error while running live SEO check.'
      );
    } finally {
      setSeoLoading(false);
    }
  };

  // Compute simulated chart + KPI series
  const series: TrendPoint[] = useMemo(() => {
    const mult = CHANNEL_MULTIPLIER[channel];
    return BASE_SERIES[range].map((pt, index) => {
      const liveBump = index === BASE_SERIES[range].length - 1 ? tickOffset : 0;
      const impressions = Math.round(pt.impressions * mult + liveBump * 19);
      const clicks = Math.round(pt.clicks * mult + liveBump * 2);
      const enquiries = Math.max(1, Math.round(pt.enquiries * mult + (liveBump > 12 ? 1 : 0)));
      return {
        label: pt.label,
        impressions,
        clicks,
        enquiries,
      };
    });
  }, [range, channel, tickOffset]);

  const totals = useMemo(() => {
    const impressions = series.reduce((sum, item) => sum + item.impressions, 0);
    const clicks = series.reduce((sum, item) => sum + item.clicks, 0);
    const enquiries = series.reduce((sum, item) => sum + item.enquiries, 0);
    const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0.00';
    return { impressions, clicks, ctr, enquiries };
  }, [series]);

  const channelRows: ChannelRow[] = useMemo(() => {
    const baseImp = totals.impressions / CHANNEL_MULTIPLIER[channel];
    const baseClicks = totals.clicks / CHANNEL_MULTIPLIER[channel];
    const baseEnq = totals.enquiries / CHANNEL_MULTIPLIER[channel];
    const allRows: ChannelRow[] = [
      {
        id: 'seo',
        nameEn: 'Organic Search (SEO)',
        nameBn: 'অর্গানিক সার্চ (SEO)',
        impressions: Math.round(baseImp * 0.48),
        clicks: Math.round(baseClicks * 0.5),
        enquiries: Math.max(1, Math.round(baseEnq * 0.48)),
      },
      {
        id: 'meta',
        nameEn: 'Meta Ads (Facebook & IG)',
        nameBn: 'Meta Ads (Facebook ও IG)',
        impressions: Math.round(baseImp * 0.34),
        clicks: Math.round(baseClicks * 0.32),
        enquiries: Math.max(1, Math.round(baseEnq * 0.35)),
      },
      {
        id: 'local',
        nameEn: 'Local Search & Maps',
        nameBn: 'লোকাল সার্চ ও ম্যাপস',
        impressions: Math.round(baseImp * 0.18),
        clicks: Math.round(baseClicks * 0.18),
        enquiries: Math.max(1, Math.round(baseEnq * 0.17)),
      },
    ];
    return channel === 'all' ? allRows : allRows.filter((row) => row.id === channel);
  }, [totals, channel]);

  // SVG Chart Geometry
  const chartWidth = 640;
  const chartHeight = 210;
  const padX = 36;
  const padY = 20;
  const innerW = chartWidth - padX * 2;
  const innerH = chartHeight - padY * 2;
  const maxClicks = Math.max(...series.map((s) => s.clicks), 10) * 1.15;

  const coords = series.map((pt, i) => {
    const x =
      series.length === 1
        ? padX + innerW / 2
        : padX + (i / (series.length - 1)) * innerW;
    const y = padY + innerH - (pt.clicks / maxClicks) * innerH;
    return { x, y, ...pt };
  });

  const linePath = coords
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(' ');
  const areaPath =
    coords.length > 0
      ? `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(padY + innerH).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(padY + innerH).toFixed(1)} Z`
      : '';

  const activePoint = hoveredIdx !== null ? coords[hoveredIdx] : coords[coords.length - 1];

  return (
    <section id="dashboard" className="border-b border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0B1220]">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* Section Header + Workspace Mode Switch */}
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
            role="tablist"
            aria-label="Dashboard view tabs"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'simulator'}
              onClick={() => setActiveTab('simulator')}
              className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'bg-[#FFFFFF] text-[#142033] shadow-xs dark:bg-[#1E293B] dark:text-[#F1F5F9]'
                  : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
              }`}
            >
              {content.tabs.simulator}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'liveTools'}
              onClick={() => setActiveTab('liveTools')}
              className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'liveTools'
                  ? 'bg-[#FFFFFF] text-[#142033] shadow-xs dark:bg-[#1E293B] dark:text-[#F1F5F9]'
                  : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
              }`}
            >
              {content.tabs.liveTools}
            </button>
          </div>
        </div>

        {/* TAB 1: Interactive Campaign Analytics Stream */}
        {activeTab === 'simulator' ? (
          <div className="mt-8 space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-2.5 text-xs text-[#52627A] dark:text-[#94A3B8]">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                <span>{content.simNotice}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {/* Channel Filter */}
                <div className="inline-flex items-center rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0F172A] p-0.5">
                  {content.channels.map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setChannel(ch.id)}
                      className={`min-h-[34px] rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        channel === ch.id
                          ? 'bg-[#142033] text-white dark:bg-[#1D4ED8]'
                          : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>

                {/* Date Range */}
                <div className="inline-flex items-center rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0F172A] p-0.5">
                  {content.ranges.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRange(r.id)}
                      className={`min-h-[34px] rounded-md px-2.5 py-1 font-mono text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        range === r.id
                          ? 'bg-[#1D4ED8] text-white'
                          : 'text-[#52627A] hover:text-[#142033] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                {/* Live Stream Control */}
                <button
                  type="button"
                  onClick={() => setIsStreaming((prev) => !prev)}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1.5 text-xs font-semibold text-[#142033] hover:bg-[#F8FAFC] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:bg-[#1E293B] cursor-pointer whitespace-nowrap"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isStreaming ? 'bg-[#15803D] dark:bg-[#4ADE80] animate-pulse' : 'bg-[#94A3B8]'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{isStreaming ? content.liveLabel : content.pausedLabel}</span>
                  {isStreaming ? (
                    <Pause className="ml-1 h-3.5 w-3.5 text-[#52627A] dark:text-[#94A3B8]" aria-hidden="true" />
                  ) : (
                    <Play className="ml-1 h-3.5 w-3.5 text-[#52627A] dark:text-[#94A3B8]" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Single-Elevation 4-Column KPI Strip */}
            <div className="grid grid-cols-2 divide-y divide-[#E2E8F0] overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] dark:divide-[#1E293B] dark:border-[#1E293B] dark:bg-[#111B2E] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              <div className="p-5">
                <p className="text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                  {content.kpis.impressions}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[#142033] dark:text-[#F1F5F9] tabular-nums sm:text-3xl">
                  {totals.impressions.toLocaleString()}
                </p>
              </div>
              <div className="border-l border-[#E2E8F0] dark:border-[#1E293B] p-5 lg:border-l-0">
                <p className="text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                  {content.kpis.clicks}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[#1D4ED8] dark:text-[#60A5FA] tabular-nums sm:text-3xl">
                  {totals.clicks.toLocaleString()}
                </p>
              </div>
              <div className="p-5">
                <p className="text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                  {content.kpis.ctr}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[#0F766E] dark:text-[#2DD4BF] tabular-nums sm:text-3xl">
                  {totals.ctr}%
                </p>
              </div>
              <div className="border-l border-[#E2E8F0] dark:border-[#1E293B] p-5 lg:border-l-0">
                <p className="text-xs font-medium text-[#52627A] dark:text-[#94A3B8]">
                  {content.kpis.enquiries}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[#142033] dark:text-[#F1F5F9] tabular-nums sm:text-3xl">
                  {totals.enquiries.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Trend Chart + Channel Table */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Interactive SVG Chart */}
              <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E] p-6 lg:col-span-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-[#142033] dark:text-[#F1F5F9]">
                      {content.chartTitle}
                    </h3>
                    <p className="mt-1 text-xs text-[#52627A] dark:text-[#94A3B8]">
                      {content.chartSubtitle}
                    </p>
                  </div>
                  {activePoint ? (
                    <div className="text-right font-mono text-xs tabular-nums">
                      <span className="font-semibold text-[#142033] dark:text-[#F1F5F9]">
                        {activePoint.label}
                      </span>
                      <span className="mx-1.5 text-[#CBD5E1] dark:text-[#334155]">·</span>
                      <span className="text-[#1D4ED8] dark:text-[#60A5FA]">
                        {activePoint.clicks.toLocaleString()} {content.kpis.clicks}
                      </span>
                      <span className="mx-1.5 text-[#CBD5E1] dark:text-[#334155]">·</span>
                      <span className="text-[#0F766E] dark:text-[#2DD4BF]">
                        {activePoint.enquiries} {content.tableHeaders.enquiries}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="mt-5 w-full overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="h-52 w-full min-w-[360px]"
                    role="img"
                    aria-label={content.chartTitle}
                  >
                    <defs>
                      <linearGradient id="clicksAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>

                    {[0, 0.25, 0.5, 0.75, 1].map((step) => {
                      const y = padY + innerH - step * innerH;
                      return (
                        <line
                          key={step}
                          x1={padX}
                          y1={y}
                          x2={chartWidth - padX}
                          y2={y}
                          className="stroke-[#E2E8F0] dark:stroke-[#1E293B]"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {areaPath ? <path d={areaPath} fill="url(#clicksAreaGrad)" /> : null}
                    {linePath ? (
                      <path
                        d={linePath}
                        fill="none"
                        className="stroke-[#1D4ED8] dark:stroke-[#60A5FA]"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : null}

                    {coords.map((pt, idx) => {
                      const isActive =
                        hoveredIdx === idx || (hoveredIdx === null && idx === coords.length - 1);
                      return (
                        <g
                          key={pt.label}
                          onMouseEnter={() => setHoveredIdx(idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          className="cursor-pointer"
                        >
                          <rect
                            x={pt.x - 24}
                            y={padY}
                            width={48}
                            height={innerH + 24}
                            fill="transparent"
                          />
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isActive ? 5.5 : 4}
                            className={
                              isActive
                                ? 'fill-[#0F766E] stroke-[#FFFFFF] dark:fill-[#2DD4BF] dark:stroke-[#111B2E]'
                                : 'fill-[#FFFFFF] stroke-[#1D4ED8] dark:fill-[#111B2E] dark:stroke-[#60A5FA]'
                            }
                            strokeWidth="2.2"
                          />
                          <text
                            x={pt.x}
                            y={chartHeight - 2}
                            textAnchor="middle"
                            fontSize="11"
                            className="fill-[#52627A] dark:fill-[#94A3B8]"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            {pt.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Channel Breakdown Table */}
              <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E] p-6 lg:col-span-5">
                <h3 className="text-base font-bold text-[#142033] dark:text-[#F1F5F9]">
                  {content.tableTitle}
                </h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] text-[#52627A] dark:text-[#94A3B8]">
                        <th className="py-2.5 font-semibold">{content.tableHeaders.channel}</th>
                        <th className="py-2.5 text-right font-semibold">
                          {content.tableHeaders.impressions}
                        </th>
                        <th className="py-2.5 text-right font-semibold">
                          {content.tableHeaders.clicks}
                        </th>
                        <th className="py-2.5 text-right font-semibold">
                          {content.tableHeaders.ctr}
                        </th>
                        <th className="py-2.5 text-right font-semibold">
                          {content.tableHeaders.enquiries}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                      {channelRows.map((row) => {
                        const rowCtr =
                          row.impressions > 0
                            ? ((row.clicks / row.impressions) * 100).toFixed(2)
                            : '0.00';
                        return (
                          <tr key={row.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]">
                            <td className="py-3 pr-2 font-medium text-[#142033] dark:text-[#F1F5F9]">
                              {language === 'bn' ? row.nameBn : row.nameEn}
                            </td>
                            <td className="py-3 text-right font-mono text-[#52627A] dark:text-[#94A3B8] tabular-nums">
                              {row.impressions.toLocaleString()}
                            </td>
                            <td className="py-3 text-right font-mono font-semibold text-[#1D4ED8] dark:text-[#60A5FA] tabular-nums">
                              {row.clicks.toLocaleString()}
                            </td>
                            <td className="py-3 text-right font-mono text-[#0F766E] dark:text-[#2DD4BF] tabular-nums">
                              {rowCtr}%
                            </td>
                            <td className="py-3 text-right font-mono font-semibold text-[#142033] dark:text-[#F1F5F9] tabular-nums">
                              {row.enquiries}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: Real Live On-Page SEO Checker & Real Enquiry Feed */
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left: Real Server-Backed SEO Checker */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] p-6 lg:col-span-7">
              <div className="flex items-start gap-3">
                <Globe className="mt-0.5 h-5 w-5 shrink-0 text-[#1D4ED8] dark:text-[#60A5FA]" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-bold text-[#142033] dark:text-[#F1F5F9]">
                    {content.seoChecker.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                    {content.seoChecker.subtitle}
                  </p>
                </div>
              </div>

              <form onSubmit={handleRunSeoCheck} className="mt-5 flex flex-col gap-3 sm:flex-row">
                <label htmlFor="live-seo-url" className="sr-only">
                  Website URL
                </label>
                <input
                  id="live-seo-url"
                  type="text"
                  value={seoUrl}
                  onChange={(e) => setSeoUrl(e.target.value)}
                  placeholder={content.seoChecker.placeholder}
                  className="min-h-[44px] flex-1 rounded-lg border border-[#CBD5E1] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#142033] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-none dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:placeholder:text-[#64748B] dark:focus:border-[#60A5FA]"
                />
                <button
                  type="submit"
                  disabled={seoLoading}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1E40AF] disabled:opacity-60 cursor-pointer whitespace-nowrap shrink-0"
                >
                  {seoLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>{content.seoChecker.runningBtn}</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" aria-hidden="true" />
                      <span>{content.seoChecker.runBtn}</span>
                    </>
                  )}
                </button>
              </form>

              {seoError ? (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-lg border border-[#B91C1C]/30 bg-[#FFFFFF] dark:border-[#F87171]/30 dark:bg-[#0F172A] px-4 py-3 text-xs font-medium text-[#B91C1C] dark:text-[#F87171]"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{seoError}</span>
                </div>
              ) : null}

              {seoLoading ? (
                <div className="mt-5 space-y-2.5 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0F172A] p-5">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#E2E8F0] dark:bg-[#1E293B]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#E2E8F0] dark:bg-[#1E293B]" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-[#E2E8F0] dark:bg-[#1E293B]" />
                </div>
              ) : seoResult ? (
                (() => {
                  const passedChecks = [
                    seoResult.https,
                    seoResult.status >= 200 && seoResult.status < 300,
                    Boolean(seoResult.title),
                    Boolean(seoResult.metaDescription),
                    seoResult.h1Count === 1,
                    seoResult.hasCanonical,
                    seoResult.hasViewport,
                    seoResult.hasOpenGraph,
                    seoResult.robotsTxt.exists,
                    seoResult.sitemapXml.exists,
                  ].filter(Boolean).length;

                  return (
                    <div className="mt-5 overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#0F172A]">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#111B2E] px-4 py-2.5 text-xs">
                        <span className="truncate font-mono text-[#142033] dark:text-[#F1F5F9]">
                          {seoResult.url}
                        </span>
                        <span className="font-mono font-semibold text-[#0F766E] dark:text-[#2DD4BF] tabular-nums">
                          HTTP {seoResult.status} · {seoResult.responseTimeMs}ms · {passedChecks}/10 {content.seoChecker.labels.checksPassed}
                        </span>
                      </div>

                      <dl className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B] text-xs">
                        <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
                          <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                            {content.seoChecker.labels.titleTag}
                          </dt>
                          <dd className="sm:col-span-2 text-[#142033] dark:text-[#F1F5F9]">
                            {seoResult.title || content.seoChecker.labels.missing}{' '}
                            <span className="font-mono text-[#0F766E] dark:text-[#2DD4BF] tabular-nums">
                              ({seoResult.titleLength} {content.seoChecker.labels.chars})
                            </span>
                          </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
                          <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                            {content.seoChecker.labels.metaDesc}
                          </dt>
                          <dd className="sm:col-span-2 text-[#142033] dark:text-[#F1F5F9]">
                            {seoResult.metaDescription || content.seoChecker.labels.missing}{' '}
                            <span className="font-mono text-[#0F766E] dark:text-[#2DD4BF] tabular-nums">
                              ({seoResult.metaDescriptionLength} {content.seoChecker.labels.chars})
                            </span>
                          </dd>
                        </div>

                        <div className="grid grid-cols-2 gap-4 px-4 py-3 sm:grid-cols-4">
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.https}
                            </dt>
                            <dd className="mt-1 font-medium text-[#142033] dark:text-[#F1F5F9]">
                              {seoResult.https
                                ? content.seoChecker.labels.present
                                : content.seoChecker.labels.missing}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.robotsTxt}
                            </dt>
                            <dd className="mt-1 font-medium text-[#142033] dark:text-[#F1F5F9]">
                              {seoResult.robotsTxt.exists
                                ? content.seoChecker.labels.present
                                : content.seoChecker.labels.missing}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.sitemapXml}
                            </dt>
                            <dd className="mt-1 font-medium text-[#142033] dark:text-[#F1F5F9]">
                              {seoResult.sitemapXml.exists
                                ? content.seoChecker.labels.present
                                : content.seoChecker.labels.missing}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.canonical}
                            </dt>
                            <dd className="mt-1 font-medium text-[#142033] dark:text-[#F1F5F9]">
                              {seoResult.hasCanonical
                                ? content.seoChecker.labels.present
                                : content.seoChecker.labels.missing}
                            </dd>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 px-4 py-3 sm:grid-cols-4">
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.h1Count} / {content.seoChecker.labels.h2Count}
                            </dt>
                            <dd className="mt-1 font-mono font-semibold text-[#142033] dark:text-[#F1F5F9] tabular-nums">
                              {seoResult.h1Count} / {seoResult.h2Count}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.viewport}
                            </dt>
                            <dd className="mt-1 font-medium text-[#142033] dark:text-[#F1F5F9]">
                              {seoResult.hasViewport
                                ? content.seoChecker.labels.present
                                : content.seoChecker.labels.missing}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.openGraph} / {content.seoChecker.labels.twitterCard}
                            </dt>
                            <dd className="mt-1 font-medium text-[#142033] dark:text-[#F1F5F9]">
                              {seoResult.hasOpenGraph ? 'OG ✓' : 'OG —'} ·{' '}
                              {seoResult.hasTwitterCard ? 'X ✓' : 'X —'}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.imagesAlt}
                            </dt>
                            <dd className="mt-1 font-mono font-semibold text-[#142033] dark:text-[#F1F5F9] tabular-nums">
                              {seoResult.imgsMissingAlt} / {seoResult.totalImages}
                            </dd>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 px-4 py-3 sm:grid-cols-3">
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.schemaJsonLd}
                            </dt>
                            <dd className="mt-1 font-mono text-[#142033] dark:text-[#F1F5F9] tabular-nums">
                              {seoResult.schemaCount > 0
                                ? `${seoResult.schemaCount} (${seoResult.schemaTypes.join(', ') || 'JSON-LD'})`
                                : content.seoChecker.labels.none}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.hreflang} / {content.seoChecker.labels.htmlLang}
                            </dt>
                            <dd className="mt-1 font-mono text-[#142033] dark:text-[#F1F5F9]">
                              {seoResult.hreflangs.length > 0
                                ? seoResult.hreflangs.join(', ')
                                : content.seoChecker.labels.none}{' '}
                              · lang={seoResult.htmlLang || '—'}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#52627A] dark:text-[#94A3B8]">
                              {content.seoChecker.labels.compression} / {content.seoChecker.labels.xRobotsTag}
                            </dt>
                            <dd className="mt-1 font-mono text-[#142033] dark:text-[#F1F5F9]">
                              {seoResult.contentEncoding} · {seoResult.xRobotsTag}
                            </dd>
                          </div>
                        </div>
                      </dl>
                    </div>
                  );
                })()
              ) : (
                <div className="mt-5 rounded-xl border border-dashed border-[#CBD5E1] bg-[#FFFFFF] dark:border-[#334155] dark:bg-[#0F172A] p-6 text-center text-xs text-[#52627A] dark:text-[#94A3B8]">
                  {content.seoChecker.emptyPrompt}
                </div>
              )}
            </div>

            {/* Right: Real Live Enquiry Telemetry */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#1E293B] dark:bg-[#111B2E] p-6 lg:col-span-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Activity className="mt-0.5 h-5 w-5 shrink-0 text-[#0F766E] dark:text-[#2DD4BF]" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-bold text-[#142033] dark:text-[#F1F5F9]">
                      {content.enquiryFeed.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#52627A] dark:text-[#94A3B8]">
                      {content.enquiryFeed.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={fetchEnquiryDashboard}
                  disabled={enquiryLoading}
                  className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-semibold text-[#142033] hover:bg-[#FFFFFF] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:hover:bg-[#1E293B] cursor-pointer shrink-0"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${enquiryLoading ? 'animate-spin' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{content.enquiryFeed.refreshBtn}</span>
                </button>
              </div>

              {enquiryError ? (
                <p className="mt-4 text-xs font-medium text-[#B91C1C] dark:text-[#F87171]">
                  {enquiryError}
                </p>
              ) : null}

              {enquiryData ? (
                <div className="mt-5 space-y-5">
                  <div className="grid grid-cols-3 divide-x divide-[#E2E8F0] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:divide-[#1E293B] dark:border-[#1E293B] dark:bg-[#0F172A]">
                    <div className="p-3.5">
                      <p className="text-[11px] font-medium text-[#52627A] dark:text-[#94A3B8]">
                        {content.enquiryFeed.totalLabel}
                      </p>
                      <p className="mt-1 font-mono text-xl font-bold text-[#142033] dark:text-[#F1F5F9] tabular-nums">
                        {enquiryData.totalEnquiries}
                      </p>
                    </div>
                    <div className="p-3.5">
                      <p className="text-[11px] font-medium text-[#52627A] dark:text-[#94A3B8]">
                        {content.enquiryFeed.enLabel}
                      </p>
                      <p className="mt-1 font-mono text-xl font-bold text-[#1D4ED8] dark:text-[#60A5FA] tabular-nums">
                        {enquiryData.byLanguage.en}
                      </p>
                    </div>
                    <div className="p-3.5">
                      <p className="text-[11px] font-medium text-[#52627A] dark:text-[#94A3B8]">
                        {content.enquiryFeed.bnLabel}
                      </p>
                      <p className="mt-1 font-mono text-xl font-bold text-[#0F766E] dark:text-[#2DD4BF] tabular-nums">
                        {enquiryData.byLanguage.bn}
                      </p>
                    </div>
                  </div>

                  {enquiryData.recent.length === 0 ? (
                    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#1E293B] dark:bg-[#0F172A] p-6 text-center">
                      <CheckCircle2
                        className="mx-auto h-6 w-6 text-[#0F766E] dark:text-[#2DD4BF]"
                        aria-hidden="true"
                      />
                      <p className="mt-2 text-sm font-semibold text-[#142033] dark:text-[#F1F5F9]">
                        {content.enquiryFeed.emptyTitle}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#52627A] dark:text-[#94A3B8]">
                        {content.enquiryFeed.emptyBody}
                      </p>
                      <button
                        type="button"
                        onClick={onGoToContact}
                        className="mt-4 inline-flex min-h-[38px] items-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E40AF] cursor-pointer"
                      >
                        {content.enquiryFeed.emptyCta}
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#E2E8F0] dark:border-[#1E293B] text-[#52627A] dark:text-[#94A3B8]">
                            <th className="py-2 font-semibold">
                              {content.enquiryFeed.headers.refId}
                            </th>
                            <th className="py-2 font-semibold">
                              {content.enquiryFeed.headers.service}
                            </th>
                            <th className="py-2 text-right font-semibold">
                              {content.enquiryFeed.headers.lang}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                          {enquiryData.recent.map((row) => (
                            <tr key={row.id}>
                              <td className="py-2.5 pr-2 font-mono text-[#52627A] dark:text-[#94A3B8] tabular-nums">
                                {row.id}
                              </td>
                              <td className="py-2.5 pr-2 font-medium text-[#142033] dark:text-[#F1F5F9]">
                                {row.service}
                              </td>
                              <td className="py-2.5 text-right font-mono uppercase text-[#0F766E] dark:text-[#2DD4BF]">
                                {row.language}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-5 space-y-2">
                  <div className="h-16 animate-pulse rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A]" />
                  <div className="h-24 animate-pulse rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A]" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
