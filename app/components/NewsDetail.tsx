"use client";

import { useEffect, useState } from "react";
import VoteButtons from "./VoteButtons";
import { supabase } from "../api/supabaseClient";

type Article = {
  id: number;
  article: string;
  date: string;
  url: string; // 例: ai生成内容が入っているカラム名
};

export default function NewsDetail({ id }: { id: string }) {
  const [text, setText] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, article, date, url") // content カラム名を適宜変更
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

  // text を正規表現で分解
  const titleMatch = text.article.match(/タイトル\s*[:：]\s*(.+)/);
  const bodyMatch = text.article.match(/本文\s*[:：]\s*([\s\S]+)/);

  const title = titleMatch ? titleMatch[1] : "（タイトルなし）";
  const body = bodyMatch ? bodyMatch[1] : "（本文なし）";

  return (
    <div className="p-8 rounded-full">
      <div className="flex text-sm gap-7 mb-4 text-gray-400">
        <p>{text.date}</p>
        <p>記者 Gemini</p>
      </div>
      <p className="text-2xl font-extrabold mb-8">{title}</p>
      <p className="text-base whitespace-pre-wrap leading-relaxed mb-8">{body}</p>

      <p className="text-sm text-gray-400 flex flex-col sm:flex-row gap-7 mb-32">
        <span>出典 首相官邸</span>
        <a href={text.url} className="text-sky-500 hover:underline">
          {text.url}
        </a>
      </p>

      <VoteButtons />
    </div>
  );
}
