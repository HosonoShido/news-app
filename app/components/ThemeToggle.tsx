"use client";

import { useEffect, useState } from "react";

type ThemeMode = "morning" | "night";

const storageKey = "ani-news-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("night");

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
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-30 inline-flex h-11 min-w-[4.75rem] items-center justify-center rounded-md border-2 border-orange-300 bg-black/10 px-3 text-base font-bold leading-none tracking-wide backdrop-blur-sm"
      aria-label={theme === "night" ? "夜モード" : "朝モード"}
    >
      {theme === "night" ? "夜 ☾" : "朝 ☀"}
    </button>
  );
}
