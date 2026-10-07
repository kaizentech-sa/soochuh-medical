import { defaultWhatsAppMessage, siteConfig, telHref, whatsAppHref } from "@/data/site";
import { Phone, WhatsappLogo } from "../icons";

type BookingButtonsProps = {
  tone?: "light" | "dark";
  /** Pre-filled WhatsApp text, e.g. naming the treatment. */
  message?: string;
  className?: string;
  stack?: boolean;
};

/**
 * The two ways to book (the practice wants phone and WhatsApp only).
 * Labels are identical everywhere on the site: one label per intent.
 */
export default function BookingButtons({
  tone = "light",
  message = defaultWhatsAppMessage,
  className = "",
  stack = false,
}: BookingButtonsProps) {
  const onDark = tone === "dark";
  return (
    <div className={`flex gap-3 ${stack ? "flex-col" : "flex-col sm:flex-row"} ${className}`}>
      <a
        href={whatsAppHref(siteConfig.whatsapp, message)}
        target="_blank"
        rel="noreferrer"
        className={onDark ? "btn-gold" : "btn-primary"}
      >
        <WhatsappLogo size={20} weight="fill" />
        WhatsApp us
      </a>
      <a href={telHref(siteConfig.phone)} className={onDark ? "btn-on-dark" : "btn-secondary"}>
        <Phone size={19} />
        Call {siteConfig.phone}
      </a>
    </div>
  );
}
