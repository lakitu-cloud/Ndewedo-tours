"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://gilleadsafaris.com/backend/newsletter.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name || 'Subscriber', // Use 'Subscriber' as default if name is empty
          email 
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Thank you for subscribing!');
        setEmail('');
        setName('');
      } else {
        toast.error(data.message || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-[rgba(31,117,31,0.04)] to-[rgba(31,117,31,0.04)] py-[75px] px-[20px]">
      <div className="max-w-[1400px] mx-auto">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-[25.8px] border-b border-[rgba(155,155,155,0.65)] mb-[50px] gap-6">
          <div className="flex-1 text-center md:text-left w-full">
            <h3 className="font-['Poppins'] text-[#0f440f] text-[28px] sm:text-[36px] md:text-[40px] leading-[1.3] mb-0 font-bold">
              Get Updated with Latest
            </h3>
            <p className="font-['Poppins'] text-[#0f440f] text-[28px] sm:text-[36px] md:text-[40px] leading-[1.3]">
              News Letters
            </p>
          </div>
          <form 
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="bg-white border border-[#dadbdd] rounded-[50px] px-[20px] sm:px-[30px] py-[16px] font-['Segoe_UI'] text-[16px] text-[#868e96] w-full sm:w-[200px] outline-none focus:border-[#0f440f] h-[56px] disabled:opacity-70"
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="bg-white border border-[#dadbdd] rounded-[50px] px-[20px] sm:px-[30px] py-[16px] font-['Segoe_UI'] text-[16px] text-[#868e96] w-full sm:w-[350px] outline-none focus:border-[#0f440f] h-[56px] disabled:opacity-70"
              />
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0f440f] text-white px-[35px] py-[16px] rounded-[50px] font-['Arial'] text-[16px] font-bold whitespace-nowrap hover:bg-[#1f751f] transition-colors w-full sm:w-auto h-[56px] flex items-center justify-center min-w-[180px] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Subscribe Now'
              )}
            </button>
          </form>
        </div>

        {/* Footer Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-[50px]">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="h-[60px] sm:h-[82px] w-[180px] sm:w-[249px] mb-[25px]">
              <img 
                src="https://ndewedotours.com/wp-content/uploads/2025/02/Ndewedo-Logo3-249x82-2.webp"
                alt="Ndewedo Tours"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="font-['Poppins'] text-[16px] text-[#686868] leading-[25.6px]">
              Specialize in delivering exceptional travel experiences tailored to your needs.
            </p>
          </div>

          {/* Tanzania & UK Offices */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-['Poppins'] text-[24px] sm:text-[28px] md:text-[32px] text-neutral-700 mb-[9.6px] font-bold">Tanzania Offices</h4>
            <p className="font-['Poppins'] text-[16px] text-[#686868] leading-[25.6px]">
              P.O.BOX 11677 -Sakina Arusha
            </p>
            <p className="font-['Poppins'] text-[16px] text-[#686868] leading-[25.6px]">
              info@ndewedotours.com
            </p>
            <p className="font-['Poppins'] text-[16px] text-[#686868] leading-[25.6px]">
              +255 753 243 280
            </p>

            <h4 className="font-['Poppins'] text-[24px] sm:text-[28px] md:text-[32px] text-neutral-700 mb-[9.6px] mt-[20px] font-bold">UK Offices</h4>
            <p className="font-['Poppins'] text-[16px] text-[#686868] leading-[25.6px]">
              KY1 1PA, Kirkcaldy, Scotland, UK
            </p>
            <p className="font-['Poppins'] text-[16px] text-[#686868] leading-[25.6px]">
              natalie@ndewedotours.com
            </p>
            <p className="font-['Poppins'] text-[16px] text-[#686868] leading-[25.6px]">
              +44 743 203 8845
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-['Poppins'] text-[24px] sm:text-[28px] md:text-[32px] text-neutral-700 mb-[9.6px] font-bold">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Gallery</Link></li>
              <li><Link href="/faqs" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Contact us</Link></li>
              <li><Link href="/reviews" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Client Reviews</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Poppins'] text-[24px] sm:text-[28px] md:text-[32px] text-neutral-700 mb-[9.6px] font-bold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Home</Link></li>
              <li><Link href="/cultural-tours" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Cultural Tours</Link></li>
              <li><Link href="/trekking" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Trekkings</Link></li>
              <li><Link href="/safaris" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Safaris</Link></li>
              <li><Link href="/blog" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Privacy & Policies */}
          <div>
            <h4 className="font-['Poppins'] text-[24px] sm:text-[28px] md:text-[32px] text-neutral-700 mb-[9.6px] font-bold">Privacy Policy</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Privacy Policy</Link></li>
            </ul>
            <h4 className="font-['Poppins'] text-[24px] sm:text-[28px] md:text-[32px] text-neutral-700 mb-[9.6px] mt-[20px] font-bold">Conditions</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="font-['Poppins'] text-[16px] text-[#686868] hover:text-[#1f751f] transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-[21px] border-b border-[rgba(155,155,155,0.65)] mb-[30px] gap-6">
          <div className="flex gap-[15px]">
            <a href="#" className="bg-[#0f440f] rounded-full w-[45px] h-[45px] flex items-center justify-center hover:bg-[#1f751f] transition-colors">
              <Facebook className="text-white" size={22} />
            </a>
            <a href="#" className="bg-[#0f440f] rounded-full w-[45px] h-[45px] flex items-center justify-center hover:bg-[#1f751f] transition-colors">
              <Instagram className="text-white" size={22} />
            </a>
            <a href="#" className="bg-[#0f440f] rounded-full w-[45px] h-[45px] flex items-center justify-center hover:bg-[#1f751f] transition-colors">
              <Twitter className="text-white" size={22} />
            </a>
            <a href="#" className="bg-[#0f440f] rounded-full w-[45px] h-[45px] flex items-center justify-center hover:bg-[#1f751f] transition-colors">
              <Youtube className="text-white" size={22} />
            </a>
          </div>
          <Link 
            href="/inquire"
            className="bg-transparent border border-[#102310] text-[#0f440f] px-[30px] py-[12px] rounded-[50px] font-['Poppins'] text-[18px] hover:bg-[#0f440f] hover:text-white transition-colors"
          >
            Inquire Today
          </Link>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <p className="font-['Poppins'] text-[15px] text-[#0f440f]">
              Copyright © 2025 All Rights Reserved
            </p>
          </div>
          <p className="font-['Poppins'] text-[12px] text-[#0f440f]">
            Web by <span className="text-[#1f751f] font-bold">Debbido</span>
          </p>
          <div className="flex gap-2">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 30'%3E%3Crect fill='%23eee' width='40' height='30' rx='3'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-size='8' fill='%23666'%3EVisa%3C/text%3E%3C/svg%3E" alt="Visa" className="h-[25px]" />
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 30'%3E%3Crect fill='%23eee' width='40' height='30' rx='3'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-size='8' fill='%23666'%3EMC%3C/text%3E%3C/svg%3E" alt="Mastercard" className="h-[25px]" />
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 30'%3E%3Crect fill='%23eee' width='40' height='30' rx='3'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-size='8' fill='%23666'%3EAmex%3C/text%3E%3C/svg%3E" alt="Amex" className="h-[25px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
