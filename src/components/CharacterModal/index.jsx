import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import axios from "axios";
import "./CharModal.css";

const CharacterModal = ({ isOpen, close, character }) => {
  const [homeWorld, setHomeWorld] = useState(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) close(); // Close modal on ESC
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [close]);

  useEffect(() => {
    if (character) {
      const fetchHomeWorld = async () => {
        try {
          const homeWorldResponse = await axios.get(character.homeworld);
          setHomeWorld(homeWorldResponse.data);
        } catch (error) {
          console.error("Error fetching homeworld:", error);
          setHomeWorld(null);
        }
      };
      fetchHomeWorld();
    }
  }, [character]);

  if (!isOpen || !character) return null;

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className={`overlayStyle ${isOpen ? "active" : ""}`} onClick={close}>
      <div
        className={`modalStyle ${isOpen ? "active" : ""}`}
        onClick={stopPropagation}
      >
        <h2>
          <strong>{character.name}</strong>
        </h2>
        <p>
          <strong>Height:</strong> {Number(character.height) / 100} meters
        </p>
        <p>
          <strong>Mass: </strong>
          {character.mass} kg
        </p>
        <p>
          <strong>Birth Year:</strong> {character.birth_year}
        </p>
        <p>
          <strong>Date Added: </strong>
          {format(new Date(character.created), "dd-MM-yyyy")}
        </p>
        <p>
          <strong>Number of Films:</strong> {character.films.length}
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
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

// validation
CharacterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    mass: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    birth_year: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    films: PropTypes.arrayOf(PropTypes.string).isRequired,
    homeworld: PropTypes.string.isRequired,
  }),
};

export default CharacterModal;
