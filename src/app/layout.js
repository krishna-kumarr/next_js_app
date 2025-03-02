// src/app/layout.js
"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { generateMetadata } from "../utils/metadata"; // Import the metadata utility
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {

  const [metaContent, setMetaContent] = useState(generateMetadata({}));

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const jobId = searchParams.get("job_id");

      if (jobId) {
        setMetaContent(generateMetadata({
          title: "HR Manager",
          description: "An HR Manager is responsible for overseeing the entire HR department, ensuring smooth HR operations, employee engagement, policy implementation, and compliance with labor laws.",
          imageUrl: "https://devcdn.2ndcareers.com/employer/logo/default_profile_picture_employer.png",
          url: window.location.href,
        }));

        // try {
        //   const { data } = await axios.post(
        //     `https://devapp.2ndcareers.com/get_job_share_link`,
        //     { job_id: jobId }
        //   );

        //   setMetaContent(data); // Assuming the response contains the necessary metadata
        // } catch (error) {
        //   console.error("Error fetching job data:", error);
        // }
      }
    };

    fetchData();
  }, []);

  return (
    <html lang="en">
      <head>
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
