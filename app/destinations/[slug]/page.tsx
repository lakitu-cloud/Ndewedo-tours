import type { Metadata } from 'next'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { ArrowRight, MapPin, Clock, Users, Star, Check, Calendar } from 'lucide-react'

// This would normally come from a database or CMS
const destinations: Record<string, any> = {
  zanzibar: {
    name: 'Zanzibar',
    description: 'The Spice Island paradise',
    heroImage: 'https://images.unsplash.com/photo-1707296014163-488ae4006ce7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6YW56aWJhciUyMGJlYWNoJTIwdGFuemFuaWF8ZW58MXx8fHwxNzYzOTM2MTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    overview: 'Zanzibar is a stunning archipelago off the coast of Tanzania, famous for its pristine white-sand beaches, turquoise waters, and rich cultural heritage. Stone Town, a UNESCO World Heritage Site, offers a glimpse into the island\'s fascinating history as a trading hub.',
    bestTime: 'June to October (dry season)',
    duration: '3-7 days',
    highlights: [
      'Stone Town historic center',
      'Pristine beaches and coral reefs',
      'Spice plantation tours',
      'Swimming with dolphins',
      'Jozani Forest - red colobus monkeys',
      'Sunset dhow cruises'
    ],
    experiences: [
      {
        title: 'Beach Paradise',
        description: 'Relax on some of the world\'s most beautiful beaches with powder-white sand and crystal-clear waters.',
        image: 'https://images.unsplash.com/photo-1707296014163-488ae4006ce7?w=600'
      },
      {
        title: 'Cultural Heritage',
        description: 'Explore Stone Town\'s winding alleys, historic buildings, and vibrant markets.',
        image: 'https://images.unsplash.com/photo-1621016148650-b2f1a6aa1d00?w=600'
      },
      {
        title: 'Water Sports',
        description: 'Dive, snorkel, or kitesurf in the warm Indian Ocean waters.',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600'
      }
    ],
    activities: [
      'Snorkeling and diving',
      'Spice farm visits',
      'Historical tours',
      'Water sports',
      'Beach relaxation',
      'Sunset cruises'
    ]
  },
  serengeti: {
    name: 'Serengeti National Park',
    description: 'Where wildlife roams free',
    heroImage: 'https://images.unsplash.com/photo-1528275646751-ff237d1cd935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBuYXRpb25hbCUyMHBhcmt8ZW58MXx8fHwxNzYzOTM2MTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    overview: 'The Serengeti is Tanzania\'s oldest and most famous national park, known for its annual Great Migration of over 1.5 million wildebeest and hundreds of thousands of zebras. It offers unparalleled opportunities to witness Africa\'s magnificent wildlife in their natural habitat.',
    bestTime: 'December to July (Great Migration)',
    duration: '3-7 days',
    highlights: [
      'The Great Migration',
      'Big Five wildlife viewing',
      'Endless plains and savannas',
      'Hot air balloon safaris',
      'Predator hunting scenes',
      'Spectacular sunsets'
    ],
    experiences: [
      {
        title: 'Great Migration',
        description: 'Witness one of nature\'s most spectacular events as millions of animals cross the plains.',
        image: 'https://images.unsplash.com/photo-1528275646751-ff237d1cd935?w=600'
      },
      {
        title: 'Big Five Safari',
        description: 'Spot lions, elephants, buffalo, leopards, and rhinos in their natural habitat.',
        image: 'https://images.unsplash.com/photo-1689479665582-51d0c25215b7?w=600'
      },
      {
        title: 'Hot Air Balloon',
        description: 'Experience the Serengeti from above with a sunrise hot air balloon ride.',
        image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600'
      }
    ],
    activities: [
      'Game drives',
      'Hot air balloon safaris',
      'Walking safaris',
      'Photography tours',
      'Bird watching',
      'Cultural visits to Maasai villages'
    ]
  },
  ngorongoro: {
    name: 'Ngorongoro Crater',
    description: 'Africa\'s Garden of Eden',
    heroImage: 'https://images.unsplash.com/photo-1516494982030-fda424f96b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZ29yb25nb3JvJTIwY3JhdGVyfGVufDF8fHx8MTc2MzkzNjE0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    overview: 'The Ngorongoro Crater is the world\'s largest intact volcanic caldera, creating a natural amphitheater with an incredibly high concentration of wildlife. It\'s one of Africa\'s most beautiful natural wildlife safari sites.',
    bestTime: 'Year-round destination',
    duration: '1-3 days',
    highlights: [
      'World\'s largest intact caldera',
      'High density of wildlife',
      'Black rhino population',
      'Flamingos on Crater Lake',
      'Maasai cultural interactions',
      'Olduvai Gorge archaeological site'
    ],
    experiences: [
      {
        title: 'Crater Floor Safari',
        description: 'Descend 600 meters into the crater for incredible wildlife viewing.',
        image: 'https://images.unsplash.com/photo-1516494982030-fda424f96b59?w=600'
      },
      {
        title: 'Rhino Spotting',
        description: 'One of the best places in Tanzania to see the endangered black rhino.',
        image: 'https://images.unsplash.com/photo-1561731812-6e78e0a8a600?w=600'
      },
      {
        title: 'Cultural Heritage',
        description: 'Visit Maasai villages and learn about their traditional way of life.',
        image: 'https://images.unsplash.com/photo-1603703218844-a526eefafb05?w=600'
      }
    ],
    activities: [
      'Crater game drives',
      'Black rhino viewing',
      'Bird watching',
      'Maasai cultural visits',
      'Olduvai Gorge tours',
      'Crater rim walks'
    ]
  },
  kilimanjaro: {
    name: 'Mount Kilimanjaro',
    description: 'The Roof of Africa',
    heroImage: 'https://images.unsplash.com/photo-1613061445510-e296bfedb73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWxpbWFuamFybyUyMG1vdW50YWlufGVufDF8fHx8MTc2Mzg5NTQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    overview: 'Mount Kilimanjaro is Africa\'s highest peak at 5,895 meters (19,341 feet) and the world\'s tallest free-standing mountain. It offers a challenging but achievable climb through five distinct climate zones.',
    bestTime: 'January-March, June-October',
    duration: '5-9 days',
    highlights: [
      'Africa\'s highest peak',
      'Multiple climbing routes',
      'Five climate zones',
      'Glaciers and ice fields',
      'Stunning sunrise views',
      'Achievement of a lifetime'
    ],
    experiences: [
      {
        title: 'Summit Climb',
        description: 'Challenge yourself to reach Uhuru Peak, the highest point in Africa.',
        image: 'https://images.unsplash.com/photo-1613061445510-e296bfedb73e?w=600'
      },
      {
        title: 'Climate Zones',
        description: 'Trek through rainforest, moorland, alpine desert, and arctic zones.',
        image: 'https://images.unsplash.com/photo-1635865897833-38bc0f8aee44?w=600'
      },
      {
        title: 'Sunrise at Summit',
        description: 'Experience the unforgettable sunrise from the roof of Africa.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'
      }
    ],
    activities: [
      'Mountain climbing',
      'Trekking expeditions',
      'Photography',
      'Wildlife viewing on lower slopes',
      'Cultural visits to Chagga villages',
      'Coffee plantation tours'
    ]
  },
  // Add more destinations as needed
};

