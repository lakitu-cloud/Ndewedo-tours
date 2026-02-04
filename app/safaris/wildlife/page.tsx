"use client";

import { useState } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { 
  Clock, Users, MapPin, Calendar, Check, Star, 
  ChevronRight, Mail, Phone, Camera, Tent, Utensils
} from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import BookingModal from '@/components/BookingModal';

const safariPackages = [
  {
    id: 'serengeti-5-day',
    title: '5-Day Serengeti & Ngorongoro Safari',
    duration: '5 Days / 4 Nights',
    price: '$2,450',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1681139504760-4c17f2c8b380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaSUyMHdpbGRsaWZlfGVufDF8fHx8MTc2MjU5MzI2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Experience the best of Tanzania wildlife in this 5-day adventure through Serengeti and Ngorongoro Crater.',
    highlights: [
      'Witness the Great Migration (seasonal)',
      'Big Five game viewing',
      'Ngorongoro Crater descent',
      'Olduvai Gorge visit',
      'Professional safari guide'
    ]
  },
  {
    id: 'northern-circuit-7-day',
    title: '7-Day Northern Circuit Safari',
    duration: '7 Days / 6 Nights',
    price: '$3,280',
    rating: 5.0,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1689479665582-51d0c25215b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBsaW9uc3xlbnwxfHx8fDE3NjI1OTk1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Comprehensive tour of Tanzania\'s northern parks including Serengeti, Ngorongoro, Tarangire, and Lake Manyara.',
    highlights: [
      'Visit 4 national parks',
      'Tree-climbing lions at Manyara',
      'Elephant herds at Tarangire',
      'Serengeti game drives',
      'Cultural Maasai village visit'
    ]
  },
  {
    id: 'budget-safari-4-day',
    title: '4-Day Budget Safari Adventure',
    duration: '4 Days / 3 Nights',
    price: '$1,650',
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1586584535372-2ec07cdb83ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZWxlcGhhbnRzfGVufDF8fHx8MTc2MjU5OTUyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Affordable safari covering Tarangire, Ngorongoro, and Lake Manyara for budget-conscious travelers.',
    highlights: [
      'Value for money',
      'Camping experience',
      '3 national parks',
      'Expert guide included',
      'All meals provided'
    ]
  },
];

