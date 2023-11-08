const listaTipos=document.getElementById('tiposDePokemons');
const RutaBase = 'https://pokeapi.co/api/v2/';
const cajaPokemons = document.getElementById('content-pokemon');
//RELLENAR TIPOS DE POKEMON
fetch(`${RutaBase}type`)
.then((Response)=>Response.json(Response))
.then((data) => RellenarListaDeTipos(data))

const RellenarListaDeTipos=(data)=>{
    for(let i =0;i<data.results.length;i++){
        let opcionesDeLista = document.createElement('option');
        
            opcionesDeLista.textContent=data.results[i].name;
            listaTipos.appendChild(opcionesDeLista);
  
    }
}
//-------------------------

listaTipos.addEventListener('change',()=>{
    const tipo = listaTipos.value;


    fetch(`${RutaBase}type/${tipo}`)
    .then((Response)=>Response.json(Response))
    .then((data)=>IterarPokemonsDeUnTipo(data,tipo))
    
})

const IterarPokemonsDeUnTipo=(data,tipo)=>{
    cajaPokemons.innerHTML='';
    for(let i=0;i<data.pokemon.length;i++){
        const urlPokemon = data.pokemon[i].pokemon.url;
        fetch(urlPokemon)
        .then((Response)=>Response.json(Response))
        .then((data)=>mostrarInfoPokemons(data,tipo))
    }
}

const iconsTipos =['<i class="bi bi-heart-pulse-fill hp"></i>','<i class="bi bi-life-preserver attack"></i>',
'<i class="bi bi-bandaid-fill defense"></i>','<i class="bi bi-magic special-attack"></i>',
'<i class="bi bi-capsule special-defense"></i>','<i class="bi bi-speedometer speed"></i>']

const mostrarInfoPokemons=(data,tipo)=>{
    const divPorPokemon = document.createElement('div');
    divPorPokemon.className=`content-info ${tipo}`;
    ///IMAGEN POKEMON
    const imgPokemon = document.createElement('img')
    const urlImagen=data.sprites.other['official-artwork'].front_default;
    imgPokemon.src=urlImagen;

    //NOMBRE DEL POKEMON
    const nombrePokemon = document.createElement('h2');
    nombrePokemon.textContent=data.name;
    nombrePokemon.className='nombrePokemon';

    ///INCLUIMOS AL INDEX
    cajaPokemons.appendChild(divPorPokemon)
    divPorPokemon.appendChild(imgPokemon)
    divPorPokemon.appendChild(nombrePokemon)

    //STATS DEL POKEMON
    const divStats = document.createElement('div');
    divPorPokemon.appendChild(divStats);
    const parrafoStats = document.createElement('p');


    for(let i=0; i<data.stats.length; i++){
        
        const numStat=data.stats[i].base_stat;
        const nombreStat=data.stats[i].stat.name;
        parrafoStats.innerHTML+=`${nombreStat} : ${numStat} ${iconsTipos[i]} | `
        parrafoStats.className='parrafoStats';
        divStats.appendChild(parrafoStats);
    }
    
}


