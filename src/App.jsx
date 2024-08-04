import React, { useState, useEffect } from 'react';
import './App.css';
import { getCharacters, getHomeWorld } from './services/api';
import Loader from './components/Loader/Loader';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import SearchFilter from './components/SearchFilter';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [homeWorld, setHomeWorld] = useState(null);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getCharacters();
      setCharacters(response.data.results);
      setFilteredCharacters(response.data.results);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const handleCharacterClick = async (character) => {
    setSelectedCharacter(character);
    const homeWorldResponse = await getHomeWorld(character.homeworld);
    setHomeWorld(homeWorldResponse.data);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    setHomeWorld(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterAndSearch(query, filterOption);
  };

  const handleFilter = (option) => {
    setFilterOption(option);
    filterAndSearch(searchQuery, option);
  };

  const filterAndSearch = (search, filter) => {
    let filtered = characters;

    if (search) {
      filtered = filtered.filter(character => character.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (filter) {
      // Apply additional filtering logic here based on filter option
    }

    setFilteredCharacters(filtered);
  };

  if (loading) return <Loader />;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="App">
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      <div className="character-list">
        {filteredCharacters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            speciesColor="lightblue" // You can add logic to determine the color based on species
            onClick={() => handleCharacterClick(character)}
          />
        ))}
      </div>
      {selectedCharacter && (
        <CharacterModal
          isOpen={!!selectedCharacter}
          onRequestClose={handleCloseModal}
          character={selectedCharacter}
          homeWorld={homeWorld}
        />
      )}
    </div>
   
  );
};

export default App;
