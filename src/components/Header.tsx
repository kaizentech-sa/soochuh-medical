"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  mainPhoneNumber?: string;
  whatsappNumber?: string;
  appointmentLink?: string;
};

function toTelHref(number: string) {
  return `tel:${number.replace(/\s+/g, "")}`;
}

function toWhatsAppHref(number: string) {
  return `https://wa.me/${number.replace(/\D+/g, "")}`;
}

export default function Header({
  mainPhoneNumber,
  whatsappNumber,
  appointmentLink,
}: HeaderProps) {
  const navItems = [
    {
      label: "About Us",
      dropdown: [
        { label: "What makes us different", href: "#difference" },
        { label: "Meet the team", href: "#team" },
        { label: "Meet Dr Corne Smith", href: "#" },
        { label: "Meet Dr Jean van Lierop", href: "#" },
      ],
    },
    {
      label: "Services",
      dropdown: [
        { label: "Advanced & Cosmetic Dentistry", href: "#services" },
        { label: "Smile Makeovers", href: "#" },
        { label: "Veneers", href: "#" },
        { label: "Dental Bonding", href: "#" },
        { label: "Implants", href: "#" },
        { label: "General Dentistry", href: "#" },
        { label: "Oral Hygiene", href: "#" },
        { label: "Invisalign", href: "#" },
      ],
    },
    {
      label: "Smile Gallery",
      dropdown: [
        { label: "Smile Gallery", href: "#gallery" },
        { label: "Practice Gallery", href: "#" },
      ],
    },
    { label: "Reviews", href: "#testimonials" },
    {
      label: "Patient Corner",
      dropdown: [
        { label: "International Patients", href: "#" },
        { label: "Patient Information Form", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Pricing and Payment Options", href: "#" },
        { label: "First Visit", href: "#" },
        { label: "FAQs", href: "#" },
      ],
    },
    {
      label: "Contact Us",
      dropdown: [
        { label: "Make an Appointment", href: appointmentLink || "#contact" },
        { label: "Enquiry / Quote", href: "#" },
        { label: "Endodontic Referrals", href: "#" },
        { label: "Find Us On Google Maps", href: "#" },
      ],
    },
    { label: "Endodontic Referrals", href: "#" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const phone = mainPhoneNumber || "+27 21 671 1504";
  const whatsapp = whatsappNumber || "27611729560";
  const globalAppointmentLink = appointmentLink || "#contact";

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Untitled design.svg"
              alt="Smith & Van Lierop Dentistry"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="nav-item relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href || "#"}
                  className="text-sm text-gray-700 hover:text-[#5a7a7f] font-medium flex items-center gap-1 py-2"
                >
                  {item.label}
                  {item.dropdown && (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white shadow-lg min-w-[220px] py-2 rounded-sm border border-gray-100">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-[#5a7a7f] hover:text-white transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href={globalAppointmentLink}
              className="text-xs font-medium text-white bg-[#5a7a7f] hover:bg-[#3c4f5a] uppercase tracking-wider px-4 py-2 rounded-sm transition-colors"
            >
              Make An Appointment
            </Link>
            <Link
              href={toWhatsAppHref(whatsapp)}
              target="_blank"
              className="bg-[#25D366] text-white p-2 rounded-full hover:bg-[#128C7E] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </Link>
            <Link
              href={toTelHref(phone)}
              className="bg-[#3c4f5a] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-[#5a7a7f] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {phone}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href || "#"}
                  className="block text-gray-700 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <Link
              href={globalAppointmentLink}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#5a7a7f] text-white py-3 rounded-sm text-sm font-medium hover:bg-[#3c4f5a] transition-colors"
            >
              Make An Appointment
            </Link>
            <div className="pt-4 border-t flex gap-3">
              <Link
                href={toWhatsAppHref(whatsapp)}
                target="_blank"
                className="bg-[#25D366] text-white p-3 rounded-full"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </Link>
              <Link
                href={toTelHref(phone)}
                className="bg-[#3c4f5a] text-white px-4 py-3 rounded-full flex items-center gap-2 text-sm font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
