import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CharacterCard from "../CharacterCard";
import CharacterModal from "../../components/CharacterModal";
import Loader from "../../components/Loader";
import Logout from "../Logout";
import SearchComponent from "../../components/Search"; // Import the SearchComponent
import styles from './ListingPage.module.css'; // Import the CSS module

const ListingPage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [homeWorld, setHomeWorld] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(""); // Track the query here
  const [page, setPage] = useState(1); // Track current page

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = query
          ? `https://swapi.dev/api/people/?search=${query}`
          : `https://swapi.dev/api/people/?page=${page}`;

        const response = await axios.get(endpoint);
        setCharacters(response.data.results);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [query, page]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCharacterClick = async (character) => {
    setSelectedCharacter(character);
    const homeWorldResponse = await axios.get(character.homeworld);
    setHomeWorld(homeWorldResponse.data);
    openModal();
  };

  const handleSearch = (query) => {
    setQuery(query);
    setPage(page); // Reset to first page when searching
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.appContainer}>
      <Logout />
      <h1 className={styles.header}>Star Wars Characters</h1>

      <SearchComponent onSearch={handleSearch} initialQuery={query} />

      <div className={styles.paginationContainer}>
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={styles.paginationButton}
        >
          ← Previous
        </button>
        <button onClick={handleNextPage} className={styles.paginationButton}>
          Next →
        </button>
      </div>

      <div className={styles.characterList}>
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            speciesColor={character.eye_color || character.hair_color || "brown"}
            onClick={() => handleCharacterClick(character)}
            className={styles.characterCard}
          />
        ))}
      </div>

      {selectedCharacter && (
        <CharacterModal
          isOpen={isModalOpen}
          close={closeModal}
          character={selectedCharacter}
          homeWorld={homeWorld}
          overlayClassName={styles.modalOverlay}
          className={styles.modalContent}
        />
      )}
    </div>
  );
};

export default ListingPage;
