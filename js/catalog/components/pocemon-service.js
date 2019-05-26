'use strict'

const pokemons = [
    {
        name: 'Picachu',
        image: './image/1.png',
        id: '1',
        Type: ['Gras', 'Poison'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    },
    {
        name: 'Bulbazar',
        image: './image/2.png',
        id: '2',
        Type: ['Fire'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    },
    {
        name: 'Charmander',
        image: './image/3.png',
        id: '3',
        Type: ['Electric'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    },
    {
        name: 'Picachu',
        image: './image/4.png',
        id: '4',
        Type: ['Gras', 'Poison'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'

    },
    {
        name: 'Bulbazar',
        image: './image/5.png',
        id: '5',
        Type: ['Fire'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    },
    {
        name: 'Charmander',
        image: './image/6.png',
        id: '6',
        Type: ['Electric'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    },
    {
        name: 'Picachu',
        image: './image/7.png',
        id: '7',
        Type: ['Gras', 'Poison'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    },
    {
        name: 'Bulbazar',
        image: './image/8.png',
        id: '8',
        Type: ['Fire'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    },
    {
        name: 'Charmander',
        image: './image/9.png',
        id: '9',
        Type: ['Electric'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    },
    {
        name: 'Picachu',
        image: './image/10.png',
        id: '10',
        Type: ['Gras', 'Poison'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    }
    ,    {
        name: 'Bulbazar',
        image: './image/11.png',
        id: '11',
        Type: ['Fire'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    },
    {
        name: 'Charmander',
        image: './image/12.png',
        id: '12',
        Type: ['Electric'],
        Attack: '52',
        Defense: '19',
        HP: '39',
        'SP Attack': '60',
        'SP Defence': '70',
        Speed: '100',
        Weight: '85',
        'Total moves': '89'
    }
];

const PokemonService = {
    getPokemons,
    getMainInfo
}
  function getPokemons() {
      return pokemons;
  };
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

