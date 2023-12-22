import { useState, useEffect } from 'react';

const CHUCK_JOKE_URL = "https://api.chucknorris.io/jokes/random#";

export function useChuckNorrisJoke() {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    const getChuckNorrisJoke = async () => {
      const url = CHUCK_JOKE_URL;
      const response = await fetch(url);
      const data = await response.json();
      setJoke(data.value);
    };

    getChuckNorrisJoke();
  }, []);

  return { joke };
}
