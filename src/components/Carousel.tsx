import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  ViewToken,
} from 'react-native';
import { Painting } from '../types';
import PaintingCard from './PaintingCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.55;
const CARD_HEIGHT = CARD_WIDTH * 1.45;
const CARD_MARGIN = 10;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN * 2;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

type Props = {
  paintings: Painting[];
  onPaintingPress: (painting: Painting) => void;
};

const Carousel: React.FC<Props> = ({ paintings, onPaintingPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View>
      <Animated.FlatList
        data={paintings}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * SNAP_INTERVAL,
            index * SNAP_INTERVAL,
            (index + 1) * SNAP_INTERVAL,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.88, 1, 0.88],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View style={{ transform: [{ scale }], opacity }}>
              <PaintingCard
                painting={item}
                onPress={onPaintingPress}
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
              />
            </Animated.View>
          );
        }}
      />
      {/* Dots */}
      <View style={styles.dots}>
        {paintings.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 20,
    backgroundColor: '#6D2BD9',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#C4B5FD',
  },
});

export default Carousel;
