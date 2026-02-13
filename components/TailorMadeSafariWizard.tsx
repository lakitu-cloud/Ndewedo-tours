"use client";

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface TailorMadeSafariWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TailorMadeSafariWizard({ isOpen, onClose }: TailorMadeSafariWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    countries: [] as string[],
    parks: [] as string[],
    activities: [] as string[],
    duration: '',
    startDate: '',
    budget: '',
    fullName: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });

  if (!isOpen) return null;

  const totalSteps = 6;

  const countries = [
    'Tanzania', 'Kenya', 'Uganda', 'Rwanda', 'Botswana', 'South Africa', 'Namibia', 'Zimbabwe'
  ];

  const parks = [
    'Serengeti National Park', 'Ngorongoro Crater', 'Tarangire National Park',
    'Lake Manyara National Park', 'Ruaha National Park', 'Selous Game Reserve',
    'Mikumi National Park', 'Arusha National Park'
  ];

  const activities = [
    'Game Drives', 'Walking Safaris', 'Hot Air Balloon Safari', 'Bird Watching',
    'Photography Safari', 'Cultural Tours', 'Night Game Drives', 'Bush Dining',
    'Camping', 'Luxury Lodge Stays'
  ];

  const handleToggleSelection = (category: 'countries' | 'parks' | 'activities', item: string) => {
    setFormData((prev) => {
      const currentList = prev[category];
      if (currentList.includes(item)) {
        return { ...prev, [category]: currentList.filter((i) => i !== item) };
      } else {
        return { ...prev, [category]: [...currentList, item] };
      }
    });
  };

  const handleNext = () => {
    if (currentStep === 1 && formData.countries.length === 0) {
      toast.error('Please select at least one country');
      return;
    }
    if (currentStep === 2 && formData.parks.length === 0) {
      toast.error('Please select at least one national park');
      return;
    }
    if (currentStep === 3 && formData.activities.length === 0) {
      toast.error('Please select at least one activity');
      return;
    }
    if (currentStep === 4 && (!formData.duration || !formData.startDate)) {
      toast.error('Please select duration and start date');
      return;
    }
    if (currentStep === 5 && !formData.budget) {
      toast.error('Please select your budget range');
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://gilleadsafaris.com/backend/tailor_made.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Your tailor-made safari request has been submitted!');
        onClose();
        // Reset form
        setFormData({
          countries: [],
          parks: [],
          activities: [],
          duration: '',
          startDate: '',
          budget: '',
          fullName: '',
          email: '',
          phone: '',
          additionalInfo: ''
        });
        setCurrentStep(1);
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Wizard error:', error);
      toast.error('Failed to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-[22px] text-[#333333] mb-4 font-semibold">Which countries would you like to visit?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {countries.map((country) => (
                <button
                  key={country}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleToggleSelection('countries', country)}
                  className={`px-4 py-3 rounded-[10px] text-[15px] border-2 transition-all flex items-center justify-center gap-2 ${
                    formData.countries.includes(country)
                      ? 'bg-[#1f751f] text-white border-[#1f751f]'
                      : 'bg-white text-[#333333] border-gray-300 hover:border-[#1f751f]'
                  }`}
                >
                  {formData.countries.includes(country) && <Check size={16} />}
                  {country}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-[22px] text-[#333333] mb-4 font-semibold">Select National Parks to Visit</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {parks.map((park) => (
                <button
                  key={park}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleToggleSelection('parks', park)}
                  className={`px-4 py-3 rounded-[10px] text-[15px] border-2 transition-all text-left flex items-center gap-2 ${
                    formData.parks.includes(park)
                      ? 'bg-[#1f751f] text-white border-[#1f751f]'
                      : 'bg-white text-[#333333] border-gray-300 hover:border-[#1f751f]'
                  }`}
                >
                  {formData.parks.includes(park) && <Check size={16} />}
                  {park}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-[22px] text-[#333333] mb-4 font-semibold">What activities interest you?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {activities.map((activity) => (
                <button
                  key={activity}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleToggleSelection('activities', activity)}
                  className={`px-4 py-3 rounded-[10px] text-[15px] border-2 transition-all flex items-center justify-center gap-2 ${
                    formData.activities.includes(activity)
                      ? 'bg-[#1f751f] text-white border-[#1f751f]'
                      : 'bg-white text-[#333333] border-gray-300 hover:border-[#1f751f]'
                  }`}
                >
                  {formData.activities.includes(activity) && <Check size={16} />}
                  {activity}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-[22px] text-[#333333] mb-4 font-semibold">Duration & Start Date</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[15px] text-[#333333] mb-2">How many days? *</label>
                <select
                  required
                  disabled={isSubmitting}
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] text-[15px] focus:outline-none focus:border-[#1f751f] bg-white"
                >
                  <option value="">Select duration</option>
                  <option value="3-5">3-5 days</option>
                  <option value="6-8">6-8 days</option>
                  <option value="9-12">9-12 days</option>
                  <option value="13-15">13-15 days</option>
                  <option value="16+">16+ days</option>
                </select>
              </div>
              <div>
                <label className="block text-[15px] text-[#333333] mb-2">Preferred Start Date *</label>
                <input
                  type="date"
                  required
                  disabled={isSubmitting}
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] text-[15px] focus:outline-none focus:border-[#1f751f]"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-[22px] text-[#333333] mb-4 font-semibold">What's your budget?</h3>
            <div className="space-y-3">
              {[
                { label: 'Budget-Friendly (Under $1,500 per person)', value: 'budget' },
                { label: 'Mid-Range ($1,500 - $3,000 per person)', value: 'mid-range' },
                { label: 'Luxury ($3,000 - $5,000 per person)', value: 'luxury' },
                { label: 'Ultra-Luxury ($5,000+ per person)', value: 'ultra-luxury' },
                { label: 'I\'m flexible', value: 'flexible' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setFormData({ ...formData, budget: option.value })}
                  className={`w-full px-6 py-4 rounded-[10px] text-[15px] border-2 transition-all text-left flex items-center gap-3 ${
                    formData.budget === option.value
                      ? 'bg-[#1f751f] text-white border-[#1f751f]'
                      : 'bg-white text-[#333333] border-gray-300 hover:border-[#1f751f]'
                  }`}
                >
                  {formData.budget === option.value && <Check size={18} />}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-[22px] text-[#333333] mb-4 font-semibold">Your Contact Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[15px] text-[#333333] mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] text-[15px] focus:outline-none focus:border-[#1f751f]"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-[15px] text-[#333333] mb-2">Email *</label>
                <input
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] text-[15px] focus:outline-none focus:border-[#1f751f]"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-[15px] text-[#333333] mb-2">Phone Number</label>
                <input
                  type="tel"
                  disabled={isSubmitting}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] text-[15px] focus:outline-none focus:border-[#1f751f]"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-[15px] text-[#333333] mb-2">Additional Information</label>
                <textarea
                  rows={4}
                  disabled={isSubmitting}
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] text-[15px] focus:outline-none focus:border-[#1f751f]"
                  placeholder="Any special requests?"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-[25px] max-w-[800px] w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-[26px] text-[#0f440f] font-bold">Build Your Custom Safari</h2>
            <p className="text-[14px] text-[#686868] mt-1">Step {currentStep} of {totalSteps}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-8 py-2 bg-gray-50">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-[#1f751f] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1 || isSubmitting}
                className="flex items-center gap-2 px-6 py-3 rounded-[50px] font-semibold text-[#333333] hover:bg-gray-100 transition-colors disabled:opacity-30"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 rounded-[50px] bg-[#1f751f] text-white font-semibold hover:bg-[#0f440f] transition-all shadow-lg hover:shadow-[#1f751f]/20"
                >
                  Next Step
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-10 py-3 rounded-[50px] bg-[#1f751f] text-white font-bold hover:bg-[#0f440f] transition-all shadow-xl hover:shadow-[#1f751f]/20 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px] justify-center"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Check size={20} />
                      Finalize Request
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
