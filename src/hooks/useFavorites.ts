import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants';

const FAVORITES_KEY = STORAGE_KEYS.FAVORITES;

const getFavoriteIds = (): string[] => {
  try {
    const item = window.localStorage.getItem(FAVORITES_KEY);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.warn(`Error reading localStorage key “${FAVORITES_KEY}”:`, error);
    return [];
  }
};

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(getFavoriteIds());

  const toggleFavorite = useCallback((promptId: string) => {
    setFavoriteIds(prevIds => {
      const newIds = prevIds.includes(promptId)
        ? prevIds.filter(id => id !== promptId)
        : [...prevIds, promptId];

      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(newIds));
      } catch (error) {
        console.warn(`Error setting localStorage key “${FAVORITES_KEY}”:`, error);
      }

      return newIds;
    });
  }, []);

  const isFavorite = useCallback(
    (promptId: string) => favoriteIds.includes(promptId),
    [favoriteIds]
  );

  return { favoriteIds, toggleFavorite, isFavorite };
};
