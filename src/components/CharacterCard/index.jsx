import { getCharacterImageUrl } from "../../services/api";
import PropTypes from "prop-types";
import "./CharacterCard.css";

//Create a CharacterCard component
const CharacterCard = ({ character, speciesColor, onClick }) => {
  const charId = character.url.split("/").slice(-2, -1)[0];
  const imageUrl = getCharacterImageUrl(charId);

  return (
    //Add the character card markup
    <div
      className="character-card"
      style={{ backgroundColor: speciesColor }}
      onClick={onClick}
    >
      <img src={imageUrl} alt={character.name} />{" "}
      {/* Add the character image */}
      <h3>{character.name}</h3>
    </div>
  );
};

//Add prop validation for the CharacterCard component
CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  speciesColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default CharacterCard;