export default function WildlifeSafariPage() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{name: string, amount: string} | null>(null);

  const handleBookingOpen = (safariPackage: {name: string, amount: string}) => {
    setSelectedPackage(safariPackage);
    setBookingOpen(true);
  };

  return (
    <>
      <div className="w-full">
        {/* Hero Section */}
        <HeroSection
          title="Wildlife Safari Packages"
          description="Embark on unforgettable wildlife adventures across Tanzania's iconic national parks"
          image="https://images.unsplash.com/photo-1695367255234-2cb7fbc6425b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwdGFuemFuaWF8ZW58MXx8fHwxNzYyNTk5NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          ctaText="Plan Your Safari"
          ctaLink="/inquire"
        />

        {/* Safari Packages */}
        <section className="py-12 md:py-20 px-4 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-[32px] sm:text-[40px] text-[#333333] mb-4">
                Our <span className="text-[#1f751f]">Safari Packages</span>
              </h2>
              <div className="h-[5px] w-[100px] bg-[#686868] rounded-[30px] mx-auto mb-6" />
              <p className="text-[16px] sm:text-[18px] text-[#686868] max-w-[800px] mx-auto">
                Carefully crafted safari experiences designed to showcase the best of Tanzania's wildlife
              </p>
            </div>

            <div className="space-y-8 md:space-y-12">
              {safariPackages.map((pkg, index) => (
                <div 
                  key={pkg.id}
                  className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-[300px] md:h-auto">
                      <ImageWithFallback 
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-md">
                        <span className="text-[#1f751f]">{pkg.duration}</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                        <Star className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                        <span>{pkg.rating}</span>
                        <span className="text-gray-500 text-[14px]">({pkg.reviews})</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[24px] sm:text-[28px] text-[#333333] mb-3">
                          {pkg.title}
                        </h3>
                        <p className="text-[16px] text-[#686868] mb-6 leading-[26px]">
                          {pkg.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-6">
                          <h4 className="text-[18px] text-[#333333] mb-3">Tour Highlights:</h4>
                          <ul className="space-y-2">
                            {pkg.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-[#1f751f] mt-0.5 flex-shrink-0" />
                                <span className="text-[15px] text-[#686868]">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="border-t border-gray-200 pt-6 mt-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <div className="text-[14px] text-[#686868] mb-1">Starting from</div>
                            <div className="text-[32px] text-[#1f751f]">{pkg.price}</div>
                            <div className="text-[13px] text-[#686868]">per person</div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <Link
                              href={`/safaris/packages/${pkg.id}`}
                              className="bg-[#1f751f] text-white px-6 py-3 rounded-[50px] hover:bg-[#0f440f] transition-colors inline-flex items-center justify-center gap-2"
                            >
                              View Details <ChevronRight size={18} />
                            </Link>
                            <button
                              onClick={() => handleBookingOpen({name: pkg.title, amount: pkg.price})}
                              className="border border-[#1f751f] text-[#1f751f] px-6 py-3 rounded-[50px] hover:bg-[#1f751f] hover:text-white transition-colors inline-flex items-center justify-center gap-2"
                            >
                              Inquire
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-[rgba(31,117,31,0.04)] to-[rgba(31,117,31,0.04)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[32px] sm:text-[40px] text-[#333333] mb-4">
                What's <span className="text-[#1f751f]">Included</span>
              </h2>
              <div className="h-[5px] w-[100px] bg-[#686868] rounded-[30px] mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white rounded-[15px] p-6 text-center shadow-md">
                <div className="bg-[#1f751f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="text-[#1f751f]" size={32} />
                </div>
                <h3 className="text-[20px] text-[#333333] mb-2">Game Drives</h3>
                <p className="text-[15px] text-[#686868]">Daily game drives in 4x4 safari vehicles with pop-up roofs</p>
              </div>

              <div className="bg-white rounded-[15px] p-6 text-center shadow-md">
                <div className="bg-[#1f751f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tent className="text-[#1f751f]" size={32} />
                </div>
                <h3 className="text-[20px] text-[#333333] mb-2">Accommodation</h3>
                <p className="text-[15px] text-[#686868]">Comfortable lodges or tented camps in prime locations</p>
              </div>

              <div className="bg-white rounded-[15px] p-6 text-center shadow-md">
                <div className="bg-[#1f751f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="text-[#1f751f]" size={32} />
                </div>
                <h3 className="text-[20px] text-[#333333] mb-2">All Meals</h3>
                <p className="text-[15px] text-[#686868]">Full board meals throughout the safari</p>
              </div>

              <div className="bg-white rounded-[15px] p-6 text-center shadow-md">
                <div className="bg-[#1f751f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-[#1f751f]" size={32} />
                </div>
                <h3 className="text-[20px] text-[#333333] mb-2">Expert Guides</h3>
                <p className="text-[15px] text-[#686868]">Professional safari guides with extensive wildlife knowledge</p>
              </div>

              <div className="bg-white rounded-[15px] p-6 text-center shadow-md">
                <div className="bg-[#1f751f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-[#1f751f]" size={32} />
                </div>
                <h3 className="text-[20px] text-[#333333] mb-2">Park Fees</h3>
                <p className="text-[15px] text-[#686868]">All national park entrance and conservation fees</p>
              </div>

              <div className="bg-white rounded-[15px] p-6 text-center shadow-md">
                <div className="bg-[#1f751f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-[#1f751f]" size={32} />
                </div>
                <h3 className="text-[20px] text-[#333333] mb-2">Airport Transfers</h3>
                <p className="text-[15px] text-[#686868]">Pick-up and drop-off at Arusha or Kilimanjaro airport</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setBookingOpen(false)} 
        safariPackage={selectedPackage} 
      />
    </>
  );
}