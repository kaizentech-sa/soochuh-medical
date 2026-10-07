import { defaultWhatsAppMessage, generalFaqs, siteConfig, whatsAppHref } from "@/data/site";
import Accordion from "../ui/Accordion";
import { WhatsappLogo } from "../icons";

export default function FaqSection() {
  return (
    <section id="faq" className="border-t border-line py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[120px]">
            <h2 data-reveal className="t-h2">
              Questions, <span className="em">answered.</span>
            </h2>
            <p data-reveal className="mt-5 text-ink-soft">
              No question is too small. Ask us before you book.
            </p>
            <a
              data-reveal
              href={whatsAppHref(siteConfig.whatsapp, defaultWhatsAppMessage)}
              target="_blank"
              rel="noreferrer"
              className="link mt-6"
            >
              <WhatsappLogo size={20} weight="fill" /> WhatsApp us
            </a>
          </div>
        </div>
        <div data-reveal className="lg:col-span-8">
          <Accordion items={generalFaqs} openFirst />
        </div>
      </div>
    </section>
  );
}
