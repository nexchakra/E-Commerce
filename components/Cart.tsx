
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: string, size: string, color: string) => void;
  onUpdateQty: (id: string, size: string, color: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onClose, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[80] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold serif">Your Bag</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-gray-500 font-medium">Your bag is empty.</p>
            <button 
              onClick={onClose}
              className="text-sm font-bold underline hover:text-gray-600"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-32 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                    <button 
                      onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)}
                      className="text-gray-400 hover:text-black"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">{item.selectedColor} / {item.selectedSize}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-full px-2">
                      <button 
                        onClick={() => onUpdateQty(item.id, item.selectedSize, item.selectedColor, -1)}
                        className="p-1 text-gray-500 hover:text-black"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, item.selectedSize, item.selectedColor, 1)}
                        className="p-1 text-gray-500 hover:text-black"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-sm font-bold">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Shipping</span>
            <span className="font-bold">FREE</span>
          </div>
          <div className="pt-4">
            <button className="w-full bg-black text-white py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-800 transition-all">
              Checkout
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest font-medium">
              Taxes calculated at checkout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
