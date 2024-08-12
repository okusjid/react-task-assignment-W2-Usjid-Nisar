import { useState, useEffect } from 'react';
import { getCharactersByPage } from '../services/api';

export const useFetchCharacters = (page) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCharactersByPage(page);
        setData(response.data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  return { loading, data, error };
};