export async function generateStaticParams() {
  return Object.keys(destinations).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations[slug];
  return {
    title: `${destination?.name || 'Destination'} - Ndewedo Tours`,
    description: destination?.description || '',
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = destinations[slug];

  if (!destination) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[40px] text-[#333333] mb-4">Destination Not Found</h1>
          <Link href="/" className="text-[#1f751f] hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback 
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-[1200px]">
          <h1 className="text-[50px] sm:text-[60px] md:text-[80px] mb-4">{destination.name}</h1>
          <p className="text-[20px] sm:text-[26px] mb-8">{destination.description}</p>
          
          <div className="flex flex-wrap justify-center gap-6 text-[16px]">
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{destination.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{destination.bestTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[36px] sm:text-[45px] text-[#333333] mb-4">
              Overview
            </h2>
            <div className="h-[5px] w-[100px] bg-[#686868] rounded-[30px] mx-auto mb-8" />
            <p className="text-[16px] sm:text-[18px] text-[#686868] max-w-[900px] mx-auto leading-relaxed">
              {destination.overview}
            </p>
          </div>

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destination.highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-[15px] p-4">
                <Check className="text-[#1f751f] flex-shrink-0" size={24} />
                <span className="text-[15px] text-[#333333]">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[36px] sm:text-[45px] text-[#333333] mb-4">
              Unique <span className="text-[#1f751f]">Experiences</span>
            </h2>
            <div className="h-[5px] w-[100px] bg-[#686868] rounded-[30px] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {destination.experiences.map((experience: any, index: number) => (
              <div key={index} className="bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="relative h-[250px]">
                  <ImageWithFallback 
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-[22px] text-[#333333] mb-3">{experience.title}</h3>
                  <p className="text-[15px] text-[#686868] leading-relaxed">{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[36px] sm:text-[45px] text-[#333333] mb-4">
              What to Do
            </h2>
            <div className="h-[5px] w-[100px] bg-[#686868] rounded-[30px] mx-auto mb-8" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.activities.map((activity: string, index: number) => (
              <div key={index} className="bg-gradient-to-br from-[#1f751f] to-[#0f440f] text-white rounded-[15px] p-6 hover:scale-105 transition-transform">
                <div className="flex items-start gap-3">
                  <Star className="text-[#c97500] flex-shrink-0" size={24} />
                  <span className="text-[16px]">{activity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-r from-[#0f440f] to-[#1f751f] text-white">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-[36px] sm:text-[45px] mb-6">
            Ready to Explore {destination.name}?
          </h2>
          <p className="text-[18px] sm:text-[20px] mb-8 max-w-[700px] mx-auto opacity-90">
            Let our expert guides help you create an unforgettable journey to this incredible destination
          </p>
          <Link 
            href="/contact"
            className="bg-white text-[#0f440f] px-8 sm:px-10 py-3 sm:py-4 rounded-[50px] text-[16px] sm:text-[18px] hover:bg-[#c97500] hover:text-white transition-colors inline-flex items-center gap-2"
          >
            Plan Your Trip <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}