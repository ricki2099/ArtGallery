import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton';

const stats = [
  { value: '+500', label: 'Artistas', icon: '👤' },
  { value: '+2,000', label: 'Obras', icon: '🖼' },
  { value: '+10K', label: 'Clientes felices', icon: '😊' },
];

const AboutUsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Quiénes somos</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroIconText}>👥</Text>
          </View>
          <Text style={styles.heroTitle}>Nuestra historia</Text>
        </View>

        <View style={styles.storyCard}>
          <Text style={styles.storyText}>
            ArtGallery nació con la pasión por el arte y el deseo de acercar obras únicas a todos los hogares.
            Creemos que el arte tiene el poder de transformar espacios y vidas.
          </Text>
        </View>

        <View style={styles.statsList}>
          {stats.map(stat => (
            <View key={stat.label} style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statIconText}>{stat.icon}</Text>
              </View>
              <View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.missionCard}>
          <Text style={styles.missionTitle}>Nuestra misión</Text>
          <Text style={styles.missionText}>
            Democratizar el acceso al arte y apoyar a artistas emergentes y consolidados,
            creando un puente directo entre creadores y coleccionistas.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 18, color: '#111B27' },
  headerTitle: { color: '#6D2BD9', fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
  hero: { alignItems: 'center', paddingVertical: 32 },
  heroIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(139,92,246,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  heroIconText: { fontSize: 36 },
  heroTitle: { color: '#6D2BD9', fontSize: 20, fontWeight: 'bold' },
  storyCard: { marginHorizontal: 20, marginBottom: 24, backgroundColor: '#F9FAFB', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  storyText: { color: '#4B5563', fontSize: 14, lineHeight: 24, textAlign: 'center' },
  statsList: { paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  statCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: '#E5E7EB' },
  statIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(139,92,246,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  statIconText: { fontSize: 24 },
  statValue: { color: '#6D2BD9', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#6B7280', fontSize: 14 },
  missionCard: { marginHorizontal: 20, backgroundColor: '#6D2BD9', borderRadius: 16, padding: 20 },
  missionTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  missionText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 22 },
});

export default AboutUsScreen;
