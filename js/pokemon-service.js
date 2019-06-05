'use strict'

const PokemonService = {
    getMainInfo
}

async function getPokemonsFromApi(pageSize) {
  let pokemons = []
  const idNextPokemons = 11;
  let apiCalls = [];
  
  for( let i = pageSize - idNextPokemons; i <= pageSize; i++) {
    apiCalls.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then( (response) => {
    return  response.json()
    }).then( data => {
      pokemons.push(data)
    })
    ); 
   };

  await Promise.all(
    apiCalls
  )
    
  return pokemons;
};

function getStats(stats) {
  stats.map(info => {
    let statName = info.stat.name;
    this[statName] = info.base_stat;
  })
}

 async function getMainInfo(pageSize) {
  let pokemons = await getPokemonsFromApi(pageSize)
  let result = [];

    pokemons.forEach( pok => {
      let info = {}
       info.name = pok.name;
       info.id = pok.id;
       info.image = pok.sprites.front_default;
       info.type = pok.types;
       info['total moves'] = pok.moves.length;
       info.weight = pok.weight;
       getStats.call(info, pok.stats)
       result.push(info)  
     })

  

  return result;
};

export default PokemonService;
