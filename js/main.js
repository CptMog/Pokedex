import Display from "./classes/Display.js";
import Pokedex from "./classes/Pokedex.js";

const containerListPokemon = document.getElementById("container-list-poke");
const containerDisplayPokemon = document.getElementById("container-right-display");
const filterButton = document.getElementById('filter');

const pokedex = new Pokedex();
const displayer = new Display(containerListPokemon,containerDisplayPokemon,pokedex);
filterButton.onclick = function(){ displayer.displayFilterPokemon(); }
window.setTimeout(() =>{ document.querySelector('.loading-container').classList ="fade_out"},10000)

displayer.display();
pokedex.getPokeFromApi(1).then(d => console.log(d)) //just for testing don't pay attention ! 

fetch("https://pokeapi.co/api/v2/pokemon-species/1/")
.then(djson => djson.json())
.then(data => console.log(data));