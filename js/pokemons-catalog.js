'use strict'
import PokemonService from './pokemon-service.js';

export default class PokemonCatalog{
  constructor({element}) {
    this._element = element;
    this._showInfo('.card');
    this._amountOfPokemons = 12;
    this._showPokemons(this._amountOfPokemons);
    this._loadMorePokemons('.load-pokemons');
  };

  _infoCard(){
    this._infoCard = new InfoCard({
      element: document.querySelector('[data-component="info-card"]')
    });
  };

  _showPokemons(amountOfPokemons) {
    this._pokeApi = PokemonService.getMainInfo(amountOfPokemons)
    this._pokeApi.then(response => {
    this._render(response)
    })
  };

  _showInfo(elem) {
    this._element.addEventListener('click', (event) => {
      let target = event.target.closest(elem)

      if(!target) {
        return;
      };
      
      this._pokeApi.then(response => {
        response.map(el => {
          if(el.id == target.dataset.id) {
            this._addInfo(el)
          };
        });
      });
    });
  };

  _loadMorePokemons(elem) {
    const maxLoadPokemons = 900;
    const amountNextPokemons = 12;
    this._element.addEventListener('click', (event) => {
      let target = event.target.closest(elem)

      if(!target) {
        return;
      };

      if(this._amountOfPokemons > maxLoadPokemons) {
        this._amountOfPokemons = amountNextPokemons;
      };
      this._element.innerHTML = null;
      this._amountOfPokemons += amountNextPokemons;
      let preloader = document.querySelector('#preloader');
      preloader.style.display = 'block';

      this._showPokemons(this._amountOfPokemons);
    });
  };

  _addInfo(data) {
    let pokemon = Object.entries(data)
    let info =  pokemon.filter(el => {
      if(el[0] !== 'name' &&
        el[0] !== 'image' &&
        el[0] !== 'id' ) {
        return el
      };
    });
    this._renderCardInfo(data, info)
  };

  _hidePreloader() {
    const lastPokemonImg = 11;
    let add = [...document.querySelectorAll('[data-element="pokemon-image"]')];
    add.map((el, i) => {
      if( i === lastPokemonImg) {
        el.onload = () => {
          preloader.style.display = 'none'
      }
      }
    })
  }

  _renderCardInfo(data, info) {
    document.querySelector('[data-component="info-card"]').innerHTML = `
    <div class="more-info" data-element="more-info">
      <img src="${data.image}" alt="image" class="more-info-image">
      <p class="card-name-id">${data.name}#0${data.id}</p>
      <table class="table-info">
        ${info.map(el => {
          if( Array.isArray(el[1])) {
            return `
            <tr>
            <td>${el[0]}</td><td>${el[1].map(features => features.type.name ).join(', ')}</td>
            </tr>
            `
          };
         return `
          <tr>
          <td>${el[0]}</td><td>${el[1]}</td>
          </tr>
          `
        }).join('')}
      </table>
    </div>
    `
  };

  _render(date) {
    this._element.innerHTML += `
    <div class="pokemon-cards" data-element="pokemon-cards">
      ${ date.map(pokemon => {
      return  `
        <div
         class="card"
         data-id="${pokemon.id}"
         data-element-card> 
          <img src="${pokemon.image}" alt="pokemon-img" data-element="pokemon-image">
          <div class="description">
          <p>${pokemon.name}</p>
          <div class="some-feature">
           ${pokemon.type.map(el => {
             return `
             <button data-element="${el.type.name}">
             ${el.type.name}
             </button>`
            }).join('')}
          </div>
        </div>
      </div>
        `
      }).join('')}
      <button 
      class="load-pokemons"
       data-element="load-more">
       Load more
       </button>
    </div>
    <div class="info-card" data-component="info-card">
    </div>
    `
    this._hidePreloader();
  };
};
