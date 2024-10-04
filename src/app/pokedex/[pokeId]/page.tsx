import Image from 'next/image'
import React from 'react';

const PokemonDetailPage = async ({ params }) => {
  const { pokeId } = params;
  
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }

  const data = await response.json();

  return (
    <div>
      <h1>{data.name}</h1>
      {/* <Image
        src={data.sprites.front_default} alt={data.name}
      /> */}
      <img src={data.sprites.front_default} alt={data.name} />
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
    </div>
  );
};

export default PokemonDetailPage;
