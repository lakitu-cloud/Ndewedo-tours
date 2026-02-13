"use client";

import { useState } from 'react'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import {
  Clock, Users, MapPin, Calendar, Check, Star, X,
  ChevronRight, Mail, Phone, Download, Share2,
  Sun, Moon, Utensils, Bed, Camera
} from 'lucide-react'
import PackageSubNav from '@/components/PackageSubNav'
import ItineraryAccordion from '@/components/ItineraryAccordion'
import BookingModal from '@/components/BookingModal';

// const packageGallery = [
//   'https://images.unsplash.com/photo-1681139504760-4c17f2c8b380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaSUyMHdpbGRsaWZlfGVufDF8fHx8MTc2MjU5MzI2OHww&ixlib=rb-4.1.0&q=80&w=1080',
//   'https://images.unsplash.com/photo-1689479665582-51d0c25215b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaSUyMHdpbGRsaWZlfGVufDF8fHx8MTc2MjU5OTU5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
//   'https://images.unsplash.com/photo-1516494982030-fda424f96b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZ29yb25nb3JvJTIwY3JhdGVyfGVufDF8fHx8MTc2MjU5OTUyMnww&ixlib=rb-4.1.0&q=80&w=1080',
//   'https://images.unsplash.com/photo-1560440293-855922f9cc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNlcmVuZ2V0aSUyMHN1bnNldHxlbnwxfHx8fDE3NjI1OTk3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
//   'https://images.unsplash.com/photo-1632315152441-465a943cc211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaSUyMHRlbnQlMjBjYW1wfGVufDF8fHx8MTc2MjU5OTcwNXww&ixlib=rb-4.1.0&q=80&w=1080',
//   'https://images.unsplash.com/photo-1662377067390-278529608716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaSUyMGdyb3VwJTIwcGVvcGxlfGVufDF8fHx8MTc2MjU5OTcwOHww&ixlib=rb-4.1.0&q=80&w=1080',
// ];

const packageGallery = [
  // Hero / Arusha arrival
  'https://images.unsplash.com/photo-1560440293-855922f9cc7d?w=1200', // coffee plantation style or Arusha landscape
  // Ngorongoro crater rim
  'https://images.unsplash.com/photo-1516494982030-fda424f96b59?w=1200',
  // Serengeti plains & migration
  'https://images.unsplash.com/photo-1681139504760-4c17f2c8b380?w=1200',
  // Central Serengeti wildlife
  'https://images.unsplash.com/photo-1689479665582-51d0c25215b7?w=1200',
  // Tarangire elephants & baobabs
  'https://images.unsplash.com/photo-1506361789125-5e0e2f2e8e6e?w=1200',
  // Luxury tented camp
  'https://images.unsplash.com/photo-1632315152441-465a943cc211?w=1200',
];

