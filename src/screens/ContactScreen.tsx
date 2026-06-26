import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Linking,
} from 'react-native';
import BackButton from '../components/BackButton';

const contacts = [
  { icon: '✉', label: 'hola@artgallery.com', action: () => Linking.openURL('mailto:hola@artgallery.com') },
  { icon: '📞', label: '+57 300 123 4567', action: () => Linking.openURL('tel:+573001234567') },
  { icon: '📍', label: 'Bogotá, Colombia', action: () => { } },
];

const ContactScreen: React.FC = () => {

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Contáctanos</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Text style={styles.heroIconText}>✉</Text>
          </View>
          <Text style={styles.heroTitle}>Estamos para ti</Text>
          <Text style={styles.heroSubtitle}>
            ¿Tienes alguna duda o sugerencia?{'\n'}Escríbenos y te responderemos{'\n'}lo antes posible.
          </Text>
        </View>
        <View style={styles.contactList}>
          {contacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              onPress={contact.action}
              activeOpacity={0.75}
              style={styles.contactRow}>
              <View style={styles.contactIconWrap}>
                <Text style={styles.contactIcon}>{contact.icon}</Text>
              </View>
              <Text style={styles.contactLabel}>{contact.label}</Text>
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
    paddingBottom: 48,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 36,
    paddingHorizontal: 32,
  },
  heroIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroIconText: {
    fontSize: 38,
  },
  heroTitle: {
    color: '#6D2BD9',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  heroSubtitle: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  contactList: {
    paddingHorizontal: 28,
    gap: 24,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contactIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIcon: {
    fontSize: 20,
  },
  contactLabel: {
    color: '#111B27',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default ContactScreen;
