// app/page.tsx
import Header from "./components/Header";
import NewsList from "./components/NewsList";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>;
}) {
  const params = await searchParams;
  const country = params.country ?? "世界";

  return (
    <main>
      <Header />
      <NewsList country={country} />
    </main>
  );
}
