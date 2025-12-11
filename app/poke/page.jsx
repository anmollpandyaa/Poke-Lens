"use client";

import { useEffect, useState } from "react";
import PokemonTable from "@/components/PokemonTable";
import PokemonDetails from "@/components/PokemonDetails";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

export default function Page() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState(null);

  const limit = 20;
  const totalPages = 65; // pokeAPI fixed count

  // Fetch list
  useEffect(() => {
    const fetchList = async () => {
      setLoadingList(true);
      setError(null);
      try {
        const offset = (page - 1) * limit;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        if (!res.ok) throw new Error("Failed to fetch Pokémon list");

        const data = await res.json();
        setPokemonList(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingList(false);
      }
    };

    fetchList();
  }, [page]);

  // Fetch details
  const loadDetails = async (pokemon) => {
    setSelected({ name: pokemon.name, details: null });

    try {
      const res = await fetch(pokemon.url);
      if (!res.ok) throw new Error("Failed to fetch Pokémon details");

      const data = await res.json();
      setSelected({ name: pokemon.name, details: data });
    } catch (err) {
      setSelected(null);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 min-h-screen pokemon-bg">
      <h1 className="text-3xl font-bold pokemon-title mb-6">
        Pokémon Data Explorer
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="glass-card p-4 shadow-lg rounded-xl border border-yellow-300/30">
          {error && <ErrorMessage message={error} />}
          {loadingList ? (
            <Loading />
          ) : (
            <>
              <PokemonTable list={pokemonList} onSelect={loadDetails} />
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="glass-card p-4 shadow-lg rounded-xl border border-sky-300/30">
          <PokemonDetails selected={selected} />
        </div>
      </div>
    </div>
  );
}
