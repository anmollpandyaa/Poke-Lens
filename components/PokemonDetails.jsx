"use client";

import React, { useState } from "react";
import Loading from "./Loading";

export default function PokemonDetails({ selected }) {
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  if (!selected) {
    return (
      <div className="text-gray-700 text-center py-10 italic">
        Select a Pokémon to see details.
      </div>
    );
  }

  if (!selected.details) {
    return <Loading small={true} />;
  }

  const d = selected.details;
  const types = Array.isArray(d.types) ? d.types.map((t) => t.type.name) : [];
  const safeTypeIndex = activeTypeIndex < types.length ? activeTypeIndex : 0;

  const summary = {
    gameIndicesCount: Array.isArray(d.game_indices) ? d.game_indices.length : 0,
    totalMovesCount: Array.isArray(d.moves) ? d.moves.length : 0,
    height: d.height ?? 0,
    weight: d.weight ?? 0,
    baseExp: d.base_experience ?? 0,
  };

  const typeColors = {
    fire: "from-red-300 to-red-500 text-black",
    water: "from-blue-300 to-blue-500 text-black",
    grass: "from-green-300 to-green-500 text-black",
    electric: "from-yellow-300 to-yellow-500 text-black",
    psychic: "from-pink-300 to-pink-500 text-black",
    ice: "from-cyan-200 to-cyan-400 text-black",
    dragon: "from-purple-300 to-purple-500 text-black",
    dark: "from-gray-600 to-gray-800 text-white", 
    fairy: "from-pink-200 to-pink-400 text-black",
    normal: "from-gray-200 to-gray-400 text-black",
    fighting: "from-red-500 to-red-700 text-white", 
    flying: "from-indigo-200 to-indigo-400 text-black",
    poison: "from-purple-300 to-purple-500 text-black",
    ground: "from-yellow-500 to-yellow-700 text-black",
    rock: "from-gray-400 to-gray-600 text-black",
    bug: "from-green-500 to-green-700 text-black",
    ghost: "from-indigo-500 to-indigo-700 text-white", 
    steel: "from-gray-300 to-gray-500 text-black",
  };

  const activeTypeColor =
    typeColors[types[safeTypeIndex]] ?? "from-gray-300 to-gray-500 text-black";

  return (
    <div className="space-y-4 p-4 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 transition-all hover:scale-[1.02]">
      
      <div className="flex items-center gap-4">
        <div
          className={`rounded-2xl bg-gradient-to-br ${activeTypeColor} shadow-inner p-3 w-28 h-28 flex items-center justify-center border border-gray-300 transition-all`}
        >
          {d.sprites?.front_default ? (
            <img
              src={d.sprites.front_default}
              alt={selected.name}
              className="w-20 h-20 drop-shadow-lg transition-transform hover:scale-110"
            />
          ) : (
            <div className="text-sm text-gray-600">No image</div>
          )}
        </div>

        <div>
          <h2
            className={`text-3xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r ${activeTypeColor}`}
          >
            {selected.name}
          </h2>
          <div className="text-sm text-gray-700">ID: {d.id}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-xl border border-gray-300 shadow-inner">
        <div className="flex-1 space-y-1 text-gray-800">
          <p className="text-sm font-semibold">Basic Info</p>
          <div className="space-y-1">
            <div>Height: {summary.height}</div>
            <div>Weight: {summary.weight}</div>
            <div>Base Experience: {summary.baseExp}</div>
          </div>
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-gray-800">Types</p>
          <div className="flex gap-2 flex-wrap mt-1">
            {types.length > 0 ? (
              types.map((t) => (
                <span
                  key={t}
                  className={`px-3 py-1 rounded-full text-xs capitalize bg-gradient-to-r ${
                    typeColors[t] ?? "from-gray-200 to-gray-400 text-black"
                  } shadow-sm`}
                >
                  {t}
                </span>
              ))
            ) : (
              <div className="text-xs text-gray-600">No types</div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-2 border-b pb-2 overflow-x-auto">
          {types.length === 0 && (
            <div className="text-sm text-gray-600">No types available</div>
          )}

          {types.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTypeIndex(i)}
              className={`px-4 py-2 rounded-t-xl font-medium transition-all whitespace-nowrap ${
                i === safeTypeIndex
                  ? `bg-white border border-b-0 shadow-md text-gray-900`
                  : `bg-gray-100 text-gray-700 hover:bg-gray-200`
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-3 bg-gray-100 p-4 border border-gray-300 rounded-xl shadow-inner transition-all">
          {types.length > 0 ? (
            <>
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Type Overview: {types[safeTypeIndex]}
              </p>

              <div className="space-y-2 text-gray-800">
                <div className="flex justify-between">
                  <span>Game Indices:</span>
                  <span>{summary.gameIndicesCount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Moves Available:</span>
                  <span>{summary.totalMovesCount}</span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Stats Visualization:</p>
                  <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-400 h-3 rounded-full"
                      style={{
                        width: `${
                          (Math.min(summary.baseExp, 255) / 255) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <details className="mt-3 text-gray-800">
                  <summary className="cursor-pointer font-medium hover:text-gray-900">
                    Show first 10 moves
                  </summary>
                  <ul className="list-disc pl-5 mt-2 max-h-40 overflow-auto">
                    {Array.isArray(d.moves) &&
                      d.moves.slice(0, 10).map((m) => (
                        <li key={m.move.name} className="capitalize">
                          {m.move.name}
                        </li>
                      ))}
                  </ul>
                </details>
              </div>
            </>
          ) : (
            <div className="text-gray-800 text-sm">
              This Pokémon has no types.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
