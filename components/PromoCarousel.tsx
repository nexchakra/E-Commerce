
import React, { useState, useEffect, useCallback } from 'react';
import { Promotion } from '../types';

interface PromoCarouselProps {
  promotions: Promotion[];
}

const PromoCarousel: React.FC<PromoCarouselProps> = ({ promotions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === promotions.length - 1 ? 0 : prev + 1));
  }, [promotions.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? promotions.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 6000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);

  return (
    <section 
      className="relative w-full h-[500px] overflow-hidden group bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex h-full transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {promotions.map((promo) => (
          <div 
            key={promo.id} 
            className={`min-w-full h-full flex flex-col lg:flex-row relative ${promo.backgroundColor}`}
          >
            {/* Content Side */}
            <div className={`w-full lg:w-1/2 h-full flex flex-col justify-center px-8 lg:px-24 space-y-6 z-10 ${promo.textColor}`}>
              <div className="space-y-2 animate-in fade-in slide-in-from-left duration-700">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">
                  {promo.subtitle}
                </span>
                <h3 className="text-4xl lg:text-6xl font-bold serif leading-tight">
                  {promo.title}
                </h3>
              </div>
              <p className="text-sm lg:text-lg opacity-80 max-w-md font-light leading-relaxed animate-in fade-in slide-in-from-left duration-1000">
                {promo.description}
              </p>
              <div className="pt-4 animate-in fade-in slide-in-from-left duration-1000">
                <button className={`px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  promo.textColor === 'text-white' 
                    ? 'bg-white text-black hover:bg-transparent hover:text-white border border-white' 
                    : 'bg-black text-white hover:bg-transparent hover:text-black border border-black'
                }`}>
                  {promo.ctaText}
                </button>
              </div>
            </div>

            {/* Image Side */}
            <div className="absolute inset-0 lg:relative lg:w-1/2 h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-inherit via-transparent to-transparent z-10 hidden lg:block" />
              <img 
                src={promo.image} 
                alt={promo.title} 
                className={`w-full h-full object-cover transition-transform duration-[6s] ease-linear ${
                  isPaused ? 'scale-100' : 'scale-110'
                } opacity-50 lg:opacity-100`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {promotions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-0.5 transition-all duration-500 rounded-full ${
              currentIndex === idx 
                ? 'w-12 bg-black' 
                : 'w-4 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default PromoCarousel;
