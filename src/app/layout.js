"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { generateMetadata } from "../utils/metadata"; // Import metadata utility
import "./globals.css";
import Head from "next/head"; // Import Next.js Head component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {

  const fetchMetaData = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const jobId = searchParams.get("job_id");
    let currentMeta = generateMetadata({});
    if (jobId) {
      currentMeta = generateMetadata({
        title: "HR Manager",
        description: "An HR Manager is responsible for overseeing the entire HR department, ensuring smooth HR operations, employee engagement, policy implementation, and compliance with labor laws.",
        imageUrl: "https://devcdn.2ndcareers.com/employer/logo/default_profile_picture_employer.png",
        url: window.location.href,
      })

      return <head>
        <meta property="og:title" content={currentMeta.openGraph.title} />
        <meta property="og:description" content={currentMeta.openGraph.description} />
        <meta property="og:url" content={currentMeta.openGraph.url} />
        <meta property="og:site_name" content={currentMeta.openGraph.siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={currentMeta.openGraph.images[0].url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMeta.twitter.title} />
        <meta name="twitter:description" content={currentMeta.twitter.description} />
        <meta name="twitter:image" content={currentMeta.twitter.image} />
      </head>
    } else {
      return <head>
        <meta property="og:title" content={currentMeta.openGraph.title} />
        <meta property="og:description" content={currentMeta.openGraph.description} />
        <meta property="og:url" content={currentMeta.openGraph.url} />
        <meta property="og:site_name" content={currentMeta.openGraph.siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={currentMeta.openGraph.images[0].url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMeta.twitter.title} />
        <meta name="twitter:description" content={currentMeta.twitter.description} />
        <meta name="twitter:image" content={currentMeta.twitter.image} />
      </head>
    }
  };

  return (
    <html lang="en">
      {fetchMetaData()}

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
