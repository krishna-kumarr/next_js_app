
import { Geist, Geist_Mono } from "next/font/google";
import { generateMetadata } from "../utils/metadata"; // Import metadata utility
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children, metadata }) {
  let metaContent = metadata || generateMetadata({});

  return (
    <html lang="en">
      <head>
        {/* Dynamically update the metadata */}
        <meta property="og:title" content={metaContent.openGraph.title} />
        <meta property="og:description" content={metaContent.openGraph.description} />
        <meta property="og:url" content={metaContent.openGraph.url} />
        <meta property="og:site_name" content={metaContent.openGraph.siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={metaContent.openGraph.images[0].url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaContent.twitter.title} />
        <meta name="twitter:description" content={metaContent.twitter.description} />
        <meta name="twitter:image" content={metaContent.twitter.image} />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
