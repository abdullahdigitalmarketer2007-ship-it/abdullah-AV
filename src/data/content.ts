export type Language = 'en' | 'bn';

export interface SkillGroup {
  id: 'seo' | 'digital-marketing' | 'analytics';
  title: string;
  subtitle: string;
  items: {
    name: string;
    note: string;
  }[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  deliverables: string[];
  detailedOverview: string;
  idealFor: string;
}

export type ProjectCategoryId =
  | 'seo-optimization'
  | 'youtube-seo'
  | 'meta-ads'
  | 'social-media-marketing'
  | 'website-seo-audit'
  | 'digital-marketing-strategy';

export interface PortfolioProject {
  slug: string;
  category: ProjectCategoryId;
  categoryLabel: string;
  isTemplate: boolean;
  statusLabel: string;
  title: string;
  summary: string;
  tools: string[];
  image: string;
  imageAlt: string;
  caseStudy: {
    overview: string;
    challenge: string;
    strategy: string;
    workCompleted: string[];
    results: string;
    keyLearnings: string;
  };
}

export interface LocalizedContent {
  meta: {
    homeTitle: string;
    homeDescription: string;
    aboutTitle: string;
    skillsTitle: string;
    servicesTitle: string;
    portfolioTitle: string;
    dashboardTitle: string;
    blogTitle: string;
    contactTitle: string;
    privacyTitle: string;
  };
  nav: {
    home: string;
    about: string;
    skills: string;
    services: string;
    portfolio: string;
    dashboard: string;
    blog: string;
    contact: string;
    hireMe: string;
    menuOpen: string;
    menuClose: string;
    switchToDark: string;
    switchToLight: string;
    lightLabel: string;
    darkLabel: string;
  };
  hero: {
    kicker: string;
    name: string;
    title: string;
    headline: string;
    description: string;
    ctaExplore: string;
    ctaHire: string;
    ctaContact: string;
    imageAlt: string;
    focusStrip: {
      label: string;
      value: string;
    }[];
  };
  about: {
    kicker: string;
    heading: string;
    introHeading: string;
    introBody: string;
    backgroundHeading: string;
    backgroundBody: string;
    objectivesHeading: string;
    objectivesBody: string;
    approachHeading: string;
    approachBody: string;
    portraitCaption: string;
    portraitPlaceholderNote: string;
    strategyImageAlt: string;
  };
  skills: {
    kicker: string;
    heading: string;
    subheading: string;
    confirmationNote: string;
    imageAlt: string;
    groups: SkillGroup[];
  };
  services: {
    kicker: string;
    heading: string;
    subheading: string;
    deliverablesLabel: string;
    learnMore: string;
    contactBtn: string;
    modalClose: string;
    modalIdealForLabel: string;
    modalDiscussCta: string;
    items: ServiceItem[];
  };
  portfolio: {
    kicker: string;
    heading: string;
    subheading: string;
    honestyBanner: string;
    filters: {
      id: 'all' | ProjectCategoryId;
      label: string;
    }[];
    toolsLabel: string;
    viewProject: string;
    emptyState: string;
    uploadLabels: {
      placeholderTitle: string;
      placeholderSubtitle: string;
      uploadBtn: string;
      replaceBtn: string;
      removeBtn: string;
      previewBtn: string;
      clickToPreview: string;
      uploading: string;
      closePreview: string;
      fileTypeError: string;
      uploadError: string;
      uploadedBadge: string;
    };
    caseStudyLabels: {
      overview: string;
      challenge: string;
      strategy: string;
      workCompleted: string;
      results: string;
      keyLearnings: string;
      discussSimilar: string;
      close: string;
    };
    projects: PortfolioProject[];
  };
  dashboard: {
    kicker: string;
    heading: string;
    subheading: string;
    tabs: {
      simulator: string;
      liveTools: string;
    };
    simNotice: string;
    liveLabel: string;
    pausedLabel: string;
    pauseAction: string;
    resumeAction: string;
    ranges: { id: '7d' | '30d' | '90d'; label: string }[];
    channels: { id: 'all' | 'seo' | 'meta' | 'local'; label: string }[];
    kpis: {
      impressions: string;
      clicks: string;
      ctr: string;
      enquiries: string;
    };
    chartTitle: string;
    chartSubtitle: string;
    tableTitle: string;
    tableHeaders: {
      channel: string;
      impressions: string;
      clicks: string;
      ctr: string;
      enquiries: string;
    };
    seoChecker: {
      title: string;
      subtitle: string;
      placeholder: string;
      runBtn: string;
      runningBtn: string;
      emptyPrompt: string;
      labels: {
        status: string;
        responseTime: string;
        titleTag: string;
        metaDesc: string;
        h1Count: string;
        canonical: string;
        viewport: string;
        openGraph: string;
        imagesAlt: string;
        https: string;
        htmlLang: string;
        h2Count: string;
        twitterCard: string;
        schemaJsonLd: string;
        hreflang: string;
        robotsTxt: string;
        sitemapXml: string;
        compression: string;
        xRobotsTag: string;
        checksPassed: string;
        present: string;
        missing: string;
        none: string;
        chars: string;
      };
    };
    enquiryFeed: {
      title: string;
      subtitle: string;
      refreshBtn: string;
      totalLabel: string;
      enLabel: string;
      bnLabel: string;
      emptyTitle: string;
      emptyBody: string;
      emptyCta: string;
      headers: {
        refId: string;
        service: string;
        lang: string;
        time: string;
      };
    };
  };
  blog: {
    kicker: string;
    heading: string;
    subheading: string;
    readArticle: string;
    backToBlog: string;
    discussTopic: string;
    allCategories: string;
  };
  contact: {
    kicker: string;
    heading: string;
    subheading: string;
    directHeading: string;
    directNote: string;
    unconfiguredLabel: string;
    emailLabel: string;
    whatsappLabel: string;
    whatsappAction: string;
    linkedinLabel: string;
    facebookLabel: string;
    processHeading: string;
    processSteps: string[];
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      serviceLabel: string;
      servicePlaceholder: string;
      websiteLabel: string;
      websitePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      consentLabel: string;
      submitBtn: string;
      submittingBtn: string;
      resetBtn: string;
      requiredHint: string;
      optionalTag: string;
      referencePrefix: string;
    };
  };
  footer: {
    title: string;
    shortIntro: string;
    navigationHeading: string;
    channelsHeading: string;
    privacyLink: string;
    copyrightPrefix: string;
    noFakeClaimsNote: string;
  };
  privacy: {
    heading: string;
    updatedLabel: string;
    sections: {
      title: string;
      body: string;
    }[];
    closeBtn: string;
  };
}

