import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import BackButton from '../components/BackButton';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DetailScreen: React.FC = () => {
  const route = useRoute<DetailRouteProp>();
  const { painting } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(painting.id);
  const starScale = useRef(new Animated.Value(1)).current;

  const handleToggleFavorite = () => {
    Animated.sequence([
      Animated.spring(starScale, { toValue: 1.4, useNativeDriver: true, speed: 50, bounciness: 12 }),
      Animated.spring(starScale, { toValue: 1, useNativeDriver: true, speed: 50 }),
    ]).start();
    toggleFavorite(painting);
  };

  const detailRows = [
    { icon: '👤', label: 'Artista', value: painting.artist ?? '—' },
    { icon: '🖌', label: 'Técnica', value: painting.technique ?? '—' },
    { icon: '📅', label: 'Año', value: painting.year ? String(painting.year) : '—' },
    { icon: '📐', label: 'Dimensiones', value: painting.dimensions ?? '—' },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.backRow}>
          <BackButton />
        </View>
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: painting.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{painting.title}</Text>
            <TouchableOpacity onPress={handleToggleFavorite} style={styles.starIcon}>
              <Animated.Text style={{ transform: [{ scale: starScale }] }}>
                {favorite ? '⭐' : '☆'}
              </Animated.Text>
            </TouchableOpacity>
          </View>
          {painting.description && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Descripción</Text>
              <Text style={styles.description}>{painting.description}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Detalles</Text>
            <View style={styles.detailsCard}>
              {detailRows.map((row, index) => (
                <View key={row.label}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailIcon}>{row.icon}</Text>
                    <Text style={styles.detailLabel}>{row.label}</Text>
                    <Text style={styles.detailValue}>{row.value}</Text>
                  </View>
                  {index < detailRows.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backRow: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  imageWrap: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    height: SCREEN_WIDTH * 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    color: '#111B27',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  starIcon: {
    padding: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    color: '#6D2BD9',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 10,
  },
  description: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 24,
  },
  detailsCard: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
  },
  detailLabel: {
    color: '#6B7280',
    fontSize: 14,
    flex: 1,
  },
  detailValue: {
    color: '#111B27',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 0,
  },
});

export default DetailScreen;
