import React from 'react';

const PokemonDetail = async ({ pokeId }) => {

  console.log('pokeId', pokeId)
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }

  const data = await response.json();

  return (
    <div>
      <p>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
    </div>
  );
};

export default PokemonDetail;