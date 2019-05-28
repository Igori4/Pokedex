'use strict'

const PokemonService = {
    getMainInfo
}

async function getPokemonsFromApi(pageSize) {
  let pokemons = []

    for( let i = pageSize - 11; i <= pageSize; i++) {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      let pokemonList = await  response.json();
      pokemons.push(pokemonList)
   }

  return pokemons;
};

function getStats(stats) {
    stats.map(el => {
        let statName = el.stat.name;
        this[`${statName}`] = el.base_stat;
    })
}


 async function getMainInfo(pageSize) {
  let pokemons = await getPokemonsFromApi(pageSize)
  let result = [];

  pokemons.map(pok => {
   let info = {}
    info.name = pok.name;
    info.id = pok.id;
    info.image = pok.sprites.front_default;
    info.type = pok.types;
    info['total moves'] = pok.moves.length;
    info.weight = pok.weight;
    getStats.call(info, pok.stats)
    result.push(info)  
  });

  return result;
};


export default PokemonService;

