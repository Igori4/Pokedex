import PokemonCatalog from './pokemons-catalog.js'

let preloader = document.querySelector('#preloader');
window.addEventListener('load', () => {
    preloader.style.display = 'none';
})

let pokemonCatalog = new PokemonCatalog({
    element: document.querySelector('[data-page-container]')
<<<<<<< HEAD
}) 
=======
})

>>>>>>> gh-pages