export const CONTENT: Record<Language, LocalizedContent> = {
  en: {
    meta: {
      homeTitle: 'Abdullah – Digital Marketing & SEO Specialist',
      homeDescription:
        'Helping businesses grow online with practical digital marketing, SEO, keyword research, technical audits, and Meta Ads strategies in Bangladesh.',
      aboutTitle: 'About Abdullah | Digital Marketing & SEO Specialist',
      skillsTitle: 'Skills & Tools | Abdullah — Digital Marketing & SEO',
      servicesTitle: 'Services | SEO, Keyword Research & Digital Marketing – Abdullah',
      portfolioTitle: 'Portfolio & Case Studies | Abdullah — Digital Marketing & SEO',
      dashboardTitle: 'Live Marketing & SEO Dashboard | Abdullah',
      blogTitle: 'SEO & Digital Marketing Insights | Abdullah',
      contactTitle: 'Contact Abdullah | Discuss a Digital Marketing or SEO Project',
      privacyTitle: 'Privacy Policy | Abdullah — Digital Marketing & SEO',
    },
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Services',
      portfolio: 'Portfolio',
      dashboard: 'Dashboard',
      blog: 'Blog',
      contact: 'Contact',
      hireMe: 'Hire Me',
      menuOpen: 'Open navigation menu',
      menuClose: 'Close navigation menu',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
      lightLabel: 'Light',
      darkLabel: 'Dark',
    },
    hero: {
      kicker: 'Digital Marketing & SEO Specialist',
      name: 'Abdullah',
      title: 'Digital Marketing & SEO Specialist',
      headline: 'Helping Businesses Grow Online with Smart Digital Marketing & SEO Strategies.',
      description:
        'I help businesses improve their online visibility, reach the right audience, and build a stronger digital presence through SEO and digital marketing.',
      ctaExplore: 'Explore My Work',
      ctaHire: 'Hire Me',
      ctaContact: 'Contact Me',
      imageAlt: 'Abstract editorial illustration representing digital marketing strategy and SEO',
      focusStrip: [
        { label: 'Core Focus', value: 'Search Engine Optimization & Digital Strategy' },
        { label: 'Target Region', value: 'Small Businesses & Startups in Bangladesh' },
        { label: 'Languages', value: 'English & Bangla Communication' },
        { label: 'Approach', value: 'Research-Led, Transparent Execution' },
      ],
    },
    about: {
      kicker: 'About Me',
      heading: 'A Practical, Research-First Approach to Digital Growth',
      introHeading: 'Professional Introduction',
      introBody:
        'I am Abdullah, a Digital Marketing and SEO Specialist focused on helping small businesses, startups, and entrepreneurs strengthen how their brand is discovered online. Rather than relying on guesswork or short-lived tactics, I focus on search clarity, audience understanding, and structured execution.',
      backgroundHeading: 'Digital Marketing Background',
      backgroundBody:
        'My work centers on combining foundational search engine optimization—keyword research, on-page structure, and technical health—with practical digital marketing channels such as Meta Ads, social media management, and enquiry-focused lead generation.',
      objectivesHeading: 'Career Objectives',
      objectivesBody:
        'I aim to partner with growing businesses in Bangladesh and beyond to build sustainable organic visibility, clean website foundations, and measurable customer acquisition workflows without misleading promises.',
      approachHeading: 'Working Approach',
      approachBody:
        'Every engagement begins by understanding business goals, reviewing the current website or social presence, identifying gaps through tools like Google Search Console and Google Analytics, and prioritizing actions that deliver clear long-term value.',
      portraitCaption: 'Abdullah — Digital Marketing & SEO Specialist',
      portraitPlaceholderNote: 'Owner portrait slot (add real photo in site configuration when ready)',
      strategyImageAlt: 'Editorial illustration representing digital marketing strategy and audience channels',
    },
    skills: {
      kicker: 'Skills & Expertise',
      heading: 'Confirmed Capabilities Across Search, Marketing & Analytics',
      subheading:
        'Focused competencies organized by discipline—presented plainly without inflated ratings or unverified badges.',
      confirmationNote:
        'Only active skills and core tools are listed below; additional tools can be confirmed as projects expand.',
      imageAlt: 'Editorial illustration representing search engine optimization and structured analysis',
      groups: [
        {
          id: 'seo',
          title: 'SEO',
          subtitle: 'Building search-friendly websites and targeted organic visibility.',
          items: [
            { name: 'Keyword Research', note: 'Mapping search intent, topic clusters, and local queries.' },
            { name: 'On-Page SEO', note: 'Optimizing titles, meta tags, headings, and internal links.' },
            { name: 'Technical SEO', note: 'Improving crawlability, indexing, sitemaps, and page structure.' },
            { name: 'Off-Page SEO', note: 'Strengthening brand mentions and ethical authority signals.' },
            { name: 'Local SEO', note: 'Helping local businesses appear in regional and map searches.' },
            { name: 'SEO Content Optimization', note: 'Structuring helpful copy around real user questions.' },
          ],
        },
        {
          id: 'digital-marketing',
          title: 'Digital Marketing',
          subtitle: 'Reaching the right audience through structured campaigns and content.',
          items: [
            { name: 'Digital Marketing Strategy', note: 'Aligning channels, messaging, and customer journey steps.' },
            { name: 'Meta Ads', note: 'Planning and structuring targeted Facebook & Instagram campaigns.' },
            { name: 'Social Media Marketing', note: 'Consistent page optimization and audience-focused content.' },
            { name: 'Lead Generation', note: 'Designing clear enquiry paths for prospective clients.' },
            { name: 'Content Marketing', note: 'Creating educational assets that build brand trust.' },
          ],
        },
        {
          id: 'analytics',
          title: 'Analytics & Auditing',
          subtitle: 'Diagnosing site health and interpreting real performance data.',
          items: [
            { name: 'Google Analytics', note: 'Reviewing traffic sources, user behavior, and conversion paths.' },
            { name: 'Google Search Console', note: 'Monitoring search queries, indexing status, and crawl issues.' },
            { name: 'Website SEO Audit', note: 'Evaluating technical, on-page, and content opportunities.' },
          ],
        },
      ],
    },
    services: {
      kicker: 'My Services',
      heading: 'Focused Services Built Around Clarity & Business Goals',
      subheading:
        'Each service includes clearly defined deliverables and transparent communication—never guaranteed search rankings.',
      deliverablesLabel: 'Key Deliverables',
      learnMore: 'Learn More',
      contactBtn: 'Contact',
      modalClose: 'Close service details',
      modalIdealForLabel: 'Best Suited For',
      modalDiscussCta: 'Enquire About This Service',
      items: [
        {
          id: 'seo-optimization',
          number: '01',
          title: 'SEO Optimization',
          shortDescription:
            'Comprehensive search engine optimization to strengthen site structure, relevance, and long-term organic discoverability.',
          deliverables: [
            'Baseline search & site health review',
            'Priority keyword & page mapping',
            'On-page & structural improvements',
          ],
          detailedOverview:
            'A structured SEO engagement tailored to your website stage—combining keyword alignment, on-page refinement, and technical hygiene so search engines and users clearly understand your offerings.',
          idealFor: 'Small businesses and startups seeking consistent organic visibility without shortcuts.',
        },
        {
          id: 'keyword-research',
          number: '02',
          title: 'Keyword Research',
          shortDescription:
            'In-depth search intent discovery to uncover what your potential customers actually search for in English and Bangla markets.',
          deliverables: [
            'Search intent & topic categorization',
            'Service & blog keyword mapping',
            'Competitor keyword gap overview',
          ],
          detailedOverview:
            'Actionable keyword research organized by buyer intent (informational, commercial, and local) so every page and article targets realistic, relevant search demand.',
          idealFor: 'New websites, content teams, and service businesses planning new landing pages.',
        },
        {
          id: 'technical-seo-audit',
          number: '03',
          title: 'Technical SEO Audit',
          shortDescription:
            'Diagnostic inspection of crawling, indexing, site architecture, and core technical factors affecting search performance.',
          deliverables: [
            'Crawl & indexation issue checklist',
            'Robots.txt, sitemap & canonical review',
            'Prioritized developer fix roadmap',
          ],
          detailedOverview:
            'A plain-language technical audit pinpointing broken links, duplicate metadata, redirect chains, and indexing blockers—complete with clear implementation priorities.',
          idealFor: 'Websites experiencing indexing delays, redesign migrations, or structural issues.',
        },
        {
          id: 'on-page-seo',
          number: '04',
          title: 'On-Page SEO',
          shortDescription:
            'Page-by-page optimization of titles, meta descriptions, heading hierarchy, internal links, and image alt attributes.',
          deliverables: [
            'Title tag & meta description updates',
            'H1–H3 heading & content structure',
            'Internal linking & image alt audit',
          ],
          detailedOverview:
            'Refining existing service pages and blog articles so headings, copy clarity, metadata, and internal links reinforce topical relevance for readers and search crawlers.',
          idealFor: 'Businesses with existing pages that need stronger clarity and search relevance.',
        },
        {
          id: 'meta-ads-management',
          number: '05',
          title: 'Meta Ads Management',
          shortDescription:
            'Objective-driven Facebook and Instagram ad campaign setup, audience targeting, and ongoing creative refinement.',
          deliverables: [
            'Campaign structure & audience setup',
            'Ad copy & creative angle guidance',
            'Weekly spend & performance check-ins',
          ],
          detailedOverview:
            'Structured Meta advertising aligned with your budget and campaign objective—whether generating message enquiries, website traffic, or local brand awareness.',
          idealFor: 'Retailers, service providers, and startups looking for targeted social reach in Bangladesh.',
        },
        {
          id: 'social-media-marketing',
          number: '06',
          title: 'Social Media Marketing',
          shortDescription:
            'Consistent, audience-focused social presence through planned content calendars and profile optimization.',
          deliverables: [
            'Profile & page optimization',
            'Monthly content topic calendar',
            'Consistent brand messaging support',
          ],
          detailedOverview:
            'Building a reliable social presence that educates your audience, highlights your services clearly, and keeps communication active across key platforms.',
          idealFor: 'Growing brands that want steady, professional communication on Facebook and LinkedIn.',
        },
        {
          id: 'lead-generation',
          number: '07',
          title: 'Lead Generation',
          shortDescription:
            'Practical landing-page, form, and campaign workflows designed to turn audience interest into qualified client enquiries.',
          deliverables: [
            'Enquiry funnel & CTA audit',
            'Lead form & WhatsApp flow setup',
            'Audience-to-offer alignment plan',
          ],
          detailedOverview:
            'Connecting traffic sources with clear landing-page messaging and friction-free enquiry forms so interested prospects know exactly how to reach your business.',
          idealFor: 'B2B service firms, agencies, and local businesses seeking structured enquiries.',
        },
        {
          id: 'website-seo-audit',
          number: '08',
          title: 'Website SEO Audit',
          shortDescription:
            'Holistic evaluation combining technical checks, on-page content quality, and Search Console diagnostics in one clear report.',
          deliverables: [
            'Full-site SEO health scorecard',
            'Search Console & Analytics review',
            'Step-by-step action checklist',
          ],
          detailedOverview:
            'An end-to-end diagnostic review of your website’s organic readiness—highlighting quick wins alongside foundational improvements before investing in larger campaigns.',
          idealFor: 'Business owners wanting an honest, clear starting point before committing to ongoing SEO.',
        },
      ],
    },
    portfolio: {
      kicker: 'Projects & Case Studies',
      heading: 'Selected Projects & Editable Case Studies',
      subheading:
        'Clean three-column project showcase covering SEO Optimization, YouTube SEO, Meta Ads, Social Media Marketing, Website SEO Audit, and Digital Marketing Strategy.',
      honestyBanner:
        'Real Screenshots Only: Upload your own verified project screenshots (PNG, JPG, WebP) directly onto any card below. Clearly labeled placeholders remain visible until real project images are uploaded—no fabricated results or fake analytics screenshots.',
      filters: [
        { id: 'all', label: 'All Projects' },
        { id: 'seo-optimization', label: 'SEO Optimization' },
        { id: 'youtube-seo', label: 'YouTube SEO' },
        { id: 'meta-ads', label: 'Meta Ads' },
        { id: 'social-media-marketing', label: 'Social Media Marketing' },
        { id: 'website-seo-audit', label: 'Website SEO Audit' },
        { id: 'digital-marketing-strategy', label: 'Digital Marketing Strategy' },
      ],
      toolsLabel: 'Tools Used',
      viewProject: 'View Case Study',
      emptyState: 'No projects match this category yet. Select "All Projects" to view all templates.',
      uploadLabels: {
        placeholderTitle: 'Project Screenshot Placeholder',
        placeholderSubtitle: 'Upload a real project screenshot (PNG, JPG, WebP)',
        uploadBtn: 'Upload Screenshot',
        replaceBtn: 'Replace Image',
        removeBtn: 'Remove',
        previewBtn: 'Preview Image',
        clickToPreview: 'Click to preview full image',
        uploading: 'Uploading...',
        closePreview: 'Close image preview',
        fileTypeError: 'Please upload a valid PNG, JPG, or WebP image under 5MB.',
        uploadError: 'Unable to upload image right now. Please try again.',
        uploadedBadge: 'Uploaded Screenshot',
      },
      caseStudyLabels: {
        overview: 'Project Overview',
        challenge: 'Client Challenge',
        strategy: 'Strategy',
        workCompleted: 'Work Completed',
        results: 'Results (Verified Only)',
        keyLearnings: 'Key Learnings',
        discussSimilar: 'Discuss a Similar Project',
        close: 'Close case study',
      },
      projects: [
        {
          slug: 'seo-optimization-case-study',
          category: 'seo-optimization',
          categoryLabel: 'SEO Optimization',
          isTemplate: true,
          statusLabel: 'Editable Case Study Template',
          title: 'On-Page & Organic Search Optimization Framework',
          summary:
            'Structured keyword intent mapping, service-page content optimization, and internal linking workflow for sustainable search visibility.',
          tools: ['Google Search Console', 'Keyword Research', 'On-Page SEO'],
          image: '',
          imageAlt: 'SEO Optimization project screenshot',
          caseStudy: {
            overview:
              'Editable case study slot for an SEO Optimization engagement. Replace this summary with the verified client industry, target region, and project timeline.',
            challenge:
              'Document the baseline search visibility bottlenecks, unoptimized page titles, or missing intent alignment identified before optimization.',
            strategy:
              'Map primary and secondary keywords by commercial and informational intent, then align headings, metadata, and internal links across priority pages.',
            workCompleted: [
              'Service-page keyword mapping and intent clustering',
              'Title tag, meta description, and H1–H3 hierarchy alignment',
              'Internal linking architecture connecting guides to core pages',
            ],
            results:
              'Pending verified project data. Only measured, client-approved Search Console or Analytics outcomes will be published here.',
            keyLearnings:
              'Clear search intent alignment helps users find the exact service they need without keyword stuffing.',
          },
        },
        {
          slug: 'youtube-seo-case-study',
          category: 'youtube-seo',
          categoryLabel: 'YouTube SEO',
          isTemplate: true,
          statusLabel: 'Editable Case Study Template',
          title: 'YouTube Channel & Video Discovery Optimization',
          summary:
            'Video keyword research, searchable title structures, retention-focused descriptions, and playlist organization for organic YouTube discovery.',
          tools: ['YouTube Studio', 'Keyword Research', 'Metadata Optimization'],
          image: '',
          imageAlt: 'YouTube SEO project screenshot',
          caseStudy: {
            overview:
              'Editable case study slot for a YouTube SEO project. Add channel niche, content language (Bangla or English), and verified scope once approved.',
            challenge:
              'Outline discovery issues such as unsearchable video titles, sparse descriptions, missing tags, or unorganized channel playlists.',
            strategy:
              'Research viewer search queries across YouTube Search, optimize titles and timestamps, and structure topic playlists to guide session watch flow.',
            workCompleted: [
              'Topic & video keyword research tailored to target viewers',
              'Search-friendly titles, descriptions, chapters, and tags',
              'Channel homepage layout and curated playlist structure',
            ],
            results:
              'Pending verified project data. Real YouTube Studio impressions, watch time, or CTR figures will only appear with client permission.',
            keyLearnings:
              'Consistent metadata and clear topic playlists help YouTube classify a channel for relevant viewer searches.',
          },
        },
        {
          slug: 'meta-ads-case-study',
          category: 'meta-ads',
          categoryLabel: 'Meta Ads',
          isTemplate: true,
          statusLabel: 'Editable Case Study Template',
          title: 'Meta Ads Campaign & Lead Funnel Architecture',
          summary:
            'Objective-driven Facebook and Instagram ad structure pairing focused audience segmentation with clear enquiry landing steps.',
          tools: ['Meta Ads Manager', 'Audience Research', 'UTM Tracking'],
          image: '',
          imageAlt: 'Meta Ads campaign project screenshot',
          caseStudy: {
            overview:
              'Editable case study slot for a Meta Ads engagement. Add verified business objective (Messages, Leads, or Traffic) and budget scope before publishing.',
            challenge:
              'Describe initial ad account challenges such as overlapping audiences, generic ad copy, or unclear post-click enquiry flows.',
            strategy:
              'Separate testing and scaling ad sets, refine value-driven creative hooks in Bangla/English, and connect ads to UTM-tracked enquiry pages.',
            workCompleted: [
              'Campaign objective alignment and audience segmentation',
              'Multiple ad copy and creative angle variations',
              'UTM parameter setup and enquiry form conversion alignment',
            ],
            results:
              'Pending verified project data. Actual cost-per-message or verified lead metrics will only be added once approved by the client.',
            keyLearnings:
              'Aligning the ad promise directly with the landing page or WhatsApp prompt reduces enquiry drop-off.',
          },
        },
        {
          slug: 'social-media-marketing-case-study',
          category: 'social-media-marketing',
          categoryLabel: 'Social Media Marketing',
          isTemplate: true,
          statusLabel: 'Editable Case Study Template',
          title: 'Consistent Social Content & Page Optimization',
          summary:
            'Structured content calendar, page bio clarity, and audience-focused messaging built to strengthen brand trust across social platforms.',
          tools: ['Content Calendar', 'Facebook Page', 'LinkedIn'],
          image: '',
          imageAlt: 'Social Media Marketing project screenshot',
          caseStudy: {
            overview:
              'Editable case study slot for a Social Media Marketing project. Document the business profile, platforms managed, and monthly cadence once verified.',
            challenge:
              'Note inconsistent posting schedules, unclear service descriptions on social profiles, or low audience engagement on educational posts.',
            strategy:
              'Establish repeatable content pillars (educational tips, service clarity, FAQs) and optimize page info for instant visitor trust.',
            workCompleted: [
              'Social profile bio, CTA button, and visual consistency review',
              'Monthly bilingual content pillar and topic calendar',
              'Audience-focused caption copywriting and hashtag hygiene',
            ],
            results:
              'Pending verified project data. Only authentic reach or engagement insights approved by the page owner will be published.',
            keyLearnings:
              'Consistent, helpful educational posts build stronger long-term brand credibility than sporadic promotional posts.',
          },
        },
        {
          slug: 'website-seo-audit-case-study',
          category: 'website-seo-audit',
          categoryLabel: 'Website SEO Audit',
          isTemplate: true,
          statusLabel: 'Editable Case Study Template',
          title: 'Technical & Full-Site Website SEO Audit',
          summary:
            'Comprehensive crawl, indexation, sitemap, canonical, and mobile usability inspection paired with a prioritized implementation roadmap.',
          tools: ['Google Search Console', 'Google Analytics', 'Technical Audit'],
          image: '',
          imageAlt: 'Website SEO Audit project screenshot',
          caseStudy: {
            overview:
              'Editable case study slot for a Website SEO Audit project. Replace with verified website type (e-commerce, corporate, or service site) upon approval.',
            challenge:
              'Summarize technical findings discovered during the crawl—such as missing canonicals, broken links, or unindexed service pages.',
            strategy:
              'Triage technical blockers first (indexability, robots.txt, XML sitemap), followed by on-page metadata, heading semantics, and alt-text fixes.',
            workCompleted: [
              'Robots.txt, XML sitemap, and canonical tag diagnostics',
              'Duplicate title, missing meta description, and H1 audit',
              'Prioritized fix checklist for website owners and developers',
            ],
            results:
              'Pending verified project data. Post-fix Search Console coverage and indexation progress will be documented once verified.',
            keyLearnings:
              'Fixing foundational crawl and metadata errors early prevents wasted effort on future content campaigns.',
          },
        },
        {
          slug: 'digital-marketing-strategy-case-study',
          category: 'digital-marketing-strategy',
          categoryLabel: 'Digital Marketing Strategy',
          isTemplate: true,
          statusLabel: 'Editable Case Study Template',
          title: 'Integrated Growth Strategy: Search, Social & Leads',
          summary:
            'Coordinated roadmap connecting organic SEO, targeted Meta campaigns, and friction-free lead capture for small businesses.',
          tools: ['Digital Strategy', 'Google Analytics', 'Lead Generation'],
          image: '',
          imageAlt: 'Digital Marketing Strategy project screenshot',
          caseStudy: {
            overview:
              'Editable case study slot for a multi-channel Digital Marketing Strategy engagement. Add verified business goals and channel mix before launch.',
            challenge:
              'Identify fragmented marketing efforts where SEO, social media, and paid campaigns operated independently without shared tracking.',
            strategy:
              'Unify channel messaging around customer pain points, pair evergreen SEO with targeted Meta Ads, and standardize Analytics goal tracking.',
            workCompleted: [
              'Cross-channel audience and customer-journey mapping',
              'Quarterly SEO + Meta Ads + content coordination roadmap',
              'Unified enquiry tracking and monthly reporting template',
            ],
            results:
              'Pending verified project data. Verified multi-channel enquiry or traffic improvements will only appear after client sign-off.',
            keyLearnings:
              'Connecting organic search and paid social under one clear enquiry goal creates steadier, measurable marketing momentum.',
          },
        },
      ],
    },
    dashboard: {
      kicker: 'Live Marketing Workspace',
      heading: 'Live Marketing & SEO Dashboard',
      subheading:
        'Explore an interactive campaign analytics simulation alongside a live website On-Page SEO checker and real-time enquiry tracker.',
      tabs: {
        simulator: 'Campaign Analytics Stream',
        liveTools: 'Live SEO Checker & Enquiries',
      },
      simNotice:
        'Interactive Demo Workspace: Simulated live telemetry to demonstrate campaign tracking—not historical client proof.',
      liveLabel: 'Live Stream Active',
      pausedLabel: 'Stream Paused',
      pauseAction: 'Pause',
      resumeAction: 'Resume',
      ranges: [
        { id: '7d', label: '7D' },
        { id: '30d', label: '30D' },
        { id: '90d', label: '90D' },
      ],
      channels: [
        { id: 'all', label: 'All Channels' },
        { id: 'seo', label: 'Organic SEO' },
        { id: 'meta', label: 'Meta Ads' },
        { id: 'local', label: 'Local Search' },
      ],
      kpis: {
        impressions: 'Impressions',
        clicks: 'Total Clicks',
        ctr: 'Average CTR',
        enquiries: 'Tracked Leads',
      },
      chartTitle: 'Channel Click & Visibility Trend',
      chartSubtitle: 'Hover or tap any interval to inspect exact numbers.',
      tableTitle: 'Channel Performance Breakdown',
      tableHeaders: {
        channel: 'Channel',
        impressions: 'Impressions',
        clicks: 'Clicks',
        ctr: 'CTR',
        enquiries: 'Leads',
      },
      seoChecker: {
        title: 'Live Technical & On-Page SEO Inspector',
        subtitle: 'Enter any public website URL to run a live server-side check of crawlability, robots.txt, sitemap.xml, Schema.org JSON-LD, hreflang, canonicals, and metadata.',
        placeholder: 'https://example.com',
        runBtn: 'Run Technical Audit',
        runningBtn: 'Auditing...',
        emptyPrompt: 'Enter a public URL above to run a live server-side Technical & On-Page SEO audit.',
        labels: {
          status: 'HTTP Status',
          responseTime: 'Response Time',
          titleTag: 'Title Tag',
          metaDesc: 'Meta Description',
          h1Count: 'H1 Headings',
          canonical: 'Canonical Tag',
          viewport: 'Mobile Viewport',
          openGraph: 'Open Graph Tags',
          imagesAlt: 'Images Missing Alt',
          https: 'HTTPS Security',
          htmlLang: 'HTML Lang',
          h2Count: 'H2 Subheadings',
          twitterCard: 'Twitter Card',
          schemaJsonLd: 'Schema.org JSON-LD',
          hreflang: 'Hreflang Alternates',
          robotsTxt: 'robots.txt',
          sitemapXml: 'XML Sitemap',
          compression: 'Compression',
          xRobotsTag: 'X-Robots-Tag',
          checksPassed: 'Technical checks passed',
          present: 'Present',
          missing: 'Missing',
          none: 'None detected',
          chars: 'chars',
        },
      },
      enquiryFeed: {
        title: 'Real-Time Enquiry Feed',
        subtitle: 'Live anonymized count and service breakdown from submitted contact enquiries.',
        refreshBtn: 'Refresh',
        totalLabel: 'Total Saved Enquiries',
        enLabel: 'English',
        bnLabel: 'Bangla',
        emptyTitle: 'No Enquiries Recorded Yet',
        emptyBody: 'Submit a message through the Contact form below to see live enquiry telemetry appear here.',
        emptyCta: 'Go to Contact Form',
        headers: {
          refId: 'Reference',
          service: 'Service Requested',
          lang: 'Lang',
          time: 'Submitted',
        },
      },
    },
    blog: {
      kicker: 'Blog & Insights',
      heading: 'Practical Guides on SEO & Digital Marketing',
      subheading:
        'Clear, jargon-free articles designed to help business owners understand how search and digital marketing work.',
      readArticle: 'Read Guide',
      backToBlog: 'Back to all guides',
      discussTopic: 'Discuss This Strategy',
      allCategories: 'All Topics',
    },
    contact: {
      kicker: 'Contact',
      heading: 'Have a Project in Mind?',
      subheading:
        'Share a little about your business goals and the support you are looking for. Your enquiry is validated and recorded directly on the server.',
      directHeading: 'Direct Channels & Links',
      directNote:
        'Direct email, WhatsApp, and social profile links are displayed here only once confirmed in the site configuration.',
      unconfiguredLabel: 'Pending owner confirmation — use the enquiry form alongside.',
      emailLabel: 'Email',
      whatsappLabel: 'WhatsApp',
      whatsappAction: 'Message on WhatsApp',
      linkedinLabel: 'LinkedIn',
      facebookLabel: 'Facebook',
      processHeading: 'What Happens Next',
      processSteps: [
        'Your enquiry is saved with a reference ID for structured follow-up.',
        'I review your website or social profile and stated goals.',
        'We schedule a concise initial conversation using your preferred contact details.',
      ],
      form: {
        nameLabel: 'Full Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email Address',
        emailPlaceholder: 'you@company.com',
        phoneLabel: 'Phone / WhatsApp',
        phonePlaceholder: '+880 1XXX-XXXXXX',
        serviceLabel: 'Service Required',
        servicePlaceholder: 'Select a service',
        websiteLabel: 'Website or Social Page URL',
        websitePlaceholder: 'https://yourwebsite.com',
        messageLabel: 'Project Details',
        messagePlaceholder: 'Tell me briefly about your business, goals, and what kind of support you need...',
        consentLabel: 'I consent to being contacted regarding this enquiry.',
        submitBtn: 'Send Enquiry',
        submittingBtn: 'Submitting...',
        resetBtn: 'Send Another Message',
        requiredHint: 'Required fields are marked clearly.',
        optionalTag: 'Optional',
        referencePrefix: 'Reference ID',
      },
    },
    footer: {
      title: 'Digital Marketing & SEO Specialist',
      shortIntro:
        'Helping small businesses, startups, and entrepreneurs in Bangladesh build clear, trustworthy online visibility.',
      navigationHeading: 'Navigation',
      channelsHeading: 'Connect',
      privacyLink: 'Privacy Policy',
      copyrightPrefix: 'All rights reserved.',
      noFakeClaimsNote: 'Honest, strategy-led digital marketing without guaranteed-ranking claims.',
    },
    privacy: {
      heading: 'Privacy Notice',
      updatedLabel: 'Draft Policy · Review Before Launch',
      closeBtn: 'Close Privacy Notice',
      sections: [
        {
          title: '1. Information You Share',
          body: 'When you submit the contact enquiry form, the website collects your name, email address, optional phone number, selected service, optional website URL, and message solely to respond to your enquiry.',
        },
        {
          title: '2. How Enquiries Are Used',
          body: 'Submitted details are stored securely on the application server so Abdullah can review your request and follow up regarding potential SEO or digital marketing collaboration. Information is never sold or shared with unrelated third parties.',
        },
        {
          title: '3. Data Retention & Removal',
          body: 'You may request deletion or correction of your submitted enquiry details at any time once confirmed contact channels are published.',
        },
      ],
    },
  },
  bn: {
    meta: {
      homeTitle: 'আবদুল্লাহ – ডিজিটাল মার্কেটিং ও SEO স্পেশালিস্ট',
      homeDescription:
        'পরিকল্পিত ডিজিটাল মার্কেটিং, SEO, কীওয়ার্ড রিসার্চ, টেকনিক্যাল অডিট ও Meta Ads কৌশলের মাধ্যমে ব্যবসার অনলাইন উপস্থিতি শক্তিশালী করতে সহায়তা।',
      aboutTitle: 'আবদুল্লাহ সম্পর্কে | ডিজিটাল মার্কেটিং ও SEO স্পেশালিস্ট',
      skillsTitle: 'দক্ষতা ও টুলস | আবদুল্লাহ — ডিজিটাল মার্কেটিং ও SEO',
      servicesTitle: 'সার্ভিসসমূহ | SEO, কীওয়ার্ড রিসার্চ ও ডিজিটাল মার্কেটিং – আবদুল্লাহ',
      portfolioTitle: 'কাজের নমুনা ও কেস স্টাডি | আবদুল্লাহ — ডিজিটাল মার্কেটিং ও SEO',
      dashboardTitle: 'লাইভ মার্কেটিং ও SEO ড্যাশবোর্ড | আবদুল্লাহ',
      blogTitle: 'SEO ও ডিজিটাল মার্কেটিং গাইড | আবদুল্লাহ',
      contactTitle: 'যোগাযোগ | প্রজেক্ট নিয়ে আলোচনা করুন – আবদুল্লাহ',
      privacyTitle: 'গোপনীয়তা নীতি | আবদুল্লাহ — ডিজিটাল মার্কেটিং ও SEO',
    },
    nav: {
      home: 'হোম',
      about: 'পরিচিতি',
      skills: 'দক্ষতা',
      services: 'সার্ভিস',
      portfolio: 'কাজের নমুনা',
      dashboard: 'ড্যাশবোর্ড',
      blog: 'ব্লগ',
      contact: 'যোগাযোগ',
      hireMe: 'কাজ শুরু করুন',
      menuOpen: 'নেভিগেশন মেনু খুলুন',
      menuClose: 'নেভিগেশন মেনু বন্ধ করুন',
      switchToDark: 'ডার্ক মোডে পরিবর্তন করুন',
      switchToLight: 'লাইট মোডে পরিবর্তন করুন',
      lightLabel: 'লাইট',
      darkLabel: 'ডার্ক',
    },
    hero: {
      kicker: 'ডিজিটাল মার্কেটিং ও SEO স্পেশালিস্ট',
      name: 'আবদুল্লাহ',
      title: 'ডিজিটাল মার্কেটিং ও SEO স্পেশালিস্ট',
      headline: 'স্মার্ট ডিজিটাল মার্কেটিং ও SEO কৌশলের মাধ্যমে ব্যবসার অনলাইন প্রবৃদ্ধিতে সহায়তা।',
      description:
        'পরিকল্পিত SEO এবং ডিজিটাল মার্কেটিংয়ের মাধ্যমে ব্যবসার অনলাইন দৃশ্যমানতা বাড়াতে, সঠিক অডিয়েন্সের কাছে পৌঁছাতে এবং শক্তিশালী ডিজিটাল উপস্থিতি গড়ে তুলতে কাজ করি।',
      ctaExplore: 'আমার কাজ দেখুন',
      ctaHire: 'Hire Me',
      ctaContact: 'যোগাযোগ করুন',
      imageAlt: 'ডিজিটাল মার্কেটিং কৌশল ও সার্চ ইঞ্জিন অপটিমাইজেশনের বিমূর্ত ইলাস্ট্রেশন',
      focusStrip: [
        { label: 'মূল ক্ষেত্র', value: 'SEO ও পরিকল্পিত ডিজিটাল মার্কেটিং' },
        { label: 'লক্ষ্য বাজার', value: 'বাংলাদেশের ছোট ব্যবসা ও স্টার্টআপ' },
        { label: 'ভাষা', value: 'বাংলা ও ইংরেজিতে সহজ যোগাযোগ' },
        { label: 'কর্মপদ্ধতি', value: 'গবেষণানির্ভর ও স্বচ্ছ বাস্তবায়ন' },
      ],
    },
    about: {
      kicker: 'আমার সম্পর্কে',
      heading: 'ডিজিটাল প্রবৃদ্ধির জন্য বাস্তবভিত্তিক ও গবেষণানির্ভর দৃষ্টিভঙ্গি',
      introHeading: 'পেশাগত পরিচিতি',
      introBody:
        'আমি আবদুল্লাহ, একজন ডিজিটাল মার্কেটিং ও SEO স্পেশালিস্ট। বাংলাদেশের ছোট ব্যবসা, স্টার্টআপ এবং উদ্যোক্তারা যেন অনলাইনে নিজেদের সেবা ও ব্র্যান্ড আরও স্পষ্টভাবে তুলে ধরতে পারেন—সে লক্ষ্যেই আমি কাজ করি।',
      backgroundHeading: 'ডিজিটাল মার্কেটিং অভিজ্ঞতা',
      backgroundBody:
        'আমার কাজের মূল ভিত্তি হলো সার্চ ইঞ্জিন অপটিমাইজেশন (কীওয়ার্ড রিসার্চ, অন-পেজ ও টেকনিক্যাল SEO) এবং Meta Ads, সোশ্যাল মিডিয়া মার্কেটিং ও লিড জেনারেশনের মতো ব্যবহারিক ডিজিটাল চ্যানেলের সমন্বয়।',
      objectivesHeading: 'পেশাগত লক্ষ্য',
      objectivesBody:
        'অবাস্তব কোনো প্রতিশ্রুতি না দিয়ে দীর্ঘমেয়াদি অর্গানিক দৃশ্যমানতা, পরিচ্ছন্ন ওয়েবসাইট কাঠামো এবং কার্যকর গ্রাহক-সংযোগ ব্যবস্থা গড়ে তুলতে ব্যবসার সাথে অংশীদার হিসেবে কাজ করা।',
      approachHeading: 'কাজের পদ্ধতি',
      approachBody:
        'প্রতিটি প্রজেক্ট শুরু হয় ব্যবসার লক্ষ্য বোঝার মাধ্যমে—এরপর ওয়েবসাইট বা সোশ্যাল পেজ পর্যালোচনা করে Google Search Console ও Google Analytics-এর তথ্যের ভিত্তিতে অগ্রাধিকার নির্ধারণ করা হয়।',
      portraitCaption: 'আবদুল্লাহ — ডিজিটাল মার্কেটিং ও SEO স্পেশালিস্ট',
      portraitPlaceholderNote: 'প্রোফাইল ছবির স্থান (অনুমোদিত আসল ছবি কনফিগারেশনে যুক্ত করা যাবে)',
      strategyImageAlt: 'ডিজিটাল মার্কেটিং পরিকল্পনা ও চ্যানেল সমন্বয়ের ইলাস্ট্রেশন',
    },
    skills: {
      kicker: 'দক্ষতা ও অভিজ্ঞতা',
      heading: 'সার্চ, ডিজিটাল মার্কেটিং ও অ্যানালিটিক্সে নিশ্চিত দক্ষতা',
      subheading:
        'কোনো অতিরঞ্জিত শতকরা হার বা অবাস্তব ব্যাজ ছাড়াই স্পষ্ট ও বিভাগভিত্তিক দক্ষতার তালিকা।',
      confirmationNote:
        'নিচে কেবল নিশ্চিতকৃত দক্ষতা ও মূল টুলস উপস্থাপন করা হয়েছে; প্রজেক্টের প্রয়োজনে তালিকা হালনাগাদযোগ্য।',
      imageAlt: 'SEO ও ওয়েবসাইট বিশ্লেষণের ইলাস্ট্রেশন',
      groups: [
        {
          id: 'seo',
          title: 'SEO',
          subtitle: 'সার্চ-বান্ধব ওয়েবসাইট এবং লক্ষ্যভিত্তিক অর্গানিক উপস্থিতি তৈরি।',
          items: [
            { name: 'Keyword Research', note: 'সার্চ ইন্টেন্ট, টপিক ক্লাস্টার ও লোকাল সার্চ বিশ্লেষণ।' },
            { name: 'On-Page SEO', note: 'টাইটেল, মেটা ট্যাগ, হেডিং কাঠামো ও ইন্টারনাল লিংকিং।' },
            { name: 'Technical SEO', note: 'ক্রলিং, ইনডেক্সিং, সাইটম্যাপ ও পেজ কাঠামো উন্নয়ন।' },
            { name: 'Off-Page SEO', note: 'ব্র্যান্ড পরিচিতি ও মানসম্মত অথরিটি সিগন্যাল।' },
            { name: 'Local SEO', note: 'স্থানীয় ও এলাকাভিত্তিক সার্চে ব্যবসার দৃশ্যমানতা।' },
            { name: 'SEO Content Optimization', note: 'পাঠকের প্রশ্নের আলোকে কার্যকর কনটেন্ট সাজানো।' },
          ],
        },
        {
          id: 'digital-marketing',
          title: 'ডিজিটাল মার্কেটিং',
          subtitle: 'পরিকল্পিত ক্যাম্পেইন ও কনটেন্টের মাধ্যমে সঠিক অডিয়েন্সের কাছে পৌঁছানো।',
          items: [
            { name: 'Digital Marketing Strategy', note: 'চ্যানেল, মেসেজিং ও কাস্টমার জার্নির সমন্বয়।' },
            { name: 'Meta Ads', note: 'লক্ষ্যভিত্তিক Facebook ও Instagram বিজ্ঞাপন পরিচালনা।' },
            { name: 'Social Media Marketing', note: 'পেজ অপটিমাইজেশন ও ধারাবাহিক কনটেন্ট পরিকল্পনা।' },
            { name: 'Lead Generation', note: 'সম্ভাব্য গ্রাহকের ইনকোয়ারি সংগ্রহের স্পষ্ট কাঠামো।' },
            { name: 'Content Marketing', note: 'গ্রাহকের আস্থা তৈরিতে তথ্যবহুল ও শিক্ষামূলক কনটেন্ট।' },
          ],
        },
        {
          id: 'analytics',
          title: 'অ্যানালিটিক্স ও অডিট',
          subtitle: 'ওয়েবসাইটের স্বাস্থ্য পরীক্ষা ও প্রকৃত ডেটা পর্যালোচনা।',
          items: [
            { name: 'Google Analytics', note: 'ভিজিটর উৎস, ব্যবহারকারীর আচরণ ও কনভার্সন পর্যালোচনা।' },
            { name: 'Google Search Console', note: 'সার্চ কোয়েরি, ইনডেক্সিং অবস্থা ও ক্রল ত্রুটি পর্যবেক্ষণ।' },
            { name: 'Website SEO Audit', note: 'টেকনিক্যাল, অন-পেজ ও কনটেন্ট উন্নয়নের সুযোগ চিহ্নিত করা।' },
          ],
        },
      ],
    },
    services: {
      kicker: 'আমার সার্ভিসসমূহ',
      heading: 'ব্যবসার লক্ষ্য অনুযায়ী সুস্পষ্ট ও বাস্তবসম্মত সেবা',
      subheading:
        'প্রতিটি সেবায় থাকে সুনির্দিষ্ট কাজের তালিকা ও স্বচ্ছ যোগাযোগ—কখনোই ভুয়া র‍্যাংকিংয়ের নিশ্চয়তা নয়।',
      deliverablesLabel: 'মূল কাজের তালিকা',
      learnMore: 'বিস্তারিত জানুন',
      contactBtn: 'যোগাযোগ',
      modalClose: 'বিস্তারিত বন্ধ করুন',
      modalIdealForLabel: 'যাদের জন্য উপযোগী',
      modalDiscussCta: 'এই সার্ভিস নিয়ে আলোচনা করুন',
      items: [
        {
          id: 'seo-optimization',
          number: '০১',
          title: 'SEO Optimization',
          shortDescription:
            'ওয়েবসাইটের কাঠামো, প্রাসঙ্গিকতা এবং দীর্ঘমেয়াদি অর্গানিক দৃশ্যমানতা বাড়াতে পূর্ণাঙ্গ সার্চ ইঞ্জিন অপটিমাইজেশন।',
          deliverables: [
            'ওয়েবসাইটের প্রাথমিক SEO স্বাস্থ্য পর্যালোচনা',
            'অগ্রাধিকারভিত্তিক কীওয়ার্ড ও পেজ ম্যাপিং',
            'অন-পেজ ও কাঠামোগত উন্নয়ন',
          ],
          detailedOverview:
            'আপনার ওয়েবসাইটের বর্তমান অবস্থার ওপর ভিত্তি করে কীওয়ার্ড সমন্বয়, অন-পেজ উন্নতি এবং টেকনিক্যাল পরিচ্ছন্নতার মাধ্যমে সার্চ ইঞ্জিন ও ভিজিটর উভয়ের জন্য স্পষ্ট অভিজ্ঞতা তৈরি করা।',
          idealFor: 'ছোট ব্যবসা ও স্টার্টআপ যারা টেকসই অর্গানিক প্রবৃদ্ধি চান।',
        },
        {
          id: 'keyword-research',
          number: '০২',
          title: 'Keyword Research',
          shortDescription:
            'ইংরেজি ও বাংলাদেশি অডিয়েন্সের প্রকৃত সার্চ আচরণ বিশ্লেষণ করে লাভজনক ও প্রাসঙ্গিক কীওয়ার্ড খুঁজে বের করা।',
          deliverables: [
            'সার্চ ইন্টেন্ট ও টপিক শ্রেণিবিন্যাস',
            'সার্ভিস ও ব্লগ পেজের জন্য কীওয়ার্ড তালিকা',
            'প্রতিযোগীদের কনটেন্ট গ্যাপ পর্যালোচনা',
          ],
          detailedOverview:
            'তথ্যমূলক, বাণিজ্যিক ও লোকাল সার্চ ইন্টেন্ট অনুযায়ী সাজানো কীওয়ার্ড গবেষণা—যাতে প্রতিটি পেজ ও আর্টিকেল সঠিক গ্রাহকের প্রশ্নের উত্তর দিতে পারে।',
          idealFor: 'নতুন ওয়েবসাইট এবং কনটেন্ট বা ল্যান্ডিং পেজ পরিকল্পনাকারী ব্যবসা।',
        },
        {
          id: 'technical-seo-audit',
          number: '০৩',
          title: 'Technical SEO Audit',
          shortDescription:
            'ক্রলিং, ইনডেক্সিং, সাইট কাঠামো এবং সার্চ পারফরম্যান্সে প্রভাব ফেলা টেকনিক্যাল বিষয়গুলোর গভীর পরীক্ষা।',
          deliverables: [
            'ক্রল ও ইনডেক্সিং সমস্যার চেকলিস্ট',
            'Robots.txt, সাইটম্যাপ ও ক্যানোনিকাল পরীক্ষা',
            'অগ্রাধিকারভিত্তিক সমাধান নির্দেশনা',
          ],
          detailedOverview:
            'ব্রোকেন লিংক, ডুপ্লিকেট মেটাডেটা, রিডাইরেক্ট সমস্যা এবং ইনডেক্সিং বাধাগুলো সহজ ভাষায় চিহ্নিত করে ধাপে ধাপে সমাধানের রোডম্যাপ।',
          idealFor: 'যে ওয়েবসাইটগুলোতে ইনডেক্সিং সমস্যা বা রিডিজাইন-পরবর্তী জটিলতা রয়েছে।',
        },
        {
          id: 'on-page-seo',
          number: '০৪',
          title: 'On-Page SEO',
          shortDescription:
            'প্রতিটি পেজের টাইটেল, মেটা ডিসক্রিপশন, হেডিং কাঠামো, ইন্টারনাল লিংক এবং ছবির অল্ট টেক্সট অপটিমাইজেশন।',
          deliverables: [
            'টাইটেল ট্যাগ ও মেটা ডিসক্রিপশন হালনাগাদ',
            'H1–H3 হেডিং ও কনটেন্ট বিন্যাস',
            'ইন্টারনাল লিংকিং ও ইমেজ অল্ট অডিট',
          ],
          detailedOverview:
            'বিদ্যমান সার্ভিস পেজ ও ব্লগ পোস্টগুলোকে এমনভাবে সাজানো যাতে পাঠক দ্রুত মূল তথ্য পান এবং সার্চ ইঞ্জিন বিষয়বস্তু স্পষ্টভাবে বুঝতে পারে।',
          idealFor: 'যেসব ওয়েবসাইটে কনটেন্ট থাকলেও স্পষ্ট SEO কাঠামোর অভাব রয়েছে।',
        },
        {
          id: 'meta-ads-management',
          number: '০৫',
          title: 'Meta Ads Management',
          shortDescription:
            'নির্ধারিত লক্ষ্য ও বাজেট অনুযায়ী Facebook এবং Instagram বিজ্ঞাপন ক্যাম্পেইন সেটআপ ও পরিচালনা।',
          deliverables: [
            'ক্যাম্পেইন কাঠামো ও অডিয়েন্স সেটআপ',
            'বিজ্ঞাপনের কপি ও ক্রিয়েটিভ দিকনির্দেশনা',
            'সাপ্তাহিক বাজেট ও পারফরম্যান্স পর্যবেক্ষণ',
          ],
          detailedOverview:
            'মেসেজ ইনকোয়ারি, ওয়েবসাইট ভিজিট বা স্থানীয় পরিচিতি—ব্যবসার সুনির্দিষ্ট লক্ষ্যের সাথে সামঞ্জস্য রেখে Meta বিজ্ঞাপন পরিকল্পনা ও পরিচালনা।',
          idealFor: 'বাংলাদেশের রিটেইল ব্যবসা, সার্ভিস ব্র্যান্ড ও উদীয়মান উদ্যোগ।',
        },
        {
          id: 'social-media-marketing',
          number: '০৬',
          title: 'Social Media Marketing',
          shortDescription:
            'পরিকল্পিত কনটেন্ট ক্যালেন্ডার ও পেজ অপটিমাইজেশনের মাধ্যমে ধারাবাহিক এবং পেশাদার সোশ্যাল উপস্থিতি।',
          deliverables: [
            'সোশ্যাল পেজ ও প্রোফাইল অপটিমাইজেশন',
            'মাসিক কনটেন্ট বিষয়বস্তু পরিকল্পনা',
            'অডিয়েন্স-কেন্দ্রিক ব্র্যান্ড যোগাযোগ',
          ],
          detailedOverview:
            'গ্রাহকদের শিক্ষিত করা, সেবার স্পষ্ট বিবরণ তুলে ধরা এবং Facebook ও LinkedIn-এ নির্ভরযোগ্য ব্র্যান্ড ইমেজ বজায় রাখতে নিয়মিত সহায়তা।',
          idealFor: 'যে ব্র্যান্ডগুলো সোশ্যাল মিডিয়ায় নিয়মিত ও বিশ্বাসযোগ্য উপস্থিতি চায়।',
        },
        {
          id: 'lead-generation',
          number: '০৭',
          title: 'Lead Generation',
          shortDescription:
            'সম্ভাব্য গ্রাহকের আগ্রহকে সংগঠিত ইনকোয়ারিতে রূপান্তর করতে কার্যকর ল্যান্ডিং পেজ ও ফর্ম প্রবাহ তৈরি।',
          deliverables: [
            'ইনকোয়ারি ফানেল ও CTA পর্যালোচনা',
            'লিড ফর্ম ও যোগাযোগ প্রবাহ সেটআপ',
            'অডিয়েন্স ও অফার সামঞ্জস্য পরিকল্পনা',
          ],
          detailedOverview:
            'ভিজিটররা যেন বিভ্রান্ত না হয়ে সহজেই আপনার সেবার বিস্তারিত জেনে যোগাযোগ করতে পারেন, সেজন্য স্পষ্ট মেসেজিং ও ফর্ম কাঠামো তৈরি।',
          idealFor: 'B2B সার্ভিস প্রতিষ্ঠান, এজেন্সি ও স্থানীয় ব্যবসা।',
        },
        {
          id: 'website-seo-audit',
          number: '০৮',
          title: 'Website SEO Audit',
          shortDescription:
            'টেকনিক্যাল চেক, অন-পেজ মান এবং Search Console ডেটার সমন্বয়ে ওয়েবসাইটের সম্পূর্ণ ডায়াগনস্টিক রিপোর্ট।',
          deliverables: [
            'সম্পূর্ণ ওয়েবসাইট SEO স্বাস্থ্য রিপোর্ট',
            'Search Console ও Analytics পর্যালোচনা',
            'ধাপে ধাপে করণীয় চেকলিস্ট',
          ],
          detailedOverview:
            'বড় কোনো মার্কেটিং বাজেট ব্যয়ের আগে ওয়েবসাইটের বর্তমান শক্তি ও দুর্বলতা স্পষ্টভাবে বোঝার জন্য একটি স্বচ্ছ অডিট রিপোর্ট।',
          idealFor: 'ব্যবসার মালিক যারা SEO শুরু করার আগে সঠিক অবস্থান জানতে চান।',
        },
      ],
    },
    portfolio: {
      kicker: 'প্রজেক্ট ও কেস স্টাডি',
      heading: 'নির্বাচিত প্রজেক্ট ও সম্পাদনাযোগ্য কেস স্টাডি',
      subheading:
        'SEO Optimization, YouTube SEO, Meta Ads, Social Media Marketing, Website SEO Audit এবং Digital Marketing Strategy নিয়ে সাজানো ৩-কলামের প্রজেক্ট শোকেস।',
      honestyBanner:
        'কেবল আসল স্ক্রিনশট: প্রতিটি কার্ডে সরাসরি আপনার নিজের প্রজেক্টের আসল স্ক্রিনশট (PNG, JPG, WebP) আপলোড করুন। ছবি আপলোড না হওয়া পর্যন্ত স্পষ্ট প্লেসহোল্ডার প্রদর্শিত হবে—কোনো ভুয়া ফলাফল বা কাল্পনিক অ্যানালিটিক্স ছবি ব্যবহার করা হয়নি।',
      filters: [
        { id: 'all', label: 'সব প্রজেক্ট' },
        { id: 'seo-optimization', label: 'SEO Optimization' },
        { id: 'youtube-seo', label: 'YouTube SEO' },
        { id: 'meta-ads', label: 'Meta Ads' },
        { id: 'social-media-marketing', label: 'Social Media Marketing' },
        { id: 'website-seo-audit', label: 'Website SEO Audit' },
        { id: 'digital-marketing-strategy', label: 'Digital Marketing Strategy' },
      ],
      toolsLabel: 'ব্যবহৃত টুলস',
      viewProject: 'কেস স্টাডি দেখুন',
      emptyState: 'এই ক্যাটাগরিতে এখনো কোনো প্রজেক্ট নেই। সবগুলো দেখতে "সব প্রজেক্ট" নির্বাচন করুন।',
      uploadLabels: {
        placeholderTitle: 'প্রজেক্ট স্ক্রিনশট প্লেসহোল্ডার',
        placeholderSubtitle: 'আসল প্রজেক্টের ছবি আপলোড করুন (PNG, JPG, WebP)',
        uploadBtn: 'স্ক্রিনশট আপলোড করুন',
        replaceBtn: 'ছবি পরিবর্তন',
        removeBtn: 'মুছে ফেলুন',
        previewBtn: 'বড় করে দেখুন',
        clickToPreview: 'বড় করে দেখতে ক্লিক করুন',
        uploading: 'আপলোড হচ্ছে...',
        closePreview: 'ছবি প্রিভিউ বন্ধ করুন',
        fileTypeError: 'অনুগ্রহ করে ৫MB-এর মধ্যে PNG, JPG অথবা WebP ছবি নির্বাচন করুন।',
        uploadError: 'ছবি আপলোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
        uploadedBadge: 'আপলোড করা স্ক্রিনশট',
      },
      caseStudyLabels: {
        overview: 'প্রজেক্ট সংক্ষিপ্তসার',
        challenge: 'ক্লায়েন্টের চ্যালেঞ্জ',
        strategy: 'কৌশল ও পরিকল্পনা',
        workCompleted: 'সম্পন্ন কাজ',
        results: 'ফলাফল (কেবল যাচাইকৃত তথ্য)',
        keyLearnings: 'মূল শিক্ষা',
        discussSimilar: 'অনুরূপ প্রজেক্ট নিয়ে আলোচনা করুন',
        close: 'কেস স্টাডি বন্ধ করুন',
      },
      projects: [
        {
          slug: 'seo-optimization-case-study',
          category: 'seo-optimization',
          categoryLabel: 'SEO Optimization',
          isTemplate: true,
          statusLabel: 'সম্পাদনাযোগ্য কেস স্টাডি টেমপ্লেট',
          title: 'অন-পেজ ও অর্গানিক সার্চ অপটিমাইজেশন কাঠামো',
          summary:
            'দীর্ঘমেয়াদি সার্চ দৃশ্যমানতার জন্য সার্চ ইন্টেন্ট অনুযায়ী কীওয়ার্ড ম্যাপিং, সার্ভিস পেজ উন্নয়ন এবং ইন্টারনাল লিংকিং পরিকল্পনা।',
          tools: ['Google Search Console', 'Keyword Research', 'On-Page SEO'],
          image: '',
          imageAlt: 'SEO Optimization প্রজেক্টের স্ক্রিনশট',
          caseStudy: {
            overview:
              'SEO Optimization প্রজেক্টের জন্য সম্পাদনাযোগ্য কেস স্টাডি। অনুমোদনের পর এখানে প্রকৃত ক্লায়েন্টের খাত, এলাকা এবং সময়কাল যুক্ত করুন।',
            challenge:
              'অপটিমাইজেশনের আগে থাকা কম সার্চ দৃশ্যমানতা, অগোছালো পেজ টাইটেল বা সার্চ ইন্টেন্টের ঘাটতি এখানে নথিভুক্ত করুন।',
            strategy:
              'বাণিজ্যিক ও তথ্যমূলক ইন্টেন্ট অনুযায়ী মূল কীওয়ার্ড নির্বাচন করে অগ্রাধিকারভিত্তিক পেজগুলোর হেডিং, মেটাডেটা ও ইন্টারনাল লিংক সাজানো।',
            workCompleted: [
              'সার্ভিস পেজ অনুযায়ী কীওয়ার্ড ম্যাপিং ও ইন্টেন্ট বিশ্লেষণ',
              'টাইটেল ট্যাগ, মেটা ডিসক্রিপশন এবং H1–H3 কাঠামো সমন্বয়',
              'গাইড ও সার্ভিস পেজের মধ্যে কার্যকর ইন্টারনাল লিংকিং',
            ],
            results:
              'যাচাইকৃত তথ্যের অপেক্ষায়। কেবল Google Search Console বা Analytics থেকে পরিমাপকৃত ও অনুমোদিত ফলাফল এখানে যুক্ত হবে।',
            keyLearnings:
              'অতিরিক্ত কীওয়ার্ড ব্যবহার না করে সঠিক সার্চ ইন্টেন্ট পূরণ করলেই পাঠক ও সার্চ ইঞ্জিন উভয়ের কাছে পেজ স্পষ্ট হয়।',
          },
        },
        {
          slug: 'youtube-seo-case-study',
          category: 'youtube-seo',
          categoryLabel: 'YouTube SEO',
          isTemplate: true,
          statusLabel: 'সম্পাদনাযোগ্য কেস স্টাডি টেমপ্লেট',
          title: 'YouTube চ্যানেল ও ভিডিও ডিসকভারি অপটিমাইজেশন',
          summary:
            'অর্গানিক ভিডিও দৃশ্যমানতার জন্য সার্চযোগ্য টাইটেল, বিস্তারিত ডিসক্রিপশন, কীওয়ার্ড রিসার্চ এবং প্লেলিস্ট কাঠামো সাজানো।',
          tools: ['YouTube Studio', 'Keyword Research', 'Metadata Optimization'],
          image: '',
          imageAlt: 'YouTube SEO প্রজেক্টের স্ক্রিনশট',
          caseStudy: {
            overview:
              'YouTube SEO প্রজেক্টের জন্য সম্পাদনাযোগ্য কেস স্টাডি। অনুমোদনের পর চ্যানেলের বিষয়বস্তু, ভাষা ও প্রজেক্টের বিবরণ যুক্ত করুন।',
            challenge:
              'অসার্চযোগ্য ভিডিও টাইটেল, সংক্ষিপ্ত ডিসক্রিপশন, ট্যাগের অভাব বা অগোছালো প্লেলিস্টের কারণে ভিডিও রিচ কমে যাওয়ার সমস্যা তুলে ধরুন।',
            strategy:
              'দর্শকদের YouTube সার্চ কোয়েরি বিশ্লেষণ করে টাইটেল, টাইমস্ট্যাম্প ও বিষয়ভিত্তিক প্লেলিস্টের মাধ্যমে অর্গানিক ডিসকভারি বাড়ানো।',
            workCompleted: [
              'লক্ষ্যভিত্তিক দর্শকদের জন্য ভিডিও কীওয়ার্ড রিসার্চ',
              'সার্চ-বান্ধব টাইটেল, ডিসক্রিপশন, চ্যাপ্টার ও ট্যাগ বিন্যাস',
              'চ্যানেল লেআউট ও বিষয়ভিত্তিক প্লেলিস্ট সংগঠন',
            ],
            results:
              'যাচাইকৃত তথ্যের অপেক্ষায়। ক্লায়েন্টের অনুমতি সাপেক্ষে কেবল প্রকৃত YouTube Studio ইম্প্রেশন বা ওয়াচ-টাইম তথ্য প্রকাশ করা হবে।',
            keyLearnings:
              'সামঞ্জস্যপূর্ণ মেটাডেটা এবং সাজানো প্লেলিস্ট YouTube-কে সঠিক দর্শকদের কাছে ভিডিও পৌঁছে দিতে সাহায্য করে।',
          },
        },
        {
          slug: 'meta-ads-case-study',
          category: 'meta-ads',
          categoryLabel: 'Meta Ads',
          isTemplate: true,
          statusLabel: 'সম্পাদনাযোগ্য কেস স্টাডি টেমপ্লেট',
          title: 'Meta Ads ক্যাম্পেইন ও লিড ফানেল কাঠামো',
          summary:
            'সুনির্দিষ্ট অডিয়েন্স সেগমেন্টেশন ও স্পষ্ট ইনকোয়ারি ল্যান্ডিং প্রবাহের সমন্বয়ে লক্ষ্যভিত্তিক Facebook ও Instagram বিজ্ঞাপন পরিকল্পনা।',
          tools: ['Meta Ads Manager', 'Audience Research', 'UTM Tracking'],
          image: '',
          imageAlt: 'Meta Ads প্রজেক্টের স্ক্রিনশট',
          caseStudy: {
            overview:
              'Meta Ads প্রজেক্টের জন্য সম্পাদনাযোগ্য কেস স্টাডি। প্রকাশের আগে ক্যাম্পেইনের লক্ষ্য (মেসেজ, লিড বা ট্রাফিক) ও সময়কাল যুক্ত করুন।',
            challenge:
              'অ্যাড অ্যাকাউন্টের প্রাথমিক সমস্যা যেমন অস্পষ্ট অডিয়েন্স টার্গেটিং, সাধারণ বিজ্ঞাপন কপি বা দুর্বল ইনকোয়ারি প্রবাহ নথিভুক্ত করুন।',
            strategy:
              'টেস্টিং ও স্কেলিং অ্যাড সেট আলাদা করা, বাংলা ও ইংরেজিতে স্পষ্ট অ্যাড কপি তৈরি এবং UTM ট্র্যাকিংয়ের সাথে ফর্ম সংযুক্ত করা।',
            workCompleted: [
              'ক্যাম্পেইন অবজেক্টিভ নির্ধারণ ও অডিয়েন্স সেগমেন্টেশন',
              'একাধিক অ্যাড কপি ও ক্রিয়েটিভ অ্যাঙ্গেল পরিকল্পনা',
              'UTM প্যারামিটার সেটআপ ও লিড ফর্ম সমন্বয়',
            ],
            results:
              'যাচাইকৃত তথ্যের অপেক্ষায়। ক্লায়েন্টের অনুমোদিত প্রকৃত কস্ট-পার-লিড বা ইনকোয়ারি ফলাফলই এখানে যুক্ত করা হবে।',
            keyLearnings:
              'বিজ্ঞাপনের বার্তা ও ল্যান্ডিং পেজের তথ্যের মিল থাকলে ভিজিটর ড্রপ-অফ উল্লেখযোগ্যভাবে কমে।',
          },
        },
        {
          slug: 'social-media-marketing-case-study',
          category: 'social-media-marketing',
          categoryLabel: 'Social Media Marketing',
          isTemplate: true,
          statusLabel: 'সম্পাদনাযোগ্য কেস স্টাডি টেমপ্লেট',
          title: 'নিয়মিত সোশ্যাল কনটেন্ট ও পেজ অপটিমাইজেশন',
          summary:
            'সোশ্যাল প্ল্যাটফর্মে ব্র্যান্ডের আস্থা বাড়াতে পরিকল্পিত কনটেন্ট ক্যালেন্ডার, প্রোফাইল স্পষ্টতা ও অডিয়েন্স-বান্ধব যোগাযোগ।',
          tools: ['Content Calendar', 'Facebook Page', 'LinkedIn'],
          image: '',
          imageAlt: 'Social Media Marketing প্রজেক্টের স্ক্রিনশট',
          caseStudy: {
            overview:
              'Social Media Marketing প্রজেক্টের জন্য সম্পাদনাযোগ্য কেস স্টাডি। যাচাইকৃত ব্যবসার বিবরণ, প্ল্যাটফর্ম ও মাসিক কাজের পরিধি যুক্ত করুন।',
            challenge:
              'অনিয়মিত পোস্ট, পেজের অসম্পূর্ণ সেবা বিবরণ বা শিক্ষামূলক পোস্টে কম এনগেজমেন্টের মতো বিষয়গুলো উল্লেখ করুন।',
            strategy:
              'নিয়মিত কনটেন্ট পিলার (শিক্ষামূলক টিপস, সেবার বিবরণ, FAQ) তৈরি করে পেজের বায়ো ও CTA বাটন স্পষ্ট করা।',
            workCompleted: [
              'সোশ্যাল পেজের বায়ো, CTA বাটন ও ভিজ্যুয়াল সামঞ্জস্য পর্যালোচনা',
              'মাসিক দ্বিভাষিক কনটেন্ট পিলার ও টপিক ক্যালেন্ডার',
              'অডিয়েন্স-কেন্দ্রিক ক্যাপশন ও হ্যাশট্যাগ বিন্যাস',
            ],
            results:
              'যাচাইকৃত তথ্যের অপেক্ষায়। কেবল পেজ মালিকের অনুমোদিত প্রকৃত রিচ বা এনগেজমেন্ট তথ্য এখানে প্রকাশ করা হবে।',
            keyLearnings:
              'শুধু প্রচারণামূলক পোস্টের চেয়ে ধারাবাহিক তথ্যবহুল কনটেন্ট গ্রাহকের দীর্ঘমেয়াদি আস্থা তৈরি করে।',
          },
        },
        {
          slug: 'website-seo-audit-case-study',
          category: 'website-seo-audit',
          categoryLabel: 'Website SEO Audit',
          isTemplate: true,
          statusLabel: 'সম্পাদনাযোগ্য কেস স্টাডি টেমপ্লেট',
          title: 'টেকনিক্যাল ও পূর্ণাঙ্গ ওয়েবসাইট SEO অডিট',
          summary:
            'ক্রলিং, ইনডেক্সিং, সাইটম্যাপ, ক্যানোনিকাল ও মোবাইল ব্যবহারযোগ্যতা পরীক্ষার মাধ্যমে ধাপে ধাপে সমাধানযোগ্য রোডম্যাপ।',
          tools: ['Google Search Console', 'Google Analytics', 'Technical Audit'],
          image: '',
          imageAlt: 'Website SEO Audit প্রজেক্টের স্ক্রিনশট',
          caseStudy: {
            overview:
              'Website SEO Audit প্রজেক্টের জন্য সম্পাদনাযোগ্য কেস স্টাডি। অনুমোদনের পর ওয়েবসাইটের ধরন ও অডিট পরিধি যুক্ত করুন।',
            challenge:
              'প্রাথমিক ক্রলে ধরা পড়া ক্যানোনিকাল ত্রুটি, ব্রোকেন লিংক বা ইনডেক্স না হওয়া সার্ভিস পেজের বিবরণ নথিভুক্ত করুন।',
            strategy:
              'প্রথমে ইনডেক্সিং বাধা (robots.txt, XML সাইটম্যাপ, ক্যানোনিকাল) সমাধান করে এরপর মেটাডেটা, হেডিং ও অল্ট-টেক্সট সংশোধন।',
            workCompleted: [
              'Robots.txt, XML সাইটম্যাপ ও ক্যানোনিকাল ট্যাগ পরীক্ষা',
              'ডুপ্লিকেট টাইটেল, মেটা ডিসক্রিপশন ও H1 অডিট',
              'ডেভেলপার ও ব্যবসার মালিকদের জন্য অগ্রাধিকারভিত্তিক ফিক্স তালিকা',
            ],
            results:
              'যাচাইকৃত তথ্যের অপেক্ষায়। সমাধানের পর Search Console ইনডেক্সিং উন্নতির প্রকৃত তথ্য যাচাই শেষে যুক্ত করা হবে।',
            keyLearnings:
              'শুরুতেই টেকনিক্যাল ও মেটাডেটা ত্রুটি ঠিক করলে পরবর্তী কনটেন্ট ও মার্কেটিং প্রচেষ্টা বেশি কার্যকর হয়।',
          },
        },
        {
          slug: 'digital-marketing-strategy-case-study',
          category: 'digital-marketing-strategy',
          categoryLabel: 'Digital Marketing Strategy',
          isTemplate: true,
          statusLabel: 'সম্পাদনাযোগ্য কেস স্টাডি টেমপ্লেট',
          title: 'সমন্বিত প্রবৃদ্ধি কৌশল: সার্চ, সোশ্যাল ও লিড',
          summary:
            'ছোট ব্যবসার জন্য অর্গানিক SEO, লক্ষ্যভিত্তিক Meta Ads এবং সহজ ইনকোয়ারি প্রক্রিয়াকে একীভূত করার পূর্ণাঙ্গ রোডম্যাপ।',
          tools: ['Digital Strategy', 'Google Analytics', 'Lead Generation'],
          image: '',
          imageAlt: 'Digital Marketing Strategy প্রজেক্টের স্ক্রিনশট',
          caseStudy: {
            overview:
              'Digital Marketing Strategy প্রজেক্টের জন্য সম্পাদনাযোগ্য কেস স্টাডি। প্রকাশের আগে ব্যবসার মূল লক্ষ্য ও চ্যানেল সমন্বয় যুক্ত করুন।',
            challenge:
              'SEO, সোশ্যাল মিডিয়া ও পেইড বিজ্ঞাপন আলাদাভাবে চলার কারণে ট্র্যাকিং ও মেসেজিংয়ে যে বিচ্ছিন্নতা ছিল তা বর্ণনা করুন।',
            strategy:
              'গ্রাহকের মূল সমস্যার ওপর ভিত্তি করে সব চ্যানেলের বার্তা একীভূত করা, SEO ও Meta Ads সমন্বয় এবং Analytics গোল ট্র্যাকিং চালু করা।',
            workCompleted: [
              'ক্রস-চ্যানেল অডিয়েন্স ও কাস্টমার জার্নি ম্যাপিং',
              'ত্রৈমাসিক SEO + Meta Ads + কনটেন্ট সমন্বয় পরিকল্পনা',
              'একীভূত ইনকোয়ারি ট্র্যাকিং ও মাসিক রিপোর্টিং কাঠামো',
            ],
            results:
              'যাচাইকৃত তথ্যের অপেক্ষায়। ক্লায়েন্টের অনুমোদিত প্রকৃত ইনকোয়ারি বা ট্রাফিক পরিবর্তনই কেবল এখানে দেখানো হবে।',
            keyLearnings:
              'একটি স্পষ্ট ইনকোয়ারি লক্ষ্যকে কেন্দ্র করে অর্গানিক ও পেইড চ্যানেল যুক্ত করলে ধারাবাহিক ফলাফল পাওয়া যায়।',
          },
        },
      ],
    },
    dashboard: {
      kicker: 'লাইভ মার্কেটিং ওয়ার্কস্পেস',
      heading: 'লাইভ মার্কেটিং ও SEO ড্যাশবোর্ড',
      subheading:
        'ইন্টারেক্টিভ ক্যাম্পেইন অ্যানালিটিক্স সিমুলেশনের পাশাপাশি রিয়েল-টাইম ওয়েবসাইট অন-পেজ SEO চেকার এবং লাইভ ইনকোয়ারি ট্র্যাকার দেখুন।',
      tabs: {
        simulator: 'ক্যাম্পেইন অ্যানালিটিক্স স্ট্রিম',
        liveTools: 'লাইভ SEO চেকার ও ইনকোয়ারি',
      },
      simNotice:
        'ইন্টারেক্টিভ ডেমো ওয়ার্কস্পেস: রিপোর্টিং অভিজ্ঞতা প্রদর্শনের জন্য সিমুলেটেড লাইভ ডেটা—এটি কোনো পূর্ববর্তী ক্লায়েন্টের প্রমাণ নয়।',
      liveLabel: 'লাইভ স্ট্রিম চালু',
      pausedLabel: 'স্ট্রিম বিরত',
      pauseAction: 'বিরতি',
      resumeAction: 'চালু করুন',
      ranges: [
        { id: '7d', label: '৭ দিন' },
        { id: '30d', label: '৩০ দিন' },
        { id: '90d', label: '৯০ দিন' },
      ],
      channels: [
        { id: 'all', label: 'সব চ্যানেল' },
        { id: 'seo', label: 'অর্গানিক SEO' },
        { id: 'meta', label: 'Meta Ads' },
        { id: 'local', label: 'লোকাল সার্চ' },
      ],
      kpis: {
        impressions: 'ইম্প্রেশন',
        clicks: 'মোট ক্লিক',
        ctr: 'গড় CTR',
        enquiries: 'সম্ভাব্য লিড',
      },
      chartTitle: 'চ্যানেল ক্লিক ও ভিজিবিলিটি ট্রেন্ড',
      chartSubtitle: 'সঠিক সংখ্যা দেখতে যেকোনো পয়েন্টের ওপর কার্সর নিন।',
      tableTitle: 'চ্যানেলভিত্তিক পারফরম্যান্স সারণি',
      tableHeaders: {
        channel: 'চ্যানেল',
        impressions: 'ইম্প্রেশন',
        clicks: 'ক্লিক',
        ctr: 'CTR',
        enquiries: 'লিড',
      },
      seoChecker: {
        title: 'লাইভ টেকনিক্যাল ও অন-পেজ SEO ইন্সপেক্টর',
        subtitle:
          'যেকোনো পাবলিক ওয়েবসাইটের URL দিয়ে প্রকৃত HTTP স্ট্যাটাস, robots.txt, sitemap.xml, Schema.org JSON-LD, hreflang, ক্যানোনিকাল এবং মেটাডেটা পরীক্ষা করুন।',
        placeholder: 'https://example.com',
        runBtn: 'টেকনিক্যাল অডিট করুন',
        runningBtn: 'পরীক্ষা চলছে...',
        emptyPrompt: 'সরাসরি সার্ভার-সাইড টেকনিক্যাল ও অন-পেজ SEO অডিট চালাতে ওপরে একটি পাবলিক URL লিখুন।',
        labels: {
          status: 'HTTP স্ট্যাটাস',
          responseTime: 'রেসপন্স সময়',
          titleTag: 'টাইটেল ট্যাগ',
          metaDesc: 'মেটা ডিসক্রিপশন',
          h1Count: 'H1 হেডিং সংখ্যা',
          canonical: 'ক্যানোনিকাল ট্যাগ',
          viewport: 'মোবাইল ভিউপোর্ট',
          openGraph: 'Open Graph ট্যাগ',
          imagesAlt: 'Alt-বিহীন ছবি',
          https: 'HTTPS নিরাপত্তা',
          htmlLang: 'HTML Lang',
          h2Count: 'H2 সাবহেডিং',
          twitterCard: 'Twitter কার্ড',
          schemaJsonLd: 'Schema.org JSON-LD',
          hreflang: 'Hreflang ট্যাগ',
          robotsTxt: 'robots.txt',
          sitemapXml: 'XML সাইটম্যাপ',
          compression: 'কম্প্রেশন',
          xRobotsTag: 'X-Robots-Tag',
          checksPassed: 'টেকনিক্যাল চেক উত্তীর্ণ',
          present: 'আছে',
          missing: 'নেই',
          none: 'পাওয়া যায়নি',
          chars: 'অক্ষর',
        },
      },
      enquiryFeed: {
        title: 'রিয়েল-টাইম ইনকোয়ারি ফিড',
        subtitle: 'যোগাযোগ ফর্মে জমা হওয়া প্রকৃত ইনকোয়ারির সংখ্যা ও সার্ভিসভিত্তিক তথ্য।',
        refreshBtn: 'রিফ্রেশ',
        totalLabel: 'মোট সংরক্ষিত ইনকোয়ারি',
        enLabel: 'ইংরেজি',
        bnLabel: 'বাংলা',
        emptyTitle: 'এখনো কোনো ইনকোয়ারি জমা হয়নি',
        emptyBody:
          'নিচের যোগাযোগ ফর্ম থেকে একটি বার্তা পাঠালে এখানে রিয়েল-টাইম ইনকোয়ারি তথ্য দেখা যাবে।',
        emptyCta: 'যোগাযোগ ফর্মে যান',
        headers: {
          refId: 'রেফারেন্স',
          service: 'আগ্রহের সার্ভিস',
          lang: 'ভাষা',
          time: 'সময়',
        },
      },
    },
    blog: {
      kicker: 'ব্লগ ও ইনসাইটস',
      heading: 'SEO এবং ডিজিটাল মার্কেটিং বিষয়ক ব্যবহারিক গাইড',
      subheading:
        'ব্যবসার মালিকদের জন্য সহজ ও স্পষ্ট ভাষায় লেখা SEO এবং ডিজিটাল মার্কেটিং নির্দেশিকা।',
      readArticle: 'গাইড পড়ুন',
      backToBlog: 'সব গাইডে ফিরে যান',
      discussTopic: 'এই বিষয়ে আলোচনা করুন',
      allCategories: 'সব বিষয়',
    },
    contact: {
      kicker: 'যোগাযোগ',
      heading: 'আপনার কি কোনো প্রজেক্টের পরিকল্পনা আছে?',
      subheading:
        'আপনার ব্যবসার লক্ষ্য এবং কী ধরনের সহযোগিতা প্রয়োজন তা সংক্ষেপে জানান। আপনার বার্তা যাচাই হয়ে সরাসরি সার্ভারে সংরক্ষিত হবে।',
      directHeading: 'সরাসরি যোগাযোগ ও প্রোফাইল',
      directNote:
        'কনফিগারেশনে নিশ্চিতকৃত ইমেইল, হোয়াটসঅ্যাপ ও সোশ্যাল প্রোফাইল লিংক যুক্ত হলে এখানে সরাসরি দেখা যাবে।',
      unconfiguredLabel: 'মালিকের অনুমোদনের অপেক্ষায় — অনুগ্রহ করে পাশের ইনকোয়ারি ফর্ম ব্যবহার করুন।',
      emailLabel: 'ইমেইল',
      whatsappLabel: 'হোয়াটসঅ্যাপ',
      whatsappAction: 'হোয়াটসঅ্যাপে বার্তা পাঠান',
      linkedinLabel: 'LinkedIn',
      facebookLabel: 'Facebook',
      processHeading: 'বার্তা পাঠানোর পরবর্তী ধাপ',
      processSteps: [
        'আপনার বার্তাটি একটি রেফারেন্স আইডিসহ সংরক্ষিত হয়।',
        'আমি আপনার ওয়েবসাইট বা সোশ্যাল পেজ ও লক্ষ্য পর্যালোচনা করি।',
        'আপনার পছন্দের মাধ্যমে প্রাথমিক আলোচনার সময় নির্ধারণ করা হয়।',
      ],
      form: {
        nameLabel: 'পূর্ণ নাম',
        namePlaceholder: 'আপনার নাম লিখুন',
        emailLabel: 'ইমেইল ঠিকানা',
        emailPlaceholder: 'you@company.com',
        phoneLabel: 'ফোন / হোয়াটসঅ্যাপ',
        phonePlaceholder: '+880 1XXX-XXXXXX',
        serviceLabel: 'প্রয়োজনীয় সার্ভিস',
        servicePlaceholder: 'একটি সার্ভিস নির্বাচন করুন',
        websiteLabel: 'ওয়েবসাইট বা সোশ্যাল লিংক',
        websitePlaceholder: 'https://yourwebsite.com',
        messageLabel: 'প্রজেক্টের বিবরণ',
        messagePlaceholder: 'আপনার ব্যবসা, লক্ষ্য এবং কী ধরনের সহায়তা প্রয়োজন তা সংক্ষেপে লিখুন...',
        consentLabel: 'এই ইনকোয়ারির বিষয়ে আমার সাথে যোগাযোগ করার সম্মতি দিচ্ছি।',
        submitBtn: 'বার্তা পাঠান',
        submittingBtn: 'পাঠানো হচ্ছে...',
        resetBtn: 'আরেকটি বার্তা পাঠান',
        requiredHint: 'প্রয়োজনীয় ঘরগুলো স্পষ্টভাবে চিহ্নিত।',
        optionalTag: 'ঐচ্ছিক',
        referencePrefix: 'রেফারেন্স আইডি',
      },
    },
    footer: {
      title: 'ডিজিটাল মার্কেটিং ও SEO স্পেশালিস্ট',
      shortIntro:
        'বাংলাদেশের ছোট ব্যবসা, স্টার্টআপ ও উদ্যোক্তাদের জন্য পরিচ্ছন্ন ও বিশ্বাসযোগ্য অনলাইন উপস্থিতি গড়ে তুলতে সহায়তা।',
      navigationHeading: 'নেভিগেশন',
      channelsHeading: 'যোগাযোগ',
      privacyLink: 'গোপনীয়তা নীতি',
      copyrightPrefix: 'সর্বস্বত্ব সংরক্ষিত।',
      noFakeClaimsNote: 'অবাস্তব র‍্যাংকিং প্রতিশ্রুতি ছাড়া স্বচ্ছ ও কৌশলগত ডিজিটাল মার্কেটিং।',
    },
    privacy: {
      heading: 'গোপনীয়তা নীতি',
      updatedLabel: 'খসড়া নীতিমালা · প্রকাশের আগে পর্যালোচনাযোগ্য',
      closeBtn: 'বন্ধ করুন',
      sections: [
        {
          title: '১. সংগৃহীত তথ্য',
          body: 'যোগাযোগ ফর্ম পূরণের সময় আপনার নাম, ইমেইল, ঐচ্ছিক ফোন নম্বর, নির্বাচিত সার্ভিস, ঐচ্ছিক ওয়েবসাইট লিংক এবং বার্তা কেবল আপনার ইনকোয়ারির উত্তর দেওয়ার উদ্দেশ্যে সংগ্রহ করা হয়।',
        },
        {
          title: '২. তথ্যের ব্যবহার',
          body: 'আপনার প্রেরিত তথ্য নিরাপদভাবে অ্যাপ্লিকেশন সার্ভারে সংরক্ষিত থাকে যাতে আবদুল্লাহ আপনার প্রজেক্টের প্রয়োজনীয়তা পর্যালোচনা করে যোগাযোগ করতে পারেন। কোনো তৃতীয় পক্ষের কাছে তথ্য বিক্রি বা শেয়ার করা হয় না।',
        },
        {
          title: '৩. তথ্য সংশোধন ও অপসারণ',
          body: 'প্রকাশিত যোগাযোগ মাধ্যমের সাহায্যে আপনি যেকোনো সময় আপনার প্রেরিত তথ্য সংশোধন বা মুছে ফেলার অনুরোধ করতে পারবেন।',
        },
      ],
    },
  },
};
