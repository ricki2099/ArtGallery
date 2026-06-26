import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Painting } from '../types';

const STORAGE_KEY = '@artgallery_favorites';

type FavoritesContextType = {
  favorites: Painting[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (painting: Painting) => void;
  favoritesCount: number;
  isLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Painting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(
        error => console.error('Error saving favorites:', error),
      );
    }
  }, [favorites, isLoading]);

  const isFavorite = useCallback(
    (id: string) => favorites.some(p => p.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback((painting: Painting) => {
    setFavorites(prev => {
      const exists = prev.some(p => p.id === painting.id);
      return exists
        ? prev.filter(p => p.id !== painting.id)
        : [...prev, painting];
    });
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        favoritesCount: favorites.length,
        isLoading,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
