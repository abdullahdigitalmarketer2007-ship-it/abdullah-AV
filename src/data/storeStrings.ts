import type { ProductCategoryId, StoreLanguage } from '../types/store';

export interface StoreStrings {
  nav: {
    products: string;
    about: string;
    manage: string;
    aiChat: string;
    bag: string;
    switchToDark: string;
    switchToLight: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    browseBtn: string;
    askAiBtn: string;
    highlights: { label: string; value: string }[];
  };
  catalog: {
    kicker: string;
    heading: string;
    subheading: string;
    searchPlaceholder: string;
    inStockOnly: string;
    allCategories: string;
    categories: { id: ProductCategoryId; label: string }[];
    inStockText: (count: number, unit: string) => string;
    lowStockText: (count: number, unit: string) => string;
    outOfStockText: string;
    addToBag: string;
    addedToBag: string;
    askAi: string;
    viewDetails: string;
    emptyTitle: string;
    emptySubtitle: string;
    resetFilters: string;
  };
  productModal: {
    skuLabel: string;
    availabilityLabel: string;
    variantLabel: string;
    quantityLabel: string;
    specsLabel: string;
    addToBag: string;
    askAiAboutItem: string;
    close: string;
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptySubtitle: string;
    continueShopping: string;
    subtotal: string;
    deliveryFee: string;
    total: string;
    checkoutHeading: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    areaLabel: string;
    dhakaOption: string;
    outsideOption: string;
    addressLabel: string;
    addressPlaceholder: string;
    placeOrderBtn: string;
    placingOrder: string;
    orderConfirmedTitle: string;
    orderIdLabel: string;
    codNote: string;
    close: string;
  };
  about: {
    kicker: string;
    heading: string;
    ownerLabel: string;
    locationLabel: string;
    deliveryHeading: string;
    returnHeading: string;
    contactHeading: string;
    manageCta: string;
    askAiCta: string;
  };
  manager: {
    title: string;
    subtitle: string;
    tabs: {
      inventory: string;
      addProduct: string;
      storeInfo: string;
    };
    stockLabel: string;
    priceLabel: string;
    saveBtn: string;
    savedMsg: string;
    deleteBtn: string;
    addForm: {
      nameEn: string;
      nameBn: string;
      category: string;
      priceBdt: string;
      stock: string;
      variant: string;
      descEn: string;
      descBn: string;
      imageLabel: string;
      submitBtn: string;
      submitting: string;
    };
    profileForm: {
      storeNameBn: string;
      storeNameEn: string;
      ownerNameBn: string;
      ownerNameEn: string;
      aboutBn: string;
      aboutEn: string;
      deliveryBn: string;
      deliveryEn: string;
      phone: string;
      email: string;
      saveProfileBtn: string;
    };
    close: string;
  };
  ai: {
    fabLabel: string;
    title: string;
    subtitle: string;
    welcomeMessage: (storeName: string, ownerName: string) => string;
    focusedBanner: string;
    clearFocus: string;
    clearChat: string;
    inputPlaceholder: string;
    sendLabel: string;
    thinkingLabel: string;
    starterQuestions: string[];
    close: string;
  };
  footer: {
    rights: string;
    poweredNote: string;
  };
}

