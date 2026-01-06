
export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Men' | 'Women' | 'Accessories';
  price: number;
  description: string;
  image: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  trackingNumber: string;
  items: Array<{
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface StylistMessage {
  role: 'user' | 'model';
  text: string;
  products?: Product[];
}

export interface StylingRecommendation {
  reasoning: string;
  recommendedProductIds: string[];
}
