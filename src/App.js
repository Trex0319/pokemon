import { useState, useEffect, useMemo } from "react";
import { pokemonData } from "./data/pokemon";

const PokemonList = () => {
  /* 
    instruction: set up the following states
    - pokemons: array of pokemons. use pokemonData as initial value
    - searchTerm: search term for pokemon's name
    - sort: sort by title or rating
  */
  const [pokemons, setPokemons] = useState(pokemonData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sort, setSort] = useState("");

  const types = useMemo(() => {
    let options = [];
    // instruction: get all types from pokemoneData
    if (pokemonData && pokemonData.length > 0) {
      pokemonData.forEach((p) => {
        if (!options.includes(p.type)) {
          options.push(p.type);
        }
      });
    }
    return options;
  }, [pokemonData]);

  useEffect(() => {
    let newPokemons = [...pokemonData];

    // instruction: do title search using the searchTerm state
    if (searchTerm) {
      newPokemons = newPokemons.filter(
        (i) => i.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
      );
    }

    // instruction: do type filter using the selectedType state
    if (selectedType) {
      newPokemons = newPokemons.filter((jiekai) =>
        jiekai.type.includes(selectedType)
      );
    }

    // instruction: sort by name or level
    if (selectedType !== "") {
      newPokemons = newPokemons.filter((b) => b.type.includes(selectedType));
    }
    // instruction: set pokemons state with newPokemons variable
    switch (sort) {
      case "name":
        newPokemons = newPokemons.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "level":
        newPokemons = newPokemons.sort((a, b) => {
          return a.level - b.level;
        });
        break;
      default:
        break;
    }
    setPokemons(newPokemons);
  }, [pokemonData, selectedType, sort, searchTerm]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-6">
          <input
            type="text"
            placeholder="Search"
            // instruction: assign searchTerm state to value
            value={searchTerm}
            onChange={(e) => {
              // instruction: set searchTerm state
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <div className="col-6 text-end mb-3">
          <select
            className="me-1 mb-1"
            // instruction: assign sort state to value
            value={sort}
            onChange={(e) => {
              // instruction: set sort state
              setSort(e.target.value);
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="level">Sort by Level</option>
          </select>

          <select
            className="me-1 mb-1"
            // instruction: assign selectedType state to value

            onChange={(e) => {
              // instruction: set selectedType state
              setSelectedType(e.target.value);
            }}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* 
        instruction: 
        - display the pokemons here
        - responsive layout: 1 column for mobile, 2 columns for tablet, 3 columns for desktop
      */}
      <div className="row">
        {pokemons.map((pokemons) => (
          <div className="col-lg-4 col-md-6 col-sm-12 my-3" key={pokemons.name}>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{pokemons.name}</h2>
                <p className="card-text">{pokemons.type}</p>
                <p className="card-text">Level: {pokemons.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
