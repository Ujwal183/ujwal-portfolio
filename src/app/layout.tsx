import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "N. Sai Ujwal Reddy | Software Engineer | Java Developer | AI Engineer",
  description:
    "Professional portfolio of N. Sai Ujwal Reddy showcasing software engineering, Java development, AI projects, data analytics, and technical expertise. Explore projects, skills, and experience.",
  keywords: [
    "Software Engineer Portfolio",
    "Java Developer Portfolio",
    "AI Engineer Portfolio",
    "Python Developer Portfolio",
    "Data Analyst Portfolio",
    "Computer Science Student Portfolio",
    "N. Sai Ujwal Reddy",
    "Full Stack Developer",
    "Machine Learning",
    "Data Annotation",
  ],
  authors: [{ name: "N. Sai Ujwal Reddy" }],
  creator: "N. Sai Ujwal Reddy",
  openGraph: {
    title: "N. Sai Ujwal Reddy | Software Engineer | AI Engineer",
    description:
      "Professional portfolio showcasing software engineering, Java development, AI projects, and technical expertise.",
    type: "website",
    locale: "en_US",
    siteName: "N. Sai Ujwal Reddy — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "N. Sai Ujwal Reddy | Software Engineer",
    description:
      "Professional portfolio showcasing software engineering, Java development, AI projects, and technical expertise.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#050816" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
