// ListingPage.js
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CharacterCard from "../CharacterCard";
import CharacterModal from "../../components/CharacterModal";
import Loader from "../../components/Loader";
import Logout from "../Logout";
import SearchComponent from "../../components/Search";
import PaginationControls from "../PaginationControls"; // Ensure correct path
import { usePagination } from "../../hooks/usePagination";
import "./ListingPage.css";

const ListingPage = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const { page, totalPages, nextPage, prevPage, setPage, setTotalPages } =
    usePagination(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationTime = 30 * 60 * 1000; // 30 minutes in milliseconds
      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, expirationTime);
      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [navigate]);
  

  const endpoint = useCallback(() => {
    return query
      ? `https://swapi.dev/api/people/?search=${query}`
      : `https://swapi.dev/api/people/?page=${page}`;
  }, [query, page]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(endpoint());
        setCharacters(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [endpoint, setTotalPages]);

  const handleCharacterClick = useCallback((character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  }, []);

  const handleSearch = useCallback(
    (query) => {
      setQuery(query);
      setPage(page); // Reset to current page when searching
    },
    [setPage, page]
  );

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pageListing">
      <Logout />
      <h1 className="header">Star Wars Characters</h1>
      <SearchComponent onSearch={handleSearch} initialQuery={query} />

      <div className="characterList">
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            speciesColor={
              character.eye_color || character.hair_color || "brown"
            }
            onClick={() => handleCharacterClick(character)}
            className="characterCard"
          />
        ))}
      </div>

      <div className="pageNumber">
        Page: {page} of {totalPages}
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />

      <CharacterModal
        isOpen={isModalOpen}
        close={closeModal}
        character={selectedCharacter}
      />
    </div>
  );
};

export default ListingPage;
