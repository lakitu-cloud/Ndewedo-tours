"use client";

import { useState } from 'react'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import {
  Clock, Users, MapPin, Calendar, Check, Star, X,
  ChevronRight, Mail, Phone, Download, Share2,
} from 'lucide-react'
import PackageSubNav from '@/components/PackageSubNav'
import ItineraryAccordion from '@/components/ItineraryAccordion'
import BookingModal from '@/components/BookingModal';

const packageGallery = [
  'https://media.cntraveller.com/photos/611be709d5b6f5a4a3dee985/master/pass/beyond-bateleur-camp-kenya-nov18-press.jpg', // andBeyond Bateleur Camp deck sunset
  'https://www.andbeyond.com/wp-content/uploads/sites/5/views-from-mobile-tents-at-andbeyond-serengeti-under-canvas-on-a-luxury-safari-in-tanzania.jpg', // Serengeti Under Canvas tent view
  'https://www.andbeyond.com/wp-content/uploads/sites/5/Manyara-Banner-2.jpg', // Lake Manyara Tree Lodge forest luxury
  'https://waybird.imgix.net/lodges/kodak_images/000/001/998/original/sea-cliff-zanzibar-tanzania-timbuktu-travel.jpg', // Sea Cliff Resort infinity pool sunset
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/2d/34/c6/hemingways-nairobi-aerial.jpg', // Hemingways Nairobi overview
  'https://artofsafari.travel/wp-content/uploads/2016/08/Kenya_MasaiMara_AsiliaRekeroCampWildlifeMigration.jpg', // Masai Mara migration crossing
];

