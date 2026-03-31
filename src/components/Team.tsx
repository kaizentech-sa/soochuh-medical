"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  story: string;
  appointmentLink: string;
  websiteLink: string;
};

type TeamProps = {
  members?: TeamMember[];
};

const fallbackTeamMembers: TeamMember[] = [
  {
    name: "Dr Corné Smith",
    role: "Clinical Director/Owner",
    image: "https://ext.same-assets.com/3349237986/2954557224.webp",
    story:
      "Dr Corné Smith is dedicated to delivering patient-first care with a focus on clear communication and long-term health outcomes.",
    appointmentLink: "#contact",
    websiteLink: "#",
  },
  {
    name: "Dr Jean Van Lierop",
    role: "Clinical Director/Owner",
    image: "https://ext.same-assets.com/3349237986/441431504.jpeg",
    story:
      "Dr Jean Van Lierop combines modern clinical techniques with an empathetic approach to ensure every patient feels confident and supported.",
    appointmentLink: "#contact",
    websiteLink: "#",
  },
  {
    name: "Dr Suzanne Jacobsz",
    role: "Dentist",
    image: "https://ext.same-assets.com/3349237986/3686533899.jpeg",
    story:
      "Dr Suzanne Jacobsz is passionate about preventative care and helping patients build healthy habits for lifelong wellness.",
    appointmentLink: "#contact",
    websiteLink: "#",
  },
  {
    name: "Cole Gilbert",
    role: "Oral Hygienist",
    image: "https://ext.same-assets.com/3349237986/1646734556.webp",
    story:
      "Cole Gilbert supports patients through practical treatment guidance and a calm, reassuring care experience.",
    appointmentLink: "#contact",
    websiteLink: "#",
  },
  {
    name: "Dr Emil Langenegger & Corlene Schnetler",
    role: "Cape Periodontal Specialists",
    image: "https://www.smithandvanlierop.co.za/images/cape-perio-home-img-2.jpg",
    story:
      "This specialist team offers advanced periodontal expertise, focused on preserving oral function and improving quality of life.",
    appointmentLink: "#contact",
    websiteLink: "#",
  },
  {
    name: "Dr Adnill Kock",
    role: "Dentist",
    image: "https://www.smithandvanlierop.co.za/images/home-adnill.jpg",
    story:
      "Dr Adnill Kock provides comprehensive treatment planning tailored to each patient, with an emphasis on comfort and clarity.",
    appointmentLink: "#contact",
    websiteLink: "#",
  },
  {
    name: "Taj Falal",
    role: "Oral Hygienist",
    image: "https://www.smithandvanlierop.co.za/images/home-taj.jpg",
    story:
      "Taj Falal supports preventive care pathways and patient education to help maintain healthy outcomes between visits.",
    appointmentLink: "#contact",
    websiteLink: "#",
  },
];

const VISIBLE_COUNT_DESKTOP = 4;

export default function Team({ members = [] }: TeamProps) {
  const teamMembers = members.length > 0 ? members : fallbackTeamMembers;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_COUNT_DESKTOP);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, teamMembers.length - visibleCount);

  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl text-[#5a7a7f] font-semibold mb-4">
            Meet our team
          </h2>
          <div className="heading-decorator justify-center mb-6">
            <span className="bar-main" />
            <span className="bar-secondary" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            With our passion for healthcare and people, we have brought together a
            unique team of highly qualified specialists under one roof, working
            together to achieve the best care for each patient.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-8">
          {/* Prev Button */}
          <button
            type="button"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#5a7a7f] hover:text-white hover:border-[#5a7a7f] transition-colors bg-white shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#5a7a7f] hover:text-white hover:border-[#5a7a7f] transition-colors bg-white shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Overflow Window */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="team-card text-center flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className="relative w-44 h-44 mx-auto mb-5 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm block"
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                  <h3 className="font-heading text-base font-semibold text-gray-800 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[#5a7a7f] text-sm mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              type="button"
              key={`team-dot-${i}`}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-[#5a7a7f]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-[120] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-5xl w-full rounded-lg overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative min-h-[320px]">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-2xl text-[#3c4f5a] font-semibold">
                      {selectedMember.name}
                    </h3>
                    <p className="text-[#5a7a7f] mt-1">{selectedMember.role}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close profile modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="mt-5 text-gray-600 leading-relaxed">{selectedMember.story}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {selectedMember.appointmentLink?.trim() && (
                    <a
                      href={selectedMember.appointmentLink}
                      className="inline-block bg-[#5a7a7f] text-white px-5 py-2.5 rounded-sm font-medium hover:bg-[#3c4f5a] transition-colors text-center"
                    >
                      Book an appointment with {selectedMember.name}
                    </a>
                  )}
                  {selectedMember.websiteLink?.trim() && (
                    <a
                      href={selectedMember.websiteLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block border border-[#5a7a7f] text-[#5a7a7f] px-5 py-2.5 rounded-sm font-medium hover:bg-[#5a7a7f] hover:text-white transition-colors text-center"
                    >
                      See doctor&apos;s website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
