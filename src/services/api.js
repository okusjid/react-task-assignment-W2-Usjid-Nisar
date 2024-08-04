import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCharacters = () => axios.get(`${BASE_URL}/people`);
export const getHomeWorld = (url) => axios.get(url);

export const getCharacterImageUrl = (charId) => {
  const VISUAL_GUIDE_BASE_URL = import.meta.env.VITE_VISUAL_GUIDE_BASE_URL;
  return `${VISUAL_GUIDE_BASE_URL}/${charId}.jpg`;
};
