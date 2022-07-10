
export default class Display{
    
    constructor(containerListPokemone, containerDisplayPokemon, pokedex){
        this.containerListPokemone = containerListPokemone;
        this.containerDisplayPokemon = containerDisplayPokemon;
        this.pokedex = pokedex;
    }

    setDetailsIdentification(data){
        const namePokemon = document.createElement('span');
        const numPokemon = document.createElement('span');

        namePokemon.textContent = data.name;
        namePokemon.classList ="font-bold";
        numPokemon.textContent = "#"+data.id;
        numPokemon.classList = "font-bold";

        return [numPokemon,namePokemon];
    }

    setDetailsImageAndStates(data){
        const imgPokemon = document.createElement("img");
        const tabStates = [];
        for (const stat of data.stats) {
            tabStates.push(stat.stat.name +" = "+stat.base_stat)
        }
        const availablePokemonImage = data.sprites.other.dream_world.front_default != null 
        ?
        data.sprites.other.dream_world.front_default 
        : 
        data.sprites.front_default;

        imgPokemon.setAttribute('src',availablePokemonImage)
        imgPokemon.setAttribute('alt','pokemon');
        imgPokemon.setAttribute('style','image-rendering:pixelated;')
        imgPokemon.classList ="w-80 h-80";

        return [imgPokemon,tabStates]
    }

    displayDetails(data){
        
        const divNameNumPokemon = document.createElement("div");
        const divDetailsPokemon = document.createElement("div");
        const divBarCenter = document.createElement('div');
        const divDetailsStat = document.createElement('div');
        const [idPokemon,namePokemon] = this.setDetailsIdentification(data);
        const [imagePokemon,tabStats] = this.setDetailsImageAndStates(data)


        divNameNumPokemon.classList ="pl-[5rem] text-3xl flex flex-col w-[100%] p-3";
        divDetailsPokemon.classList ="flex justify-center";
        divBarCenter.classList ="h-[100%] w-[5px] ml-8 bg-[black]";
        divDetailsStat.classList ="flex flex-col m-3 font-[800]"
        divNameNumPokemon.append(idPokemon);
        divNameNumPokemon.append(namePokemon);

        divDetailsPokemon.append(imagePokemon);
        divDetailsPokemon.append(divBarCenter);
        for(const elem of tabStats){
            let spanStat = document.createElement('span');
            spanStat.textContent = elem;
            divDetailsStat.append(spanStat)
        }
        divDetailsPokemon.append(divDetailsStat);
        this.containerDisplayPokemon.append(divNameNumPokemon);
        this.containerDisplayPokemon.append(divDetailsPokemon);
    }

    displayDetailsPokemon(numero){
        this.containerDisplayPokemon.textContent ="";
        this.pokedex.getPokeFromApi(numero).then(data =>{ this.displayDetails(data) })
    }

    simpleDisplay(data){
         //elements
         const divPokemon = document.createElement("div");
         const imgPokemon = document.createElement("img");
         const spanNamePokemon = document.createElement("h2");
     
         //container div section
         divPokemon.classList = "border cursor-pointer hover:scale-105 flex mt-2 rounded items-center"; 

         divPokemon.onclick = ()=>{
             this.displayDetailsPokemon(data.id)
         }
         //name section
         spanNamePokemon.textContent=data.name; 

         //image section
         imgPokemon.setAttribute('src',data.sprites.front_default)
         imgPokemon.setAttribute('alt',"pokemon");
         imgPokemon.classList = "w-12 h-12 m-1";
         
         
         divPokemon.appendChild(imgPokemon);
         divPokemon.appendChild(spanNamePokemon);
         this.containerListPokemone.appendChild(divPokemon);
    }

    displayListOfPokemon(){
        let compteur = 1;
        do{
            this.pokedex.getPokeFromApi(compteur).then(data => { this.simpleDisplay(data) })
            compteur++;
        }while(compteur<=this.pokedex.ALL_POKEMON);
    }
}