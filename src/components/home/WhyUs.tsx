import Image from "next/image";
import { ChatCircleText, ClipboardText, Clock, Heart, Stethoscope } from "../icons";

const image =
  "https://images.unsplash.com/photo-1663755787934-3742b0f5983a?auto=format&fit=crop&w=1200&h=1500&q=80";

const reasons = [
  {
    icon: Heart,
    title: "Nervous? Tell us.",
    text: "Longer appointments, a stop signal you control, numbing gel before every injection, and sedation in our rooms if you need it.",
  },
  {
    icon: ChatCircleText,
    title: "We listen first",
    text: "Every visit starts with a conversation, not a procedure.",
  },
  {
    icon: Stethoscope,
    title: "One shared file",
    text: "Your doctor and dentist already know your history, medication and allergies.",
  },
  {
    icon: ClipboardText,
    title: "Costs in writing",
    text: "A written plan with prices before treatment. If anything changes, we stop and ask.",
  },
  {
    icon: Clock,
    title: "Help the same day",
    text: "Toothache or a sick child can't wait. We keep emergency slots open daily.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-surface bg-forest-100 lg:sticky lg:top-[104px] lg:aspect-[4/5]">
            <Image
              src={image}
              alt="Our dentist laughing with a patient before a check-up"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[38%_50%]"
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <h2 data-reveal className="t-h2 max-w-[15ch]">
            Nervous about the dentist? <span className="em">You&apos;re in good hands.</span>
          </h2>

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <div key={title} data-reveal className={i === 0 ? "sm:col-span-2 sm:max-w-[34rem]" : ""}>
                <Icon size={30} className="text-gold-700" />
                <h3 className={`mt-4 font-semibold tracking-[-0.02em] text-ink ${i === 0 ? "text-[26px]" : "text-[20px]"}`}>
                  {title}
                </h3>
                <p className="mt-2 text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
