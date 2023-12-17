const pokeApi = {}
const pokeDetail = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types 
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height
    const abilities = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name)
    pokemon.abilities = abilities
    const stats = pokeDetail.stats.map((typeSlot) => typeSlot.stat.name)
    const stat_values = pokeDetail.stats.map((typeSlot) => typeSlot.base_stat)
    let stat = []
    for (let i=0; i < stats.length;i++){
        stat.push(stats[i]);
        stat.push(stat_values[i]);
    }
    pokemon.stats = stat

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}
// Fetch é utilizado para processamento assíncrono. Promisses
