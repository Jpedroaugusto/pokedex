const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const input = document.querySelector(".input_search");
const form = document.querySelector('.form');
const buttonNext = document.querySelector('.btn-next')
const buttonPrev = document.querySelector('.btn-prev')


let busca = 1;

const fetchPokemon = async (pokemon) =>{
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(api.status == 200) {
        pokemonImage.style.display = 'block';
        const data = await api.json();
        busca = data.id;
        return data;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :c';
        pokemonId.innerHTML = '';
    }
}

const renderizarPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonId.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
}

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    let pokemon = input.value
    renderizarPokemon(pokemon.toLowerCase())
    input.value = ''
});


buttonPrev.addEventListener('click', () =>{
    if(busca > 1){
        busca--
        renderizarPokemon(busca)
    }
});

buttonNext.addEventListener('click', () =>{
    busca++
    renderizarPokemon(busca)
});

renderizarPokemon('1')