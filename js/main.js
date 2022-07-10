
import Pokedex from "./Pokedex.class.js";

const list_pke = document.getElementById("container-list-poke");
const block_display = document.getElementById("container-right-display");

const poke = new Pokedex(list_pke,block_display);

poke.displayListOfPokemon();
poke.displayDetailsPokemon(1);

poke.getPokeFromApi(1).then(d => console.log(d))

