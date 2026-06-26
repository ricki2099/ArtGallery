import React from 'react';
const { render, fireEvent } = require('@testing-library/react-native');
import PaintingCard from '../src/components/PaintingCard';
import { FavoritesProvider } from '../src/context/FavoritesContext';
import { Painting } from '../src/types';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockPainting: Painting = {
  id: '1',
  title: 'Paseo bajo la lluvia',
  image: 'https://example.com/painting.jpg',
  artist: 'Leonardo Castro',
};

const renderCard = (onPress = jest.fn()) =>
  render(
    <FavoritesProvider>
      <PaintingCard painting={mockPainting} onPress={onPress} />
    </FavoritesProvider>,
  );

describe('PaintingCard', () => {
  it('renders the painting title', () => {
    const { getByText } = renderCard();
    expect(getByText('Paseo bajo la lluvia')).toBeTruthy();
  });

  it('renders the artist name', () => {
    const { getByText } = renderCard();
    expect(getByText('Leonardo Castro')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = renderCard(onPress);
    fireEvent.press(getByText('Paseo bajo la lluvia'));
    expect(onPress).toHaveBeenCalledWith(mockPainting);
  });
});
