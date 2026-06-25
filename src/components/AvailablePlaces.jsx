import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/places`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch places.');
        return res.json();
      })
      .then((data) => {
        setPlaces(data.places);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className="fallback-text">Loading places...</p>;
  }

  if (error) {
    return <p className="fallback-text">{error}</p>;
  }

  return (
    <Places
      title="Available Places"
      places={places}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
