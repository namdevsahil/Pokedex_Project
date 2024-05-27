import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Pokedex.css'
import React from "react";

function Pokedex(){
    return (
       <div className="pokedex-wrapper">
           <Search />
           <PokemonList />
       </div>
    )
}

export default Pokedex;