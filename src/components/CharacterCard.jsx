import { getCharacterImageUrl } from '../services/api';
import './CharacterCard.css';

const CharacterCard = ({ character, speciesColor, onClick }) => {
  const charId = character.url.split('/').slice(-2, -1)[0]; // Extract character ID from URL
  const imageUrl = getCharacterImageUrl(charId);

  return (
    <div className="character-card" style={{ backgroundColor: speciesColor }} onClick={onClick}>
      <img src={imageUrl} alt={character.name} />
      <h3>{character.name}</h3>
    </div>
  );
};

export default CharacterCard;
