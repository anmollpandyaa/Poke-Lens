"use client";

export default function PokemonTable({ list, onSelect, selected }) {
  const typeColors = {
    fire: "bg-red-400 text-white",
    water: "bg-blue-400 text-white",
    grass: "bg-green-400 text-white",
    electric: "bg-yellow-400 text-black",
    psychic: "bg-pink-400 text-white",
    ice: "bg-cyan-200 text-black",
    dragon: "bg-purple-400 text-white",
    dark: "bg-gray-800 text-white",
    fairy: "bg-pink-200 text-black",
    normal: "bg-gray-300 text-black",
    fighting: "bg-red-600 text-white",
    flying: "bg-indigo-200 text-black",
    poison: "bg-purple-300 text-black",
    ground: "bg-yellow-600 text-white",
    rock: "bg-gray-500 text-white",
    bug: "bg-green-600 text-white",
    ghost: "bg-indigo-600 text-white",
    steel: "bg-gray-400 text-black",
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-gradient-to-r from-red-400 via-yellow-400 to-green-400">
        Pokémon List
      </h2>

      <div className="overflow-hidden rounded-2xl shadow-lg">
        <table className="w-full bg-white/60 backdrop-blur-md rounded-2xl">
          <thead className="bg-gradient-to-r from-red-500 to-yellow-400 text-white">
            <tr>
              <th className="p-3 text-left">Sr. No</th>
              <th className="p-3 text-left">Name</th>
            </tr>
          </thead>

          <tbody>
            {list.map((p, i) => {
              const isSelected = selected?.name === p.name;
              return (
                <tr
                  key={p.name}
                  onClick={() => onSelect(p)}
                  className={`transition-all cursor-pointer hover:scale-[1.02] hover:shadow-md ${
                    isSelected
                      ? "bg-yellow-200/60 border-l-4 border-yellow-500 font-semibold"
                      : "bg-white/30"
                  }`}
                >
                  <td className="p-3 text-black">{i + 1}</td>
                  <td className="p-3 capitalize flex items-center gap-2 text-black">
                    {p.name}

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
