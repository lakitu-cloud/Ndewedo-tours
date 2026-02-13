"use client";

import { useState } from 'react'
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import { toast } from 'sonner'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://gilleadsafaris.com/backend/contact_form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.interest,
          message: `Phone: ${formData.phone}\n\n${formData.message}`
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message || 'Message sent successfully!')
        setFormData({
          name: '',
          email: '',
          phone: '',
          interest: '',
          message: ''
        })
      } else {
        toast.error(data.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <HeroSection 
        title="Contact Us"
        description="Ready to start your Tanzania adventure? Get in touch with us today"
        image="https://images.unsplash.com/photo-1596464716127-f9a86b562636?q=80&w=2070&auto=format&fit=crop"
        showCta={false}
      />

      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-[35px] font-semibold text-[#333333] mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[16px] text-[#333333] mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-[16px] text-[#333333] mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[16px] text-[#333333] mb-2">Phone</label>
                  <input
                    type="tel"
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label className="block text-[16px] text-[#333333] mb-2">I'm Interested In *</label>
                  <select
                    required
                    disabled={isSubmitting}
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50"
                  >
                    <option value="">Select an option</option>
                    <option value="Wildlife Safaris">Wildlife Safaris</option>
                    <option value="Kilimanjaro Trekking">Kilimanjaro Trekking</option>
                    <option value="Cultural Tours">Cultural Tours</option>
                    <option value="Volunteer Programs">Volunteer Programs</option>
                    <option value="Custom Package">Custom Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[16px] text-[#333333] mb-2">Message *</label>
                  <textarea
                    required
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1f751f] disabled:bg-gray-50"
                    placeholder="Tell us about your dream Tanzania adventure..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1f751f] text-white px-8 py-4 rounded-[50px] text-[18px] hover:bg-[#0f440f] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-[35px] font-semibold text-[#333333] mb-6">Get In Touch</h2>
                <p className="text-[18px] text-[#686868] leading-[28.8px] mb-8">
                  We're here to help plan your perfect Tanzania experience. Reach out to us through any of the channels below.
                </p>
              </div>

              {/* Tanzania Office */}
              <div className="bg-gradient-to-r from-[rgba(31,117,31,0.04)] to-[rgba(31,117,31,0.04)] p-6 rounded-[20px]">
                <h3 className="text-[24px] font-semibold text-[#1f751f] mb-4">Tanzania Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-[#1f751f] mt-1" size={20} />
                    <p className="text-[16px] text-[#686868]">
                      P.O.BOX 11677 -Sakina Arusha, Tanzania
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-[#1f751f] mt-1" size={20} />
                    <a href="mailto:info@ndewedotours.com" className="text-[16px] text-[#686868] hover:text-[#1f751f]">
                      info@ndewedotours.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-[#1f751f] mt-1" size={20} />
                    <a href="tel:+255753243280" className="text-[16px] text-[#686868] hover:text-[#1f751f]">
                      +255 753 243 280
                    </a>
                  </div>
                </div>
              </div>

              {/* UK Office */}
              <div className="bg-gradient-to-r from-[rgba(31,117,31,0.04)] to-[rgba(31,117,31,0.04)] p-6 rounded-[20px]">
                <h3 className="text-[24px] font-semibold text-[#1f751f] mb-4">UK Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-[#1f751f] mt-1" size={20} />
                    <p className="text-[16px] text-[#686868]">
                      KY1 1PA, Kirkcaldy, Scotland, UK
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-[#1f751f] mt-1" size={20} />
                    <a href="mailto:natalie@ndewedotours.com" className="text-[16px] text-[#686868] hover:text-[#1f751f]">
                      natalie@ndewedotours.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-[#1f751f] mt-1" size={20} />
                    <a href="tel:+447432038845" className="text-[16px] text-[#686868] hover:text-[#1f751f]">
                      +44 743 203 8845
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-r from-[rgba(31,117,31,0.04)] to-[rgba(31,117,31,0.04)] p-6 rounded-[20px]">
                <h3 className="text-[24px] font-semibold text-[#1f751f] mb-4">Office Hours</h3>
                <div className="text-[16px] text-[#686868] space-y-2">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM (EAT)</p>
                  <p>Saturday: 9:00 AM - 2:00 PM (EAT)</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