const itinerary = [
  {
    day: 1,
    title: 'Arrival in Nairobi, Kenya',
    location: 'Hemingways Nairobi | Karen, Kenya',
    activities: [
      'Arrival at Jomo Kenyatta International Airport',
      'Warm welcome and private transfer to Karen suburb',
      'Relax at hotel, spa, or optional excursions (Karen Blixen Museum, Giraffe Centre, David Sheldrick Wildlife Trust)'
    ],
    meals: 'Bed & Breakfast',
    accommodation: 'Hemingways Nairobi',
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/2d/34/c6/hemingways-nairobi-aerial.jpg?w=800',
      'https://www.andbeyond.com/wp-content/uploads/sites/5/Beautiful-and-Elegant-Boutique-Hemingways-Nairobi.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'Hemingways Nairobi Information',
      features: [
        'Elegant boutique hotel inspired by Ernest Hemingway',
        'Breathtaking views of Ngong Hills',
        'Refined design, personalized service, spa facilities',
        'Tranquil leafy suburb setting'
      ]
    }
  },
  {
    day: 2,
    title: 'Nairobi to Masai Mara National Reserve',
    location: 'andBeyond Bateleur Camp | Masai Mara, Kenya',
    activities: [
      'Scenic light aircraft flight to Masai Mara',
      'Game drive en route to camp',
      'Afternoon game drive for Big Five viewing',
      'Sundowners and gourmet dinner under the stars'
    ],
    meals: 'Fully Inclusive',
    accommodation: 'andBeyond Bateleur Camp',
    images: [
      'https://media.cntraveller.com/photos/611be709d5b6f5a4a3dee985/master/pass/beyond-bateleur-camp-kenya-nov18-press.jpg?w=800',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/1e/58/52/andbeyond-bateleur-camp.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'andBeyond Bateleur Camp Information',
      features: [
        'Elegant tented camp in classic safari style',
        'Prime location for dense wildlife and Great Migration (seasonal)',
        'Impeccable service and conservation focus'
      ]
    }
  },
  {
    day: 3,
    title: 'Full Day in Masai Mara National Reserve',
    location: 'andBeyond Bateleur Camp | Masai Mara, Kenya',
    activities: [
      'Morning and afternoon game drives',
      'Optional hot air balloon safari',
      'Guided nature walks',
      'Cultural visit to Maasai village'
    ],
    meals: 'Fully Inclusive',
    accommodation: 'andBeyond Bateleur Camp',
    images: [
      'https://artofsafari.travel/wp-content/uploads/2016/08/Kenya_MasaiMara_AsiliaRekeroCampWildlifeMigration.jpg?w=800',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/1e/58/52/andbeyond-bateleur-camp.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'Masai Mara Highlights',
      features: [
        'Dense Big Five populations',
        'Tailored predator tracking and photography',
        'Campfire evenings with premium wines'
      ]
    }
  },
  {
    day: 4,
    title: 'Masai Mara to Serengeti National Park (Tanzania)',
    location: 'andBeyond Serengeti Under Canvas | Serengeti, Tanzania',
    activities: [
      'Morning game drive then cross-border flight',
      'Afternoon game drive in Serengeti',
      'Refined bush dinner and stargazing'
    ],
    meals: 'Fully Inclusive',
    accommodation: 'andBeyond Serengeti Under Canvas',
    images: [
      'https://www.andbeyond.com/wp-content/uploads/sites/5/views-from-mobile-tents-at-andbeyond-serengeti-under-canvas-on-a-luxury-safari-in-tanzania.jpg?w=800',
      'https://www.andbeyond.com/wp-content/uploads/sites/5/Web_Gallery-Tanzania-Serengeti-Under-Canvas-SUC-Room-Family-Tent-bedroom-2_2.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'andBeyond Serengeti Under Canvas Information',
      features: [
        'Luxury mobile camp following the Great Migration',
        'Spacious tents with classic safari elegance',
        'Personalized guiding and exclusive encounters'
      ]
    }
  },
  {
    day: 5,
    title: 'Full Day in Serengeti National Park',
    location: 'andBeyond Serengeti Under Canvas | Serengeti, Tanzania',
    activities: [
      'Extensive game drives tracking Great Migration (seasonal)',
      'Optional hot air balloon safari',
      'Visits to Olduvai Gorge / Shifting Sands (seasonal)'
    ],
    meals: 'Fully Inclusive',
    accommodation: 'andBeyond Serengeti Under Canvas',
    images: [
      'https://www.andbeyond.com/wp-content/uploads/sites/5/views-from-mobile-tents-at-andbeyond-serengeti-under-canvas-on-a-luxury-safari-in-tanzania.jpg?w=800',
      'https://artofsafari.travel/wp-content/uploads/2016/08/Kenya_MasaiMara_AsiliaRekeroCampWildlifeMigration.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'Serengeti Highlights',
      features: [
        'Endless plains with year-round wildlife',
        'Deep immersion in iconic ecosystems',
        'Flexible, private safari experiences'
      ]
    }
  },
  {
    day: 6,
    title: 'Serengeti to Lake Manyara National Park',
    location: 'andBeyond Lake Manyara Tree Lodge | Lake Manyara, Tanzania',
    activities: [
      'Morning game drive then flight to Manyara Airstrip',
      'Scenic game drive to lodge',
      'Afternoon at leisure with private deck wildlife viewing'
    ],
    meals: 'Fully Inclusive',
    accommodation: 'andBeyond Lake Manyara Tree Lodge',
    images: [
      'https://www.andbeyond.com/wp-content/uploads/sites/5/Manyara-Banner-2.jpg?w=800',
      'https://www.andbeyond.com/wp-content/uploads/sites/5/Lake-Manyara-Tree-Lodge-guest-room-treehouse.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'andBeyond Lake Manyara Tree Lodge Information',
      features: [
        'Elevated treehouse suites in ancient mahogany forest',
        'Seamless blend with nature',
        'Private decks for observing wildlife'
      ]
    }
  },
  {
    day: 7,
    title: 'Lake Manyara National Park Exploration (Day 1)',
    location: 'andBeyond Lake Manyara Tree Lodge | Lake Manyara, Tanzania',
    activities: [
      'Game drives searching for tree-climbing lions',
      'Night drives for nocturnal species',
      'Guided walks or cycling excursions'
    ],
    meals: 'Fully Inclusive',
    accommodation: 'andBeyond Lake Manyara Tree Lodge',
    images: [
      'https://paradise-wilderness.com/wp-content/uploads/LM-lions-in-tree-cup.jpg?w=800',
      'https://www.andbeyond.com/wp-content/uploads/sites/5/Lion-in-a-tree-in-Lake-Manyara-National-Park.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'Lake Manyara Highlights',
      features: [
        'Diverse habitats: forest, lake, savannah',
        'Famous tree-climbing lions',
        'Exceptional photographic opportunities'
      ]
    }
  },
  {
    day: 8,
    title: 'Lake Manyara National Park Exploration (Day 2)',
    location: 'andBeyond Lake Manyara Tree Lodge | Lake Manyara, Tanzania',
    activities: [
      'Full day game drives and activities',
      'Cultural visits with local communities',
      'Leisure at lodge facilities'
    ],
    meals: 'Fully Inclusive',
    accommodation: 'andBeyond Lake Manyara Tree Lodge',
    images: [
      'https://paradise-wilderness.com/wp-content/uploads/LM-lions-in-tree-cup.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'Extended Manyara Experience',
      features: [
        'Varied wildlife in compact, biodiverse park',
        'Night drives and guided explorations'
      ]
    }
  },
  {
    day: 9,
    title: 'Lake Manyara National Park Exploration (Day 3)',
    location: 'andBeyond Lake Manyara Tree Lodge | Lake Manyara, Tanzania',
    activities: [
      'Morning/afternoon game drives',
      'Optional activities or relaxation',
      'Final evening in the forest setting'
    ],
    meals: 'Fully Inclusive',
    accommodation: 'andBeyond Lake Manyara Tree Lodge',
    images: [
      'https://www.andbeyond.com/wp-content/uploads/sites/5/Lake-Manyara-Tree-Lodge-guest-room-treehouse.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'Manyara Immersion',
      features: [
        'Deep connection to Great Rift Valley scenery',
        'Personalized luxury in nature'
      ]
    }
  },
  {
    day: 10,
    title: 'Lake Manyara to Zanzibar',
    location: 'Sea Cliff Resort & Spa | Zanzibar, Tanzania',
    activities: [
      'Flight to Kilimanjaro then to Zanzibar',
      'Private transfer to northwest coast resort',
      'Unwind by pool or beach'
    ],
    meals: 'Half Board',
    accommodation: 'Sea Cliff Resort & Spa',
    images: [
      'https://waybird.imgix.net/lodges/kodak_images/000/001/998/original/sea-cliff-zanzibar-tanzania-timbuktu-travel.jpg?w=800',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/d3/25/e7/pool.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'Sea Cliff Resort & Spa Information',
      features: [
        'Elegant oceanfront resort with panoramic views',
        'World-class spa, dining, and leisure facilities',
        'Perfect contrast to safari adventure'
      ]
    }
  },
  {
    day: 11,
    title: 'Zanzibar Relaxation & Exploration (Day 1)',
    location: 'Sea Cliff Resort & Spa | Zanzibar, Tanzania',
    activities: [
      'Beach/pool relaxation or spa treatments',
      'Optional: Stone Town tour, spice plantation, snorkeling, dhow cruise'
    ],
    meals: 'Half Board',
    accommodation: 'Sea Cliff Resort & Spa',
    images: [
      'https://waybird.imgix.net/lodges/kodak_images/000/001/998/original/sea-cliff-zanzibar-tanzania-timbuktu-travel.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'Zanzibar Leisure',
      features: [
        'Turquoise Indian Ocean and white sands',
        'Cultural and adventure options available'
      ]
    }
  },
  {
    day: 12,
    title: 'Zanzibar Relaxation & Exploration (Day 2)',
    location: 'Sea Cliff Resort & Spa | Zanzibar, Tanzania',
    activities: [
      'Full day at leisure or excursions',
      'Spa, water sports, sunset views'
    ],
    meals: 'Half Board',
    accommodation: 'Sea Cliff Resort & Spa',
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/d3/25/e7/pool.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'Extended Zanzibar Indulgence',
      features: [
        'Rejuvenation after wildlife journey',
        'World-class dining and oceanfront serenity'
      ]
    }
  },
  {
    day: 13,
    title: 'Departure from Zanzibar',
    location: 'Zanzibar International Airport',
    activities: [
      'Leisurely breakfast and final relaxation',
      'Private transfer to airport',
      'Onward journey home'
    ],
    meals: 'Breakfast',
    accommodation: 'End of journey',
    images: [
      'https://waybird.imgix.net/lodges/kodak_images/000/001/998/original/sea-cliff-zanzibar-tanzania-timbuktu-travel.jpg?w=800',
    ],
    lodgeInfo: {
      name: 'Farewell East Africa',
      features: [
        'Unforgettable blend of luxury safari and beach escape'
      ]
    }
  }
];

