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
  const totalPages = 65; 

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
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mb-8 text-center">
        Pokémon Data Explorer
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-4 shadow-xl rounded-2xl border border-white/20 transition-all hover:scale-[1.02] hover:shadow-2xl">
          {error && <ErrorMessage message={error} />}
          {loadingList ? (
            <Loading />
          ) : (
            <>
              <PokemonTable list={pokemonList} onSelect={loadDetails} />
              <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </>
          )}
        </div>

        <div className="glass-card p-4 shadow-xl rounded-2xl border border-white/20 transition-all hover:scale-[1.02] hover:shadow-2xl">
          <PokemonDetails selected={selected} />
        </div>
      </div>
    </div>
  );
}
