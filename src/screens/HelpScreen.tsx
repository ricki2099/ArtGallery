import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import BackButton from '../components/BackButton';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const faqs = [
  {
    question: '¿Cómo agrego un cuadro a favoritos?',
    answer: 'Ingresa al detalle de cualquier cuadro tocando su imagen y presiona el ícono de estrella ⭐ junto al nombre, o el botón "Agregar a favoritos" al final de la pantalla.',
  },
  {
    question: '¿Cómo contactarlos?',
    answer: 'Puedes escribirnos a hola@artgallery.com o llamarnos al +57 300 123 4567. También puedes visitar la sección "Contáctanos" en el menú lateral.',
  },
  {
    question: '¿Cómo funciona la app?',
    answer: 'ArtGallery te permite explorar nuestra galería de cuadros, guardar tus favoritos y conocer los detalles de cada obra. Navega desde el inicio y toca cualquier cuadro para ver más información.',
  },
];

const HelpScreen: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Ayuda</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Text style={styles.heroIconText}>?</Text>
          </View>
          <Text style={styles.heroTitle}>¿Necesitas ayuda?</Text>
          <Text style={styles.heroSubtitle}>
            Aquí encontrarás respuestas a las preguntas más frecuentes sobre nuestra aplicación.
          </Text>
        </View>
        <View style={styles.faqList}>
          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleItem(index)}
              activeOpacity={0.8}
              style={styles.faqItem}>
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqChevron}>
                  {expandedIndex === index ? '∧' : '∨'}
                </Text>
              </View>
              {expandedIndex === index && (
                <View style={styles.faqBody}>
                  <View style={styles.faqDivider} />
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 18,
    color: '#111B27',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#6D2BD9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 40,
  },
  scroll: {
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 32,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroIconText: {
    fontSize: 36,
    color: '#6D2BD9',
    fontWeight: 'bold',
  },
  heroTitle: {
    color: '#6D2BD9',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  faqList: {
    paddingHorizontal: 20,
  },
  faqItem: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  faqQuestion: {
    color: '#111B27',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    marginRight: 12,
  },
  faqChevron: {
    color: '#6B7280',
    fontSize: 16,
  },
  faqBody: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  faqDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  faqAnswer: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 22,
  },
});

export default HelpScreen;
