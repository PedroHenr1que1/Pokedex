const pokemonName = document.querySelector('.pokemon__name');
const pokemonHabitat = document.querySelector('.pokemon__habitat');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonWeight = document.querySelector('.pokemon__weight');
const pokemonType = document.querySelector('.pokemon__type');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon01 = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data01 = await APIResponse.json();
    return data01;
  }
}

const fetchPokemon02 = async (IdPokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${IdPokemon}`);

  if (APIResponse.status === 200) {
    const data02 = await APIResponse.json();
    return data02;
  }
}

const fetchPokemon03 = async (IdPokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/type/${IdPokemon}`);

  if (APIResponse.status === 200) {
    const data03 = await APIResponse.json();
    return data03;
  }
}


const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonHabitat.innerHTML = '';
  pokemonWeight.innerHTML = '';


  const data01 = await fetchPokemon01(pokemon);

  if (data01) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = `Name: ${data01.name}`;

    pokemonImage.src = data01['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data01.id;
    
    const data02 = await fetchPokemon02(searchPokemon);
  
    if (data02) {
      pokemonHabitat.innerHTML = `Habitat: ${data02.habitat.name}`;
      pokemonWeight.innerHTML = `Weight: ${data01.weight / 10} kg`;
    }

    const data03 = await fetchPokemon03(searchPokemon);
  
    if (data03) {
      pokemonType.innerHTML = `Type: ${data03.name}`;
    }

  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Pokemon not found :/';
    pokemonHabitat.innerHTML = '';
    pokemonWeight.innerHTML = '';
  }

}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
