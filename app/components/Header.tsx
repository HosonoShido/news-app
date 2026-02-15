// app/components/Header.tsx
'use client';

import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCountry = searchParams.get("country") ?? "世界";

  const countries = [
  { label: '世界', value: 'world', image: '/images/earth.jpg' },
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

  return (
    <div>
      <div className="ml-7 p-4 flex flex-col sm:flex-row items-center gap-8">
        <span className="text-4xl font-bold text-orange-300">Ani news</span>
        <span>AIが公平・中立な視点で世界のニュースをお届けします</span>
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
              <div className="absolute inset-0 bg-gray-700 opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
              <span className="relative z-10 text-xl font-extrabold">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-around p-2">
        {['政治', '経済', 'その他'].map((cat) => (
          <button key={cat} className="w-160 h-12 px-2 py-1 hover:bg-sky-200 rounded">
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
