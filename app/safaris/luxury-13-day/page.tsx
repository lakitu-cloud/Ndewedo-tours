import type { Metadata } from 'next'
import { HeroSection } from '@/components/HeroSection'

export const metadata: Metadata = {
  title: 'Luxury Safaris - Ndewedo Tours',
  description: 'Experience Tanzania in ultimate luxury with our premium safari packages.',
}

export default function LuxurySafarisPage() {
  return (
    <div className="w-full">
      <HeroSection 
        title="Luxury Safaris" 
        description="Experience the wilderness in unparalleled comfort and style"
        image="https://images.unsplash.com/photo-1547471080-7541e8856987?q=80&w=2070&auto=format&fit=crop"
        ctaText="Explore Luxury Options"
        ctaLink="/contact"
      />

      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto text-[18px] text-[#686868] leading-[28.8px]">
          <p className="mb-8">
            Our luxury safaris combine the thrill of wildlife encounters with five-star accommodations, gourmet cuisine, and personalized service. Stay in premium lodges and exclusive tented camps while enjoying private game drives and expert guides.
          </p>
        </div>
      </section>
    </div>
  )
}
