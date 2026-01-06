
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import PromoCarousel from './components/PromoCarousel';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import ComparisonModal from './components/ComparisonModal';
import WishlistDrawer from './components/WishlistDrawer';
import OrderHistoryDrawer from './components/OrderHistoryDrawer';
import AIStylist from './components/AIStylist';
import Cart from './components/Cart';
import { PRODUCTS as INITIAL_PRODUCTS, PROMOTIONS } from './constants';
import { Product, CartItem, Review, Order } from './types';

const RECENTLY_VIEWED_KEY = 'lumina-luxe-recently-viewed';
const WISHLIST_KEY = 'lumina-luxe-wishlist';

const MOCK_ORDERS: Order[] = [
  {
    id: '#LX-8829',
    date: '2024-02-15',
    status: 'Delivered',
    total: 660.00,
    trackingNumber: 'L-LUXE-9921-X9',
    items: [
      { name: 'Midnight Silk Blazer', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200', quantity: 1, price: 450 },
      { name: 'Urban Vanguard Chelsea Boots', image: 'https://images.unsplash.com/photo-1520639889313-7272175b1c39?auto=format&fit=crop&q=80&w=1200', quantity: 1, price: 210 }
    ]
  },
  {
    id: '#LX-7712',
    date: '2024-03-10',
    status: 'Shipped',
    total: 1200.00,
    trackingNumber: 'L-LUXE-4402-B1',
    items: [
      { name: 'Nebula Gold Chronograph', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1200', quantity: 1, price: 1200 }
    ]
  }
];

const COLOR_MAP: Record<string, string> = {
  'Midnight Black': '#000000',
  'Deep Navy': '#000080',
  'Cream': '#FFFDD0',
  'Sage Green': '#87A96B',
  'Dusty Rose': '#DCAE96',
  'Tan': '#D2B48C',
  'Chocolate Brown': '#3D2B1F',
  'Gold/Black': '#D4AF37',
  'Silver/Brown': '#C0C0C0',
  'Oatmeal': '#E3D5CA',
  'Slate': '#708090',
  'Burgundy': '#800020',
  'Ivory': '#FFFFF0',
  'Azure': '#007FFF',
  'Pearl White': '#F0EAD6',
  'Stone': '#877F7D',
  'Carbon': '#333333',
  'All': 'linear-gradient(45deg, #000 25%, #fff 25%, #fff 50%, #000 50%, #000 75%, #fff 75%, #fff 100%)'
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [stylistInitialImage, setStylistInitialImage] = useState<string | undefined>(undefined);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // Filtering States
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Men' | 'Women' | 'Accessories'>('All');
  const [colorFilter, setColorFilter] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(1500);

  // Initialize Recently Viewed & Wishlist from LocalStorage
  useEffect(() => {
    const savedRecent = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (savedRecent) {
      try { setRecentlyViewedIds(JSON.parse(savedRecent)); } catch (e) { console.error(e); }
    }
    const savedWishlist = localStorage.getItem(WISHLIST_KEY);
    if (savedWishlist) {
      try { setWishlistIds(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
    }
  }, []);

  const selectedProduct = useMemo(() => 
    products.find(p => p.id === selectedProductId) || null,
  [products, selectedProductId]);

  const comparisonProducts = useMemo(() => 
    products.filter(p => comparisonIds.includes(p.id)),
  [products, comparisonIds]);

  const wishlistProducts = useMemo(() => 
    products.filter(p => wishlistIds.includes(p.id)),
  [products, wishlistIds]);

  const recentlyViewedProducts = useMemo(() => 
    recentlyViewedIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => !!p),
  [products, recentlyViewedIds]);

  // Derive unique colors from products for the filter UI
  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach(p => p.colors.forEach(c => colors.add(c)));
    return ['All', ...Array.from(colors).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const categoryMatch = categoryFilter === 'All' || p.category === categoryFilter;
      const colorMatch = colorFilter === 'All' || p.colors.includes(colorFilter);
      const priceMatch = p.price <= maxPrice;
      return categoryMatch && colorMatch && priceMatch;
    });
  }, [products, categoryFilter, colorFilter, maxPrice]);

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    
    // Update Recently Viewed
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(pId => pId !== id);
      const updated = [id, ...filtered].slice(0, 8); // Keep last 8
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(pId => pId !== id) 
        : [...prev, id];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewedIds([]);
    localStorage.removeItem(RECENTLY_VIEWED_KEY);
  };

  const addToCart = (product: Product, size?: string, color?: string) => {
    const selectedSize = size || product.sizes[0];
    const selectedColor = color || product.colors[0];

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize, selectedColor }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const updateQuantity = (id: string, size: string, color: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size && item.selectedColor === color) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleComparison = (id: string) => {
    setComparisonIds(prev => {
      if (prev.includes(id)) return prev.filter(pId => pId !== id);
      if (prev.length >= 4) return prev; // Limit to 4 for UX
      return [...prev, id];
    });
  };

  const handleAddReview = (productId: string, newReview: Omit<Review, 'id' | 'date'>) => {
    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id === productId) {
        const review: Review = {
          ...newReview,
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toISOString().split('T')[0]
        };
        const updatedReviews = [...(p.reviews || []), review];
        const avgRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return { 
          ...p, 
          reviews: updatedReviews,
          rating: parseFloat(avgRating.toFixed(1))
        };
      }
      return p;
    }));
  };

  const resetFilters = () => {
    setCategoryFilter('All');
    setColorFilter('All');
    setMaxPrice(1500);
  };

  const handleVisualSearch = (base64: string) => {
    setStylistInitialImage(base64);
    setIsStylistOpen(true);
  };

  const handleCloseStylist = () => {
    setIsStylistOpen(false);
    setStylistInitialImage(undefined);
  };

  const hasActiveFilters = categoryFilter !== 'All' || colorFilter !== 'All' || maxPrice < 1500;

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        onWishlistClick={() => setIsWishlistOpen(true)}
        onStylistClick={() => setIsStylistOpen(true)}
        onOrdersClick={() => setIsOrdersOpen(true)}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
      />

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="Hero"
          />
          <div className="relative z-10 text-center space-y-6 px-4">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter serif leading-tight">
              A New Era of <br /> Elegance
            </h2>
            <p className="max-w-xl mx-auto text-lg text-gray-200 font-light">
              Experience the future of fashion with our AI-curated collections and artisanal craftsmanship.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setIsStylistOpen(true)}
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center space-x-2"
              >
                <span>Ask AI Stylist</span>
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">
                Shop Collection
              </button>
            </div>
          </div>
        </section>

        {/* New Promotions Carousel Section */}
        <PromoCarousel promotions={PROMOTIONS} />

        {/* Filters Section */}
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-10">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold serif tracking-tight">Curated Selections</h3>
              <div className="flex space-x-6 text-sm font-medium border-b border-gray-100">
                {['All', 'Men', 'Women', 'Accessories'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat as any)}
                    className={`pb-4 transition-all relative ${categoryFilter === cat ? 'text-black font-bold' : 'text-gray-400 hover:text-black'}`}
                  >
                    {cat}
                    {categoryFilter === cat && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
              {/* Color Swatches */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block">Filter by Color</span>
                <div className="flex flex-wrap gap-2.5">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      onClick={() => setColorFilter(color)}
                      title={color}
                      className={`relative w-6 h-6 rounded-full border transition-all duration-300 ${
                        colorFilter === color 
                          ? 'ring-2 ring-offset-2 ring-black scale-110' 
                          : 'border-gray-200 hover:scale-105'
                      }`}
                      style={{ 
                        background: COLOR_MAP[color] || '#ccc',
                        backgroundSize: color === 'All' ? '10px 10px' : 'cover'
                      }}
                    >
                      {colorFilter === color && (
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className={`w-1 h-1 rounded-full ${['Cream', 'Ivory', 'Pearl White', 'All'].includes(color) ? 'bg-black' : 'bg-white'}`} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-3 min-w-[200px]">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Price Range</span>
                  <span className="text-xs font-bold text-black font-mono">Up to ${maxPrice}</span>
                </div>
                <div className="relative pt-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="1500" 
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black transition-all hover:h-1.5"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-[9px] text-gray-400 font-bold">$0</span>
                    <span className="text-[9px] text-gray-400 font-bold">$1500+</span>
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <button 
                  onClick={resetFilters}
                  className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors border border-red-100 px-3 py-1.5 rounded-full"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onSelect={(p) => handleProductSelect(p.id)} 
                onVisualSearch={handleVisualSearch}
                onAddToCart={addToCart}
                isComparing={comparisonIds.includes(product.id)}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleCompare={toggleComparison}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>

          {/* Recently Viewed Section */}
          {recentlyViewedProducts.length > 0 && (
            <section className="pt-24 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center justify-between mb-12">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold serif">Recently Viewed</h3>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Pieces that caught your eye</p>
                </div>
                <button 
                  onClick={clearRecentlyViewed}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center space-x-2"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Clear History</span>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {recentlyViewedProducts.map(product => (
                  <div 
                    key={`recent-${product.id}`}
                    onClick={() => handleProductSelect(product.id)}
                    className="group cursor-pointer space-y-2"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-900 truncate">{product.name}</h4>
                      <p className="text-[10px] text-gray-400">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>
      </main>

      {/* Floating Comparison Bar */}
      {comparisonIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-4 rounded-full shadow-2xl flex items-center space-x-6 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold uppercase tracking-widest">{comparisonIds.length} items selected</span>
            <div className="flex -space-x-3 overflow-hidden">
              {comparisonProducts.map(p => (
                <img key={p.id} src={p.image} className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover" />
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4 border-l border-white/20 pl-6">
            <button 
              onClick={() => setIsComparisonOpen(true)}
              disabled={comparisonIds.length < 2}
              className="bg-white text-black px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              Compare Now
            </button>
            <button onClick={() => setComparisonIds([])} className="text-[10px] font-bold uppercase tracking-widest hover:text-gray-400">
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProductId(null)} 
          onAddToCart={addToCart}
          onAddReview={handleAddReview}
        />
      )}

      {isComparisonOpen && (
        <ComparisonModal 
          products={comparisonProducts} 
          onClose={() => setIsComparisonOpen(false)} 
          onRemove={toggleComparison}
          onAddToCart={(p) => addToCart(p)}
        />
      )}

      {isWishlistOpen && (
        <WishlistDrawer
          items={wishlistProducts}
          onClose={() => setIsWishlistOpen(false)}
          onRemove={toggleWishlist}
          onMoveToCart={(p) => addToCart(p)}
          onSelectProduct={(id) => {
            handleProductSelect(id);
            setIsWishlistOpen(false);
          }}
        />
      )}

      {isOrdersOpen && (
        <OrderHistoryDrawer
          orders={orders}
          onClose={() => setIsOrdersOpen(false)}
        />
      )}

      {isStylistOpen && (
        <AIStylist 
          products={products} 
          onClose={handleCloseStylist} 
          initialSearchImage={stylistInitialImage}
          currentlyViewedProduct={selectedProduct}
          onProductSelect={(p) => {
            handleProductSelect(p.id);
            handleCloseStylist();
          }}
        />
      )}

      {isCartOpen && (
        <Cart 
          items={cart} 
          onClose={() => setIsCartOpen(false)} 
          onRemove={removeFromCart}
          onUpdateQty={updateQuantity}
        />
      )}
    </div>
  );
};

export default App;
