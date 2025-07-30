// app/page.tsx
import Header from "./components/Header";
import NewsList from "./components/NewsList";

export const metadata = {
  title: "Ani news by AI",
  description: "Aniニュースは、世界のニュースをAIにより中立・公平にまとめて配信しています。",
  openGraph: {
    title: "Ani news by AI",
    description: "Aniニュースは、世界のニュースをAIにより中立・公平にまとめて配信しています。",
    url: "https://ai-and-peace.com",
    siteName: "Ani news by AI",
    images: [
      {
        url: "/ogp.jpg",
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
