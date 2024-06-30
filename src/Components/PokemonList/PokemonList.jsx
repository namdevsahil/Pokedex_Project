import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import react from 'react';

function PokemonList(){

    // const [ pokemonList, setPokemonList ] = useState([]);
    // const [isLoading, setIsLoading ] = useState(true);

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
    })

    async function downloadPokemons(){
        // setIsLoading(true);
        setPokemonListState((state)=> ({ ...state,  isLoading: true }));
        const response = await axios.get(pokemonListState.pokedexUrl);     //this download list

        const pokemonResults = response.data.results;    //we get the array of pokemon 

        console.log('response is',response.data, response.data.next);
        console.log(pokemonListState);

        setPokemonListState((state)=> ({
            ...state, 
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        }));

        // iterating over the array of pokemon ,and useing their url, to create an array of prommise
        // that will downloaded 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // passing that promises array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);      

        // now iterate on the data of each pokemon , and extract if, name, image
         const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name, 
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front.dafault,
                types: pokemon.types
        };
        });
        setPokemonListState((state) => ({
           ...state,
           pokemonList: pokeListResult,
           isLoading: false
        }));
    }

    useEffect(() => {
            downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
               {(pokemonListState.isLoading) ? 'Loading....' :
                pokemonListState.pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} id={p.id} />)}
            </div>

            <div className="controls">
                <button disabled={pokemonListState.prevUrl == null} onClick={()=> { const urlToSet = pokemonListState.prevUrl;
                    setPokemonListState({...pokemonListState, pokedexUrl: urlToSet})
                }}>Prev</button>

                <button disabled={pokemonListState.nextUrl == null} onClick={() => 
                    {
                    // console.log(pokeListResult);
                    const urlToSet = pokemonListState.nextUrl;
                    setPokemonListState({...pokemonListState, pokedexUrl: urlToSet})
                }}>Next</button>
            </div>

        </div>
    )
}

export default PokemonList;