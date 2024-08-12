import { useState, useEffect } from "react";
import { getCharactersByPage } from "../services/api";

export const useFetchCharacters = (page) => {
  // Add the page parameter
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch characters by page number when the page changes or on initial render
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCharactersByPage(page); // Fetch characters by page
        setData(response.data.results); // Set the character data
        setError(null); // Clear any errors
      } catch (err) {
        setError(err.message); // Set the error message
      }
      setLoading(false);
    };

    fetchData(); // Call the fetchData function on initial render and when the page changes
  }, [page]);

  return { loading, data, error }; // Return the loading state, character data, and error
};