export default function LuxuryCrossBorderPage() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const packageName = "13-Day Luxury Cross-Border Safari & Beach Escape";
  const packagePrice = "$13,753";

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <section className="relative h-[400px] md:h-[550px]">
        <ImageWithFallback
          src="https://media.cntraveller.com/photos/611be709d5b6f5a4a3dee985/master/pass/beyond-bateleur-camp-kenya-nov18-press.jpg" // Luxury camp deck sunset
          alt="Luxury Safari & Zanzibar Beach"
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
              <span className="text-white/70">13-Day Luxury Cross-Border Kenya & Tanzania</span>
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
                    <span>13 Days / 12 Nights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>Kenya & Tanzania (Masai Mara to Zanzibar)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="fill-[#fbbf24] text-[#fbbf24]" size={18} />
                    <span>5.0 (based on luxury experiences)</span>
                  </div>
                </div>
              </div>
              <div className="text-white">
                <div className="text-[14px] mb-1">From</div>
                <div className="text-[42px] sm:text-[52px]">{packagePrice}</div>
                <div className="text-[14px]">per person (based on 2 sharing)</div>
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
                <h2 className="text-[28px] sm:text-[32px] text-[#333333] mb-6">Luxury Safari & Beach Overview</h2>
                <p className="text-[16px] text-[#686868] leading-[28px] mb-4">
                  This exceptional cross-border luxury safari and beach itinerary combines East Africa’s iconic wildlife destinations with a serene Indian Ocean escape in Zanzibar. Experience the Masai Mara and Serengeti (Big Five & Great Migration), Lake Manyara’s tree-climbing lions, and exclusive andBeyond camps, followed by refined relaxation at Sea Cliff Resort & Spa.
                </p>
                <p className="text-[16px] text-[#686868] leading-[28px]">
                  Ideal for honeymooners, photographers, and discerning travelers seeking impeccable service, private guiding, scenic flights, and a perfect balance of adventure and indulgence.
                </p>

                {/* Quick Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Duration</div>
                    <div className="text-[16px] text-[#333333]">13 Days</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Group Size</div>
                    <div className="text-[16px] text-[#333333]">2+ People</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Calendar className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Availability</div>
                    <div className="text-[16px] text-[#333333]">Year-round (Migration best Jul-Nov)</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MapPin className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Start/End</div>
                    <div className="text-[16px] text-[#333333]">Nairobi / Zanzibar</div>
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
                        alt={`Luxury experience photo ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Itinerary */}
              <div id="itinerary" className="bg-white rounded-[20px] p-6 md:p-8 shadow-md">
                <h2 className="text-[28px] sm:text-[32px] text-[#333333] mb-6">Day by Day Itinerary</h2>
                <ItineraryAccordion itinerary={itinerary} />
              </div>

              {/* Rates Section */}
              <div id="rates" className="bg-white rounded-[20px] p-6 md:p-8 shadow-md">
                <h2 className="text-[28px] sm:text-[32px] text-[#333333] mb-6">Safari Rates</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#1f751f]/10 rounded-[10px] border-2 border-[#1f751f]">
                    <div>
                      <div className="text-[18px] text-[#333333]">Per Person (2+ Sharing)</div>
                      <div className="text-[14px] text-[#686868]">Luxury tier, double occupancy</div>
                    </div>
                    <div className="text-[24px] text-[#1f751f]">{packagePrice}</div>
                  </div>
                  <p className="text-[14px] text-[#686868] mt-6">
                    * Prices per person, subject to availability. May vary by season, group size, or custom options. Peak Migration season (Jul-Nov) higher demand.
                  </p>
                </div>
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
                      'All accommodation as specified (andBeyond luxury camps/lodges)',
                      'All meals & beverages per lodge inclusions',
                      'Scheduled inter-camp & domestic flights',
                      'Private transfers & airstrip meet/greet',
                      'Game drives, safari activities & professional guides',
                      'Park entrance & conservation fees',
                      'All airstrip transfers'
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
                      'International flights & visa fees',
                      'Travel insurance',
                      'Optional activities (e.g., hot air balloon)',
                      'Personal expenses, tips & gratuities',
                      'Items not mentioned in itinerary'
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
                      Share this Experience
                    </button>
                  </div>
                </div>

                {/* Need Help Card */}
                <div className="bg-gradient-to-br from-[#0f440f] to-[#1f751f] rounded-[20px] p-6 text-white">
                  <h3 className="text-[22px] mb-3">Need Help Planning?</h3>
                  <p className="text-[15px] mb-4 opacity-90">
                    Our luxury safari experts can customize this cross-border itinerary.
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
                      <span>Expert local & private guides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#1f751f] mt-0.5 flex-shrink-0" />
                      <span>5.0 rating on premium platforms</span>
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
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-[#00AA6C] text-[#00AA6C]" />
                ))}
              </div>
            </div>
            <p className="text-[16px] text-[#686868]">5.0 out of 5 based on luxury traveler feedback</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-[15px] p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-5 h-5 fill-[#00AA6C] text-[#00AA6C]" />)}
              </div>
              <h4 className="text-[18px] text-[#333333] mb-2">Ultimate Luxury Adventure</h4>
              <p className="text-[15px] text-[#686868] mb-4 leading-[24px]">
                "The andBeyond camps were phenomenal — from Bateleur's elegance to Serengeti Under Canvas magic. Tree-climbing lions and Zanzibar beaches were perfect!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1f751f] flex items-center justify-center text-white">AS</div>
                <div>
                  <div className="text-[14px] text-[#333333]">Alex S.</div>
                  <div className="text-[13px] text-[#686868]">USA • Jan 2026</div>
                </div>
              </div>
            </div>
            {/* Add more sample reviews as needed */}
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