'use strict'

const PokemonService = {
    getMainInfo
}

async function getPokemonsFromApi(diapason) {
  let pokemons = []

    for( let i = diapason - 11; i <= diapason; i++) {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      let pokemonList = await  response.json();
      pokemons.push(pokemonList)
   }

  return pokemons;
};


 async function getMainInfo(diapason) {
  let pokemons = await getPokemonsFromApi(diapason)
  let result = [];

  pokemons.map(pok => {
   let info = {}
    info.name = pok.name;
    info.id = pok.id;
    info.image = pok.sprites.front_default;
    info.Type = pok.types;
    info['Total moves'] = pok.moves.length;
    info.Weight = pok.weight;
    result.push(info)  
  });

  return result;
};


export default PokemonService;

