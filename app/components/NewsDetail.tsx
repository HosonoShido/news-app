"use client";

import { useEffect, useState } from "react";
import VoteButtons from "./VoteButtons";
import { supabase } from "../api/supabaseClient";

type Article = {
  id: number;
  article: string;
  date: string;
  title: string;
  generated_title: string | null;
  url: string;
  source: string; 
};

export default function NewsDetail({ id }: { id: string }) {
  const [text, setText] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, article, date, title, generated_title, url, source")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error("記事取得エラー:", error.message);
        setText(null);
      } else {
        setText(data);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div className="p-6">読み込み中...</div>;
  if (!text) return <div className="p-6">記事が見つかりませんでした。</div>;

  const displayTitle = text.generated_title
    ? text.generated_title
    : text.title;
  const body = text.article.trim() || "（本文なし）";


  return (
    <div className="p-8 rounded-full">
      <div className="flex text-sm gap-7 mb-4 text-[var(--muted)]">
        <p>{text.date}</p>
        <p>記者は生成AIです</p>
      </div>
      <p className="text-2xl font-extrabold mb-8">{displayTitle}</p>
      <p className="text-base whitespace-pre-wrap leading-relaxed mb-8">{body}</p>

      <p className="text-sm flex flex-col sm:flex-row gap-7 mb-32">
        <span className="text-[var(--muted)]">出典 {text.source}</span>
        <a href={text.url} className="text-[var(--link)] hover:underline">{text.url}</a>
      </p>

      <VoteButtons />
    </div>
  );
}
