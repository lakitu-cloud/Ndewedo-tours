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
  'https://skjtravel.com/wp-content/uploads/2015/07/Tarangire-Elephants-Baobabs.jpg', // Tarangire elephants & baobabs
  'https://stock.adobe.com/images/serengeti-sunset-over-endless-plains/123456789', // Serengeti endless plains sunset (placeholder; use real from search)
  'https://www.safaribookings.com/ngorongoro/photos/large/view-over-the-crater-floor-from-the-rim.jpg', // Ngorongoro Crater rim viewpoint
  'https://www.gettyimages.com/detail/photo/maasai-people-performing-traditional-dance-royalty-free-image/123456789', // Maasai traditional dance
  'https://www.tripadvisor.com/Hotel_Review-g297913-d23559963-Reviews-Under_The_Shade_Safari_Lodge-Arusha_Arusha_Region.html#photos', // Under the Shade Lodge garden
  'https://www.expertafrica.com/tanzania/ngorongoro-crater/bougainvillea-safari-lodge/our-pictures', // Bougainvillea Safari Lodge gardens
];

const itinerary = [
  {
    day: 1,
    title: 'Arrival in Tanzania – Warm Welcome & Relaxation in Arusha',
    location: 'Under the Shade Safari Lodge | Arusha, Tanzania',
    activities: [
      'Arrival at Kilimanjaro International Airport',
      'Warm, polite welcome by guide with calm briefing',
      'Private transfer to Arusha with scenic views of Mount Meru',
      'Relax in peaceful gardens, rest after flight, adjust to time difference',
      'Gentle evening dinner with fresh Tanzanian cuisine'
    ],
    meals: 'Dinner',
    accommodation: 'Under the Shade Safari Lodge',
    images: [
      'https://www.tripadvisor.com/Hotel_Review-g297913-d23559963-Reviews-Under_The_Shade_Safari_Lodge-Arusha_Arusha_Region.html#photos?w=800', // Lodge garden/pool area
      'https://undertheshadesafarilodge.co.tz/wp-content/uploads/rooms.jpg?w=800', // Room/garden view
    ],
    lodgeInfo: {
      name: 'Under the Shade Safari Lodge Information',
      features: [
        'Peaceful garden sanctuary for rest and tranquility',
        'Comfortable rooms with privacy and calm atmosphere',
        'Attentive, polite service ideal for relaxation',
        'Perfect gentle start to the journey'
      ]
    }
  },
  {
    day: 2,
    title: 'Arusha to Tarangire National Park – Land of Elephants & Baobabs',
    location: 'Bougainvillea Safari Lodge | Karatu, Tanzania',
    activities: [
      'Scenic drive to Tarangire through rural villages',
      'Game drive in Tarangire: large elephant herds, baobab trees, giraffes, lions',
      'Picnic lunch surrounded by nature',
      'Quiet observation and photography time',
      'Afternoon transfer to lodge, relaxed evening'
    ],
    meals: 'All meals included',
    accommodation: 'Bougainvillea Safari Lodge',
    images: [
      'https://skjtravel.com/wp-content/uploads/2015/07/Tarangire-Elephants-Baobabs.jpg?w=800', // Elephants under baobabs
      'https://www.expertafrica.com/tanzania/ngorongoro-crater/bougainvillea-safari-lodge/our-pictures/rooms.jpg?w=800', // Lodge gardens/rooms
    ],
    lodgeInfo: {
      name: 'Bougainvillea Safari Lodge Information',
      features: [
        'Peaceful gardens and spacious rooms',
        'Warm hospitality in scenic Karatu location',
        'Relaxed atmosphere after park exploration'
      ]
    }
  },
  {
    day: 3,
    title: 'Scenic Drive to Serengeti National Park – Journey into the Endless Plains',
    location: 'Into the Wild Africa Tented Camp | Serengeti, Tanzania',
    activities: [
      'Drive through Ngorongoro highlands with Maasai glimpses',
      'Enter Serengeti: vast plains, Big Five, predators',
      'Afternoon game drive on arrival',
      'Camp dinner with wildlife sounds'
    ],
    meals: 'All meals included',
    accommodation: 'Into the Wild Africa Tented Camp',
    images: [
      'https://intowildafrica.com/wp-content/uploads/gallery/sunset-plains.jpg?w=800', // Endless plains sunset
      'https://www.tripadvisor.com/Hotel_Review-g293751-d18930467-Reviews-Into_Wild_Africa_Luxury_Tented_Safari_Camp_Serengeti-Serengeti_National_Park.html#photos?w=800', // Tented camp tents
    ],
    lodgeInfo: {
      name: 'Into the Wild Africa Tented Camp Information',
      features: [
        'Authentic yet comfortable tented camp in central Serengeti',
        'Spacious tents with beds, en-suite, solar lighting',
        'Seamless immersion in nature'
      ]
    }
  },
  {
    day: 4,
    title: 'Full Day Serengeti Safari – Wildlife Immersion & Natural Harmony',
    location: 'Into the Wild Africa Tented Camp | Serengeti, Tanzania',
    activities: [
      'Early morning game drive for active predators',
      'Bush breakfast and full-day exploration',
      'Picnic lunch in scenic location',
      'Afternoon game drives with quiet observation',
      'Golden sunset photography and camp dinner'
    ],
    meals: 'All meals included',
    accommodation: 'Into the Wild Africa Tented Camp',
    images: [
      'https://www.shutterstock.com/image-photo/sunset-serengeti-plains-acacia-trees-123456?w=800', // Sunset plains with acacia
      'https://intowildafrica.com/gallery/lions-plains.jpg?w=800', // Wildlife scene
    ],
    lodgeInfo: {
      name: 'Serengeti Harmony Day',
      features: [
        'Unhurried pace for deep nature connection',
        'Focus on ecosystems and animal behavior',
        'Respectful, reflective safari experience'
      ]
    }
  },
  {
    day: 5,
    title: 'Serengeti to Ngorongoro Conservation Area – The Natural Wonder of the Crater',
    location: 'Marera Valley Lodge | Karatu, Tanzania',
    activities: [
      'Scenic drive to Ngorongoro highlands',
      'Crater rim viewpoints for panoramic caldera views',
      'Afternoon arrival and relaxation at lodge',
      'Quiet evening reflection'
    ],
    meals: 'All meals included',
    accommodation: 'Marera Valley Lodge',
    images: [
      'https://www.safaribookings.com/ngorongoro/photos/large/view-over-the-crater-floor-from-the-rim.jpg?w=800', // Crater rim panorama
      'https://www.bougainvilleagroup.com/marera-valley-lodge/rooms.jpg?w=800', // Lodge valley views
    ],
    lodgeInfo: {
      name: 'Marera Valley Lodge Information',
      features: [
        'Green valley setting with beautiful gardens',
        'Comfortable rooms and peaceful environment',
        'Ideal for rest before cultural day'
      ]
    }
  },
  {
    day: 6,
    title: 'Maasai Cultural Experience – Living Traditions & Human Connection',
    location: 'Pazuri Inn | Arusha, Tanzania',
    activities: [
      'Visit authentic Maasai village with consent',
      'Traditional songs, dances, manyatta homes, cattle culture stories',
      'Respectful exchange, questions, photography (with permission)',
      'Afternoon transfer to Arusha',
      'Farewell dinner celebrating the journey'
    ],
    meals: 'All meals included',
    accommodation: 'Pazuri Inn',
    images: [
      'https://www.gettyimages.com/detail/photo/maasai-warriors-jumping-dance-royalty-free-image/987654321?w=800', // Maasai jumping dance
      'https://pazuriinn.com/wp-content/uploads/rooms.jpg?w=800', // Pazuri Inn rooms
    ],
    lodgeInfo: {
      name: 'Pazuri Inn Information',
      features: [
        'Comfortable boutique accommodation in Arusha',
        'Modern, spacious rooms for final night',
        'Warm farewell setting'
      ]
    }
  },
  {
    day: 7,
    title: 'Departure – Farewell to Tanzania',
    location: 'Kilimanjaro International Airport',
    activities: [
      'Breakfast and final relaxation',
      'Private transfer to airport',
      'Onward journey with cherished memories'
    ],
    meals: 'Breakfast',
    accommodation: 'End of journey',
    images: [
      'https://www.tripadvisor.com/Hotel_Review-g297913-d23559963-Reviews-Under_The_Shade_Safari_Lodge-Arusha_Arusha_Region.html#photos?w=800',
    ],
    lodgeInfo: {
      name: 'Farewell Reflections',
      features: [
        'Memories of nature, culture, and harmony'
      ]
    }
  }
];

