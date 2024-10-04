import React from 'react';
import PokemonDetailPage from '@/app/layout/PokemonDetailPage';

const PokemonDetail = async ({ params }: { params: { pokeId: number}}) => {
  const { pokeId } = params;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }

  const data = await response.json();

  return (
    <PokemonDetailPage pokemonDetail={data} />
  );
};

export default PokemonDetail;