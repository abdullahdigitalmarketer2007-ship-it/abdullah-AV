export type StoreLanguage = 'bn' | 'en';

export type ProductCategoryId =
  | 'audio-tech'
  | 'wearables'
  | 'leather-carry'
  | 'workspace'
  | 'personal-care'
  | 'home-living';

export interface Product {
  id: string;
  sku: string;
  nameEn: string;
  nameBn: string;
  categoryId: ProductCategoryId;
  categoryEn: string;
  categoryBn: string;
  priceBdt: number;
  stock: number;
  unitEn: string;
  unitBn: string;
  descriptionEn: string;
  descriptionBn: string;
  specsEn: string[];
  specsBn: string[];
  variants: string[];
  image: string;
}

export interface StoreProfile {
  storeNameEn: string;
  storeNameBn: string;
  ownerNameEn: string;
  ownerNameBn: string;
  taglineEn: string;
  taglineBn: string;
  aboutEn: string;
  aboutBn: string;
  locationEn: string;
  locationBn: string;
  deliveryPolicyEn: string;
  deliveryPolicyBn: string;
  returnPolicyEn: string;
  returnPolicyBn: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export interface StoreData {
  profile: StoreProfile;
  products: Product[];
}

export interface CartItem {
  product: Product;
  variant: string;
  quantity: number;
}

export interface OrderReceipt {
  orderId: string;
  customerName: string;
  phone: string;
  deliveryArea: 'dhaka' | 'outside';
  address: string;
  subtotalBdt: number;
  deliveryFeeBdt: number;
  totalBdt: number;
  items: {
    productId: string;
    nameEn: string;
    nameBn: string;
    variant: string;
    quantity: number;
    unitPriceBdt: number;
  }[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  productRefName?: string;
  isError?: boolean;
}
