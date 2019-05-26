'use strict'
import PokemonService from './components/pocemon-service.js';

export default class PokemonCatalog{
  constructor({element}) {
    this._element = element;
    this._showInfo('.card');
    this._diapason = 12;
    this._showPokemons(this._diapason);
    this._loadMorePokemons('.load-pokemons');

  };

  _showPokemons(diapason) {
    this._pokeApi = PokemonService.getMainInfo(diapason)
    this._pokeApi.then(response => {
    this._render(response)
    });
  }

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
    this._element.addEventListener('click', (event) => {
      let target = event.target.closest(elem)

      if(!target) {
        return;
      };

      if(this._diapason > 900) {
        this._diapason = 12;
      }
      this._element.innerHTML = null;
      this._diapason += 12;
      console.log(this._diapason)
      this._showPokemons(this._diapason);
    })
  }

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

  _infoCard(){
    this._infoCard = new InfoCard({
      element: document.querySelector('[data-component="info-card"]')
    });
    
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
          <img src="${pokemon.image}" alt="pokemon-img">
          <div class="description">
          <p>${pokemon.name}</p>
          <div class="some-feature">
           ${pokemon.Type.map(el => {
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
       Load More
       </button>
    </div>
    <div class="info-card" data-component="info-card">
    </div>
    `
  };
};


