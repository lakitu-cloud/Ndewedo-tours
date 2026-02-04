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

const packageGallery = [
  'https://images.unsplash.com/photo-1681139504760-4c17f2c8b380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaSUyMHdpbGRsaWZlfGVufDF8fHx8MTc2MjU5MzI2OHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1689479665582-51d0c25215b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaSUyMHdpbGRsaWZlfGVufDF8fHx8MTc2MjU5OTU5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1516494982030-fda424f96b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZ29yb25nb3JvJTIwY3JhdGVyfGVufDF8fHx8MTc2MjU5OTUyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1560440293-855922f9cc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNlcmVuZ2V0aSUyMHN1bnNldHxlbnwxfHx8fDE3NjI1OTk3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1632315152441-465a943cc211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaSUyMHRlbnQlMjBjYW1wfGVufDF8fHx8MTc2MjU5OTcwNXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1662377067390-278529608716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaSUyMGdyb3VwJTIwcGVvcGxlfGVufDF8fHx8MTc2MjU5OTcwOHww&ixlib=rb-4.1.0&q=80&w=1080',
];

const itinerary = [
  {
    day: 1,
    title: 'Arrival in Arusha',
    location: 'Arusha Coffee Lodge | Arusha, Tanzania',
    activities: [
      'Meet and greet at Kilimanjaro International Airport',
      'Transfer to your hotel in Arusha',
      'Safari briefing with your guide',
      'Overnight at comfortable lodge'
    ],
    meals: 'Dinner',
    accommodation: 'Arusha Coffee Lodge or similar',
    images: [
      'https://images.unsplash.com/photo-1529350106294-32d4d5f8fdb5?w=800',
      'https://images.unsplash.com/photo-1596790133876-73e292c227d0?w=800',
      'https://images.unsplash.com/photo-1632315152441-465a943cc211?w=800'
    ],
    lodgeInfo: {
      name: 'Arusha Coffee Lodge Information',
      features: [
        'Used overnight stay just 5 minutes from Kilimanjaro Airport',
        'Beautiful coffee plantation setting with mature trees',
        'Spacious suites surrounded by coffee plantations',
        'Relaxed, serene atmosphere in a lovely natural restaurant',
        'Dining area, bar/wine & swimming pool'
      ]
    }
  },
  {
    day: 2,
    title: 'Arusha to Serengeti National Park',
    location: 'Serengeti Kati Kati Camp | Serengeti, Tanzania',
    activities: [
      'After breakfast, drive to Serengeti (approximately 6 hours)',
      'Game drive en route through the Ngorongoro Conservation Area',
      'Arrive in Serengeti for afternoon game drive',
      'Witness incredible wildlife in their natural habitat',
      'Sundowner experience in the wild'
    ],
    meals: 'Breakfast, Lunch, Dinner',
    accommodation: 'Serengeti Kati Kati Camp or similar',
    images: [
      'https://images.unsplash.com/photo-1528275646751-ff237d1cd935?w=800',
      'https://images.unsplash.com/photo-1681139504760-4c17f2c8b380?w=800',
      'https://images.unsplash.com/photo-1560440293-855922f9cc7d?w=800'
    ],
    lodgeInfo: {
      name: 'Serengeti Kati Kati Camp Information',
      features: [
        'Mobile tented camp following the Great Migration',
        'Comfortable en-suite tents with hot showers',
        'Prime location in central Serengeti',
        'Authentic safari experience under canvas',
        'Expert guides and excellent wildlife viewing'
      ]
    }
  },
  {
    day: 3,
    title: 'Full Day Serengeti Safari',
    location: 'Serengeti Kati Kati Camp | Serengeti, Tanzania',
    activities: [
      'Early morning game drive to catch predators hunting',
      'Return to camp for breakfast',
      'Full day exploring Serengeti with packed lunch',
      'Search for the Big Five and the Great Migration (seasonal)',
      'Evening game drive for sunset wildlife viewing'
    ],
    meals: 'Breakfast, Lunch, Dinner',
    accommodation: 'Serengeti Kati Kati Camp or similar',
    images: [
      'https://images.unsplash.com/photo-1689479665582-51d0c25215b7?w=800',
      'https://images.unsplash.com/photo-1723474029262-b368c6018e3d?w=800',
      'https://images.unsplash.com/photo-1636871694216-d04517e0d1c2?w=800'
    ],
    lodgeInfo: {
      name: 'Full Day Safari Highlights',
      features: [
        'Extended game drives to maximize wildlife sightings',
        'Packed gourmet lunch in the bush',
        'Multiple eco-systems to explore',
        'Chance to see the Big Five in one day',
        'Sundowner drinks in the wilderness'
      ]
    }
  },
  {
    day: 4,
    title: 'Serengeti to Ngorongoro Crater',
    location: 'Ngorongoro Rhino Lodge | Karatu, Tanzania',
    activities: [
      'Morning game drive in Serengeti',
      'After breakfast, depart for Ngorongoro',
      'Scenic drive through the highlands',
      'Arrive at crater rim lodge',
      'Relax and enjoy spectacular crater views'
    ],
    meals: 'Breakfast, Lunch, Dinner',
    accommodation: 'Ngorongoro Rhino Lodge or similar',
    images: [
      'https://images.unsplash.com/photo-1516494982030-fda424f96b59?w=800',
      'https://images.unsplash.com/photo-1612374300229-5c15f80cbf57?w=800',
      'https://images.unsplash.com/photo-1636871694216-d04517e0d1c2?w=800'
    ],
    lodgeInfo: {
      name: 'Ngorongoro Rhino Lodge Information',
      features: [
        'Located on the eastern rim of Ngorongoro Crater',
        'Stunning panoramic views of the crater',
        'Comfortable rooms with modern amenities',
        'Cozy fireplace lounge for evening relaxation',
        'Perfect base for crater exploration'
      ]
    }
  },
  {
    day: 5,
    title: 'Ngorongoro Crater & Return to Arusha',
    location: 'Ngorongoro Crater | Return to Arusha',
    activities: [
      'Early descent into Ngorongoro Crater (2,000 ft)',
      'Full morning game drive on crater floor',
      'Excellent chance to see black rhino',
      'Picnic lunch by hippo pool',
      'Afternoon drive back to Arusha',
      'Drop off at airport or hotel'
    ],
    meals: 'Breakfast, Lunch',
    accommodation: 'End of safari',
    images: [
      'https://images.unsplash.com/photo-1516494982030-fda424f96b59?w=800',
      'https://images.unsplash.com/photo-1688373882084-715259289a19?w=800',
      'https://images.unsplash.com/photo-1529350106294-32d4d5f8fdb5?w=800'
    ],
    lodgeInfo: {
      name: 'Ngorongoro Crater Highlights',
      features: [
        'World\'s largest intact volcanic caldera',
        'Home to over 25,000 large animals',
        'Best place in Tanzania to see black rhino',
        'Incredible concentration of wildlife',
        'Stunning scenery and photo opportunities'
      ]
    }
  }
];

