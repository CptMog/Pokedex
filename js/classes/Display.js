
export default class Display{
    
    constructor(containerListPokemone, containerDisplayPokemon, pokedex){
        this.containerListPokemone = containerListPokemone;
        this.containerDisplayPokemon = containerDisplayPokemon;
        this.pokedex = pokedex;
    }

    setIdentification(data){
        const namePokemon = document.createElement('span');
        const numPokemon = document.createElement('span');

        namePokemon.textContent = data.name;
        namePokemon.classList ="font-bold";
        numPokemon.textContent = "#"+data.id;
        numPokemon.classList = "font-bold";

        return [numPokemon,namePokemon];
    }

    setImage(data){
        const imagePokemon = document.createElement("img");
        const wallPaperPokemon = data.sprites.other.dream_world.front_default;
        const defaultImagePokemon = data.sprites.front_default;
        
        const availablePokemonImage = wallPaperPokemon != null ? wallPaperPokemon : defaultImagePokemon;
        imagePokemon.setAttribute('src',availablePokemonImage)
        imagePokemon.setAttribute('alt','pokemon');
        imagePokemon.setAttribute('style','image-rendering:pixelated;')
        imagePokemon.classList ="w-80 h-80";
        
        return imagePokemon
    }

    setStatsInContainer(data,divStats){
        for (const pokemonStat of data.stats) {
            let stat = document.createElement('span');
            stat.classList = "m-1 border p-1 ronded";
            stat.textContent =pokemonStat.stat.name +" = "+pokemonStat.base_stat;
            divStats.append(stat)
        }
    }

    generateAllConaitner(){
        const divIdentificationPokemon = document.createElement("div");
        const divImageAndStat = document.createElement("div");
        const divCenterBar = document.createElement('div');
        const divStats = document.createElement('div');

        divIdentificationPokemon.classList ="pl-[5rem] text-3xl flex flex-col w-[100%] p-3";
        divImageAndStat.classList ="flex justify-center";
        divCenterBar.classList ="h-[100%] w-[5px] ml-8 bg-[black]";
        divStats.classList ="flex w-[15rem] p-2 h-[2rem] flex-wrap";

        return [divIdentificationPokemon,divImageAndStat,divCenterBar,divStats]
    }

    templateDetailsDisplay(data){
        
        const [idPokemon,namePokemon] = this.setIdentification(data);
        const imagePokemon = this.setImage(data);
        const [divIdentification,divImageAndStat,divCenterBar,divStats] = this.generateAllConaitner();
        this.setStatsInContainer(data,divStats);
        
        this.containerDisplayPokemon.textContent ="";//erase the last content before adding new one

        divIdentification.append(idPokemon);
        divIdentification.append(namePokemon);
        divImageAndStat.append(imagePokemon);
        divImageAndStat.append(divCenterBar);
        divImageAndStat.append(divStats);

        this.containerDisplayPokemon.append(divIdentification);
        this.containerDisplayPokemon.append(divImageAndStat);
    }

    displayDetailsPokemon(numero){
        this.pokedex.getPokeFromApi(numero).then(data =>{ this.templateDetailsDisplay(data) })
    }

    templateSimpleDisplay(data){
         //elements
         const defaultImagePokemon = data.sprites.front_default;
         const divPokemon = document.createElement("div");
         const imagePokemon = document.createElement("img");
         const spanNamePokemon = document.createElement("h2");
     
         divPokemon.classList = "border cursor-pointer hover:scale-105 flex mt-2 rounded items-center"; 

         divPokemon.onclick = ()=>{
             this.displayDetailsPokemon(data.id)
         }

         spanNamePokemon.textContent=data.name; 
         imagePokemon.setAttribute('src',defaultImagePokemon)
         imagePokemon.setAttribute('alt',"pokemon");
         imagePokemon.classList = "w-12 h-12 m-1";
          
         divPokemon.appendChild(imagePokemon);
         divPokemon.appendChild(spanNamePokemon);
         this.containerListPokemone.appendChild(divPokemon);
    }

    displayListOfPokemon(){
        let compteur = 1;
        do{
            this.pokedex.getPokeFromApi(compteur).then(data => { this.templateSimpleDisplay(data) })
            compteur++;
        }while(compteur<=this.pokedex.ALL_POKEMON);
    }
}