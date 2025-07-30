"use client";

import { useEffect, useState } from "react";
import VoteButtons from "./VoteButtons";
import { supabase } from "../api/supabaseClient";

type Article = {
  id: number;
  article: string; // 例: ai生成内容が入っているカラム名
  date: string;
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
        .select("id, article, date, url, source") // content カラム名を適宜変更
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

  // text を行単位で分割し、1行目をタイトル、2行目以降を本文とする
  const lines = text.article.split(/\r?\n/);

  const title = lines[0]?.trim() || "（タイトルなし）";
  const body = lines.slice(1).join("\n").trim() || "（本文なし）";


  return (
    <div className="p-8 rounded-full">
      <div className="flex text-sm gap-7 mb-4 text-gray-500">
        <p>{text.date}</p>
        <p>記者 Gemini</p>
      </div>
      <p className="text-2xl font-extrabold mb-8">{title}</p>
      <p className="text-base whitespace-pre-wrap leading-relaxed mb-8">{body}</p>

      <p className="text-sm flex flex-col sm:flex-row gap-7 mb-32">
        <span className="text-gray-500">出典 {text.source}</span>
        <a href={text.url} className="text-sky-500 hover:underline">{text.url}</a>
      </p>

      <VoteButtons />
    </div>
  );
}
