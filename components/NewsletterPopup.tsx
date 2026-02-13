"use client";

import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { toast } from "sonner";
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already subscribed or dismissed
    const hasSeenPopup = localStorage.getItem('newsletter_popup_seen');
    
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletter_popup_seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://gilleadsafaris.com/backend/newsletter.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('newsletter_popup_seen', 'true');
        localStorage.setItem('newsletter_subscribed', 'true');
        
        toast.success(data.message || 'Thank you for subscribing!');
        setIsOpen(false);
        setName('');
        setEmail('');
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      toast.error('Failed to connect to the server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-500 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-[25px] shadow-2xl max-w-[800px] w-full overflow-hidden pointer-events-auto animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col md:flex-row relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md rounded-full p-1.5 hover:bg-white transition-all shadow-sm group"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-600 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Left Side: Image */}
          <div className="md:w-[45%] relative min-h-[200px] md:min-h-[450px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1689479665582-51d0c25215b7?w=800"
              alt="Safari"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Right Side: Content */}
          <div className="md:w-[55%] p-8 md:p-10 flex flex-col justify-center bg-white">
            <div className="mb-6">
              <div className="bg-[#1f751f]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Mail className="text-[#1f751f] w-6 h-6" />
              </div>
              <h2 className="text-[28px] md:text-[32px] font-bold text-[#0f440f] leading-tight mb-2">
                Stay Updated
              </h2>
              <p className="text-[15px] text-[#686868] leading-relaxed">
                Join our newsletter to receive the latest stories and updates from the heart of Tanzania.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-[12px] focus:outline-none focus:border-[#1f751f] focus:bg-white transition-all text-[#333333] text-[15px]"
                required
                disabled={isSubmitting}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-[12px] focus:outline-none focus:border-[#1f751f] focus:bg-white transition-all text-[#333333] text-[15px]"
                required
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1f751f] text-white py-3.5 rounded-[12px] font-semibold text-[16px] hover:bg-[#0f440f] transition-all duration-300 shadow-lg shadow-[#1f751f]/10 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>

            <p className="mt-4 text-[12px] text-gray-400 text-center">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
