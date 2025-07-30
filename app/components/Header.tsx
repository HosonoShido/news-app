// app/components/Header.tsx
export default function Header() {
  const countries = [
    { label: '世界', image: '/images/earth.jpg' },
    { label: '日本', image: '/images/japan.png' },
    { label: 'アメリカ', image: '/images/usa.png' },
    { label: '中国', image: '/images/china.png' }
  ];
  return (
    <div>
      <div className=" ml-7 text-4xl font-bold text-orange-300 p-4 ">
        Ani news by AI
      </div>

      <div className="flex justify-around p-2">
        {countries.map(({ label, image }) => (
          <button 
            key={label} 
            className="w-40 h-16 text-white rounded bg-transparent relative overflow-hidden group transform hover:scale-140 transition-all duration-300"
            style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gray-700 opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
            <span className="relative z-10 text-xl font-extrabold">{label}</span>
          </button>

        ))}
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
