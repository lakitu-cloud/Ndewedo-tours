"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { 
  ArrowRight, Mountain, Users, Camera, Heart, Star, 
  Sparkles, Calendar, Clock, MapPin, Compass, ShieldCheck, 
  Map, MessageSquare
} from 'lucide-react';
import DestinationsCarousel from '@/components/DestinationsCarousel';
import TailorMadeSafariWizard from '@/components/TailorMadeSafariWizard';
import { posts } from './blog/data';

export default function HomePage() {
  const [showWizard, setShowWizard] = useState(false);

  // Take the latest 3 blog posts
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="w-full font-['Poppins']">
      {/* Hero Section with Background Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://www.asiliaafrica.com/wp-content/uploads/2024/04/30sec-Teaser-2-master-clean.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-4 max-w-[1200px]">
          <h1 className="text-[36px] sm:text-[50px] md:text-[60px] lg:text-[70px] mb-4 sm:mb-6 leading-tight font-bold">
            Experience the Magic of <span className="text-[#c97500]">Tanzania</span>
          </h1>
          <p className="text-[16px] sm:text-[20px] md:text-[24px] mb-6 sm:mb-8 max-w-[800px] mx-auto leading-relaxed">
            Embark on unforgettable adventures through wildlife safaris, mountain treks, and authentic cultural experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/safaris"
              className="bg-[#1f751f] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-[50px] text-[16px] sm:text-[18px] font-semibold hover:bg-[#0f440f] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Explore Safaris <ArrowRight size={20} />
            </Link>
            <button
              onClick={() => setShowWizard(true)}
              className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-[50px] text-[16px] sm:text-[18px] font-semibold hover:bg-white hover:text-[#0f440f] transition-all transform hover:scale-105 inline-flex items-center justify-center"
            >
              Plan Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[45px] font-bold text-[#222] mb-4">
              Your Gateway to <span className="text-[#1f751f]">Authentic Tanzania</span>
            </h2>
            <div className="h-[5px] w-[80px] bg-[#1f751f] rounded-[30px] mx-auto mb-6" />
            <p className="text-[17px] text-[#666] max-w-[850px] mx-auto leading-relaxed">
              We deliver exceptional travel experiences tailored to your dreams, from thrilling wildlife encounters to deep cultural immersions and legendary mountain treks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Wildlife Safaris", icon: Camera, link: "/safaris", image: "https://images.unsplash.com/photo-1681139504760-4c17f2c8b380?w=800", desc: "Witness Africa's incredible wildlife in their natural habitat across Tanzania's renowned national parks." },
              { title: "Kilimanjaro Trekking", icon: Mountain, link: "/trekking", image: "https://images.unsplash.com/photo-1613061445510-e296bfedb73e?w=800", desc: "Conquer Africa's highest peak with expert guides and well-planned routes for an unforgettable climb." },
              { title: "Cultural Tours", icon: Users, link: "/cultural-tours", image: "https://images.unsplash.com/photo-1603703218844-a526eefafb05?w=800", desc: "Immerse yourself in local traditions with visits to Maasai tribes and ancient local villages." },
              { title: "Volunteer Programs", icon: Heart, link: "/volunteer", image: "https://images.unsplash.com/photo-1535757596010-06fbdd41fd42?w=800", desc: "Make a difference by volunteering in local communities and conservation projects." }
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-[25px] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col group overflow-hidden">
                <div className="relative h-[220px] overflow-hidden">
                  <ImageWithFallback src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-[#1f751f] w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <service.icon className="text-white" size={24} />
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-[22px] font-bold text-[#222] mb-3 group-hover:text-[#1f751f] transition-colors">{service.title}</h3>
                  <p className="text-[15px] text-[#666] mb-6 leading-relaxed flex-grow">{service.desc}</p>
                  <Link href={service.link} className="text-[#1f751f] font-bold inline-flex items-center gap-2 group/btn">
                    Learn More <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 px-4 bg-gray-50 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[45px] font-bold text-[#222] mb-4">
              Explore <span className="text-[#1f751f]">East Africa</span>
            </h2>
            <div className="h-[5px] w-[80px] bg-[#1f751f] rounded-[30px] mx-auto mb-6" />
            <p className="text-[17px] text-[#666] max-w-[850px] mx-auto leading-relaxed">
              Discover iconic destinations across Tanzania and Kenya, from pristine island beaches to majestic mountain ranges.
            </p>
          </div>
          <DestinationsCarousel />
        </div>
      </section>

      {/* Elegant Tailor-Made Safari Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="bg-[#0f440f] rounded-[40px] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop"
                alt="Tailor-Made Safari"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f440f] via-[#0f440f]/40 to-transparent" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-8 sm:p-12 lg:p-20">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#c97500]/20 px-4 py-2 rounded-full mb-6">
                    <Sparkles className="text-[#c97500]" size={20} />
                    <span className="text-[13px] font-bold uppercase tracking-widest text-[#c97500]">Your Journey, Your Way</span>
                  </div>
                  <h2 className="text-[36px] sm:text-[48px] font-bold text-white leading-tight mb-6">
                    Craft Your Personal <br/><span className="text-[#c97500]">Safari Masterpiece</span>
                  </h2>
                  <p className="text-[18px] text-white/80 leading-relaxed max-w-[500px]">
                    Every traveler is unique. Design your perfect adventure by choosing destinations, activities, and dates that match your dreams.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: Compass, title: "Custom Routes", desc: "Personalized itineraries" },
                    { icon: Calendar, title: "Flexible Dates", desc: "Travel at your pace" },
                    { icon: ShieldCheck, title: "Expert Support", desc: "24/7 dedicated assistance" },
                    { icon: Map, title: "Prime Locations", desc: "The best hidden gems" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="bg-[#c97500] p-2.5 rounded-xl flex-shrink-0 shadow-lg shadow-[#c97500]/20">
                        <item.icon className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-[16px]">{item.title}</h4>
                        <p className="text-white/60 text-[13px]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowWizard(true)}
                  className="bg-[#c97500] text-white px-10 py-4 rounded-[50px] text-[18px] font-bold hover:bg-white hover:text-[#0f440f] transition-all transform hover:-translate-y-1 shadow-xl shadow-[#c97500]/20 flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  <Sparkles size={22} />
                  Start Building My Safari
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Updates (Replaces Why Choose Us) */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left">
              <h2 className="text-[32px] sm:text-[45px] font-bold text-[#222] mb-4">
                Recent <span className="text-[#1f751f]">Safari Updates</span>
              </h2>
              <div className="h-[5px] w-[80px] bg-[#1f751f] rounded-[30px] mb-6" />
              <p className="text-[17px] text-[#666] max-w-[600px] leading-relaxed">
                Stay updated with the latest stories, wildlife sightings, and expert travel tips from the heart of Tanzania.
              </p>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 bg-white text-[#1f751f] px-8 py-3 rounded-full font-bold border border-[#1f751f]/20 hover:bg-[#1f751f] hover:text-white transition-all shadow-sm">
              View All Posts <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, i) => (
              <Link href={post.href} key={i} className="group block h-full">
                <article className="bg-white rounded-[25px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100">
                  <div className="relative h-[240px] overflow-hidden">
                    <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[12px] font-bold text-[#1f751f] shadow-sm uppercase tracking-wider">
                      {post.date}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-[22px] font-bold text-[#222] mb-4 leading-tight group-hover:text-[#1f751f] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[15px] text-[#666] leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="pt-6 border-t border-gray-100 mt-auto flex items-center justify-between">
                      <span className="text-[14px] font-bold text-[#1f751f] uppercase tracking-widest flex items-center gap-2">
                        Read Story <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="flex gap-2">
                        <MessageSquare size={16} className="text-gray-300" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-4 bg-[#0f440f] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-[120px]" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#c97500] rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <h2 className="text-[36px] sm:text-[50px] font-bold mb-6">
            Ready to Start Your <br/><span className="text-[#c97500]">African Adventure?</span>
          </h2>
          <p className="text-[18px] sm:text-[22px] mb-10 text-white/80 max-w-[700px] mx-auto leading-relaxed">
            Let us help you plan the perfect Tanzania experience tailored exactly to your dreams. Your journey begins here.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button
              onClick={() => setShowWizard(true)}
              className="bg-[#1f751f] text-white px-10 py-4 rounded-[50px] text-[18px] font-bold hover:bg-white hover:text-[#0f440f] transition-all transform hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-2"
            >
              Get Started Today <ArrowRight size={22} />
            </button>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-[50px] text-[18px] font-bold hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Speak to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Tailor-Made Safari Wizard Modal */}
      <TailorMadeSafariWizard isOpen={showWizard} onClose={() => setShowWizard(false)} />
    </div>
  );
}