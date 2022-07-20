
export default class Display{
    
    constructor(containerListPokemone, containerDisplayPokemon, pokedex){
        this.containerListPokemone = containerListPokemone;
        this.containerDisplayPokemon = containerDisplayPokemon;
        this.pokedex = pokedex;
        this.templateDisplayFilter = this.templateDisplayFilter.bind(this)
    }

    setIdentification(data){
        const namePokemon = document.createElement('span');
        const numPokemon = document.createElement('span');

        this.pokedex.getFrenchNamePokemon(data.id).then(d => namePokemon.textContent =d.names[4].name )
        // namePokemon.textContent = data.name;
        namePokemon.classList ="font-bold";
        numPokemon.textContent = "#"+data.id;
        numPokemon.classList = "font-bold";

        return [numPokemon,namePokemon];
    }

    setImage(data){
        const imagePokemon = document.createElement("img");
        const wallPaperPokemon = data.sprites.other["official-artwork"].front_default;
        const defaultImagePokemon = data.sprites.front_default;
        
        const availablePokemonImage = wallPaperPokemon != null ? wallPaperPokemon : defaultImagePokemon;
        imagePokemon.setAttribute('src',availablePokemonImage)
        imagePokemon.setAttribute('alt','pokemon');
        imagePokemon.setAttribute('style','image-rendering:pixelated;')
        imagePokemon.classList ="w-[450px] h-[450px]";
        
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
         this.pokedex.getFrenchNamePokemon(data.id).then(d => spanNamePokemon.textContent =d.names[4].name )
        //  spanNamePokemon.textContent=data.name; 
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
    
    closeFilterPokemon(){
       document.getElementById('filterPokemon').remove();
    }

    templateDisplayFilter(){
        const divFilterType = document.createElement('div');
        const divFlexFilterType = document.createElement('div');
        const spanClose = document.createElement('span');
        spanClose.textContent ='X';
        spanClose.classList = "rounded-full cursor-pointer h-[1.5rem] w-[1.5rem] ml-3";
        spanClose.onclick =this.closeFilterPokemon.bind(this);
        divFlexFilterType.classList = "w-[8.5rem] h-[8rem]  flex justify-center flex-wrap p-1" ;
        divFilterType.classList = "absolute bottom-[21rem] left-[18rem] bg-[white] border rounded-lg";
        divFilterType.id ="filterPokemon";

        divFilterType.append(spanClose);
        for (const type of this.pokedex.TYPE_POKEMON) {
            let typePokemon = document.createElement('span');
            typePokemon.classList = "hover:scale-105 cursor-pointer border h-[2rem] mr-1 px-3 rounded-md";
            typePokemon.textContent = type.type;
            divFlexFilterType.append(typePokemon);
        }
        
        divFilterType.append(divFlexFilterType);
        return divFilterType;
    }

    displayFilterPokemon(){
        const divFilterPokemon = this.templateDisplayFilter(); 
        this.containerListPokemone.append(divFilterPokemon);
    }

    

    // toggleDisplayFilterPokemon(){
        
    // }

    display(){
        this.displayListOfPokemon()
        this.displayDetailsPokemon(1)
    }

}