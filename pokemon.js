document.getElementById('fetch-pokemon').addEventListener('click', async () => {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = ''; // Clear previous content
    
    try {
        // Fetch first 151 Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
        const data = await response.json();

        // Iterate over each Pokémon
        for (let i = 0; i < data.results.length; i++) {
            const pokemonDetails = await fetch(data.results[i].url);
            const pokemonData = await pokemonDetails.json();
            
            // Create a card for each Pokémon
            const card = document.createElement('div');
            card.className = 'pokemon-card';

            card.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <img src="${pokemonData.sprites.back_default}" alt="${pokemonData.name}">
                <h2>${pokemonData.name.toUpperCase()}</h2>
                <p>Type 1: ${pokemonData.types[0]?.type?.name}</p>
                <p>Type 2: ${pokemonData.types[1]?.type?.name || 'None'}</p>
                <p><strong>Base stats:</strong></p>
                <p>hp = ${pokemonData.stats[0]?.base_stat}</p>
                <p>attack = ${pokemonData.stats[1]?.base_stat}</p>
                <p>defense = ${pokemonData.stats[2]?.base_stat}</p>
                <p>special-attack = ${pokemonData.stats[3]?.base_stat}</p>
                <p>special-defense = ${pokemonData.stats[4]?.base_stat}</p>
                <p>speed = ${pokemonData.stats[5]?.base_stat}</p>
            `;

            container.appendChild(card);
        }
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
});
