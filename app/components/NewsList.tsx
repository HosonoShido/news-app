'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';
import NewsCard from './NewsCard';
import { useSearchParams } from 'next/navigation'; // URLパラメータ取得用

type Article = {
  id: number;
  date: string;
  title: string;
  url: string;
  source: string;
};

export default function NewsList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const searchParams = useSearchParams();
  const selectedCountry = searchParams.get('country'); // URLから国名を取得

  useEffect(() => {
    const fetchArticles = async () => {
      // ベースのクエリを作成
      let query = supabase
        .from('articles')
        .select('id, date, title, url, source');

      // 国が選択されている場合のみフィルタを追加
      // データベースのカラム名が 'country' である前提です
      if (selectedCountry) {
        query = query.eq('country', selectedCountry);
      }

      // 並び替えと制限を実行
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
  }, [selectedCountry]); // selectedCountryが変わるたびに再実行

  return (
    <div>
      {/* フィルタリング結果が0件だった場合の表示を追加すると親切です */}
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