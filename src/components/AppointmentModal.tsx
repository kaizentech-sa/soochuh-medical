"use client";

import { useEffect, useRef } from "react";

interface AppointmentModalProps {
  onClose: () => void;
}

export default function AppointmentModal({ onClose }: AppointmentModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="modal-content">
        {/* Header */}
        <div className="bg-[#3c4f5a] px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-semibold text-white">
              Make An Appointment
            </h2>
            <p className="text-white/70 text-sm mt-1">
              We'll get back to you shortly
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#5a7a7f] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="Your phone number"
                className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#5a7a7f] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#5a7a7f] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your dental concern or preferred appointment time…"
                className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#5a7a7f] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5a7a7f] text-white py-3 rounded-sm font-medium hover:bg-[#3c4f5a] transition-colors tracking-wide"
            >
              Send Appointment Request
            </button>
          </form>

          <p className="text-gray-400 text-xs text-center mt-4">
            Or call us directly:{" "}
            <a href="tel:+27216711504" className="text-[#5a7a7f] hover:underline">
              021 671 1504
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
