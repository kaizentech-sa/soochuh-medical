export const metadata = {
  title: "Studio",
  description: "Sanity Studio",
  icons: {
    icon: "/Untitled design.svg",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
