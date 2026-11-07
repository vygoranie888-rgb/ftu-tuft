const startUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'; 
const startRequest = new XMLHttpRequest();
const nav = document.getElementById('nav');
const prevBtnElement = document.getElementById('prev');
const nextBtnElement = document.getElementById('next');
const resultElement = document.getElementById('result');
let state;

pokemonListRequest(startUrl);

function pokemonListRequest(url){
    startRequest.open('GET', url);
    startRequest.responseType = 'json';
    startRequest.send();
    startRequest.onload = function(){
        state = startRequest.response;
        drawList();
        setButtonsState();
    }
}

function drawList(){
    let pokemonElements = document.createElement('ul');
    pokemonElements.classList.add('pokemon-list');
    state.results.forEach(pokemon => {
        pokemonElements.innerHTML += `
        <li onclick = "pokemonRequest ('${pokemon.url}') "> ${pokemon.name} 
        </li>
        `
    });
    resultElement.innerHTML = '';
    resultElement.appendChild(pokemonElements);
    showButton();
}

document.getElementById('limit').addEventListener('change', function(event){
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${event.target.value}&offset=0`;
    pokemonListRequest(url);
})

let oneError = false;

function pokemonRequest(url) {
    oneError = false;

    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';

    request.onerror = function () {
        oneError = true;
        resultElement.innerHTML = `
            <button class="btn" onclick="drawList()">Go back</button>
            <div class="pokemon">
                There was some error during the search! Try again.
            </div>
        `;
        console.log('oneError');
    };

    request.onload = function () {
        if (request.status !== 200 || !request.response) {
            oneError = true;
            resultElement.innerHTML = '<p>oneError</p>';
            console.log('oneError');
            return;
        }

        const pokemon = request.response;

        if (pokemon.id > 300) {
            nextBtnElement.textContent = 'back <-';
            return;
        }

        nextBtnElement.textContent = 'next ->';
        drawPokemon(pokemon);
    };

    request.send();
}

function drawPokemon(pokemon) {
hideButtons();

resultElement.innerHTML = '';

let pokemonElement = document.createElement('div');
pokemonElement.classList.add('pokemon');

pokemonElement.innerHTML = `
<button class="btn" onclick="drawList()">Go Back</button>

<p>id: #${pokemon.id}</p>

<hr>

<h1>${pokemon.name}</h1>

<img src="${pokemon.sprites.front_default}">
`;


let typeList = document.createElement('ul');
pop

resultElement.appendChild(pokemonElement);
} 

