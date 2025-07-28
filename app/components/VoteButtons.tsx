// app/components/VoteButtons.tsx
export default function VoteButtons() {
  return (
    <div className="flex justify-around text-white">
      <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-400">
        注目 🔥
      </button>
      <button className="bg-green-700 px-4 py-2 rounded hover:bg-green-400">
        中立的 ⚖️
      </button>
      <button className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-400">
        偏向的 ❌
      </button>
    </div>
  );
}
