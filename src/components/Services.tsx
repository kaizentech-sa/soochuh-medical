"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
  {
    icon: "https://ext.same-assets.com/3349237986/2159896115.webp",
    title: "Advanced & Cosmetic Dentistry",
    description: "5 steps to a beautiful, natural smile",
    href: "#",
  },
  {
    icon: "https://ext.same-assets.com/3349237986/2292650844.webp",
    title: "Clear Aligners (Invisalign)",
    description: "Invisalign and smile straightening",
    href: "#",
  },
  {
    icon: "https://ext.same-assets.com/3349237986/798237253.webp",
    title: "Dental Implants",
    description: "To replace missing teeth",
    href: "#",
  },
  {
    icon: "https://ext.same-assets.com/3349237986/2535590258.webp",
    title: "Veneers",
    description: "Using advanced microscopic technology",
    href: "#",
  },
  {
    icon: "https://ext.same-assets.com/3349237986/1934814904.webp",
    title: "General Dentistry",
    description: "Because every treatment matters",
    href: "#",
  },
  {
    icon: "https://ext.same-assets.com/3349237986/766546595.webp",
    title: "Oral Hygiene",
    description: "Helping you look after your dental health",
    href: "#",
  },
];

const delayClasses = ["", "delay-100", "delay-200", "delay-300", "delay-100", "delay-200"];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl text-[#5a7a7f] font-semibold mb-4">
            What We Do
          </h2>
          <div className="heading-decorator justify-center">
            <span className="bar-main" />
            <span className="bar-secondary" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className={`service-card group text-center p-6 fade-in-up ${delayClasses[index]}`}
            >
              <div className="service-icon w-20 h-20 mx-auto mb-5 rounded-full border-2 border-[#5a7a7f] flex items-center justify-center transition-all duration-300 group-hover:bg-[#5a7a7f]">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                />
              </div>
              <h3 className="font-heading text-sm font-semibold text-[#5a7a7f] mb-1 leading-tight">
                {service.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
