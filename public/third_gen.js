const pokemonContainer = document.querySelector('.pokemon-container')
const previous = document.querySelector('#previous')
const next = document.querySelector('#next')


let offset = 252
let limit = 8

previous.addEventListener("click", () => {
    if(offset != 252){
        offset -= 9;
        removeChildNodes(pokemonContainer)
        fetchPokemons(offset, limit);
    }
})

next.addEventListener("click", () => {
    if(offset < 378){
        offset += 9;
        console.log(offset)
        removeChildNodes(pokemonContainer)
        fetchPokemons(offset, limit);
    }
    })

const fetchPokemon = async (id) => {
    if(id <= 386){
        try{
            const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            const res = await fetch(url);
            const datos = await res.json();
            const poke = createPokemon(datos)
        } catch(err) {
            console.log(err)
        }
    }
}



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


    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    pokemonContainer.appendChild(card);

}


function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);