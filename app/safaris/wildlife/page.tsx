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
    id: 'northern-circuit-9-day',
    title: '9-DAY EXCLUSIVE NORTHERN TANZANIA SAFARI',
    duration: '9 Days / 8 Nights',
    price: '$9,840',
    rating: 4.9,
    reviews: 127,
    href: "/safaris/packages/northern-circuit-9-day",  // Updated href to match title better
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/fb/a5/c8/luxury-ensuite-room-view.jpg?w=900&h=500&s=1',  // Luxury Serengeti tent interior with savannah view (from real camp listings)
    description: 'From the Garden of Eden (Ngorongoro Crater) to the endless plains of the Serengeti and Tarangire’s elephant herds — an exclusive journey with luxury tented camps and expert guiding.',
    highlights: [
      'Track the Great Migration in mobile luxury camps',
      'Panoramic Ngorongoro Crater rim views',
      'Year-round Big Five & predator sightings in Serengeti',
      'Massive elephant herds & baobabs in Tarangire',
      'Choice of luxury or mid-range accommodations'
    ]
  },
  {
    id: 'tanzania-zanzibar-10-day',
    title: '10-DAY TANZANIA SAFARI & ZANZIBAR BEACH EXPERIENCE',
    duration: '10 Days / 9 Nights',
    price: '$6,356',
    rating: 5.0,
    reviews: 89, // You can update this based on real data later
    href: "/safaris/packages/zanzibar-10-day",
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', // Stunning Zanzibar beach with palm trees and turquoise ocean – perfect hero for safari + beach combo
    description: 'Thrilling wildlife safari through Lake Manyara, Serengeti, and Ngorongoro Crater, followed by pure relaxation on the pristine beaches of Zanzibar.',
    highlights: [
      'Tree-climbing lions and diverse wildlife in Lake Manyara',
      'Full-day game drives in the iconic Serengeti plains',
      'Descent into Ngorongoro Crater – Big Five including black rhino',
      'Seamless transition to luxury beach time in Zanzibar',
      'Optional excursions: Stone Town, spice tours, snorkeling'
    ]
  },
  {
    id: 'luxury-cross-border-13-day',
    title: '13-DAY LUXURY CROSS-BORDER SAFARI & BEACH ESCAPE',
    duration: '4 Days / 3 Nights',
    price: '$1,650',
    href: "/safaris/packages/luxury-13-day",
    rating: 4.7,
    reviews: 203,
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/f2/99/b7/into-wild-africa-luxury.jpg?w=900&h=500&s=1',
    description: 'Affordable safari covering Tarangire, Ngorongoro, and Lake Manyara for budget-conscious travelers.',
    highlights: [
      'Cross-border Big Five viewing in Masai Mara & Serengeti',
      'Witness the Great Migration (seasonal) from mobile luxury camps',
      'Tree-climbing lions & diverse ecosystems in Lake Manyara',
      'Cultural Maasai village visits & private game drives',
      '3 nights of oceanfront luxury & spa at Sea Cliff Resort Zanzibar'
    ]
  },
  {
  id: 'cultural-safari-japanese-7-day',
  title: '7-DAY SPECIAL CULTURAL & SAFARI ITINERARY FOR JAPANESE GUESTS',
  duration: '7 Days / 6 Nights',
  price: '$3,950',
  rating: 5.0,
  reviews: 68,  // Placeholder; adjust based on similar cultural packages
  href: "/safaris/packages/cultural-7-day",
  image: 'https://www.redetoursandsafaris.com/blog/images/blog-maasai-jumping-dance-3.webp',  // Maasai warriors traditional jumping dance in savannah (authentic cultural highlight)
  description: 'A gentle, respectful journey for Japanese travelers blending Northern Tanzania’s iconic wildlife (Tarangire elephants & baobabs, Serengeti endless plains, Ngorongoro Crater views) with authentic Maasai cultural encounters, emphasizing harmony between nature and people, calm pacing, reflection, and meaningful connections.',
  highlights: [
    'Large elephant herds and iconic baobabs in Tarangire National Park',
    'Full-day immersion in the endless plains of Serengeti',
    'Panoramic views of Ngorongoro Crater rim',
    'Respectful Maasai village visit with traditional songs, dances, and homes',
    'Gentle pacing focused on nature harmony and cultural reflection'
  ]
},
];

export default function WildlifeSafariPage() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string, amount: string } | null>(null);

  const handleBookingOpen = (safariPackage: { name: string, amount: string }) => {
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
                              href={pkg.href}
                              className="bg-[#1f751f] text-white px-6 py-3 rounded-[50px] hover:bg-[#0f440f] transition-colors inline-flex items-center justify-center gap-2"
                            >
                              View Details <ChevronRight size={18} />
                            </Link>
                            <button
                              onClick={() => handleBookingOpen({ name: pkg.title, amount: pkg.price })}
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