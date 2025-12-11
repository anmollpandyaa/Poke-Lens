"use client";

export default function PokemonTable({ list, onSelect }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 pokemon-accent">
        Pokémon List
      </h2>

      <div className="overflow-hidden border rounded-lg bg-white shadow-md">
        <table className="w-full">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="p-3 text-left">Sr. No</th>
              <th className="p-3 text-left">Name</th>
            </tr>
          </thead>

          <tbody>
            {list.map((p, i) => (
              <tr
                key={p.name}
                onClick={() => onSelect(p)}
                className="hover:bg-yellow-100 transition-all cursor-pointer"
              >
                <td className="p-3 text-black font-medium">{i + 1}</td>
                <td className="p-3 capitalize text-blue-600 font-medium">
                  {p.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
