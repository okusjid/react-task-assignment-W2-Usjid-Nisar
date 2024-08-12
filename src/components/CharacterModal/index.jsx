import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import axios from "axios";
import "./CharModal.css";

const CharacterModal = ({ selectedCharacter, setSelectedCharacter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [homeWorld, setHomeWorld] = useState(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) closeModal(); // Close modal on ESC
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (selectedCharacter) {
      const fetchHomeWorld = async () => {
        const homeWorldResponse = await axios.get(selectedCharacter.homeworld);
        setHomeWorld(homeWorldResponse.data);
      };
      fetchHomeWorld();
      openModal();
    }
  }, [selectedCharacter]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCharacter(null); // Clear the selected character when closing modal
  }, [setSelectedCharacter]);

  if (!isModalOpen || !selectedCharacter) return null;

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className={`overlayStyle ${isModalOpen ? "active" : ""}`} onClick={closeModal}>
      <div
        className={`modalStyle ${isModalOpen ? "active" : ""}`}
        onClick={stopPropagation}
      >
        <h2>
          <strong>{selectedCharacter.name}</strong>
        </h2>
        <p>
          <strong>Height:</strong> {selectedCharacter.height / 100} meters
        </p>
        <p>
          <strong>Mass: </strong>
          {selectedCharacter.mass} kg
        </p>
        <p>
          <strong>Birth Year:</strong> {selectedCharacter.birth_year}
        </p>
        <p>
          <strong>Date Added: </strong>
          {format(new Date(selectedCharacter.created), "dd-MM-yyyy")}
        </p>
        <p>
          <strong>Number of Films:</strong> {selectedCharacter.films.length}
        </p>
        {homeWorld && (
          <div style={{ textDecoration: "capitalize" }}>
            <h3>
              <strong>Home World</strong>
            </h3>
            <p>
              <strong>Name: </strong>
              {homeWorld.name}
            </p>
            <p>
              <strong>Terrain: </strong>
              {homeWorld.terrain}
            </p>
            <p>
              <strong>Climate: </strong>
              {homeWorld.climate}
            </p>
            <p>
              <strong>Number of Residents:</strong> {homeWorld.residents.length}
            </p>
          </div>
        )}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

// validation
CharacterModal.propTypes = {
  selectedCharacter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    mass: PropTypes.number.isRequired,
    birth_year: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    films: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  setSelectedCharacter: PropTypes.func.isRequired,
};

export default CharacterModal;
