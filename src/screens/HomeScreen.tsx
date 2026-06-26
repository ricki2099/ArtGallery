import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Painting } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { paintings } from '../data/paintings';
import Carousel from '../components/Carousel';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>();
  const rootNavigation = useNavigation<any>();
  const { favoritesCount } = useFavorites();

  const handleOpenDrawer = () => rootNavigation.dispatch(DrawerActions.openDrawer());
  const handlePaintingPress = (painting: Painting) => navigation.navigate('Detail', { painting });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleOpenDrawer} style={styles.iconBtn}>
          <View style={styles.burgerLine} />
          <View style={styles.burgerLine} />
          <View style={[styles.burgerLine, { width: 12 }]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ArtGallery</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.favCard}>
          <Text style={styles.favLabel}>Cuadros Favoritos ⭐</Text>
          <View style={styles.favBadge}>
            <Text style={styles.favCount}>{favoritesCount}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explora nuestras obras</Text>
          <Carousel paintings={paintings} onPaintingPress={handlePaintingPress} />
        </View>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>Sobre ArtGallery</Text>
          <Text style={styles.aboutText}>
            Descubre y colecciona obras de arte únicas. Conecta con artistas talentosos y lleva belleza a tus espacios.
          </Text>
          <View style={styles.aboutIconWrap}>
            <Text style={styles.aboutIcon}>🎨</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Más obras</Text>
          <View style={styles.grid}>
            {paintings.slice(0, 4).map(painting => (
              <TouchableOpacity
                key={painting.id}
                onPress={() => handlePaintingPress(painting)}
                activeOpacity={0.85}
                style={styles.gridItem}>
                <Image
                  source={{ uri: painting.image }}
                  style={styles.gridImage}
                  resizeMode="cover"
                />
                <View style={styles.gridInfo}>
                  <Text style={styles.gridTitle} numberOfLines={1}>
                    {painting.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const GRID_ITEM_WIDTH = (SCREEN_WIDTH - 48) / 2;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },
  scroll: { paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  burgerLine: {
    width: 20,
    height: 2,
    backgroundColor: '#111B27',
    borderRadius: 2,
    marginVertical: 2,
  },
  bellIcon: { fontSize: 20 },
  headerTitle: {
    color: '#6D2BD9',
    fontSize: 20,
    fontWeight: 'bold',
  },
  favCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.1)',
  },
  favLabel: {
    color: '#111B27',
    fontWeight: '600',
    fontSize: 15,
  },
  favBadge: {
    backgroundColor: '#6D2BD9',
    borderRadius: 20,
    minWidth: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  favCount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: { marginTop: 28 },
  sectionTitle: {
    color: '#111B27',
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  aboutCard: {
    marginHorizontal: 20,
    marginTop: 28,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutTitle: {
    color: '#6D2BD9',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  aboutText: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 22,
  },
  aboutIconWrap: { alignItems: 'center', marginTop: 16 },
  aboutIcon: { fontSize: 56 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  gridItem: {
    width: GRID_ITEM_WIDTH,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  gridImage: { width: '100%', height: 120 },
  gridInfo: { padding: 8, backgroundColor: '#fff' },
  gridTitle: { color: '#111B27', fontSize: 12, fontWeight: '600' },
});

export default HomeScreen;
