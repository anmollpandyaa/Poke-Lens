"use client";

export default function Pagination({ page, totalPages, setPage, activeType }) {
  const typeColors = {
    fire: "from-red-400 to-red-600 text-white",
    water: "from-blue-400 to-blue-600 text-white",
    grass: "from-green-400 to-green-600 text-white",
    electric: "from-yellow-300 to-yellow-500 text-black",
    psychic: "from-pink-300 to-pink-500 text-white",
    ice: "from-cyan-200 to-cyan-400 text-black",
    dragon: "from-purple-400 to-purple-600 text-white",
    dark: "from-gray-700 to-gray-900 text-white",
    fairy: "from-pink-200 to-pink-400 text-black",
    normal: "from-gray-200 to-gray-400 text-black",
  };

  const activeColor = typeColors[activeType] ?? "from-gray-300 to-gray-500 text-black";

  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`px-6 py-2 rounded-full font-medium bg-gradient-to-r ${activeColor} disabled:opacity-40 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg`}
      >
        Previous
      </button>

      <span className="text-sm font-semibold text-gray-700">
        Page {page} / {totalPages}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`px-6 py-2 rounded-full font-medium bg-gradient-to-r ${activeColor} disabled:opacity-40 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg`}
      >
        Next
      </button>
    </div>
  );
}
