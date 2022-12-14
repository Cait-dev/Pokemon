const pokemonContainer = document.querySelector('.pokemon-container')
const previous = document.querySelector('#previous')
const next = document.querySelector('#next')


let offset = 1
let limit = 8


previous.addEventListener("click", () => {
    if(offset != 1){
        offset -= 9;
        removeChildNodes(pokemonContainer)
        fetchPokemons(offset, limit);
    }
})

next.addEventListener("click", () => {
    if(offset < 145){
        offset += 9;
        removeChildNodes(pokemonContainer)
        fetchPokemons(offset, limit);
    }
    })

const fetchPokemon = async (id) => {
    if (id < 152){
        try{
            const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            const res = await fetch(url);
            const datos = await res.json();
            const poke =  createPokemon(datos)
        } catch(err) {
            console.log(err)
        }
    }
  };

const fetchPokemons = async (offset, limit) => {
    for (let i = offset; i <= offset + limit; i++){
        await fetchPokemon(i)
    }
}


function createPokemon(pokemon){
    const card = document.createElement('div');
    card.classList.add('pokemon-block');
    
    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;


    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    const types = document.createElement('p');
    types.classList.add('types');
    types.innerText = `Type: ${pokemon.types[0].type.name}`;
    

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(types);


    pokemonContainer.appendChild(card);

}


function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);
