'use client';

import Image from 'next/image';
import React, { useState } from 'react';


const ClientPokemonDetail = ({ pokemonDetail }) => {
  const [data, setData] = useState(pokemonDetail);
  const [searchPokemon, setSearchPokemon] = useState('');

  const fetchPokemonDetails = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon details');
    }
    const pokemonData = await response.json();
    setData(pokemonData);
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className='bg-white min-w-80 max-w-screen-md m-auto p-4 mt-12'>
      <div>
        <p className='mb-2'>Search Pokemon by name or national pokedex number.</p>
        <div className='flex mb-2'>
          <div className="flex items-center border border-gray-300 rounded-md bg-slate-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-7 w-7 text-gray-500 p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              value={searchPokemon}
              onChange={(e) => setSearchPokemon(e.target.value)}
              className="bg-transparent py-1 px-2 outline-none flex-1"
              type="text"
              placeholder="Name or number"
            />
          </div>
          <button
            className='bg-blue-400 text-white py-1 px-5 ml-2 rounded-md'
            onClick={fetchPokemonDetails}
          >
            Find
          </button>
        </div>
      </div>

      <div className='border-solid border-2 border-black rounded-md p-4'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 mt-3">
          <div>
            <p>n {data?.id.toString().padStart(3, '0')}</p>
            <div className="flex justify-between items-center mb-2">
              <p className='font-bold text-2xl'>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
              <div className="flex space-x-2">
                <button className='bg-purple-600 rounded px-5 text-base'>Grass</button>
                <button className='bg-purple-600 rounded px-5 text-base'>Poison</button>
              </div>
            </div>
            <Image
              src={data.sprites.front_default}
              alt={data.name}
              className='bg-slate-700 rounded-xl'
              width={800}
              height={500}
            />
          </div>

          {/* Right Content (Details) */}
          <div className='p-3'>
            <div className='flex justify-between mt-4 md:mt-20'>
              <p className='font-bold'>Forms</p>
              <p className='font-bold'>Details</p>
              <p className='font-bold'>Types</p>
              <p className='font-bold'>Stats</p>
              <p className='font-bold'>Wear</p>
            </div>

            <div className='flex justify-evenly mt-4'>
              <Image
                src={data.sprites.front_default}
                alt={data.name}
                className='bg-slate-700 rounded-xl'
                width={70}
                height={50}
              />
              <Image
                src={data.sprites.back_default}
                alt={data.name}
                className='bg-slate-700 rounded-xl'
                width={70}
                height={50}
              />
              <Image
                src={data.sprites.front_shiny}
                alt={data.name}
                className='bg-slate-700 rounded-xl'
                width={70}
                height={50}
              />
              <Image
                src={data.sprites.back_shiny}
                alt={data.name}
                className='bg-slate-700 rounded-xl'
                width={70}
                height={50}
              />
            </div>

            <div className='px-2 mt-7'>
              <p className='font-bold text-xl'>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
              <p className='text-sm mt-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPokemonDetail;
