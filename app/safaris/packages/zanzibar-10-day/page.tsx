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
  'https://images.unsplash.com/photo-1564760055094-0b5c0b0c0b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', // Mount Meru views
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', // Lake Manyara landscape
  'https://images.unsplash.com/photo-1681139504760-4c17f2c8b380?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', // Serengeti plains
  'https://images.unsplash.com/photo-1516494982030-fda424f96b59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', // Ngorongoro Crater
  'https://images.unsplash.com/photo-1564760055094-0b5c0b0c0b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', // Zanzibar beach
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', // Zanzibar palm trees
];

const itinerary = [
  {
    day: 1,
    title: 'Arrival in Tanzania – Welcome to Arusha',
    location: 'Mount Meru Hotel | Arusha, Tanzania',
    activities: [
      'Arrival at Kilimanjaro International Airport',
      'Warm welcome and private transfer to Arusha',
      'Scenic drive with views of Mount Meru',
      'Relax at hotel grounds, pool, or gardens',
      'Optional visit to nearby cultural sites'
    ],
    meals: 'Breakfast only',
    accommodation: 'Mount Meru Hotel',
    images: [
      'https://images.unsplash.com/photo-1564760055094-0b5c0b0c0b0c?w=800', // Hotel with mountain view
      'https://images.unsplash.com/photo-1596790133876-73e292c227d0?w=800',
    ],
    lodgeInfo: {
      name: 'Mount Meru Hotel Information',
      features: [
        'Elegant four-star property with landscaped grounds',
        'Uninterrupted views of Mount Meru',
        'Swimming pool and peaceful gardens',
        'Prime location in Arusha Safari Capital'
      ]
    }
  },
  {
    day: 2,
    title: 'Lake Manyara National Park – First Safari Experience',
    location: 'Eileen’s Trees Inn | Karatu, Tanzania',
    activities: [
      'Drive through countryside and villages',
      'Full game drive in Lake Manyara National Park',
      'Search for tree-climbing lions, elephants, baboons',
      'Picnic lunch in the park',
      'Birdwatching (over 400 species)'
    ],
    meals: 'All meals included',
    accommodation: 'Eileen’s Trees Inn',
    images: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800', // Lake Manyara scenery
      'https://images.unsplash.com/photo-1564760055094-0b5c0b0c0b0c?w=800', // Tree-climbing lion placeholder
    ],
    lodgeInfo: {
      name: 'Eileen’s Trees Inn Information',
      features: [
        'Charming lodge in lush gardens and farmland',
        'Comfortable rooms with warm hospitality',
        'Relaxed highland atmosphere near crater'
      ]
    }
  },
  {
    day: 3,
    title: 'Journey to Serengeti National Park',
    location: 'Serengeti Kati Kati Tented Camp | Serengeti, Tanzania',
    activities: [
      'Drive through Ngorongoro Conservation Area',
      'Game drive en route with Maasai cultural insights',
      'Enter Serengeti for afternoon wildlife viewing',
      'Chance to see Great Migration herds (seasonal)'
    ],
    meals: 'All meals included',
    accommodation: 'Serengeti Kati Kati Tented Camp',
    images: [
      'https://images.unsplash.com/photo-1681139504760-4c17f2c8b380?w=800', // Serengeti plains
      'https://images.unsplash.com/photo-1689479665582-51d0c25215b7?w=800',
    ],
    lodgeInfo: {
      name: 'Serengeti Kati Kati Tented Camp Information',
      features: [
        'Semi-permanent tented camp in central Serengeti',
        'Authentic safari atmosphere with en-suite tents',
        'Prime location for game viewing'
      ]
    }
  },
  {
    day: 4,
    title: 'Full-Day Safari in Central Serengeti',
    location: 'Serengeti Kati Kati Tented Camp | Serengeti, Tanzania',
    activities: [
      'Early morning and afternoon game drives',
      'Focus on predators (lions, leopards, cheetahs)',
      'Picnic lunch in scenic bush location',
      'Sundowner experience'
    ],
    meals: 'All meals included',
    accommodation: 'Serengeti Kati Kati Tented Camp',
    images: [
      'https://images.unsplash.com/photo-1632315152441-465a943cc211?w=800',
      'https://images.unsplash.com/photo-1723474029262-b368c6018e3d?w=800',
    ],
    lodgeInfo: {
      name: 'Central Serengeti Highlights',
      features: [
        'Year-round wildlife due to Seronera River',
        'Excellent predator sightings',
        'Immersive full-day exploration'
      ]
    }
  },
  {
    day: 5,
    title: 'Serengeti to Ngorongoro Conservation Area',
    location: 'Eileen’s Trees Inn | Karatu, Tanzania',
    activities: [
      'Early morning game drive in Serengeti',
      'Scenic drive back through highlands',
      'Picnic lunch en route',
      'Panoramic views from Ngorongoro Crater rim'
    ],
    meals: 'All meals included',
    accommodation: 'Eileen’s Trees Inn',
    images: [
      'https://images.unsplash.com/photo-1516494982030-fda424f96b59?w=800', // Crater rim
      'https://images.unsplash.com/photo-1612374300229-5c15f80cbf57?w=800',
    ],
    lodgeInfo: {
      name: 'Ngorongoro Transition',
      features: [
        'Stunning crater views on arrival',
        'Return to comfortable Karatu lodge'
      ]
    }
  },
  {
    day: 6,
    title: 'Ngorongoro Crater Tour and Return to Arusha',
    location: 'Mount Meru Hotel | Arusha, Tanzania',
    activities: [
      'Early descent into Ngorongoro Crater',
      'Half-day game drive on crater floor',
      'Picnic lunch by hippo pool',
      'Search for black rhino and Big Five',
      'Ascend rim and drive back to Arusha'
    ],
    meals: 'Breakfast included',
    accommodation: 'Mount Meru Hotel',
    images: [
      'https://images.unsplash.com/photo-1516494982030-fda424f96b59?w=800',
      'https://images.unsplash.com/photo-1688373882084-715259289a19?w=800', // Rhino placeholder
    ],
    lodgeInfo: {
      name: 'Ngorongoro Crater Highlights',
      features: [
        'World’s largest intact caldera',
        'High wildlife density including black rhino',
        'Diverse habitats in one place'
      ]
    }
  },
  {
    day: 7,
    title: 'Arusha to Zanzibar – Transition to Tropical Paradise',
    location: 'Meliá Zanzibar Hotel | Zanzibar, Tanzania',
    activities: [
      'Transfer to Arusha Airport',
      'Domestic flight to Zanzibar',
      'Private transfer to beach resort',
      'Leisure time on white-sand beach'
    ],
    meals: 'All meals included',
    accommodation: 'Meliá Zanzibar Hotel',
    images: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800', // Zanzibar beach
      'https://images.unsplash.com/photo-1564760055094-0b5c0b0c0b0c?w=800',
    ],
    lodgeInfo: {
      name: 'Meliá Zanzibar Hotel Information',
      features: [
        'Luxurious beachfront resort on northeast coast',
        'Pristine white sands and turquoise waters',
        'Pool, spa, and relaxation facilities'
      ]
    }
  },
  {
    day: 8,
    title: 'Zanzibar – Leisure and Optional Excursions (Day 1)',
    location: 'Meliá Zanzibar Hotel | Zanzibar, Tanzania',
    activities: [
      'Relax on beach or by pool',
      'Optional: Stone Town tour, spice plantation',
      'Snorkeling, diving, or dhow cruise'
    ],
    meals: 'All meals included',
    accommodation: 'Meliá Zanzibar Hotel',
    images: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
      'https://images.unsplash.com/photo-1564760055094-0b5c0b0c0b0c?w=800', // Spice tour placeholder
    ],
    lodgeInfo: {
      name: 'Zanzibar Leisure',
      features: [
        'Balance of relaxation and cultural options',
        'Spice Island heritage experiences'
      ]
    }
  },
  {
    day: 9,
    title: 'Zanzibar – Leisure and Optional Excursions (Day 2)',
    location: 'Meliá Zanzibar Hotel | Zanzibar, Tanzania',
    activities: [
      'Full day at leisure or excursions',
      'Spa treatments, beach walks, ocean swimming'
    ],
    meals: 'All meals included',
    accommodation: 'Meliá Zanzibar Hotel',
    images: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
    ],
    lodgeInfo: {
      name: 'Extended Zanzibar Relaxation',
      features: [
        'Unwind after safari adventure',
        'Optional adventures available'
      ]
    }
  },
  {
    day: 10,
    title: 'Departure from Zanzibar',
    location: 'Zanzibar International Airport',
    activities: [
      'Leisurely breakfast and beach time',
      'Transfer to airport',
      'Onward flight home'
    ],
    meals: 'Breakfast',
    accommodation: 'End of journey',
    images: [
      'https://images.unsplash.com/photo-1564760055094-0b5c0b0c0b0c?w=800',
    ],
    lodgeInfo: {
      name: 'Farewell Zanzibar',
      features: [
        'Memorable end to wildlife + beach experience'
      ]
    }
  }
];

