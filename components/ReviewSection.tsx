
import React, { useState } from 'react';
import { Review } from '../types';

interface ReviewSectionProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, onAddReview }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;
    onAddReview({ user: name, rating, comment });
    setName('');
    setRating(5);
    setComment('');
    setShowForm(false);
  };

  return (
    <div className="space-y-8 pt-8 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold serif">Customer Reviews</h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Rating</label>
              <select 
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black"
              >
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Comment</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={3}
              className="w-full bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <button type="submit" className="bg-black text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
            Post Review
          </button>
        </form>
      )}

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No reviews yet. Be the first to share your experience.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="space-y-2 pb-6 border-b border-gray-50 last:border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold">{review.user}</span>
                  <span className="text-xs text-gray-400">• {new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