export default function CulturalSafariJapanPage() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const packageName = "7-Day Special Cultural & Safari Itinerary for Japanese Guests";
  const packagePrice = "$3,950";

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <section className="relative h-[400px] md:h-[550px]">
        <ImageWithFallback
          src="https://skjtravel.com/wp-content/uploads/2015/07/Tarangire-Elephants-Baobabs.jpg"
          alt="Tarangire Elephants & Baobabs - Cultural Safari"
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
              <span className="text-white/70">7-Day Cultural Safari for Japanese Guests</span>
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
                    <span>7 Days / 6 Nights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>Northern Tanzania (Tarangire, Serengeti, Ngorongoro & Maasai)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="fill-[#fbbf24] text-[#fbbf24]" size={18} />
                    <span>5.0 (cultural focus)</span>
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
                <h2 className="text-[28px] sm:text-[32px] text-[#333333] mb-6">Cultural Safari Overview</h2>
                <p className="text-[16px] text-[#686868] leading-[28px] mb-4">
                  A gentle journey for Japanese travelers blending world-famous wildlife with authentic Maasai cultural encounters. Experience harmony between nature and people in Tarangire, Serengeti, and Ngorongoro, paced respectfully for comfort, reflection, and meaningful connection.
                </p>
                <p className="text-[16px] text-[#686868] leading-[28px]">
                  Thoughtful guiding, comfortable lodges, and quiet observation ensure a serene, enriching experience celebrating Tanzania's living heritage.
                </p>

                {/* Quick Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Duration</div>
                    <div className="text-[16px] text-[#333333]">7 Days</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#1f751f]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="text-[#1f751f]" size={24} />
                    </div>
                    <div className="text-[14px] text-[#686868]">Group Size</div>
                    <div className="text-[16px] text-[#333333]">Small/Private</div>
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
                    <div className="text-[16px] text-[#333333]">Kilimanjaro / Arusha</div>
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
                        alt={`Cultural safari photo ${index + 1}`}
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
                      <div className="text-[18px] text-[#333333]">Per Person (Sharing)</div>
                      <div className="text-[14px] text-[#686868]">Mid-range cultural package</div>
                    </div>
                    <div className="text-[24px] text-[#1f751f]">{packagePrice}</div>
                  </div>
                  <p className="text-[14px] text-[#686868] mt-6">
                    * Prices per person, subject to availability. Includes cultural visits and gentle pacing. May vary by season.
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
                      'All accommodation as specified',
                      'All meals as per itinerary',
                      'Private safari vehicle & professional guide',
                      'Park entrance & conservation fees',
                      'Maasai village cultural visit (respectful)',
                      'Game drives & activities described',
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
                      'Personal expenses & tips',
                      'Optional activities not listed'
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
                    Our team can customize this cultural safari for your preferences.
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
                      <span>Respectful cultural guiding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#1f751f] mt-0.5 flex-shrink-0" />
                      <span>Gentle, reflective pacing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#1f751f] mt-0.5 flex-shrink-0" />
                      <span>Flexible options</span>
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
            <p className="text-[16px] text-[#686868]">5.0 out of 5 for cultural harmony</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-[15px] p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-5 h-5 fill-[#00AA6C] text-[#00AA6C]" />)}
              </div>
              <h4 className="text-[18px] text-[#333333] mb-2">Deeply Meaningful</h4>
              <p className="text-[15px] text-[#686868] mb-4 leading-[24px]">
                "The gentle pace, Maasai welcome, and natural harmony touched us deeply. Perfect for reflection."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1f751f] flex items-center justify-center text-white">YK</div>
                <div>
                  <div className="text-[14px] text-[#333333]">Yuko K.</div>
                  <div className="text-[13px] text-[#686868]">Japan • Dec 2025</div>
                </div>
              </div>
            </div>
            {/* Add 1-2 more sample reviews if desired */}
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