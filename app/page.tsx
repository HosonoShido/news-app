// app/page.tsx
import Header from "./components/Header";
import NewsList from "./components/NewsList";
import type { Metadata } from "next";

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
        url: "/image/ogp.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
  },
};


export default function Home() {
  return (
    <main>
      <Header />
      <NewsList />
    </main>
  );
}
