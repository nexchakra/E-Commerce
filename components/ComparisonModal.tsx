
import React from 'react';
import { Product } from '../types';

interface ComparisonModalProps {
  products: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ products, onClose, onRemove, onAddToCart }) => {
  if (products.length === 0) {
    onClose();
    return null;
  }

  const features = [
    { label: 'Brand', key: 'brand' },
    { label: 'Price', key: 'price', format: (val: number) => `$${val}` },
    { label: 'Category', key: 'category' },
    { label: 'Rating', key: 'rating', format: (val: number) => `${val} / 5.0` },
    { label: 'Sizes', key: 'sizes', format: (val: string[]) => val.join(', ') },
    { label: 'Colors', key: 'colors', format: (val: string[]) => val.join(', ') },
  ];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold serif">Compare Collection</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 min-w-[150px] sticky left-0 bg-white z-10 border-b border-gray-100"></th>
                {products.map(product => (
                  <th key={product.id} className="p-6 min-w-[250px] border-b border-gray-100 align-top">
                    <div className="relative group">
                      <button 
                        onClick={() => onRemove(product.id)}
                        className="absolute -top-2 -right-2 bg-gray-100 text-gray-500 p-1 rounded-full hover:bg-black hover:text-white transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <img src={product.image} alt={product.name} className="w-full aspect-[4/5] object-cover rounded-xl mb-4" />
                      <h3 className="text-sm font-bold">{product.name}</h3>
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="mt-4 w-full bg-black text-white py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={feature.label} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                  <td className="p-6 font-bold text-xs uppercase tracking-widest text-gray-400 sticky left-0 bg-inherit z-10">
                    {feature.label}
                  </td>
                  {products.map(product => (
                    <td key={`${product.id}-${feature.key}`} className="p-6 text-sm text-gray-700">
                      {feature.format 
                        ? feature.format((product as any)[feature.key]) 
                        : (product as any)[feature.key]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-6 font-bold text-xs uppercase tracking-widest text-gray-400 sticky left-0 bg-white z-10">
                  Description
                </td>
                {products.map(product => (
                  <td key={`${product.id}-desc`} className="p-6 text-xs text-gray-500 leading-relaxed max-w-[300px]">
                    {product.description}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
