let data_tab= new Array();
let ecnounter_pokemo;

function getNumberPokemon(nbr){

    for(let i=1; i<nbr; i++){
        requette.open('GET','https://pokeapi.co/api/v2/pokemon/'+i,false);
        requette.send();
    }
    
}

function getTypes(dataTypes){
    let types = "";
    for(let i=0;i<dataTypes.length;i++){
        
        if(i == 1 ){
            types += ", "+dataTypes[i].type.name;
        }else{
            types+= dataTypes[i].type.name;
        }
    }

    return types;
}

function LoadData(){
    for (var item in data_tab){
        let donnee = '<tr><td><strong>'+data_tab[item].id+'</strong></td> <td>'+data_tab[item].species.name+'</td> <td><img src="'+data_tab[item].sprites.front_default+'" alt="pokemon"/></td> <td>'+getTypes(data_tab[item].types)+'</td><td><button class="details" onclick="display('+data_tab[item].id+')" >Details</button></td></tr>'
        tableau.insertAdjacentHTML('beforeend',donnee)
    }
    
}

let requette = new XMLHttpRequest();

let tableau = document.querySelector('#liste_pokemon');

//on set le comportement de la requête lorsque l'on reçoit des infos
requette.onload = function(){
    // Si la requête s'est bien passée
    if (this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.response);
        data_tab.push(data);
    } else {
        alert("Erreur 404 : NOT DATA AT THIS ADDRESS !")
        exit();
    }

}

getNumberPokemon(899);

LoadData();

function display(id_pokemon){
    document.querySelector('.search_bl').classList.add('invisible');
    document.querySelector('.pokedex table').classList.add('invisible');

    let info = document.createElement("div");
    let html;
    console.log(data_tab[id_pokemon-1])
    Location(data_tab[id_pokemon-1])
    console.log(ecnounter_pokemo)
    if(data_tab[id_pokemon-1].sprites.other.dream_world.front_default != null){
        html = `<button class="retour" onclick="Retour()"><i class="fas fa-arrow-left"></i></button>
                    <h2>Details Pokemon</h2>
                    <h3>${data_tab[id_pokemon-1].name}</h3>
                    <div class="flex">
                        <div class="bl_guche">
                            <img src="${data_tab[id_pokemon-1].sprites.other.dream_world.front_default}" alt="pokemon"/>
                            <div class="types">types</div>
                        </div>
                        <div class="bl_droite">
                            <div class="description">${ecnounter_pokemo}</div>
                            <div class="location">location</div>
                        </div>
                    </div>
                    `
    }else{
        html = `<button class="retour" onclick="Retour()"><i class="fas fa-arrow-left"></i></button>
        <h2>Details Pokemon</h2>
        <h3>${data_tab[id_pokemon-1].name}</h3>
        <div class="flex">
            <div class="bl_guche">
                <img src="${data_tab[id_pokemon-1].sprites.front_default}" alt="pokemon"/>
                <div class="types">types</div>
            </div>
            <div class="bl_droite">
                <div class="description">${ecnounter_pokemo}</div>
                <div class="location">location</div>
            </div>
        </div>
        `
    }
   
    info.insertAdjacentHTML('beforeend',html)
    info.classList.add("container")
    document.body.append(info);

}

function Retour(){
    document.querySelector('.pokedex table').classList.remove('invisible');
    document.querySelector('.search_bl').classList.remove('invisible');
    document.querySelector('.container').remove();
}

function Location(data_object){
    let request = new XMLHttpRequest();
    request.onload=function(){
        let reponse = JSON.parse(this.response);
        console.log(reponse);

        let html = `<ul>`

            for(var key in reponse){
                html += `<li>${reponse[key].location_area.name}</li>`
            }

        html +=`</ul>`
        ecnounter_pokemo = html;
    }

    request.open('GET',data_object.location_area_encounters,false);
    request.send()
}
