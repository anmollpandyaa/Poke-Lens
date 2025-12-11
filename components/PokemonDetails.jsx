"use client";

import React, { useState } from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

export default function PokemonDetails({ selected }) {
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  if (!selected) {
    return (
      <div className="text-gray-500 text-center py-10 italic">
        Select a Pokémon to see details.
      </div>
    );
  }

  if (!selected.details) {
    return <Loading small={true} />;
  }

  const d = selected.details;

  const types = Array.isArray(d.types)
    ? d.types.map((t) => t.type.name)
    : [];

  const safeTypeIndex =
    activeTypeIndex < types.length ? activeTypeIndex : 0;

  const summary = {
    gameIndicesCount: Array.isArray(d.game_indices) ? d.game_indices.length : 0,
    totalMovesCount: Array.isArray(d.moves) ? d.moves.length : 0,
    height: d.height ?? 0,
    weight: d.weight ?? 0,
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-white bg-opacity-70 shadow-xl backdrop-blur-md border border-yellow-300/40">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-gradient-to-br from-yellow-200 to-yellow-100 shadow-inner p-3 w-24 h-24 flex items-center justify-center border border-yellow-300">
          {d.sprites?.front_default ? (
            <img
              src={d.sprites.front_default}
              alt={selected.name}
              className="w-20 h-20 drop-shadow-md"
            />
          ) : (
            <div className="text-sm text-gray-400">No image</div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold capitalize text-yellow-800">
            {selected.name}
          </h2>
          <div className="text-sm text-gray-600">ID: {d.id}</div>
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="flex gap-6 bg-yellow-50/60 p-3 rounded-lg border border-yellow-200">
        <div className="flex-1">
          <p className="text-sm font-semibold text-yellow-700">Basic Info</p>
          <ul className="text-sm text-gray-700">
            <li>Height: {summary.height}</li>
            <li>Weight: {summary.weight}</li>
            <li>Base Experience: {d.base_experience}</li>
          </ul>
        </div>

        <div className="w-40">
          <p className="text-sm font-semibold text-yellow-700">Types</p>
          <div className="flex gap-2 flex-wrap mt-1">
            {types.length > 0 ? (
              types.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs capitalize bg-yellow-200 text-yellow-900 border border-yellow-300 shadow-sm"
                >
                  {t}
                </span>
              ))
            ) : (
              <div className="text-xs text-gray-500">No types</div>
            )}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div>
        <div className="flex gap-2 border-b pb-2">
          {types.length === 0 && (
            <div className="text-sm text-gray-500">No types available</div>
          )}

          {types.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTypeIndex(i)}
              className={`px-4 py-2 rounded-t-lg capitalize transition-all font-medium ${
                i === safeTypeIndex
                  ? "bg-white border border-b-0 text-yellow-800 shadow-md"
                  : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="mt-3 bg-yellow-50 p-4 border border-yellow-200 rounded-lg shadow-inner">
          {types.length > 0 ? (
            <>
              <p className="text-sm text-yellow-800 mb-3 font-semibold">
                Type Overview: {types[safeTypeIndex]}
              </p>

              <div className="text-sm text-gray-700 space-y-1">
                <div>
                  Game Indices:{" "}
                  <strong className="text-yellow-800">
                    {summary.gameIndicesCount}
                  </strong>
                </div>
                <div>
                  Moves Available:{" "}
                  <strong className="text-yellow-800">
                    {summary.totalMovesCount}
                  </strong>
                </div>

                <details className="mt-3">
                  <summary className="cursor-pointer text-yellow-700 font-medium hover:text-yellow-900">
                    Show first 10 moves
                  </summary>
                  <ul className="list-disc pl-5 mt-2 max-h-40 overflow-auto text-gray-700">
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
            <div className="text-gray-600 text-sm">
              This Pokémon has no types.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
