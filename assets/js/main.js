const pokemonList = document.getElementById('pokemonList');
const loadmore = document.getElementById('loadmore');
const maxRecords = 151;
const limit = 12;
let offset= 0;

function loadItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) =>`
        <li class="pokemon ${pokemon.type}" onclick="expandCard(this)">
            <div class="firstInfo">
                <span class="name">${pokemon.name}</span>
                <span class="number">#0${pokemon.number}</span>
            </div>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <div id="pokemon-info" class="info_poke">
                <h4>About</h4>
                <ol class="info">
                    <li class="poke_info">Specie</li>
                    <li class="poke_info">${pokemon.type}</li>
                    <li class="poke_info">Weight</li>
                    <li class="poke_info">${pokemon.weight}Kg</li>
                    <li class="poke_info">Height</li>
                    <li class="poke_info">${pokemon.height}0cm</li>
                </ol>
                <h4>Abilities</h4>
                <ol class="info">
                    ${pokemon.abilities.map((ability) => `<li class="poke_info">${ability}</li>`).join('')}
                </ol>
                <h4>Stats</h4>
                <ol class="info">
                    ${pokemon.stats.map((stat) => `<li class="poke_info">${stat}</li>`).join('')}
                </ol>
            </div>
        </li>
        `).join('')
        pokemonList.innerHTML += newHTML
    })
}

function expandCard(card) {
    const allCards = document.querySelectorAll('.pokemon');
    
    const isExpanded = card.classList.contains('expanded');

    allCards.forEach((c) => {
        c.classList.remove('expanded');
    });

    if (!isExpanded) {
        card.classList.add('expanded');
    }
}

loadItems(offset, limit);

loadmore.addEventListener('click', () =>{
    offset += limit;
    const qtdRecord = offset + limit;
    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadItems(offset, newLimit);

        loadmore.parentElement.removeChild(loadmore)
    }else{
        loadItems(offset, limit);
    }
})