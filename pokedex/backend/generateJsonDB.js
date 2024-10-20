const axios = require('axios');
const fs = require('fs');

const generatePokemonDB = async () => {
  try {
    const pokemonData = [];
    const limit = 100; // Ambil minimal 100 data Pokemon
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

    // Mengambil daftar Pokemon dari API
    const response = await axios.get(apiUrl);
    const results = response.data.results;

    // Loop melalui setiap Pokemon dan ambil detailnya
    for (const pokemon of results) {
      const pokemonDetails = await axios.get(pokemon.url);
      const data = {
        id: pokemonDetails.data.id,
        name: pokemonDetails.data.name,
        image: pokemonDetails.data.sprites.front_default,
        types: pokemonDetails.data.types.map(typeInfo => typeInfo.type.name) // Ambil tipe Pokemon
      };
      pokemonData.push(data);
    }

    // Simpan hasil ke dalam db.json
    fs.writeFileSync('db.json', JSON.stringify({ pokemon: pokemonData }, null, 2));
    console.log('Data Pokemon berhasil di-generate ke dalam db.json!');
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data Pokemon:', error);
  }
};

// Menjalankan fungsi generatePokemonDB
generatePokemonDB();

