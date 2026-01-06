
import React from 'react';
import { Product } from '../types';

interface WishlistDrawerProps {
  items: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onMoveToCart: (product: Product) => void;
  onSelectProduct: (id: string) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ items, onClose, onRemove, onMoveToCart, onSelectProduct }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[85] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <h2 className="text-xl font-bold serif">Wishlist</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Your wishlist is empty.</p>
            <button 
              onClick={onClose}
              className="text-sm font-bold underline hover:text-gray-600"
            >
              Discover Collections
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex space-x-4 group">
                <div 
                  className="relative w-24 h-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                  onClick={() => onSelectProduct(item.id)}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 space-y-1 py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.name}</h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.brand}</p>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                      title="Remove from wishlist"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm font-bold mt-2">${item.price}</p>
                  <button 
                    onClick={() => onMoveToCart(item)}
                    className="mt-4 w-full border border-black text-black py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button 
            onClick={() => items.forEach(item => onMoveToCart(item))}
            className="w-full bg-black text-white py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-800 transition-all flex items-center justify-center space-x-2"
          >
            <span>Move all to bag</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistDrawer;
