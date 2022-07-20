export default class Pokedex{

    constructor(){
        this.ALL_POKEMON = 905;
        this.TYPE_POKEMON = [
            {type: 'fire'},
            {type: 'water'},
            {type: 'grass'},
            {type: 'fly'},
            {type: 'poison'}
        ]
    }

    async getPokeFromApi(index){
        const request = await fetch('https://pokeapi.co/api/v2/pokemon/'+index)
        const reponse = await request.json();
        return reponse;
    }

    async getFrenchNamePokemon(index){
        const request = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+index)
        const reponse = await request.json();
        return reponse;
    }

}