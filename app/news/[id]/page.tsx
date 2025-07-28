// app/news/[id]/page.tsx
import NewsDetail from "@/app/components/NewsDetail";

export default async function NewsPage(props: { params: Promise<{ id: string }> }) {
  const data = await props.params;
  const id = data.id;
  return (
    <main>
      <NewsDetail id={id} />
    </main>
  );
}
