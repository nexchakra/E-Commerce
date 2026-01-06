
import React from 'react';

interface HeaderProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
  onStylistClick: () => void;
  onOrdersClick: () => void;
  cartCount: number;
  wishlistCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onWishlistClick, onStylistClick, onOrdersClick, cartCount, wishlistCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3 md:space-x-8">
        <div className="flex items-center space-x-2 group cursor-pointer">
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Minimalist Logo: Faceted Diamond/L Monogram */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full text-black transition-transform duration-500 group-hover:rotate-180"
              fill="currentColor"
            >
              <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M50 15 L85 50 L50 85 L15 50 Z" />
              <rect x="48" y="30" width="4" height="40" className="opacity-40" />
            </svg>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tighter serif text-black uppercase">Lumina Luxe</h1>
        </div>
        
        <nav className="hidden lg:flex space-x-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
          <a href="#" className="hover:text-black transition-colors">Men</a>
          <a href="#" className="hover:text-black transition-colors">Women</a>
          <a href="#" className="hover:text-black transition-colors">New Arrivals</a>
          <a href="#" className="hover:text-black transition-colors">Lookbook</a>
        </nav>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5">
        <button 
          onClick={onStylistClick}
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-800 transition-all shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="hidden sm:inline">AI STYLIST</span>
        </button>

        <div className="flex items-center space-x-1">
          <button 
            onClick={onOrdersClick}
            className="p-2 text-gray-600 hover:text-black transition-colors"
            title="Order History"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          <button 
            onClick={onWishlistClick}
            className="relative p-2 text-gray-600 hover:text-black transition-colors"
            title="Wishlist"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          <button 
            onClick={onCartClick}
            className="relative p-2 text-gray-600 hover:text-black transition-colors"
            title="Cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
