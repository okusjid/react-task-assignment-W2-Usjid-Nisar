import { useState, useEffect } from 'react';
import { getCharactersByPage, getHomeWorld } from './services/api';
import Loader from './components/Loader/Loader';
import CharacterCard from './components/Character Card/CharacterCard';
import CharacterModal from './components/Character Modal/CharacterModal';

import './App.css';



const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [homeWorld, setHomeWorld] = useState(null);
  
  const [filterOption, setFilterOption] = useState('');
  const [page, setPage] = useState(1);
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCharactersByPage(page);
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
        setError(false);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);
  


  const fetchData = async () => {
    try {
      const response = await getCharactersByPage(page);
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
    openModal();
    // console.log(character);
    // console.log(homeWorldResponse);
  };

  
  const handleSearch = (query) => {
    setSearchQuery(query);
    filterAndSearch(query, filterOption);
  };

  // const handleFilter = (option) => {
  //   setFilterOption(option);
  //   filterAndSearch(searchQuery, option);
  // };

  const filterAndSearch = (search, filter) => {
    let filtered = characters;

    if (search) {
      filtered = filtered.filter(character => character.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (filter) {
      // Apply filter option
    }

    setFilteredCharacters(filtered);
  };


  if (loading) return <Loader />;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="App">

      <h1>Star Wars Characters</h1>

      <input
        type="text"
        placeholder="Search characters"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />




      <div className="character-list">
        {filteredCharacters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            speciesColor="lightblue" // change color
            onClick={() => handleCharacterClick(character)}
          />
        ))}
      </div>

      {/* <div>
        { !selectedCharacter ? (
          <h1>No character selected</h1>
        ) : (
          <>
            <h1>Character selected</h1>
            <h1>{selectedCharacter.name}</h1>
          </>
        )}
      </div> */}

      {/* <select value={filterOption} onChange={(e) => handleFilter(e.target.value)}>
        <option value="">All</option>
        <option value="human">Humans</option>
        <option value="droid">Droids</option>
        <option value="wookie">Wookies</option>
      </select> */}


      {selectedCharacter && (
        <>
          <CharacterModal
            isOpen={isModalOpen}
            close={closeModal}
            character={selectedCharacter}
            homeWorld={homeWorld}
          />
        </>
      )}

      {/* pagination */}
      <div className="pagination">
        <button onClick={() => {setPage(page - 1); console.log(page)}} disabled={page === 1}>Previous</button>
        <button onClick={() => {setPage(page + 1); console.log(page)}}>Next</button>
      </div>


    </div>

  );
};

export default App;