export default function SerengeriPackagePage() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const packageName = "10-Day Tanzania Safari & Zanzibar Beach Experience";
  const packagePrice = "$6,356";

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <section className="relative h-[400px] md:h-[550px]">
        <ImageWithFallback
          src={packageGallery[0]}
          alt="Zanzibar Beach & Safari"
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
              <span className="text-white/70">10-Day Tanzania & Zanzibar</span>
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
                    <span>10 Days / 9 Nights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>Northern Tanzania & Zanzibar</span>
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
                <h2 className="text-[28px] sm:text-[32px] text-[#333333] mb-6">Safari & Beach Overview</h2>
                <p className="text-[16px] text-[#686868] leading-[28px] mb-4">
                  Embark on a remarkable 10-day journey blending thrilling wildlife safaris in Northern Tanzania with relaxing beach luxury in Zanzibar. Experience iconic parks like Lake Manyara, Serengeti, and Ngorongoro Crater, then unwind on pristine white-sand beaches.
                </p>
                <p className="text-[16px] text-[#686868] leading-[28px]">
                  This itinerary offers adventure, culture, and coastal indulgence with comfortable accommodations, expert guiding, and seamless transitions.
                </p>

                {/* Quick Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Duration</div>
                    <div className="text-[16px] text-[#333333]">10 Days</div>
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
                    <div className="text-[16px] text-[#333333]">Year-round</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MapPin className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Start/End</div>
                    <div className="text-[16px] text-[#333333]">Kilimanjaro / Zanzibar</div>
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
                        alt={`Experience photo ${index + 1}`}
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
                      <div className="text-[18px] text-[#333333]">Per Person (2+ Sharing)</div>
                      <div className="text-[14px] text-[#686868]">Based on double occupancy</div>
                    </div>
                    <div className="text-[24px] text-[#1f751f]">{packagePrice}</div>
                  </div>
                  {/* <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[10px]">
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
                      'All accommodation as specified',
                      'All meals as per itinerary',
                      'All scheduled domestic flights',
                      'Private safari vehicle & professional guide',
                      'All park entrance & conservation fees',
                      'Game drives and activities described',
                      'Airport transfers'
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
                      'Personal expenses & alcoholic beverages',
                      'Tips and gratuities',
                      'Optional excursions not listed'
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