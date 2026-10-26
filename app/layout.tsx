import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NeuronsLimited Studios | Portfolio",
    template: "%s | NeuronsLimited Studios",
  },
  description:
    "Indie game development studio crafting quirky, silly, and genuinely fun gaming experiences. Creators of Shrimps and Elite Safety.",
  keywords: [
    "indie games",
    "game development",
    "NeuronsLimited Studios",
    "Shrimps",
    "Elite Safety",
    "mobile games",
    "2D multiplayer",
  ],
  authors: [{ name: "NeuronsLimited Studios" }],
  openGraph: {
    title: "NeuronsLimited Studios | Portfolio",
    description:
      "Developing games, one neuron at a time. Indie game studio behind Shrimps and Elite Safety.",
    url: "https://neuronslimitedstudios.eu",
    siteName: "NeuronsLimited Studios",
    images: [
      {
        url: "/assets/logo.png",
        width: 512,
        height: 512,
        alt: "NeuronsLimited Studios Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "NeuronsLimited Studios | Portfolio",
    description:
      "Developing games, one neuron at a time. Creators of Shrimps and Elite Safety.",
    images: ["/assets/logo.png"],
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://neuronslimitedstudios.eu"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
          {/* Google Fonts — exactly as the original site */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          {/* Google Analytics is loaded by CookieConsent, only after the visitor accepts */}
        </head>
      <body>
        <Header />
        <main className="page-enter">{children}</main>
        <Footer />
        <ScrollToTop />
        <CookieConsent />
      </body>
    </html>
  );
}