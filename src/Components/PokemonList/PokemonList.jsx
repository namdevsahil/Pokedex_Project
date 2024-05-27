import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import react from 'react';

function PokemonList(){

    const [ pokemonList, setPokemonList ] = useState([]);
    const [isLoading, setIsLoading ] = useState(true);

    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons(){
        setIsLoading(true);
        const response = await axios.get(pokedexUrl);     //this download list

        const pokemonResults = response.data.results;    //we get the array of pokemon 

        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        // iterating over the array of pokemon ,and useing their url, to create an array of prommise
        // that will downloaded 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        // passing that promises array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);      
        // now iterate on the data of each pokemon , and extract if, name, image
         const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name, 
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front.dafault,
                types: pokemon.types
        };
        });
        console.log(res);
        setPokemonList(res);
        setIsLoading(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                downloadPokemons();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, [pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
               {(isLoading) ? 'Loading....' :
                pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} id={p.id} />)}
            </div>

            <div className="controls">
                <button disabled={prevUrl == null} onClick={()=> setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)} >Next</button>
            </div>

        </div>
    )
}

export default PokemonList;