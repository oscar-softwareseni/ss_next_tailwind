import React from 'react';
import ClientPokemonList from '@/app/layout/ClientPokemonList';

const PokemonListPage = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }

  const data = await response.json();
  const pokemonList = data.results;

  const listOfPokemons = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return await res.json();
    })
  );

  return (
    <ClientPokemonList listOfPokemons={listOfPokemons} />
  );
};

export default PokemonListPage;