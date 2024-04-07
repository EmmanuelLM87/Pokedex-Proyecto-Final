import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useIntersectionEffect, useRef, useState } from 'react'
import PokemonList from './PokemonList';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';


const initial_limit = 40
const increase_limit = 20

const Pokemons = () => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [pokemonName, setPokemonName] = useState("");
    const pokemonsByName = allPokemons.filter(pokemon => pokemon.name.includes(pokemonName));
    const [limit, setLimit] = useState(initial_limit);

    const targetObserver = useRef(null)
    const entry = useIntersectionObserver(targetObserver, {});
    const isVisible = !!entry?.isIntersecting;

    console.log(isVisible)

    const handleSubmit = (e) => {
        e.preventDefault();
        setPokemonName(e.target.pokemonName.value.toLowerCase())
    }

    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=898")
            .then(({ data }) => setAllPokemons(data.results))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if(isVisible){
            const maxPokemons = pokemonsByName.length
            const newLimit = limit + increase_limit;
            newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit)
            setLimit(newLimit);
        }
    }, [isVisible])

    useEffect(() => {
        setLimit(initial_limit);
    }, [pokemonName]);

    return <section className='p-4 py-5'>
        <form onSubmit={handleSubmit}>
            <div className='bg-white p-4 flex rounded-2xl text-lg'>
                <input
                    className='outline-none flex-1'
                    type="text"
                    placeholder='Search your Pokemon'
                    name='pokemonName'
                />
                <button className='bg-red-500 p-2 rounded-xl shadow-lg shadow-red-500/50 hover:bg-red-400 transition-colors'>
                    <IconSearch color='white' stroke={3} />
                </button>
            </div>
        </form>
        <PokemonList pokemons={pokemonsByName.slice(0, limit)} />

        {/* Target Observer */}
        <span ref={targetObserver}></span>
    </section>
};

export default Pokemons
