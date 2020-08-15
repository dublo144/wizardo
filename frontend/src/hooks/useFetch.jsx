import { useState, useEffect } from 'react';
import { backendUrl } from '../config/settings';
import { apiUtils } from '../helpers/apiUtils';

const useFetch = (query) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const opts = apiUtils.makeOpts(query);

    fetch(`${backendUrl}/graphql`, opts)
      .then((res) => res.json())
      .then((res) => res.data)
      .then((res) => {
        setResponse(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [query]);

  return { response, error, isLoading };
};

export default useFetch;