const itinerary = [
  {
    day: 1,
    title: 'Arrival in Arusha – Warm Tanzanian Welcome',
    location: 'Arusha',
    activities: [
      'Arrival at Kilimanjaro International Airport (JRO)',
      'Warm welcome and transfer to Arusha',
      'Relax after your journey',
      'Optional guided coffee plantation walk (luxury option)'
    ],
    meals: 'Dinner',
    accommodation: 'Luxury: Arusha Coffee Lodge | Mid-Range: Under the shade safari lodge Arusha',
    images: [
      'https://www.elewanacollection.com/wp-content/uploads/2023/04/arusha-coffee-lodge-gallery-1.jpg', // use real lodge photo if possible
      'https://images.unsplash.com/photo-1529350106294-32d4d5f8fdb5?w=800',
    ],
    lodgeInfo: {
      name: 'Arusha Accommodation Options',
      features: [
        'Luxury: Elegant suites in a working coffee plantation',
        'Mid-Range: Comfortable lodge close to safari start point',
        'Tranquil setting to recover from travel'
      ]
    }
  },
  {
    day: 2,
    title: 'Arusha to Ngorongoro Conservation Area – The Garden of Eden',
    location: 'Ngorongoro Crater Rim',
    activities: [
      'Scenic drive through highlands and villages',
      'Arrive at Ngorongoro Conservation Area',
      'Afternoon at leisure with crater views',
      'Relax at lodge or camp'
    ],
    meals: 'Breakfast, Lunch, Dinner',
    accommodation: 'Luxury: Meliá Collection Ngorongoro Lodge | Mid-Range: Ngorongoro Ang’ata Camp',
    images: [
      'https://www.melia.com/static/img/hoteles/NGORONGORO_LODGE_MELIA_COLLECTION/NGORONGORO_LODGE_MELIA_COLLECTION_GALERIA_1.jpg',
      'https://images.unsplash.com/photo-1516494982030-fda424f96b59?w=800',
    ],
    lodgeInfo: {
      name: 'Ngorongoro Rim Stay',
      features: [
        'Luxury: Dramatic crater-edge views & spa',
        'Mid-Range: Comfortable tented camp near descent roads',
        'Perfect base for crater exploration'
      ]
    }
  },
  {
    day: 3,
    title: 'Ngorongoro to Central Serengeti – Into the Wilderness',
    location: 'Central Serengeti (Seronera)',
    activities: [
      'Morning departure from Ngorongoro',
      'Scenic drive to Serengeti',
      'Afternoon game drive in Seronera region',
      'Excellent predator & plains game sightings'
    ],
    meals: 'Breakfast, Lunch, Dinner',
    accommodation: 'Luxury: Siringit Serengeti Camp | Mid-Range: Ang’ata Camp Central Serengeti',
    images: [
      'https://www.siringit.co.tz/wp-content/uploads/2023/05/siringit-serengeti-camp-gallery-1.jpg', // use real if available
      'https://images.unsplash.com/photo-1681139504760-4c17f2c8b380?w=800',
    ],
  },
  // ... continue for Day 4 to Day 9 following the same pattern
  {
    day: 9,
    title: 'Departure from Tanzania',
    location: 'Kilimanjaro International Airport',
    activities: [
      'Breakfast at lodge/camp',
      'Transfer to JRO Airport',
      'Farewell & departure'
    ],
    meals: 'Breakfast',
    accommodation: 'End of safari',
    images: [],
    lodgeInfo: {
      name: 'Journey Complete',
      features: ['Unforgettable memories of Northern Tanzania']
    }
  }
];

