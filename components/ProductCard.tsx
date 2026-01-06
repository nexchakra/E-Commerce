
import React, { useRef } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onVisualSearch: (imageBase64: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  isComparing?: boolean;
  isWishlisted?: boolean;
  onToggleCompare: (id: string) => void;
  onToggleWishlist: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onSelect, 
  onVisualSearch, 
  onAddToCart,
  isComparing = false,
  isWishlisted = false,
  onToggleCompare,
  onToggleWishlist
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      onVisualSearch(base64);
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Pre-selecting first available size and color as requested
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    onAddToCart(product, defaultSize, defaultColor);
  };

  return (
    <div 
      className={`group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col h-full ${isComparing ? 'ring-2 ring-black' : ''}`}
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm ${
            isWishlisted 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="bg-white/90 backdrop-blur-md p-3 rounded-full hover:bg-white transition-all shadow-xl"
              title="Visual Search"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(product.id);
              }}
              className={`p-3 rounded-full backdrop-blur-md transition-all shadow-xl ${isComparing ? 'bg-black text-white' : 'bg-white/90 text-black hover:bg-white'}`}
              title={isComparing ? "Remove from comparison" : "Add to comparison"}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-800">
            {product.brand}
          </span>
        </div>

        {isComparing && (
          <div className="absolute top-14 right-4 bg-black text-white p-1 rounded-full shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-black transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500">{product.category}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-bold text-black">${product.price}</span>
            <div className="flex items-center text-xs text-yellow-500">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-gray-400">{product.rating}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleQuickAdd}
          className="mt-4 w-full bg-gray-50 text-black border border-gray-100 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
