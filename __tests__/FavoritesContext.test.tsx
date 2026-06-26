import React from 'react';
const { render, fireEvent, act } = require('@testing-library/react-native');
import { Text, TouchableOpacity } from 'react-native';
import { FavoritesProvider, useFavorites } from '../src/context/FavoritesContext';
import { Painting } from '../src/types';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockPainting: Painting = {
  id: '1',
  title: 'Test Painting',
  image: 'https://example.com/test.jpg',
  description: 'A test painting',
  artist: 'Test Artist',
  technique: 'Oil',
  year: 2023,
  dimensions: '50x60 cm',
};

// Helper component to test the context
const TestConsumer: React.FC = () => {
  const { favorites, isFavorite, toggleFavorite, favoritesCount } =
    useFavorites();
  return (
    <>
      <Text testID="count">{favoritesCount}</Text>
      <Text testID="is-favorite">{isFavorite(mockPainting.id) ? 'yes' : 'no'}</Text>
      <Text testID="favorites-list">{JSON.stringify(favorites)}</Text>
      <TouchableOpacity
        testID="toggle-btn"
        onPress={() => toggleFavorite(mockPainting)}
      />
    </>
  );
};

const renderWithProvider = () =>
  render(
    <FavoritesProvider>
      <TestConsumer />
    </FavoritesProvider>,
  );

describe('FavoritesContext', () => {
  it('starts with 0 favorites', async () => {
    const { getByTestId } = renderWithProvider();
    await act(async () => { });
    expect(getByTestId('count').props.children).toBe(0);
  });

  it('adds a painting to favorites', async () => {
    const { getByTestId } = renderWithProvider();
    await act(async () => { });

    act(() => {
      fireEvent.press(getByTestId('toggle-btn'));
    });

    expect(getByTestId('count').props.children).toBe(1);
    expect(getByTestId('is-favorite').props.children).toBe('yes');
  });

  it('removes a painting from favorites when toggled again', async () => {
    const { getByTestId } = renderWithProvider();
    await act(async () => { });

    act(() => {
      fireEvent.press(getByTestId('toggle-btn'));
    });
    act(() => {
      fireEvent.press(getByTestId('toggle-btn'));
    });

    expect(getByTestId('count').props.children).toBe(0);
    expect(getByTestId('is-favorite').props.children).toBe('no');
  });

  it('throws error when useFavorites is used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });
    expect(() => render(<TestConsumer />)).toThrow(
      'useFavorites must be used within a FavoritesProvider',
    );
    spy.mockRestore();
  });
});