export default function SerengeriPackagePage() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const packageName = "9-Day Exclusive Northern Tanzania Safari";
  const packagePrice = "From $5,200";  // mid-range base — you can make this dynamic later
  const duration = "9 Days / 8 Nights";

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <section className="relative h-[400px] md:h-[550px]">
        <ImageWithFallback
          src={packageGallery[0]}
          alt="Serengeti Safari"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 px-4">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-2 text-white text-[14px]">
              <Link href="/" className="hover:text-[#c97500]">Home</Link>
              <ChevronRight size={16} />
              <Link href="/safaris" className="hover:text-[#c97500]">Safaris</Link>
              <ChevronRight size={16} />
              <span className="text-white/70">{packageName}</span>
            </div>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="text-white">
                <h1 className="text-[32px] sm:text-[42px] md:text-[52px] mb-3">
                  {packageName}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-[15px] sm:text-[16px]">
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>5 Days / 4 Nights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="fill-[#fbbf24] text-[#fbbf24]" size={18} />
                    <span>4.9 (127 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="text-white">
                <div className="text-[14px] mb-1">From</div>
                <div className="text-[42px] sm:text-[52px]">{packagePrice}</div>
                <div className="text-[14px]">per person</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <PackageSubNav />

      {/* Main Content */}
      <section className="py-8 md:py-12 px-4 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div id="overview" className="bg-white rounded-[20px] p-6 md:p-8 shadow-md">
                <h2 className="text-[28px] sm:text-[32px] text-[#333333] mb-6">Safari Overview</h2>
                <p className="text-[16px] text-[#686868] leading-[28px] mb-4">
                  Embark on an unforgettable safari journey through Northern Tanzania, a land of extraordinary contrasts where ancient volcanic craters cradle dense wildlife populations, endless savannahs stretch to the horizon, and iconic ecosystems host one of the greatest wildlife spectacles on Earth.
                </p>
                <p className="text-[16px] text-[#686868] leading-[28px]">
                  This meticulously crafted itinerary blends Tanzania’s most celebrated destinations—Arusha, Ngorongoro Conservation Area, Serengeti National Park, and Tarangire National Park—into one seamless and immersive safari experience. Guests may choose between Luxury and Mid-Range accommodation options within the same itinerary framework, ensuring flexibility without compromising the quality of wildlife encounters, guiding, and overall experience.
                </p>

                {/* Quick Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Duration</div>
                    <div className="text-[16px] text-[#333333]">5 Days</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Group Size</div>
                    <div className="text-[16px] text-[#333333]">2-6 People</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Calendar className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Availability</div>
                    <div className="text-[16px] text-[#333333]">Year-round</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MapPin className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Start/End</div>
                    <div className="text-[16px] text-[#333333]">Arusha</div>
                  </div>
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-md">
                <h2 className="text-[28px] sm:text-[32px] text-[#333333] mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {packageGallery.map((image, index) => (
                    <div key={index} className="relative h-[180px] sm:h-[220px] rounded-[15px] overflow-hidden group cursor-pointer">
                      <ImageWithFallback
                        src={image}
                        alt={`Safari photo ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Itinerary with New Accordion Component */}
              <div id="itinerary" className="bg-white rounded-[20px] p-6 md:p-8 shadow-md">
                <h2 className="text-[28px] sm:text-[32px] text-[#333333] mb-6">Day by Day Itinerary</h2>
                <ItineraryAccordion itinerary={itinerary} />
              </div>

              {/* Rates Section */}
              <div id="rates" className="bg-white rounded-[20px] p-6 md:p-8 shadow-md">
                <h2 className="text-[28px] sm:text-[32px] text-[#333333] mb-6">Safari Rates</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[10px]">
                    <div>
                      <div className="text-[18px] text-[#333333]">Luxury Option (2 people)</div>
                      <div className="text-[14px] text-[#686868]">Per person sharing</div>
                    </div>
                    <div className="text-[24px] text-[#1f751f]">$9,840</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[10px]">
                    <div>
                      <div className="text-[18px] text-[#333333]">Mid-Range Option (2 people)</div>
                      <div className="text-[14px] text-[#686868]">Per person sharing</div>
                    </div>
                    <div className="text-[24px] text-[#1f751f]">$5,200</div>
                  </div>
                  {/* <div className="flex items-center justify-between p-4 bg-[#1f751f]/10 rounded-[10px] border-2 border-[#1f751f]">
                    <div>
                      <div className="text-[18px] text-[#333333]">5-6 People</div>
                      <div className="text-[14px] text-[#686868]">Per person sharing</div>
                    </div>
                    <div className="text-[24px] text-[#1f751f]">$2,450</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[10px]">
                    <div>
                      <div className="text-[18px] text-[#333333]">Single Room Supplement</div>
                      <div className="text-[14px] text-[#686868]">Additional charge</div>
                    </div>
                    <div className="text-[24px] text-[#1f751f]">$450</div>
                  </div> */}
                </div>
                <p className="text-[14px] text-[#686868] mt-6">
                  * Prices are per person and subject to availability. Rates may vary during peak season (July-September & December-February).
                </p>
              </div>

              {/* Included & Excluded */}
              <div id="inclusions" className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-[20px] p-6 shadow-md">
                  <h3 className="text-[24px] text-[#333333] mb-4 flex items-center gap-2">
                    <Check className="text-[#1f751f]" size={24} />
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {[
                      'All park fees and taxes',
                      'Professional safari guide',
                      '4x4 safari vehicle',
                      'Accommodation as specified',
                      'All meals as per itinerary',
                      'Drinking water during safari',
                      'Airport transfers',
                      'Game drives as specified'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[15px] text-[#686868]">
                        <Check className="w-4 h-4 text-[#1f751f] mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-md">
                  <h3 className="text-[24px] text-[#333333] mb-4 flex items-center gap-2">
                    <X className="text-red-500" size={24} />
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {[
                      'International flights',
                      'Visa fees',
                      'Travel insurance',
                      'Personal expenses',
                      'Alcoholic beverages',
                      'Tips and gratuities',
                      'Optional activities',
                      'Items not mentioned'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[15px] text-[#686868]">
                        <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <div className="bg-white rounded-[20px] p-6 shadow-lg">
                  <div className="text-center border-b border-gray-200 pb-6 mb-6">
                    <div className="text-[14px] text-[#686868] mb-2">Price from</div>
                    <div className="text-[42px] text-[#1f751f]">{packagePrice}</div>
                    <div className="text-[14px] text-[#686868]">per person</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="w-full bg-[#1f751f] text-white px-6 py-4 rounded-[50px] hover:bg-[#0f440f] transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail size={20} />
                      Book Now
                    </button>
                    <a
                      href="tel:+255753243280"
                      className="w-full border-2 border-[#1f751f] text-[#1f751f] px-6 py-4 rounded-[50px] hover:bg-[#1f751f] hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone size={20} />
                      Call Us
                    </a>
                  </div>

                  <div className="space-y-3 text-[14px]">
                    <button className="w-full flex items-center justify-center gap-2 text-[#686868] hover:text-[#1f751f] py-2">
                      <Download size={18} />
                      Download Itinerary (PDF)
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 text-[#686868] hover:text-[#1f751f] py-2">
                      <Share2 size={18} />
                      Share this Safari
                    </button>
                  </div>
                </div>

                {/* Need Help Card */}
                <div className="bg-gradient-to-br from-[#0f440f] to-[#1f751f] rounded-[20px] p-6 text-white">
                  <h3 className="text-[22px] mb-3">Need Help Planning?</h3>
                  <p className="text-[15px] mb-4 opacity-90">
                    Our safari experts are here to help you customize this itinerary to your preferences.
                  </p>
                  <div className="space-y-2 text-[14px]">
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>+255 753 243 280</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <span>info@ndewedotours.com</span>
                    </div>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="bg-white rounded-[20px] p-6 shadow-md">
                  <h4 className="text-[18px] text-[#333333] mb-4">Why Book With Us?</h4>
                  <ul className="space-y-3 text-[14px] text-[#686868]">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#1f751f] mt-0.5 flex-shrink-0" />
                      <span>15+ years of experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#1f751f] mt-0.5 flex-shrink-0" />
                      <span>Licensed & insured operator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#1f751f] mt-0.5 flex-shrink-0" />
                      <span>Expert local guides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#1f751f] mt-0.5 flex-shrink-0" />
                      <span>5.0 rating on TripAdvisor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#1f751f] mt-0.5 flex-shrink-0" />
                      <span>Flexible cancellation policy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[32px] sm:text-[40px] text-[#333333] mb-4">
              Guest <span className="text-[#1f751f]">Reviews</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-2">
              <ImageWithFallback
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 30'%3E%3Ctext x='10' y='20' font-size='18' fill='%2300AA6C'%3ETripAdvisor%3C/text%3E%3C/svg%3E"
                alt="TripAdvisor"
                className="h-8"
              />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-[#00AA6C] text-[#00AA6C]" />
                ))}
              </div>
            </div>
            <p className="text-[16px] text-[#686868]">4.9 out of 5 based on 127 reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-gray-50 rounded-[15px] p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-[#00AA6C] text-[#00AA6C]" />
                ))}
              </div>
              <h4 className="text-[18px] text-[#333333] mb-2">Trip of a Lifetime!</h4>
              <p className="text-[15px] text-[#686868] mb-4 leading-[24px]">
                "This safari exceeded all our expectations. The Serengeti was breathtaking and our guide was incredibly knowledgeable. Seeing the Big Five was a dream come true!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1f751f] flex items-center justify-center text-white">
                  MR
                </div>
                <div>
                  <div className="text-[14px] text-[#333333]">Michael R.</div>
                  <div className="text-[13px] text-[#686868]">USA • Nov 2024</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-gray-50 rounded-[15px] p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-[#00AA6C] text-[#00AA6C]" />
                ))}
              </div>
              <h4 className="text-[18px] text-[#333333] mb-2">Absolutely Perfect</h4>
              <p className="text-[15px] text-[#686868] mb-4 leading-[24px]">
                "From the moment we were picked up to the final drop-off, everything was seamless. The accommodations were comfortable and the wildlife sightings were incredible."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1f751f] flex items-center justify-center text-white">
                  LK
                </div>
                <div>
                  <div className="text-[14px] text-[#333333]">Laura K.</div>
                  <div className="text-[13px] text-[#686868]">UK • Oct 2024</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-gray-50 rounded-[15px] p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-[#00AA6C] text-[#00AA6C]" />
                ))}
              </div>
              <h4 className="text-[18px] text-[#333333] mb-2">Highly Recommended</h4>
              <p className="text-[15px] text-[#686868] mb-4 leading-[24px]">
                "An amazing experience! The Ngorongoro Crater descent was spectacular and we saw so many animals. Our guide made the trip truly special with his expertise."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1f751f] flex items-center justify-center text-white">
                  TS
                </div>
                <div>
                  <div className="text-[14px] text-[#333333]">Thomas S.</div>
                  <div className="text-[13px] text-[#686868]">Germany • Sep 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setBookingOpen(false)}
        safariPackage={{ name: packageName, amount: packagePrice }}
      />
    </div>
  )
}