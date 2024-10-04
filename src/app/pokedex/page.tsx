'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PokedexPage = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      const pokemonList = data.results;

      const details = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
      console.log({ details })
      setAllPokemons(details);
    };

    fetchPokemonData();
  }, []);


  // Just set 10 pokemons
  useEffect(() => {
    if(allPokemons.length > 0) {
      const pokemons = allPokemons.filter((pokemon) => pokemon.id <11)
      setPokemonDetails(pokemons)
    }
  }, [allPokemons])

  const onChangeSearch = (e) => {
    setSearchPokemon(e.target.value)
  }

  const formatNumberPokemon = (num: number) => {
    return num.toString().padStart(3, '0');
  }

  const findPokemons = () => {
    const lowerCasePokemon = searchPokemon.toLocaleLowerCase();
    const findByName = allPokemons.filter((pokemon) => pokemon.name.includes(lowerCasePokemon))
    setPokemonDetails(findByName)
    setSearchPokemon('')
  }

  return (
    <div>
      <div className='bg-white w-4/5 m-auto p-4 mt-12'>
        <div className="flex flex-col items-center justify-center mb-4">
          <p className='text-xl font-bold'>Pokedex</p>
          <p>Search Pokemon by name or national pokedex number.</p>
          <div>
            <input value={searchPokemon}
              className='bg-slate-300 rounded-md py-1 px-2 outline-none'
              onChange={onChangeSearch}
              type="text" placeholder='Name or number'>
            </input>
            <button
              className='bg-blue-400 text-white py-1 px-5 ml-2 rounded-md'
              onClick={findPokemons}
            >
              Find
            </button>
          </div>
        </div>

        <div className='border-solid border-2 border-black rounded-md p-2 grid grid-cols-5'>
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
                  <button className='bg-purple-600 rounded-md w-16 text-sm'>Grass</button>
                </div>
                <div className='flex justify-between'>
                  <p className='text-sm font-bold'>{upperFirstLetterPokemon}</p>
                  <button className='bg-purple-600 rounded-md w-16 text-sm'>Poison</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokedexPage;
