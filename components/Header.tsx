"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const safariPackages = [
  {
    title: "Wildlife Safaris",
    description: "Experience Africa's incredible wildlife",
    image:
      "https://images.unsplash.com/photo-1681139504760-4c17f2c8b380?w=400",
    href: "/safaris/wildlife",
  },
  {
    title: "Photography Safaris",
    description: "Capture stunning wildlife moments",
    image:
      "https://images.unsplash.com/photo-1689479665582-51d0c25215b7?w=400",
    href: "/safaris/photography",
  },
  {
    title: "Luxury Safaris",
    description: "Premium safari experiences",
    image:
      "https://images.unsplash.com/photo-1516494982030-fda424f96b59?w=400",
    href: "/safaris/luxury",
  },
];

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({
  transparent = false,
}: HeaderProps) {
  const pathname = usePathname();
  const [safariDropdownOpen, setSafariDropdownOpen] =
    useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Auto-detect pages that should have transparent header
  // Only home page is transparent by default now
  const shouldBeTransparent = transparent || pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force transparent state on home page before scrolling, otherwise use solid state
  const isTransparent = shouldBeTransparent && !scrolled;

  const textColor = isTransparent
    ? "text-white"
    : "text-[#0f440f]";
  const hoverColor = isTransparent
    ? "hover:text-white/80"
    : "hover:text-[#1f751f]";

  // Use a negative margin top to overlap the hero section content on home page
  // Use sticky for others
  const headerClass = shouldBeTransparent
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`
    : `sticky top-0 z-50 transition-all duration-300 ${transparent && !scrolled ? "bg-transparent" : "bg-white/95 backdrop-blur-sm shadow-sm"}`;

  return (
    <header className={headerClass}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-[20px] py-[15px] sm:py-[20px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-[50px] sm:h-[65.86px] w-[150px] sm:w-[200px] relative">
              <img
                src="https://ndewedotours.com/wp-content/uploads/2025/02/Ndewedo-Logo3-249x82-2.webp"
                alt="Ndewedo Tours"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-[20px]">
            <Link
              href="/"
              className={`${textColor} ${hoverColor} transition-colors font-['Poppins'] text-[18.7px]`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${textColor} ${hoverColor} transition-colors font-['Poppins'] text-[18.7px]`}
            >
              About
            </Link>

            {/* Safaris Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSafariDropdownOpen(true)}
              onMouseLeave={() => setSafariDropdownOpen(false)}
            >
              <Link
                href="/safaris"
                className={`flex items-center gap-1 ${textColor} ${hoverColor} transition-colors font-['Poppins'] text-[19px]`}
              >
                Safaris
                <ChevronDown className="w-[19px] h-[19px]" />
              </Link>
              {safariDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-[15px] py-3 min-w-[320px] border border-gray-100">
                  {safariPackages.map((pkg, index) => (
                    <Link
                      key={index}
                      href={pkg.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-[10px] overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[#0f440f] text-[15px]">
                          {pkg.title}
                        </div>
                        <div className="text-[#686868] text-[13px]">
                          {pkg.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/trekking"
              className={`${textColor} ${hoverColor} transition-colors font-['Poppins'] text-[18.7px]`}
            >
              Trekking
            </Link>
            <Link
              href="/cultural-tours"
              className={`${textColor} ${hoverColor} transition-colors font-['Poppins'] text-[18.7px]`}
            >
              Cultural Tours
            </Link>
            <Link
              href="/volunteer"
              className={`${textColor} ${hoverColor} transition-colors font-['Poppins'] text-[18.7px]`}
            >
              Volunteer
            </Link>
            <Link
              href="/blog"
              className={`${textColor} ${hoverColor} transition-colors font-['Poppins'] text-[18.7px]`}
            >
              Blog
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <Link
            href="/inquire"
            className={`hidden lg:block px-[20.8px] py-[10.8px] rounded-[50px] font-['Poppins'] text-[18px] transition-colors ${
              isTransparent
                ? "bg-transparent border border-white text-white hover:bg-white hover:text-[#0f440f]"
                : "bg-transparent border border-[#102310] text-[#0f440f] hover:bg-[#0f440f] hover:text-white"
            }`}
          >
            Inquire Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 ${textColor}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white rounded-b-[20px] shadow-xl absolute top-[80px] left-0 right-0 px-4">
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-[#0f440f] hover:text-[#1f751f] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-[#0f440f] hover:text-[#1f751f] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="py-2">
                <div className="text-[#0f440f] mb-2">
                  Safaris
                </div>
                <div className="pl-4 flex flex-col gap-2">
                  {safariPackages.map((pkg, index) => (
                    <Link
                      key={index}
                      href={pkg.href}
                      className="text-[#686868] hover:text-[#1f751f] transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {pkg.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/trekking"
                className="text-[#0f440f] hover:text-[#1f751f] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trekking
              </Link>
              <Link
                href="/cultural-tours"
                className="text-[#0f440f] hover:text-[#1f751f] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cultural Tours
              </Link>
              <Link
                href="/volunteer"
                className="text-[#0f440f] hover:text-[#1f751f] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Volunteer
              </Link>
              <Link
                href="/blog"
                className="text-[#0f440f] hover:text-[#1f751f] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="bg-[#0f440f] text-white px-6 py-3 rounded-[50px] text-center mt-2 hover:bg-[#1f751f] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inquire Today
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}