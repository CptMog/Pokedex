import Display from "./classes/Display.js";
import Pokedex from "./classes/Pokedex.js";

const containerListPokemon = document.getElementById("container-list-poke");
const containerDisplayPokemon = document.getElementById("container-right-display");

const pokedex = new Pokedex();
const displayer = new Display(containerListPokemon,containerDisplayPokemon,pokedex);

window.setTimeout(() =>{ document.querySelector('.loading-container').classList ="fade_out"},4000)

displayer.displayListOfPokemon();
displayer.displayDetailsPokemon(1);

pokedex.getPokeFromApi(1).then(d => console.log(d)) //just for testing don't pay attention ! 

