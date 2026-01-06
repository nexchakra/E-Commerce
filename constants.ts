
import { Product, Promotion } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Silk Blazer',
    brand: 'Noir Atelier',
    category: 'Men',
    price: 450,
    description: 'A tailored blazer made from premium Italian silk. Perfect for gala nights and formal dinners.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
    colors: ['Midnight Black', 'Deep Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: [
      { id: 'r1', user: 'James W.', rating: 5, comment: 'Absolutely stunning fit. The silk quality is top-tier.', date: '2024-03-15' },
      { id: 'r2', user: 'Michael S.', rating: 4, comment: 'Great blazer, though the sleeves were a tad long.', date: '2024-02-10' }
    ]
  },
  {
    id: '2',
    name: 'Ethereal Flow Maxi Dress',
    brand: 'Lumina',
    category: 'Women',
    price: 320,
    description: 'A breathable linen-blend maxi dress with hand-embroidered details.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1200',
    colors: ['Cream', 'Sage Green', 'Dusty Rose'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviews: [
      { id: 'r3', user: 'Elena G.', rating: 5, comment: 'So comfortable and elegant. I wear it everywhere!', date: '2024-03-01' }
    ]
  },
  {
    id: '3',
    name: 'Urban Vanguard Chelsea Boots',
    brand: 'StepHard',
    category: 'Men',
    price: 210,
    description: 'Crafted from hand-painted calfskin, these boots offer timeless style and rugged durability.',
    image: 'https://images.unsplash.com/photo-1520639889313-7272175b1c39?auto=format&fit=crop&q=80&w=1200',
    colors: ['Tan', 'Chocolate Brown'],
    sizes: ['8', '9', '10', '11', '12'],
    rating: 4.7,
    reviews: []
  },
  {
    id: '4',
    name: 'Nebula Gold Chronograph',
    brand: 'Zenith',
    category: 'Accessories',
    price: 1200,
    description: 'A mechanical masterpiece featuring 18k gold accents and an alligator leather strap.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1200',
    colors: ['Gold/Black', 'Silver/Brown'],
    sizes: ['One Size'],
    rating: 5.0,
    reviews: [
      { id: 'r4', user: 'Robert D.', rating: 5, comment: 'A true investment piece. The gold craftsmanship is impeccable.', date: '2024-01-20' }
    ]
  },
  {
    id: '5',
    name: 'Oasis Cashmere Scarf',
    brand: 'Lumina',
    category: 'Accessories',
    price: 180,
    description: 'Sustainably sourced cashmere from the Mongolian highlands. Ultra-soft and incredibly warm.',
    image: 'https://images.unsplash.com/photo-1601039605349-49344216893b?auto=format&fit=crop&q=80&w=1200',
    colors: ['Oatmeal', 'Slate', 'Burgundy'],
    sizes: ['One Size'],
    rating: 4.6,
    reviews: []
  },
  {
    id: '6',
    name: 'Aurelia High-Waist Trousers',
    brand: 'Noir Atelier',
    category: 'Women',
    price: 280,
    description: 'Sharp pleats and a structured waist define these versatile wool-blend trousers.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1200',
    colors: ['Ivory', 'Midnight Black'],
    sizes: ['0', '2', '4', '6', '8', '10'],
    rating: 4.5,
    reviews: []
  },
  {
    id: '7',
    name: 'Horizon Tech Trench',
    brand: 'Aegis',
    category: 'Men',
    price: 550,
    description: 'Water-resistant, breathable, and equipped with hidden utility pockets for the modern commuter.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1200',
    colors: ['Stone', 'Carbon'],
    sizes: ['M', 'L', 'XL'],
    rating: 4.9,
    reviews: []
  },
  {
    id: '8',
    name: 'Cirrus Silk Blouse',
    brand: 'Lumina',
    category: 'Women',
    price: 195,
    description: 'Lightweight silk chiffon blouse with a subtle sheen and relaxed silhouette.',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&q=80&w=1200',
    colors: ['Azure', 'Pearl White'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviews: []
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'p1',
    title: 'The Artisanal Series',
    subtitle: 'Limited Edition',
    description: 'Discover our exclusive collaboration with local craftsmen. Rare pieces, infinite style.',
    ctaText: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&q=80&w=1600',
    backgroundColor: 'bg-[#f8f5f0]',
    textColor: 'text-gray-900'
  },
  {
    id: 'p2',
    title: 'Midnight Reverie',
    subtitle: 'Seasonal Sale',
    description: 'Up to 40% off our curated evening wear. Elegance redefined for the nocturnal soul.',
    ctaText: 'Shop Evening Wear',
    image: 'https://images.unsplash.com/photo-1539109132314-3477524c859c?auto=format&fit=crop&q=80&w=1600',
    backgroundColor: 'bg-[#121212]',
    textColor: 'text-white'
  },
  {
    id: 'p3',
    title: 'Modern Minimalist',
    subtitle: 'New Arrivals',
    description: 'Clean lines, sustainable fabrics, and timeless silhouettes for the contemporary wardrobe.',
    ctaText: 'View Arrivals',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=1600',
    backgroundColor: 'bg-[#efefef]',
    textColor: 'text-gray-900'
  }
];
