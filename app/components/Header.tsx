// app/components/Header.tsx
'use client';

import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCountry = searchParams.get("country") ?? "world";


  const countries = [
  { label: 'すべて', value: 'world', image: '/images/earth.jpg' },
  { label: '日本', value: 'Japan', image: '/images/japan.png' },
  { label: 'アメリカ', value: 'USA', image: '/images/usa.png' },
  { label: '中国', value: 'China', image: '/images/china.png' },
  { label: 'イラン', value: 'Iran', image: '/images/iran.png' },
  { label: 'タイ', value: 'Thailand', image: '/images/thailand.png' },
];


  const handleFilter = (value: string) => {
    if (value === 'world') {
      router.push('/');
    } else {
      router.push(`/?country=${value}`);
    }
  };

  return (
    <div>
      <div className="ml-7 p-4 flex flex-col sm:flex-row items-center gap-8">
        <span className="text-4xl font-bold text-orange-300">Ani news</span>
        <span>AIが中立的視点で世界のニュースをお届けします</span>
      </div>

      <div className="flex flex-wrap justify-around gap-3 p-2">
        {countries.map(({ label, value, image }) => {
          const isActive = currentCountry === value;
          const backgroundSize = value === "world" ? "cover" : "100% 100%";

          return (
            <button
              key={label}
              onClick={() => handleFilter(value)}
              className={`
                rounded-md bg-transparent relative shrink-0
                transform hover:scale-110 transition-all duration-300
                ${isActive ? "ring-4 ring-orange-400 scale-105" : ""}
              `}
              style={{
                width: "6rem",
                height: "3.5rem",
              }}
            >
              <span
                className="absolute inset-0 rounded-md"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
              <span className="absolute inset-0 rounded-md bg-black/15" />
              <span className="relative z-10 text-xl font-extrabold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
