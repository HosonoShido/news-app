// app/components/Header.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ThemeMode = "morning" | "night";

const storageKey = "ani-news-theme";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState<ThemeMode>("night");

  const currentCountry = searchParams.get("country") ?? "world";


  const countries = [
  { label: 'すべて', value: 'world', image: '/images/earth.jpg' },
  { label: '日本', value: 'Japan', image: '/images/japan.png' },
  { label: 'アメリカ', value: 'USA', image: '/images/usa.png' },
  { label: '中国', value: 'China', image: '/images/china.png' }
];


  const handleFilter = (value: string) => {
    if (value === 'world') {
      router.push('/');
    } else {
      router.push(`/?country=${value}`);
    }
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey);
    const initialTheme: ThemeMode =
      savedTheme === "night" || savedTheme === "morning" ? savedTheme : "night";

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "morning" ? "night" : "morning";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed right-4 top-4 z-20 inline-flex h-11 min-w-[4.75rem] items-center justify-center rounded-md border-2 border-orange-300 bg-black/10 px-3 text-base font-bold leading-none tracking-wide backdrop-blur-sm"
        aria-label={theme === "night" ? "夜モード" : "朝モード"}
      >
        {theme === "night" ? "夜 ☾" : "朝 ☀"}
      </button>

      <div className="ml-7 p-4 flex flex-col sm:flex-row items-center gap-8">
        <span className="text-4xl font-bold text-orange-300">Ani news</span>
        <span>AIが中立的視点で世界のニュースをお届けします</span>
      </div>

      <div className="flex justify-around p-2">
        {countries.map(({ label, value, image }) => {

          const isActive = currentCountry === value;

          return (
            <button
              key={label}
              onClick={() => handleFilter(value)}
              className={`
                w-40 h-16 text-white rounded bg-transparent relative overflow-hidden 
                transform hover:scale-110 transition-all duration-300
                ${isActive ? "ring-4 ring-orange-400 scale-105" : ""}
              `}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <span className="relative z-10 text-xl font-extrabold drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
