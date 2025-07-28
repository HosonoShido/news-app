'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';
import NewsCard from './NewsCard';

type Article = {
  id: number;
  date: string;
  title: string;
  url: string;
};

export default function NewsList() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, date, title, url')
        .order('date', { ascending: false }) // 日付の新しい順
        .limit(10); // 10件だけ取得

      if (error) {
        console.error('記事の取得に失敗:', error.message);
      } else {
        setArticles(data || []);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      {articles.map((article) => (
        <NewsCard key={article.id} {...article} />
      ))}
    </div>
  );
}
