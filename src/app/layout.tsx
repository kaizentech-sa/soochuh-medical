import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soochuh Medical | Newlands, Cape Town",
  description:
    "Soochuh Medical in Newlands, Cape Town. Visit us at Newlands on Main, Piazza Level, Letterstedt House, Main Road, Newlands.",
  icons: {
    icon: "/Untitled design.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
