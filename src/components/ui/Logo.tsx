import Image from "next/image";
import Link from "next/link";

/** Practice mark + wordmark. The mark is the client's own artwork, unchanged. */
export default function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label="Soochuh Medical, home">
      <span className={`relative block h-10 w-10 shrink-0 transition-[filter] duration-500 ${light ? "brightness-0 invert" : ""}`}>
        <Image src="/Untitled design.svg" alt="" fill sizes="40px" className="object-contain" priority />
      </span>
      <span className="leading-none">
        <span className={`block text-[18px] font-semibold tracking-[-0.01em] transition-colors duration-500 ${light ? "text-white" : "text-ink"}`}>Soochuh</span>
        <span className={`mt-0.5 block text-[13px] font-medium transition-colors duration-500 ${light ? "text-gold-300" : "text-forest-700"}`}>Medical</span>
      </span>
    </Link>
  );
}
