import ContactBar from "@/components/ContactBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MotionRoot from "@/components/motion/MotionRoot";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MotionRoot />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ContactBar />
    </>
  );
}
