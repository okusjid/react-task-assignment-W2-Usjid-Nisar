import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './CharModal.css';

const CharacterModal = ({ isOpen, close, character, homeWorld }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) close(); // Close modal on ESC
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [close]);

  if (!isOpen) return null;

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className={`overlayStyle ${isOpen ? 'active' : ''}`} onClick={close}>
      <div className={`modalStyle ${isOpen ? 'active' : ''}`} onClick={stopPropagation}>
        <h2>{character.name}</h2>
        <p>Height: {character.height / 100} meters</p>
        <p>Mass: {character.mass} kg</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Date Added: {format(new Date(character.created), 'dd-MM-yyyy')}</p>
        <p>Number of Films: {character.films.length}</p>
        {homeWorld && (
          <>
            <h3>Home World</h3>
            <p>Name: {homeWorld.name}</p>
            <p>Terrain: {homeWorld.terrain}</p>
            <p>Climate: {homeWorld.climate}</p>
            <p>Number of Residents: {homeWorld.residents.length}</p>
          </>
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
    height: PropTypes.number.isRequired,
    mass: PropTypes.number.isRequired,
    birth_year: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    films: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  homeWorld: PropTypes.shape({
    name: PropTypes.string.isRequired,
    terrain: PropTypes.string.isRequired,
    climate: PropTypes.string.isRequired,
    residents: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default CharacterModal;
