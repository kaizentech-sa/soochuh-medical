import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dentist Claremont | Newlands Cape Town | Smith and Van Lierop Dentistry",
  description: "Dentist Claremont/Newlands; Smith and Van Lierop Dentistry. We aim to provide exceptional dental services to patients. Using a unique combination of science and artistry — we can redesign your smile",
  icons: {
    icon: "https://ext.same-assets.com/3349237986/1336129460.ico",
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
