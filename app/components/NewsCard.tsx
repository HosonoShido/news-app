// app/components/NewsCard.tsx
import Link from "next/link";

type Props = {
  id: number;
  date: string;
  title: string;
  url: string;
  source: string;
};

export default function NewsCard({ id, date, title, source }: Props) {
  return (
    <Link href={`/news/${id}`}>
      <div className="p-8 hover:bg-sky-200">
        <p className="text-sm text-gray-500 flex items-center gap-8">
          <span>{date}</span>
          <span>{source}</span>
        </p>
        <p className="text-lg">{title}</p>
      </div>
    </Link>
  );
}
