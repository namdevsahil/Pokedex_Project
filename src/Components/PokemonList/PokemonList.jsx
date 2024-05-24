import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

    const [ pokemonList, setPokemonList ] = useState([]);
    const [isLoading, setIsLoading ] = useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL);     //this download list

        const pokemonResults = response.data.results;    //we get the array of pokemon 
        console.log(response.data);

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
    }, []);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
               {(isLoading) ? 'Loading....' :
                pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} />)}
            </div>

            <div className="controls">
                <button>Prev</button>
                <button>Next</button>
            </div>

        </div>
    )
}

export default PokemonList;