
import React from 'react';
import { Order } from '../types';

interface OrderHistoryDrawerProps {
  orders: Order[];
  onClose: () => void;
}

const OrderHistoryDrawer: React.FC<OrderHistoryDrawerProps> = ({ orders, onClose }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[85] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h2 className="text-xl font-bold serif">Order History</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {orders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No orders found yet.</p>
            <button onClick={onClose} className="text-sm font-bold underline hover:text-gray-600 uppercase tracking-widest">
              Explore Catalog
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border border-gray-100 rounded-2xl p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 serif">Order {order.id}</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="flex -space-x-2 overflow-hidden">
                {order.items.map((item, idx) => (
                  <img 
                    key={idx} 
                    src={item.image} 
                    alt={item.name} 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover bg-gray-100"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Total Amount</p>
                  <p className="text-sm font-bold">${order.total.toFixed(2)}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Tracking No.</p>
                  <p className="text-[10px] font-medium text-black underline underline-offset-4 cursor-pointer hover:text-gray-600 transition-colors">
                    {order.trackingNumber}
                  </p>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl border border-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                Reorder Items
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center leading-relaxed">
          Need help with an order? <br />
          <span className="text-black font-bold cursor-pointer hover:underline">Contact Concierge</span>
        </p>
      </div>
    </div>
  );
};

export default OrderHistoryDrawer;
