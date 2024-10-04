'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ClientPokemonList = ({ listOfPokemons }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState('');

  // Just set 10 pokemons
  useEffect(() => {
    if(listOfPokemons.length > 0) {
      const pokemons = listOfPokemons.filter((pokemon) => pokemon.id <11)
      setPokemonDetails(pokemons)
    }
  }, [listOfPokemons])

  const onChangeSearch = (e) => {
    setSearchPokemon(e.target.value)
  }

  const formatNumberPokemon = (num: number) => {
    return num.toString().padStart(3, '0');
  }

  const findPokemons = () => {
    const lowerCasePokemon = searchPokemon.toLocaleLowerCase();
    const findByName = listOfPokemons.filter((pokemon) => pokemon.name.includes(lowerCasePokemon))
    setPokemonDetails(findByName)
    setSearchPokemon('')
  }

  return (
    <div className='bg-white min-w-96 max-w-screen-lg m-auto p-4 mt-12'>
      <div className="flex flex-col items-center justify-center mb-4">
        <p className='text-xl font-bold'>Pokedex</p>
        <p>Search Pokemon by name</p>

        <div className='flex'>
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
              className="bg-transparent py-1 px-2 outline-none flex-1"
              onChange={onChangeSearch}
              type="text"
              placeholder="Name or number"
            />
          </div>
          <button
            className='bg-blue-400 text-white py-1 px-5 ml-2 rounded-md'
            onClick={findPokemons}
          >
            Find
          </button>
        </div>
      </div>

      <div className="border-solid border-2 border-black rounded-md p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {pokemonDetails.map((pokemon) => {
          const upperFirstLetterPokemon = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
          const numberPokemon = formatNumberPokemon(pokemon.id);
          return (
            <div key={pokemon.name} className='p-4'>
              <Link href={`/pokedex/${pokemon.id}`}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className='bg-slate-700 rounded-xl'
                  width={800}
                  height={500}
                />
              </Link>
              <div className='flex justify-between mt-2 mb-1'>
                <p className='text-sm'>{`n ${numberPokemon}`}</p>
                <button className='bg-purple-600 rounded w-16 text-sm'>Grass</button>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm font-bold'>{upperFirstLetterPokemon}</p>
                <button className='bg-purple-600 rounded w-16 text-sm'>Poison</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientPokemonList;