export default function SerengeriPackagePage() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const packageName = "5-Day Serengeti & Ngorongoro Safari";
  const packagePrice = "$2,450";

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
              <span className="text-white/70">5-Day Serengeti & Ngorongoro</span>
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
                    <span>Serengeti, Ngorongoro</span>
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
                  Experience the ultimate Tanzanian safari adventure with this carefully curated 5-day journey through two of Africa's most iconic wildlife destinations. The Serengeti National Park and Ngorongoro Crater offer unparalleled opportunities to witness the Big Five, the Great Migration (seasonal), and countless other species in their natural habitat.
                </p>
                <p className="text-[16px] text-[#686868] leading-[28px]">
                  This safari combines comfortable accommodation, expert guiding, and flexible itineraries to ensure you experience the very best of Tanzania's wildlife and landscapes. Whether you're a first-time safari-goer or a seasoned wildlife enthusiast, this package promises memories that will last a lifetime.
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
                      <div className="text-[18px] text-[#333333]">2 People</div>
                      <div className="text-[14px] text-[#686868]">Per person sharing</div>
                    </div>
                    <div className="text-[24px] text-[#1f751f]">$2,950</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[10px]">
                    <div>
                      <div className="text-[18px] text-[#333333]">3-4 People</div>
                      <div className="text-[14px] text-[#686868]">Per person sharing</div>
                    </div>
                    <div className="text-[24px] text-[#1f751f]">$2,650</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#1f751f]/10 rounded-[10px] border-2 border-[#1f751f]">
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
                  </div>
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
        safariPackage={{name: packageName, amount: packagePrice}} 
      />
    </div>
  )
}