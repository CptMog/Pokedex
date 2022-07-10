export default class Pokedex{

    constructor(){
        this.ALL_POKEMON = 905;
    }

    async getPokeFromApi(index){
        const request = await fetch('https://pokeapi.co/api/v2/pokemon/'+index)
        const reponse = await request.json();
        return reponse;
    }

}