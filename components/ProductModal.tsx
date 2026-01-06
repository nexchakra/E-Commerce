
import React, { useState } from 'react';
import { Product, Review } from '../types';
import ReviewSection from './ReviewSection';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onAddReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, onAddReview }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${product.brand} - ${product.name}`,
      text: `Check out this ${product.name} from Lumina Luxe!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto space-y-8">
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">{product.brand}</p>
                <h2 className="text-3xl font-bold serif text-gray-900">{product.name}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <p className="text-2xl font-light text-gray-600">${product.price}</p>
                  <div className="flex items-center text-xs text-yellow-500">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-400">{product.rating}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <button 
                  onClick={handleShare}
                  className="p-3 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all border border-gray-100"
                  title="Share product"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                {copied && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-600 uppercase tracking-widest whitespace-nowrap animate-in fade-in slide-in-from-top-1">
                    Link Copied
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-900 block mb-3">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs border rounded-full transition-all ${
                        selectedColor === color 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-900 block mb-3">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-xs border rounded-full transition-all ${
                        selectedSize === size 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => {
                  onAddToCart(product, selectedSize, selectedColor);
                  onClose();
                }}
                className="w-full bg-black text-white py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-800 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <span>Add to Bag</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>

            <div className="border-t border-gray-100 pt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ethically Sourced</span>
              </div>
            </div>

            <ReviewSection 
              reviews={product.reviews || []} 
              onAddReview={(review) => onAddReview(product.id, review)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
