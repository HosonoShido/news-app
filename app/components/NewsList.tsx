'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';
import NewsCard from './NewsCard';

type Article = {
  id: number;
  date: string;
  title: string;
  generated_title: string | null;
  url: string;
  source: string;
  article: string | null;
};

export default function NewsList({ country }: { country?: string }) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      let query = supabase
        .from('articles')
        .select('id, date, title, generated_title, url, source, article')
        .not('article', 'is', null);

      // 国が選択されている場合のみフィルタ
      if (country && country !== '世界') {
        query = query.eq('country', country);
      }

      const { data, error } = await query
        .order('date', { ascending: false })
        .limit(10);

      if (error) {
        console.error('記事の取得に失敗:', error.message);
      } else {
        setArticles(data || []);
      }
    };

    fetchArticles();
  }, [country]);

  return (
    <div>
      {articles.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          該当するニュースはありません。
        </div>
      ) : (
        articles.map((article) => (
          <NewsCard key={article.id} {...article} />
        ))
      )}
    </div>
  );
}
