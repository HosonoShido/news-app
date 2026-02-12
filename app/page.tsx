import Header from "./components/Header";
import NewsList from "./components/NewsList";
import { Suspense } from "react"; // 1. Suspenseをインポート

export default function Home() {
  return (
    <main>
      <Header />
      <Suspense fallback={<div className="p-8 text-center">ニュースを読み込み中...</div>}>
        <NewsList />
      </Suspense>
    </main>
  );
}