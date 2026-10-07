import BookingButtons from "./ui/BookingButtons";

type CtaBandProps = { title?: string; text?: string; message?: string };

/** Closing booking prompt for inner pages: a tinted panel, same theme as the page. */
export default function CtaBand({
  title = "Ready when you are.",
  text = "Message or call to book. Tell us if you're nervous, and we'll take it from there.",
  message,
}: CtaBandProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <div className="grid items-end gap-8 rounded-surface bg-forest-100 p-8 md:p-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="t-h2">{title}</h2>
            <p className="mt-4 max-w-[46ch] text-ink-soft">{text}</p>
          </div>
          <BookingButtons message={message} className="lg:col-span-5 lg:justify-end" />
        </div>
      </div>
    </section>
  );
}
