import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ani news by AI",
  description: "Aniニュースは、世界のニュースをAIにより中立・公平にまとめて配信しています。",
    openGraph: {
    title: "Ani news by AI",
    description: "Aniニュースは、世界のニュースをAIにより中立・公平にまとめて配信しています。",
    url: "https://ai-and-peace.com", 
    siteName: "Ani news by AI",
    images: [
      {
        url: "/image/ogp.jpg", // SNSシェア用画像（publicフォルダに置く）
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle", // あればTwitterアカウント名
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased
          bg-gradient-to-b from-black via-blue-800 to-red-200 text-white min-h-screen
          `}
      >
        {children}
      </body>
    </html>
  );
}
