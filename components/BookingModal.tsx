"use client";

import { useState, useMemo } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  safariPackage: {
    name: string;
    amount: string;
  } | null;
}

export default function BookingModal({ isOpen, onClose, safariPackage }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    language: '',
    country: '',
    paymentMode: '',
    travelDate: '',
    partners: 1,
    children: 0
  });

  // Calculate total price based on number of people
  const totalPrice = useMemo(() => {
    if (!safariPackage) return '$0';
    
    // Extract numeric value from amount string (e.g., "$2,450" -> 2450)
    const basePrice = parseInt(safariPackage.amount.replace(/[^0-9]/g, '')) || 0;
    const totalPeople = (formData.partners || 0) + (formData.children || 0);
    
    const calculatedTotal = basePrice * (totalPeople || 1);
    
    // Format back to currency string
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(calculatedTotal);
  }, [safariPackage, formData.partners, formData.children]);

  if (!isOpen || !safariPackage) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.language || !formData.country || !formData.paymentMode) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://gilleadsafaris.com/backend/booking.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          packageName: safariPackage.name,
          packageAmount: totalPrice // Send the updated total amount
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || `Booking for ${safariPackage.name} successful!`);
        onClose();
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          language: '',
          country: '',
          paymentMode: '',
          travelDate: '',
          partners: 1,
          children: 0
        });
      } else {
        toast.error(data.message || 'Failed to submit booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Connection error. Please check your internet and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-white rounded-[20px] max-w-[600px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-[20px] z-10">
          <div>
            <h2 className="text-[24px] text-[#333333]">Book Your Safari</h2>
            <p className="text-[14px] text-[#686868] mt-1">{safariPackage.name}</p>
          </div>
          <button onClick={onClose} className="text-[#686868] hover:text-[#333333] transition-colors" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Pricing Banner */}
        <div className="bg-[#1f751f]/5 px-6 py-4 border-b border-[#1f751f]/10 flex justify-between items-center">
            <div className="text-[14px] text-[#686868]">Total Price (Estimated)</div>
            <div className="text-[24px] font-bold text-[#1f751f]">{totalPrice}</div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[15px] text-[#333333] mb-2">Full Name *</label>
              <input 
                type="text" 
                required 
                disabled={isSubmitting}
                value={formData.fullName} 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50" 
              />
            </div>
            <div>
              <label className="block text-[15px] text-[#333333] mb-2">Email *</label>
              <input 
                type="email" 
                required 
                disabled={isSubmitting}
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[15px] text-[#333333] mb-2">Language *</label>
              <input 
                type="text" 
                required 
                disabled={isSubmitting}
                value={formData.language} 
                onChange={(e) => setFormData({...formData, language: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50" 
              />
            </div>
            <div>
              <label className="block text-[15px] text-[#333333] mb-2">Country *</label>
              <input 
                type="text" 
                required 
                disabled={isSubmitting}
                value={formData.country} 
                onChange={(e) => setFormData({...formData, country: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50" 
              />
            </div>
          </div>

          <div>
            <label className="block text-[15px] text-[#333333] mb-2">Mode of Payment *</label>
            <select 
              required 
              disabled={isSubmitting}
              value={formData.paymentMode} 
              onChange={(e) => setFormData({...formData, paymentMode: e.target.value})} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50 bg-white"
            >
              <option value="">Select Payment Mode</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-[15px] text-[#333333] mb-2">Travel Date</label>
            <input 
              type="date" 
              disabled={isSubmitting}
              value={formData.travelDate} 
              onChange={(e) => setFormData({...formData, travelDate: e.target.value})} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[15px] text-[#333333] mb-2">Number of Adults</label>
              <input 
                type="number" 
                min="1" 
                disabled={isSubmitting}
                value={formData.partners} 
                onChange={(e) => setFormData({...formData, partners: parseInt(e.target.value) || 1})} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50" 
              />
            </div>
            <div>
              <label className="block text-[15px] text-[#333333] mb-2">Children</label>
              <input 
                type="number" 
                min="0" 
                disabled={isSubmitting}
                value={formData.children} 
                onChange={(e) => setFormData({...formData, children: parseInt(e.target.value) || 0})} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50" 
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-6 pt-6 border-t border-gray-200">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 rounded-[50px] bg-[#1f751f] text-white hover:bg-[#0f440f] transition-all disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px] justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Booking...
                </>
              ) : (
                <>
                  <Check size={20} />
                  Confirm Booking ({totalPrice})
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}