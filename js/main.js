
import Pokedex from "./Pokedex.class.js";

const list_pke = document.getElementById("container-list-poke");
const block_display = document.getElementById("container-right-display");

const poke = new Pokedex(list_pke,block_display);
// poke.fillTabPokemon();
poke.displayListOfPokemon();

poke.getPokeFromApi(1).then(d => console.log(d))

