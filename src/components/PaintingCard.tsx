import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Painting } from '../types';
import { useFavorites } from '../context/FavoritesContext';

type Props = {
  painting: Painting;
  onPress: (painting: Painting) => void;
  width?: number;
  height?: number;
  showInfo?: boolean;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PaintingCard: React.FC<Props> = ({
  painting,
  onPress,
  width = SCREEN_WIDTH * 0.52,
  height = SCREEN_WIDTH * 0.52 * 1.5,
}) => {
  const { isFavorite } = useFavorites();
  const favorite = isFavorite(painting.id);

  return (
    <TouchableOpacity
      onPress={() => onPress(painting)}
      activeOpacity={0.85}
      style={[styles.card, { width, height }]}>
      <Image
        source={{ uri: painting.image }}
        style={styles.image}
        resizeMode="cover"
      />
      {favorite && (
        <View style={styles.favBadge}>
          <Text style={styles.favBadgeText}>⭐</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBadgeText: { fontSize: 16 },
});

export default PaintingCard;