export const STORE_STRINGS: Record<StoreLanguage, StoreStrings> = {
  bn: {
    nav: {
      products: 'প্রোডাক্টস',
      about: 'আমাদের সম্পর্কে',
      manage: 'স্টক ও তথ্য',
      aiChat: 'AI অ্যাসিস্ট্যান্ট',
      bag: 'ব্যাগ',
      switchToDark: 'ডার্ক মোড চালু করুন',
      switchToLight: 'লাইট মোড চালু করুন',
      menuOpen: 'মেনু খুলুন',
      menuClose: 'মেনু বন্ধ করুন',
    },
    hero: {
      kicker: 'সরাসরি স্টক যাচাই ও AI শপিং অ্যাসিস্ট্যান্ট',
      headline: 'পছন্দের সব প্রোডাক্ট, সাথে স্মার্ট AI শপিং সহায়তা।',
      subheadline:
        'টেক গ্যাজেট, লেদার অ্যাক্সেসরিজ, ওয়ার্কস্পেস এবং লাইফস্টাইল কালেকশন দেখুন। কোনো প্রোডাক্টের স্টক, দাম বা আমাদের সম্পর্কে জানতে নিচের AI অ্যাসিস্ট্যান্টকে প্রশ্ন করুন।',
      browseBtn: 'সব প্রোডাক্ট দেখুন',
      askAiBtn: 'AI অ্যাসিস্ট্যান্টকে জিজ্ঞাসা করুন',
      highlights: [
        { label: 'পেমেন্ট সুবিধা', value: 'সারা দেশে ক্যাশ অন ডেলিভারি' },
        { label: 'AI সহায়তা', value: 'তাৎক্ষণিক স্টক ও পণ্যের তথ্য' },
        { label: 'ডেলিভারি সময়', value: 'ঢাকায় ২৪–৪৮ ঘণ্টা' },
      ],
    },
    catalog: {
      kicker: 'প্রোডাক্ট কালেকশন',
      heading: 'আমাদের বর্তমান প্রোডাক্ট ও স্টক',
      subheading:
        'প্রতিটি কার্ডে লাইভ স্টকের সংখ্যা দেওয়া আছে। কোনো প্রোডাক্ট সম্পর্কে বিস্তারিত জানতে "AI-কে জিজ্ঞাসা করুন" বাটনে ক্লিক করুন।',
      searchPlaceholder: 'প্রোডাক্ট বা ক্যাটাগরি খুঁজুন...',
      inStockOnly: 'শুধু স্টকে আছে',
      allCategories: 'সবগুলো',
      categories: [
        { id: 'audio-tech', label: 'অডিও ও টেক' },
        { id: 'wearables', label: 'ওয়্যারেবলস' },
        { id: 'leather-carry', label: 'লেদার ও ক্যারি' },
        { id: 'workspace', label: 'ওয়ার্কস্পেস টেক' },
        { id: 'personal-care', label: 'পার্সোনাল কেয়ার' },
        { id: 'home-living', label: 'হোম ও লিভিং' },
      ],
      inStockText: (count, unit) => `স্টকে আছে · ${count} ${unit}`,
      lowStockText: (count, unit) => `সীমিত স্টক · মাত্র ${count} ${unit} বাকি`,
      outOfStockText: 'স্টক শেষ',
      addToBag: 'ব্যাগে যোগ করুন',
      addedToBag: 'যোগ হয়েছে',
      askAi: 'AI-কে জিজ্ঞাসা করুন',
      viewDetails: 'বিস্তারিত দেখুন',
      emptyTitle: 'কোনো প্রোডাক্ট পাওয়া যায়নি',
      emptySubtitle: 'আপনার সার্চ বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।',
      resetFilters: 'সব ফিল্টার রিসেট করুন',
    },
    productModal: {
      skuLabel: 'কোড',
      availabilityLabel: 'স্টক অবস্থা',
      variantLabel: 'ভ্যারিয়েন্ট নির্বাচন করুন',
      quantityLabel: 'পরিমাণ',
      specsLabel: 'মূল বৈশিষ্ট্য',
      addToBag: 'ব্যাগে যোগ করুন',
      askAiAboutItem: 'এই প্রোডাক্ট সম্পর্কে AI-কে জিজ্ঞাসা করুন',
      close: 'বন্ধ করুন',
    },
    cart: {
      title: 'আপনার শপিং ব্যাগ',
      emptyTitle: 'আপনার ব্যাগ এখনো খালি',
      emptySubtitle: 'কেনাকাটা শুরু করতে কালেকশন থেকে পছন্দের প্রোডাক্ট যোগ করুন।',
      continueShopping: 'প্রোডাক্ট দেখুন',
      subtotal: 'সাবটোটাল',
      deliveryFee: 'ডেলিভারি চার্জ',
      total: 'সর্বমোট (COD)',
      checkoutHeading: 'ক্যাশ অন ডেলিভারি অর্ডার তথ্য',
      nameLabel: 'আপনার নাম',
      namePlaceholder: 'পূর্ণ নাম লিখুন',
      phoneLabel: 'মোবাইল নম্বর',
      phonePlaceholder: '017XXXXXXXX',
      areaLabel: 'ডেলিভারি এলাকা',
      dhakaOption: 'ঢাকার ভেতরে (৳৭০)',
      outsideOption: 'ঢাকার বাইরে (৳১৩০)',
      addressLabel: 'সম্পূর্ণ ঠিকানা',
      addressPlaceholder: 'বাসা/রোড নম্বর, এলাকা, জেলা...',
      placeOrderBtn: 'অর্ডার কনফার্ম করুন',
      placingOrder: 'অর্ডার সম্পন্ন হচ্ছে...',
      orderConfirmedTitle: 'আপনার অর্ডারটি নিশ্চিত হয়েছে!',
      orderIdLabel: 'অর্ডার আইডি',
      codNote: 'অর্ডার কনফার্ম হলে স্টক স্বয়ংক্রিয়ভাবে আপডেট হবে।',
      close: 'বন্ধ করুন',
    },
    about: {
      kicker: 'দোকান ও সেলার পরিচিতি',
      heading: 'আমাদের সম্পর্কে ও ডেলিভারি নীতিমালা',
      ownerLabel: 'স্বত্বাধিকারী',
      locationLabel: 'অবস্থান',
      deliveryHeading: 'ডেলিভারি তথ্য',
      returnHeading: 'রিটার্ন ও রিপ্লেসমেন্ট',
      contactHeading: 'সরাসরি যোগাযোগ',
      manageCta: 'স্টক ও আমার তথ্য আপডেট করুন',
      askAiCta: 'দোকান সম্পর্কে AI-কে জিজ্ঞাসা করুন',
    },
    manager: {
      title: 'স্টোর ইনভেন্টরি ও AI নলেজ ম্যানেজার',
      subtitle:
        'এখান থেকে প্রোডাক্টের স্টক, দাম বা আপনার "আমাদের সম্পর্কে" তথ্য পরিবর্তন করলে AI চ্যাট অ্যাসিস্ট্যান্ট সাথে সাথেই নতুন তথ্য অনুযায়ী কাস্টমারকে উত্তর দেবে।',
      tabs: {
        inventory: 'স্টক ও দাম আপডেট',
        addProduct: 'নতুন প্রোডাক্ট যোগ করুন',
        storeInfo: 'আমার ও দোকানের তথ্য',
      },
      stockLabel: 'স্টক',
      priceLabel: 'দাম (৳)',
      saveBtn: 'সেভ করুন',
      savedMsg: 'আপডেট সেভ হয়েছে এবং AI তথ্য হালনাগাদ হয়েছে।',
      deleteBtn: 'মুছে ফেলুন',
      addForm: {
        nameEn: 'প্রোডাক্টের নাম (English)',
        nameBn: 'প্রোডাক্টের নাম (বাংলা)',
        category: 'ক্যাটাগরি',
        priceBdt: 'দাম (টাকায়)',
        stock: 'শুরুতে স্টক সংখ্যা',
        variant: 'ভ্যারিয়েন্ট (যেমন: Black / Standard)',
        descEn: 'বিবরণ (English)',
        descBn: 'বিবরণ (বাংলা)',
        imageLabel: 'প্রোডাক্টের ছবি আপলোড (ঐচ্ছিক)',
        submitBtn: 'প্রোডাক্ট যোগ করুন',
        submitting: 'যোগ করা হচ্ছে...',
      },
      profileForm: {
        storeNameBn: 'দোকানের নাম (বাংলা)',
        storeNameEn: 'দোকানের নাম (English)',
        ownerNameBn: 'আপনার নাম (বাংলা)',
        ownerNameEn: 'আপনার নাম (English)',
        aboutBn: 'আপনার ও দোকান সম্পর্কে (বাংলা)',
        aboutEn: 'আপনার ও দোকান সম্পর্কে (English)',
        deliveryBn: 'ডেলিভারি নীতিমালা (বাংলা)',
        deliveryEn: 'ডেলিভারি নীতিমালা (English)',
        phone: 'ফোন / হোয়াটসঅ্যাপ',
        email: 'ইমেইল',
        saveProfileBtn: 'প্রোফাইল সেভ করুন',
      },
      close: 'বন্ধ করুন',
    },
    ai: {
      fabLabel: 'AI অ্যাসিস্ট্যান্ট',
      title: 'AI প্রোডাক্ট অ্যাসিস্ট্যান্ট',
      subtitle: 'লাইভ স্টক, দাম ও আমাদের সম্পর্কে যেকোনো প্রশ্ন করুন',
      welcomeMessage: (storeName, ownerName) =>
        `আসসালামু আলাইকুম! আমি **${storeName}**-এর AI অ্যাসিস্ট্যান্ট। আমাদের বর্তমান স্টকে কোন কোন প্রোডাক্ট আছে, দাম কত বা স্বত্বাধিকারী **${ownerName}** এবং ডেলিভারি সম্পর্কে যা জানতে চান জিজ্ঞাসা করতে পারেন।`,
      focusedBanner: 'নির্বাচিত প্রোডাক্ট:',
      clearFocus: 'সরিয়ে দিন',
      clearChat: 'চ্যাট ক্লিয়ার',
      inputPlaceholder: 'প্রোডাক্ট, স্টক বা আমাদের সম্পর্কে লিখুন...',
      sendLabel: 'পাঠান',
      thinkingLabel: 'তথ্য যাচাই করে উত্তর লিখছে...',
      starterQuestions: [
        'এখন কী কী প্রোডাক্ট স্টকে আছে এবং দাম কত?',
        'আপনার ও আপনার দোকান সম্পর্কে জানান',
        'ডেলিভারি চার্জ ও কত দিনে পাব?',
        '৫০০০ টাকার নিচে কী কী প্রোডাক্ট আছে?',
      ],
      close: 'চ্যাট বন্ধ করুন',
    },
    footer: {
      rights: 'সর্বস্বত্ব সংরক্ষিত।',
      poweredNote: 'সার্ভার-সাইড লাইভ ইনভেন্টরি ও AI সহায়তা যুক্ত।',
    },
  },
  en: {
    nav: {
      products: 'Products',
      about: 'About Store',
      manage: 'Manage Stock',
      aiChat: 'AI Assistant',
      bag: 'Bag',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
    hero: {
      kicker: 'Live Stock Catalog & AI Shopping Assistant',
      headline: 'Curated everyday products, backed by an instant AI assistant.',
      subheadline:
        'Explore our multi-category catalog of audio gear, wearables, leather carry, workspace tech, personal care, and living essentials. Ask our AI assistant anytime about live stock, pricing, or our store.',
      browseBtn: 'Explore Products',
      askAiBtn: 'Ask AI Assistant',
      highlights: [
        { label: 'Nationwide COD', value: 'Cash on Delivery across Bangladesh' },
        { label: 'AI Product Help', value: 'Real-time stock & store answers' },
        { label: 'Fast Dispatch', value: '24–48h delivery inside Dhaka' },
      ],
    },
    catalog: {
      kicker: 'Featured Collection',
      heading: 'Shop Our Live Product Catalog',
      subheading:
        'Every product displays live server-backed stock. Click "Ask AI" on any item to check specifications, variants, or availability.',
      searchPlaceholder: 'Search products or categories...',
      inStockOnly: 'In Stock Only',
      allCategories: 'All Products',
      categories: [
        { id: 'audio-tech', label: 'Audio & Tech' },
        { id: 'wearables', label: 'Wearables' },
        { id: 'leather-carry', label: 'Leather & Carry' },
        { id: 'workspace', label: 'Workspace Tech' },
        { id: 'personal-care', label: 'Personal Care' },
        { id: 'home-living', label: 'Home & Living' },
      ],
      inStockText: (count, unit) => `In Stock · ${count} ${unit}`,
      lowStockText: (count, unit) => `Low Stock · ${count} ${unit} left`,
      outOfStockText: 'Out of Stock',
      addToBag: 'Add to Bag',
      addedToBag: 'Added',
      askAi: 'Ask AI',
      viewDetails: 'Quick View',
      emptyTitle: 'No matching products',
      emptySubtitle: 'Try clearing your search query or selecting another category.',
      resetFilters: 'Reset Filters',
    },
    productModal: {
      skuLabel: 'SKU',
      availabilityLabel: 'Availability',
      variantLabel: 'Select Variant',
      quantityLabel: 'Quantity',
      specsLabel: 'Key Highlights',
      addToBag: 'Add to Bag',
      askAiAboutItem: 'Ask AI about this product',
      close: 'Close',
    },
    cart: {
      title: 'Your Shopping Bag',
      emptyTitle: 'Your bag is currently empty',
      emptySubtitle: 'Browse our collection and add items to proceed with Cash on Delivery.',
      continueShopping: 'Browse Products',
      subtotal: 'Subtotal',
      deliveryFee: 'Delivery Fee',
      total: 'Total Payable (COD)',
      checkoutHeading: 'Cash on Delivery Details',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+880 17XXXXXXXX',
      areaLabel: 'Delivery Area',
      dhakaOption: 'Inside Dhaka (৳70)',
      outsideOption: 'Outside Dhaka (৳130)',
      addressLabel: 'Delivery Address',
      addressPlaceholder: 'House, road, area, city...',
      placeOrderBtn: 'Confirm COD Order',
      placingOrder: 'Confirming Order...',
      orderConfirmedTitle: 'Order Confirmed!',
      orderIdLabel: 'Order Reference',
      codNote: 'Confirmed orders deduct live inventory immediately.',
      close: 'Close',
    },
    about: {
      kicker: 'About Store & Seller',
      heading: 'Quality-Checked Essentials & Honest Service',
      ownerLabel: 'Store Owner',
      locationLabel: 'Location',
      deliveryHeading: 'Delivery Policy',
      returnHeading: 'Returns & Replacement',
      contactHeading: 'Direct Contact',
      manageCta: 'Manage Stock & About Info',
      askAiCta: 'Ask AI About Our Store',
    },
    manager: {
      title: 'Store Inventory & AI Knowledge Manager',
      subtitle:
        'Update product stock, pricing, or your About info here. The AI Chat Assistant reads these changes immediately on the next question.',
      tabs: {
        inventory: 'Inventory & Prices',
        addProduct: 'Add New Product',
        storeInfo: 'Owner & Store Info',
      },
      stockLabel: 'Stock',
      priceLabel: 'Price (৳)',
      saveBtn: 'Save',
      savedMsg: 'Saved! Both storefront and AI assistant knowledge are updated.',
      deleteBtn: 'Delete',
      addForm: {
        nameEn: 'Product Name (English)',
        nameBn: 'Product Name (Bangla)',
        category: 'Category',
        priceBdt: 'Price (BDT)',
        stock: 'Initial Stock',
        variant: 'Default Variant (e.g. Black / Standard)',
        descEn: 'Description (English)',
        descBn: 'Description (Bangla)',
        imageLabel: 'Upload Product Photo (Optional)',
        submitBtn: 'Add Product to Store',
        submitting: 'Adding Product...',
      },
      profileForm: {
        storeNameBn: 'Store Name (Bangla)',
        storeNameEn: 'Store Name (English)',
        ownerNameBn: 'Owner Name (Bangla)',
        ownerNameEn: 'Owner Name (English)',
        aboutBn: 'About Store & Owner (Bangla)',
        aboutEn: 'About Store & Owner (English)',
        deliveryBn: 'Delivery Policy (Bangla)',
        deliveryEn: 'Delivery Policy (English)',
        phone: 'Phone / WhatsApp',
        email: 'Email',
        saveProfileBtn: 'Save Store Profile',
      },
      close: 'Close',
    },
    ai: {
      fabLabel: 'Ask AI',
      title: 'AI Product Assistant',
      subtitle: 'Ask about live stock, prices, or our store',
      welcomeMessage: (storeName, ownerName) =>
        `Hello! I am the AI assistant for **${storeName}** (founded by **${ownerName}**). Ask me anything about which products are currently in stock, pricing, specs, delivery, or our store!`,
      focusedBanner: 'Focused item:',
      clearFocus: 'Clear',
      clearChat: 'Clear Chat',
      inputPlaceholder: 'Ask about products, stock, or our store...',
      sendLabel: 'Send',
      thinkingLabel: 'Checking live store inventory...',
      starterQuestions: [
        'Which products are currently in stock and what are their prices?',
        'Tell me about the owner and your store',
        'What are the delivery charges and timelines?',
        'What products are available under 5,000 BDT?',
      ],
      close: 'Close assistant',
    },
    footer: {
      rights: 'All rights reserved.',
      poweredNote: 'Powered by live inventory & server-side Gemini AI assistant.',
    },
  },
};

export function formatBdt(amount: number, lang: StoreLanguage): string {
  const formatted = new Intl.NumberFormat(lang === 'bn' ? 'bn-BD' : 'en-US').format(amount);
  return `৳${formatted}`;
}
