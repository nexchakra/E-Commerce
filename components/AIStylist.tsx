
import React, { useState, useRef, useEffect } from 'react';
import { getStylistAdvice, visualSearch, getComplementarySuggestions } from '../services/geminiService';
import { Product, StylistMessage } from '../types';

interface AIStylistProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onClose: () => void;
  initialSearchImage?: string;
  currentlyViewedProduct?: Product | null;
}

const AIStylist: React.FC<AIStylistProps> = ({ 
  products, 
  onProductSelect, 
  onClose, 
  initialSearchImage,
  currentlyViewedProduct 
}) => {
  const [messages, setMessages] = useState<StylistMessage[]>([]);
  const [complementaryItems, setComplementaryItems] = useState<Product[]>([]);
  const [compReasoning, setCompReasoning] = useState<string>('');
  const [isCompLoading, setIsCompLoading] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const processedInitialImage = useRef(false);
  const processedComplementary = useRef(false);

  useEffect(() => {
    // Initial welcome message
    if (messages.length === 0) {
      setMessages([{ 
        role: 'model', 
        text: currentlyViewedProduct 
          ? `I see you're looking at the ${currentlyViewedProduct.name}. It's an exquisite choice! How can I help you style it today?` 
          : 'Hello! I am your Lumina Luxe personal AI stylist. Looking for a specific look, or need advice on what to wear to a special event?' 
      }]);
    }
  }, [currentlyViewedProduct]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, complementaryItems]);

  // Handle initial image search if triggered from outside
  useEffect(() => {
    if (initialSearchImage && !processedInitialImage.current) {
      processedInitialImage.current = true;
      runVisualSearch(initialSearchImage);
    }
  }, [initialSearchImage]);

  // Handle complementary items search
  useEffect(() => {
    if (currentlyViewedProduct && !processedComplementary.current) {
      processedComplementary.current = true;
      loadComplementary();
    }
  }, [currentlyViewedProduct]);

  const loadComplementary = async () => {
    if (!currentlyViewedProduct) return;
    setIsCompLoading(true);
    try {
      const rec = await getComplementarySuggestions(currentlyViewedProduct, products);
      const items = products.filter(p => rec.recommendedProductIds.includes(p.id));
      setComplementaryItems(items);
      setCompReasoning(rec.reasoning);
    } catch (err) {
      console.error("Complementary search failed", err);
    } finally {
      setIsCompLoading(false);
    }
  };

  const runVisualSearch = async (base64: string) => {
    setMessages(prev => [...prev, { role: 'user', text: '[Visual Search Image Uploaded]' }]);
    setIsLoading(true);

    try {
      const recommendation = await visualSearch(base64, products);
      const recommendedProducts = products.filter(p => recommendation.recommendedProductIds.includes(p.id));
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: recommendation.reasoning,
        products: recommendedProducts.length > 0 ? recommendedProducts : undefined
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'My visual scanners are slightly foggy. Could you try a different photo?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: StylistMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const recommendation = await getStylistAdvice(input, products, history);
      
      const recommendedProducts = products.filter(p => recommendation.recommendedProductIds.includes(p.id));
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: recommendation.reasoning,
        products: recommendedProducts.length > 0 ? recommendedProducts : undefined
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'I apologize, but I am unable to access the catalog right now. Please try again in a moment.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      runVisualSearch(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-[85] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-black text-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs">AI</div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Personal AI Stylist</h2>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">Powered by Gemini</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50/50">
        
        {/* Complementary Suggestions Section */}
        {currentlyViewedProduct && (isCompLoading || complementaryItems.length > 0) && (
          <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-800 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
                <span>Complete the Look</span>
              </h3>
              <span className="text-[10px] text-gray-400 italic">Stylist's pairings</span>
            </div>
            
            {isCompLoading ? (
              <div className="flex space-x-4 animate-pulse">
                {[1, 2].map(i => (
                  <div key={i} className="flex-1 h-32 bg-gray-100 rounded-xl" />
                ))}
              </div>
            ) : (
              <>
                <p className="text-[11px] text-gray-600 leading-relaxed italic border-l-2 border-amber-200 pl-3">
                  "{compReasoning}"
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {complementaryItems.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => onProductSelect(item)}
                      className="group relative cursor-pointer rounded-xl overflow-hidden border border-gray-50 hover:border-amber-200 transition-all"
                    >
                      <img src={item.image} alt={item.name} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-[8px] font-bold text-white uppercase tracking-tighter">View Details</span>
                      </div>
                      <div className="p-2 bg-white">
                        <p className="text-[9px] font-bold truncate">{item.name}</p>
                        <p className="text-[9px] text-gray-400">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] space-y-3 ${msg.role === 'user' ? 'order-1' : ''}`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-black text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 shadow-sm rounded-tl-none text-gray-800'
              }`}>
                {msg.text}
              </div>
              
              {msg.products && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {msg.products.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => onProductSelect(p)}
                      className="bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
                    >
                      <img src={p.image} alt={p.name} className="w-full aspect-square object-cover" />
                      <div className="p-2">
                        <p className="text-[10px] font-bold truncate">{p.name}</p>
                        <p className="text-[10px] text-gray-500">${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex space-x-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
            title="Visual Search"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            className="hidden" 
            accept="image/*"
          />
          <div className="flex-1 relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for fashion advice..."
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black pr-12"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1.5 p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStylist;
