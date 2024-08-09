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
        <h2><strong>{character.name}</strong></h2>
        <p><strong>Height:</strong> {character.height / 100} meters</p>
        <p><strong>Mass: </strong>{character.mass} kg</p>
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        <p><strong>Date Added: </strong>{format(new Date(character.created), 'dd-MM-yyyy')}</p>
        <p><strong>Number of Films:</strong> {character.films.length}</p>
        {homeWorld && (
          <div style={{ textDecoration: 'capitalize' }}>
            <h3><strong>Home World</strong></h3>
            <p><strong>Name: </strong>{homeWorld.name}</p>
            <p><strong>Terrain: </strong>{homeWorld.terrain}</p>
            <p><strong>Climate: </strong>{homeWorld.climate}</p>
            <p><strong>Number of Residents:</strong> {homeWorld.residents.length}</p>
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
