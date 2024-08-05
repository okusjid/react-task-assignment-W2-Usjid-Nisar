import { getCharacterImageUrl } from '../../services/api';
import PropTypes from 'prop-types';
import './CharacterCard.css';

const CharacterCard = ({ character, speciesColor, onClick }) => {
  const charId = character.url.split('/').slice(-2, -1)[0]; 
  const imageUrl = getCharacterImageUrl(charId);

  return (
    <div className="character-card" style={{ backgroundColor: speciesColor }} onClick={onClick}>
      <img src={imageUrl} alt={character.name} />
      <h3>{character.name}</h3>
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  speciesColor: PropTypes.string,
  onClick: PropTypes.func,
};


export default CharacterCard;
