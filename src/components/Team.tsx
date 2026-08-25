"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { practitioners } from "@/data/site";
import { InstagramIcon } from "./icons";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  story: string;
  appointmentLink: string;
  websiteLink: string;
};

type TeamProps = { members?: TeamMember[] };

/** Real practitioners only — names and credentials verified from public listings. */
const fallbackTeamMembers: TeamMember[] = practitioners.map((p) => ({
  name: p.name,
  role: p.credentials ? `${p.role} · ${p.credentials}` : p.role,
  image: "",
  story: p.bio,
  appointmentLink: "#contact",
  websiteLink: p.instagram || "",
}));

function initials(name: string) {
  return name
    .replace(/^Dr\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export default function Team({ members = [] }: TeamProps) {
  const teamMembers = members.length > 0 ? members : fallbackTeamMembers;
  const [selected, setSelected] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="team" className="section bg-white">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow fade-in-up">06 — The team</p>
            <h2 className="display-lg fade-in-up delay-100 mt-5 font-display">
              The women behind
              <span className="italic text-teal-500"> the practice</span>
            </h2>
          </div>
          <p className="fade-in-up delay-200 lede md:col-span-5">
            A small team on purpose. You will see the same faces each visit, and
            they will already know why you are there.
          </p>
        </div>

        <div className="rule fade-in-up delay-200 mt-14" />

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => (
            <article key={member.name} className={`fade-in-up delay-${((i % 3) + 1) * 100} group`}>
              <button
                type="button"
                onClick={() => setSelected(member)}
                className="block w-full text-left"
              >
                <div className="img-zoom arch relative aspect-[3/4] w-full bg-bone-deep">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center bg-teal-50 font-display text-6xl text-teal-200">
                      {initials(member.name)}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink transition-colors duration-500 group-hover:text-teal-500">
                  {member.name}
                </h3>
                <p className="mt-1.5 font-sans text-[11px] uppercase tracking-eyebrow text-teal-700">
                  {member.role}
                </p>
              </button>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="modal-panel grid md:grid-cols-2">
            <div className="relative min-h-[240px] bg-teal-50 md:min-h-[520px]">
              {selected.image ? (
                <Image src={selected.image} alt={selected.name} fill className="object-cover" />
              ) : (
                <span className="grid h-full w-full place-items-center font-display text-7xl text-teal-200">
                  {initials(selected.name)}
                </span>
              )}
            </div>

            <div className="flex flex-col p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl text-ink">{selected.name}</h3>
                  <p className="mt-2 font-sans text-[11px] uppercase tracking-eyebrow text-teal-700">
                    {selected.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="p-1 text-ink-muted transition-colors hover:text-ink"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="mt-7 font-sans font-light leading-relaxed text-ink-soft">{selected.story}</p>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                {selected.appointmentLink?.trim() && (
                  <Link href={selected.appointmentLink} className="btn-primary flex-1" onClick={() => setSelected(null)}>
                    Book with {selected.name.split(" ").slice(0, 2).join(" ")}
                  </Link>
                )}
                {selected.websiteLink?.trim() && (
                  <a href={selected.websiteLink} target="_blank" rel="noreferrer" className="btn-outline">
                    <InstagramIcon className="h-4 w-4" /> Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
