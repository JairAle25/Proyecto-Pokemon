const listaTipos=document.getElementById('tiposDePokemons');
const RutaBase = 'https://pokeapi.co/api/v2/';
const cajaPokemons = document.getElementById('content-pokemon');

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

listaTipos.addEventListener('change',()=>{
    const tipo = listaTipos.value;
    fetch(`${RutaBase}type/${tipo}`)
    .then((Response)=>Response.json(Response))
    .then((data)=>IterarPokemonsDeUnTipo(data))
})

const mostrarInfoPokemons=(data)=>{
    const divPorPokemon = document.createElement('div');
    divPorPokemon.className='content-info';
    ///IMAGEN POKEMON
    const imgPokemon = document.createElement('img')
    const urlImagen=data.sprites.other['official-artwork'].front_default;
    imgPokemon.src=urlImagen;

    //NOMBRE DEL POKEMON
    const nombrePokemon = document.createElement('h2');
    nombrePokemon.textContent=data.name;

    //STATS DEL POKEMON
    cajaPokemons.appendChild(divPorPokemon)
    divPorPokemon.appendChild(imgPokemon)
    divPorPokemon.appendChild(nombrePokemon)
}

const IterarPokemonsDeUnTipo=(data)=>{
    cajaPokemons.innerHTML='';
    for(let i=0;i<data.pokemon.length;i++){
        const urlPokemon = data.pokemon[i].pokemon.url;
        fetch(urlPokemon)
        .then((Response)=>Response.json(Response))
        .then((data)=>mostrarInfoPokemons(data))
    }
}

