// app/page.tsx
import Header from "./components/Header";
import NewsList from "./components/NewsList";

export default function Home() {
  return (
    <main>
      <Header />
      <NewsList />
    </main>
  );
}


