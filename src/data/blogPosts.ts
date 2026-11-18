export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogArticle {
  slug: string;
  category: {
    en: string;
    bn: string;
  };
  readTime: {
    en: string;
    bn: string;
  };
  title: {
    en: string;
    bn: string;
  };
  excerpt: {
    en: string;
    bn: string;
  };
  relatedServiceId: string;
  coverAlt: {
    en: string;
    bn: string;
  };
  sections: {
    en: BlogSection[];
    bn: BlogSection[];
  };
}

export const BLOG_POSTS: BlogArticle[] = [
  {
    slug: 'what-is-seo-guide',
    category: { en: 'SEO Fundamentals', bn: 'SEO মূল ধারণা' },
    readTime: { en: '4 min read', bn: '৪ মিনিট পাঠ' },
    title: {
      en: 'What is SEO and Why Does It Matter for Small Businesses?',
      bn: 'SEO কী এবং ছোট ব্যবসার জন্য কেন গুরুত্বপূর্ণ?',
    },
    excerpt: {
      en: 'A plain-language overview of how search engines understand websites and why organic visibility compounds over time.',
      bn: 'সার্চ ইঞ্জিন কীভাবে ওয়েবসাইট বোঝে এবং কেন ছোট ব্যবসার জন্য অর্গানিক দৃশ্যমানতা দীর্ঘমেয়াদে কার্যকর—তার সহজ ব্যাখ্যা।',
    },
    relatedServiceId: 'seo-optimization',
    coverAlt: {
      en: 'Editorial illustration explaining search engine optimization fundamentals',
      bn: 'SEO মূল ধারণা বিষয়ক এডিটোরিয়াল ইলাস্ট্রেশন',
    },
    sections: {
      en: [
        {
          heading: 'Understanding Search Engine Optimization',
          paragraphs: [
            'Search Engine Optimization (SEO) is the practice of structuring your website’s pages, content, and technical setup so search engines like Google can clearly index your offerings and match them with people actively searching for solutions.',
            'Unlike paid ads that stop bringing visits the moment a campaign budget ends, well-organized SEO builds a durable digital asset for your business.',
          ],
        },
        {
          heading: 'Why It Matters for Businesses in Bangladesh',
          paragraphs: [
            'Consumers in Bangladesh increasingly search Google before contacting service providers, clinics, restaurants, or B2B vendors. When your site answers their question clearly and loads reliably on mobile devices, you earn trust before the first phone call.',
          ],
          bullets: [
            'Reaches buyers who already have active intent.',
            'Clarifies your core services and regional availability.',
            'Reduces over-reliance on paid social reach alone.',
          ],
        },
      ],
      bn: [
        {
          heading: 'সার্চ ইঞ্জিন অপটিমাইজেশন (SEO) কী?',
          paragraphs: [
            'SEO হলো আপনার ওয়েবসাইটের পেজ, কনটেন্ট এবং টেকনিক্যাল কাঠামো এমনভাবে সাজানোর প্রক্রিয়া যাতে Google-এর মতো সার্চ ইঞ্জিন আপনার সেবা সহজে বুঝতে পারে এবং প্রাসঙ্গিক অনুসন্ধানকারীর সামনে তুলে ধরতে পারে।',
            'পেইড বিজ্ঞাপনের বাজেট শেষ হলে ভিজিট বন্ধ হয়ে যায়, কিন্তু সঠিক SEO আপনার ওয়েবসাইটের জন্য দীর্ঘমেয়াদি ভিত্তি তৈরি করে।',
          ],
        },
        {
          heading: 'বাংলাদেশের ব্যবসার জন্য কেন গুরুত্বপূর্ণ?',
          paragraphs: [
            'বর্তমানে গ্রাহকরা যেকোনো পণ্য বা সেবা নেওয়ার আগে অনলাইনে খোঁজ করেন। আপনার ওয়েবসাইট যদি মোবাইলে দ্রুত খোলে এবং স্পষ্ট উত্তর দেয়, তবে প্রথম যোগাযোগের আগেই আস্থা তৈরি হয়।',
          ],
          bullets: [
            'যারা ইতোমধ্যেই সেবা খুঁজছেন তাদের কাছে পৌঁছানো যায়।',
            'আপনার ব্যবসার মূল সেবা ও অবস্থান স্পষ্টভাবে উপস্থাপিত হয়।',
            'কেবল পেইড বিজ্ঞাপনের ওপর একক নির্ভরতা কমে।',
          ],
        },
      ],
    },
  },
  {
    slug: 'on-page-seo-guide',
    category: { en: 'On-Page SEO', bn: 'অন-পেজ SEO' },
    readTime: { en: '5 min read', bn: '৫ মিনিট পাঠ' },
    title: {
      en: 'On-Page SEO Guide: Structuring Pages for Readers & Search',
      bn: 'On-Page SEO-এর গুরুত্বপূর্ণ বিষয়গুলো',
    },
    excerpt: {
      en: 'Practical checkpoints for titles, meta descriptions, heading hierarchy, internal links, and image alt attributes.',
      bn: 'টাইটেল, মেটা ডিসক্রিপশন, হেডিং বিন্যাস, ইন্টারনাল লিংক ও ইমেজ অল্ট টেক্সট সাজানোর ব্যবহারিক নির্দেশিকা।',
    },
    relatedServiceId: 'on-page-seo',
    coverAlt: {
      en: 'Editorial illustration representing on-page SEO layout and structure',
      bn: 'অন-পেজ SEO কাঠামো বিষয়ক এডিটোরিয়াল ইলাস্ট্রেশন',
    },
    sections: {
      en: [
        {
          heading: 'Clear Titles, Headings, and Readability',
          paragraphs: [
            'Every important page on your website should focus on one clear topic. Use a single descriptive H1 heading for the main subject, followed by logical H2 and H3 subheadings that break complex explanations into scannable sections.',
          ],
          bullets: [
            'Keep page titles specific (around 50–60 characters) without keyword stuffing.',
            'Write meta descriptions that summarize the value of clicking the page.',
            'Add descriptive alt text to meaningful visuals and diagrams.',
          ],
        },
        {
          heading: 'Thoughtful Internal Linking',
          paragraphs: [
            'Connecting educational blog posts to relevant service pages helps visitors take the next logical step and helps search crawlers understand how pages relate to each other.',
          ],
        },
      ],
      bn: [
        {
          heading: 'স্পষ্ট টাইটেল, হেডিং ও পাঠযোগ্যতা',
          paragraphs: [
            'ওয়েবসাইটের প্রতিটি গুরুত্বপূর্ণ পেজ একটি নির্দিষ্ট বিষয়ের ওপর ভিত্তি করে সাজানো উচিত। মূল বিষয়ের জন্য একটি স্পষ্ট H1 এবং উপ-বিভাগগুলোর জন্য ধারাবাহিক H2 ও H3 ব্যবহার করুন।',
          ],
          bullets: [
            'অপ্রয়োজনীয় কীওয়ার্ড না গুঁজে প্রাসঙ্গিক পেজ টাইটেল লিখুন।',
            'মেটা ডিসক্রিপশনে পাঠকের জন্য স্পষ্ট সারসংক্ষেপ রাখুন।',
            'গুরুত্বপূর্ণ ছবিতে অর্থপূর্ণ Alt টেক্সট যোগ করুন।',
          ],
        },
        {
          heading: 'কার্যকর ইন্টারনাল লিংকিং',
          paragraphs: [
            'শিক্ষামূলক ব্লগ আর্টিকেল থেকে প্রাসঙ্গিক সার্ভিস পেজে লিংক দিলে ভিজিটর সহজে পরবর্তী ধাপে যেতে পারেন এবং সার্চ ক্রলারও সাইটের কাঠামো ভালোভাবে বুঝতে পারে।',
          ],
        },
      ],
    },
  },
  {
    slug: 'technical-seo-basics',
    category: { en: 'Technical SEO', bn: 'টেকনিক্যাল SEO' },
    readTime: { en: '5 min read', bn: '৫ মিনিট পাঠ' },
    title: {
      en: 'Technical SEO Basics: Crawling, Indexing, and Site Hygiene',
      bn: 'Technical SEO-এর প্রাথমিক ধারণা',
    },
    excerpt: {
      en: 'Why sitemaps, robots.txt, canonical URLs, and clean mobile rendering form the backbone of search readiness.',
      bn: 'কেন সাইটম্যাপ, robots.txt, ক্যানোনিকাল লিংক এবং মোবাইল-বান্ধব কাঠামো সার্চ ইঞ্জিনের জন্য অপরিহার্য।',
    },
    relatedServiceId: 'technical-seo-audit',
    coverAlt: {
      en: 'Editorial illustration showing technical website indexing and crawl structure',
      bn: 'টেকনিক্যাল SEO ক্রলিং ও ইনডেক্সিং বিষয়ক ইলাস্ট্রেশন',
    },
    sections: {
      en: [
        {
          heading: 'Making Pages Discoverable and Indexable',
          paragraphs: [
            'Even great content cannot perform in search if crawlers encounter broken links, accidental noindex tags, or missing XML sitemaps. Technical SEO ensures search engines can access and interpret your pages cleanly.',
          ],
          bullets: [
            'Verify clean URL paths without confusing parameters.',
            'Maintain an accurate sitemap.xml and robots.txt.',
            'Monitor index coverage and crawl errors inside Google Search Console.',
          ],
        },
      ],
      bn: [
        {
          heading: 'পেজগুলোকে ক্রল ও ইনডেক্সযোগ্য রাখা',
          paragraphs: [
            'মানসম্মত কনটেন্ট থাকা সত্ত্বেও ব্রোকেন লিংক, ভুল noindex ট্যাগ বা সাইটম্যাপের অভাবে পেজ সার্চে নাও আসতে পারে। টেকনিক্যাল SEO নিশ্চিত করে যে সার্চ ইঞ্জিন আপনার পেজগুলো নির্বিঘ্নে পড়তে পারছে।',
          ],
          bullets: [
            'সহজ ও পাঠযোগ্য URL কাঠামো ব্যবহার করুন।',
            'সঠিক sitemap.xml ও robots.txt বজায় রাখুন।',
            'Google Search Console-এ নিয়মিত ইনডেক্সিং অবস্থা পরীক্ষা করুন।',
          ],
        },
      ],
    },
  },
  {
    slug: 'keyword-research-guide',
    category: { en: 'Keyword Strategy', bn: 'কীওয়ার্ড রিসার্চ' },
    readTime: { en: '4 min read', bn: '৪ মিনিট পাঠ' },
    title: {
      en: 'Keyword Research: Matching Search Intent to Business Goals',
      bn: 'Keyword Research শুরু করবেন কীভাবে?',
    },
    excerpt: {
      en: 'How to prioritize search intent and realistic long-tail queries instead of chasing broad, unfocused search volume.',
      bn: 'কেবল বড় সার্চ ভলিউমের পেছনে না ছুটে কীভাবে গ্রাহকের সার্চ ইন্টেন্ট অনুযায়ী কার্যকর কীওয়ার্ড নির্বাচন করবেন।',
    },
    relatedServiceId: 'keyword-research',
    coverAlt: {
      en: 'Editorial illustration representing keyword research and search intent mapping',
      bn: 'কীওয়ার্ড রিসার্চ ও সার্চ ইন্টেন্ট বিষয়ক ইলাস্ট্রেশন',
    },
    sections: {
      en: [
        {
          heading: 'Start With Customer Questions, Not Just Volume',
          paragraphs: [
            'High search volume means little if the searcher is looking for something completely different from what your business offers. Group keywords by intent—informational guides versus commercial service pages—so every page serves a clear need.',
          ],
        },
      ],
      bn: [
        {
          heading: 'শুধু ভলিউম নয়, গ্রাহকের উদ্দেশ্য বুঝুন',
          paragraphs: [
            'সার্চ ভলিউম বেশি হলেও তা ব্যবসার সেবার সাথে না মিললে লাভ হয় না। তথ্যমূলক প্রশ্ন ও সেবা-নেওয়ার উদ্দেশ্য অনুযায়ী কীওয়ার্ড আলাদা করলে প্রতিটি পেজ সঠিক লক্ষ্য পূরণ করতে পারে।',
          ],
        },
      ],
    },
  },
  {
    slug: 'local-seo-bangladesh',
    category: { en: 'Local SEO', bn: 'লোকাল SEO' },
    readTime: { en: '5 min read', bn: '৫ মিনিট পাঠ' },
    title: {
      en: 'Local SEO for Businesses in Bangladesh: Practical Foundations',
      bn: 'বাংলাদেশের ব্যবসার জন্য Local SEO',
    },
    excerpt: {
      en: 'Essential steps for helping neighborhood and city-based customers discover accurate business details online.',
      bn: 'শহর বা এলাকাভিত্তিক গ্রাহকরা যেন অনলাইনে সহজে আপনার ব্যবসার সঠিক তথ্য খুঁজে পান তার প্রয়োজনীয় ধাপসমূহ।',
    },
    relatedServiceId: 'seo-optimization',
    coverAlt: {
      en: 'Editorial illustration representing local search visibility for businesses',
      bn: 'বাংলাদেশের ব্যবসার জন্য লোকাল SEO বিষয়ক ইলাস্ট্রেশন',
    },
    sections: {
      en: [
        {
          heading: 'Consistency Builds Local Search Confidence',
          paragraphs: [
            'For clinics, agencies, training centers, and retail stores across Dhaka, Chattogram, and other cities, consistent business name, address, phone details, and clear local service pages help connect nearby searchers to your business.',
          ],
        },
      ],
      bn: [
        {
          heading: 'সঠিক ও সামঞ্জস্যপূর্ণ তথ্যই লোকাল সার্চের ভিত্তি',
          paragraphs: [
            'ঢাকা, চট্টগ্রাম বা দেশের অন্যান্য শহরের স্থানীয় ব্যবসার ক্ষেত্রে ওয়েবসাইট ও অনলাইন প্রোফাইলে ব্যবসার নাম, ঠিকানা, ফোন নম্বর ও সেবার এলাকা স্পষ্ট ও সামঞ্জস্যপূর্ণ রাখা অত্যন্ত গুরুত্বপূর্ণ।',
          ],
        },
      ],
    },
  },
  {
    slug: 'digital-marketing-strategies',
    category: { en: 'Digital Strategy', bn: 'ডিজিটাল মার্কেটিং' },
    readTime: { en: '5 min read', bn: '৫ মিনিট পাঠ' },
    title: {
      en: 'Connecting SEO, Meta Ads, and Lead Generation Into One Strategy',
      bn: 'SEO, Meta Ads এবং লিড জেনারেশনকে একীভূত করার কৌশল',
    },
    excerpt: {
      en: 'How organic search and targeted Meta campaigns work best together when paired with a clear enquiry experience.',
      bn: 'স্পষ্ট ইনকোয়ারি পেজের সাথে অর্গানিক SEO এবং লক্ষ্যভিত্তিক Meta Ads কীভাবে একসাথে ভালো ফল দেয়।',
    },
    relatedServiceId: 'meta-ads-management',
    coverAlt: {
      en: 'Editorial illustration connecting digital marketing channels and lead capture',
      bn: 'ডিজিটাল মার্কেটিং চ্যানেল সমন্বয়ের ইলাস্ট্রেশন',
    },
    sections: {
      en: [
        {
          heading: 'Paid Speed Meets Organic Trust',
          paragraphs: [
            'Meta Ads help introduce your offer quickly to a defined audience, while SEO captures active search demand over time. Both channels perform better when they lead visitors to clear service explanations and simple enquiry forms.',
          ],
        },
      ],
      bn: [
        {
          heading: 'তাৎক্ষণিক পৌঁছানো ও দীর্ঘমেয়াদি আস্থার সমন্বয়',
          paragraphs: [
            'Meta Ads দ্রুত নির্দিষ্ট অডিয়েন্সের কাছে আপনার বার্তা পৌঁছে দেয়, আর SEO দীর্ঘমেয়াদে সক্রিয় গ্রাহকদের নিয়ে আসে। উভয় চ্যানেলই তখন বেশি কার্যকর হয় যখন ভিজিটর পরিচ্ছন্ন সার্ভিস পেজ ও সহজ যোগাযোগ ফর্ম পান।',
          ],
        },
      ],
    },
  },
];
