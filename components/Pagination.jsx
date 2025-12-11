"use client";

export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg font-medium
                   bg-poke-red text-white
                   hover:bg-poke-red-dark
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all"
      >
        Previous
      </button>

      <span className="text-sm font-semibold text-poke-dark">
        Page {page} / {totalPages}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-lg font-medium
                   bg-poke-yellow text-poke-dark
                   hover:bg-poke-yellow-dark
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all"
      >
        Next
      </button>
    </div>
  );
}
