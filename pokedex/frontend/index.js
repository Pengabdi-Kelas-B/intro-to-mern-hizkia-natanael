var pokemonData = [];
var searchTerm = ""; 

// Mengambil data dari mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("Permintaan HTTP gagal");
    }
    const data = await response.json();
    pokemonData = data; // Asumsi data adalah sebuah array
    renderApp();
  } catch (error) {
    console.error("Gagal mengambil data Pokemon:", error);
    renderApp(); // Tetap render untuk menampilkan pesan error di UI
  }
}

// Menangani perubahan input pencarian
function handleSearch(event) {
  searchTerm = event.target.value.toLowerCase(); // Memperbarui istilah pencarian
  renderApp(); // Render ulang untuk memperbarui Pokemon yang ditampilkan
}

// Komponen kartu Pokemon
function PokemonCard({ image, name, types }) {
  return React.createElement(
    "div",
    {
      className: "w-48 h-64 rounded overflow-hidden shadow-lg m-4 bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-between transition-transform transform hover:scale-105"
    },
    React.createElement("img", {
      className: "w-full h-32 object-cover",
      src: image,
      alt: name
    }),
    React.createElement(
      "div",
      { className: "px-6 py-4 text-center" },
      React.createElement("h2", { className: "text-gray-900 font-bold text-xl mb-2" }, name),
      React.createElement(
        "p",
        { className: "text-white text-base" },
        `Tipe: ${types.join(", ")}` 
      )
    )
  );
}

// Komponen daftar
function PokemonList() {
  const filteredPokemon = pokemonData.filter(pokemon => 
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  if (filteredPokemon.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-gray-500 text-lg" },
      "Tidak ada Pokemon ditemukan." 
    );
  }

  return React.createElement(
    "div",
    { className: "grid grid-cols-5 gap-4" },
    filteredPokemon.map(pokemon => 
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        image: pokemon.image,
      })
    )
  );
}

// Komponen App
// Komponen utama aplikasi
function App() {
  return React.createElement(
    "div",
    { className: "container mx-auto p-8" },
    React.createElement(
      "header",
      { className: "mb-8" },
      React.createElement(
        "h1",
        { className: "text-4xl text-center font-bold underline text-yellow-400" },
        "Pokedex" 
      ),
      React.createElement(
        "div", 
        { className: "flex justify-center mb-4 mt-4" }, 
        React.createElement("input", {
          type: "text",
          placeholder: "Cari Pokemon berdasarkan nama...", 
          onInput: handleSearch,
          className: "w-1/2 md:w-1/3 lg:w-1/4 p-2 border border-yellow-300 rounded"
        })
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Render aplikasi
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Mengambil dan menampilkan data Pokemon
fetchPokemon();