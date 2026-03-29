"use client";

import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Phone */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#5a7a7f] flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[#5a7a7f]"
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
            </div>
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">
              Phone:
            </p>
            <Link
              href="tel:+27216711504"
              className="text-[#5a7a7f] font-semibold text-lg hover:text-[#3c4f5a] transition-colors"
            >
              +27 21 671 1504
            </Link>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#5a7a7f] flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[#5a7a7f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">
              Address:
            </p>
            <p className="text-gray-700 text-center">
              Newlands on Main, Piazza Level,
              <br />
              Letterstedt House, Main Road, Newlands,
              <br />
              Cape Town
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#5a7a7f] flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[#5a7a7f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">
              Email:
            </p>
            <Link
              href="mailto:info@svldentistry.co.za"
              className="text-[#5a7a7f] font-semibold hover:text-[#3c4f5a] transition-colors"
            >
              info@svldentistry.co.za
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
