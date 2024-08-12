import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCharacters } from "../../hooks/useFetchChar";
import { usePagination } from "../../hooks/usePagination";
import CharacterCard from "../CharacterCard";
import CharacterModal from "../../components/CharacterModal";
import { getHomeWorld } from "../../services/api";
import Loader from "../../components/Loader";
import Logout from "../Logout";
import styles from './ListingPage.module.css'; // Import the CSS module

const ListingPage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [homeWorld, setHomeWorld] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const navigate = useNavigate();
  const { page, nextPage, prevPage } = usePagination();
  const { loading, data: characters, error } = useFetchCharacters(page);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCharacterClick = async (character) => {
    setSelectedCharacter(character);
    const homeWorldResponse = await getHomeWorld(character.homeworld);
    setHomeWorld(homeWorldResponse.data);
    openModal();
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
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter) {
      // Add filter logic here based on filterOption
    }

    return filtered;
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error loading data</div>;

  const filteredCharacters = filterAndSearch(searchQuery, filterOption);

  return (
    <div className={styles.appContainer}>
      <Logout />
      <h1 className={styles.header}>Star Wars Characters</h1>
      <input
        type="text"
        placeholder="Search characters"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.paginationContainer}>
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={styles.paginationButton}
        >
          ←
        </button>
        <button onClick={nextPage} className={styles.paginationButton}>
          →
        </button>
      </div>

      <div className={styles.characterList}>
        {filteredCharacters.map((character) => (
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
        <>
          <CharacterModal
            isOpen={isModalOpen}
            close={closeModal}
            character={selectedCharacter}
            homeWorld={homeWorld}
            overlayClassName={styles.modalOverlay}
            className={styles.modalContent}
          />
        </>
      )}
    </div>
  );
};

export default ListingPage;
