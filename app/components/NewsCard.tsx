// app/components/NewsCard.tsx
import Link from "next/link";

type Props = {
  id: number;
  date: string;
  title: string;
  url: string;
};

export default function NewsCard({ id, date, title, url }: Props) {
  return (
    <Link href={`/news/${id}`}>
      <div className="p-8 hover:bg-sky-200">
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-lg">
          {title}
          <span className="text-sm ml-16">{url}</span>
        </p>
      </div>
    </Link>
  );
}
