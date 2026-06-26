import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const drawerItems = [
  { label: 'Ayuda', route: 'Help', icon: '?' },
  { label: 'Quiénes somos', route: 'AboutUs', icon: '👥' },
  { label: 'Contáctanos', route: 'Contact', icon: '✉' },
];

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>🎨</Text>
        </View>
        <Text style={styles.appName}>ArtGallery</Text>
        <Text style={styles.tagline}>Arte que inspira{'\n'}tus espacios.</Text>
      </View>
      <View style={styles.itemsContainer}>
        {drawerItems.map(item => (
          <TouchableOpacity
            key={item.route}
            onPress={() => navigation.navigate(item.route)}
            style={styles.item}
            activeOpacity={0.6}>
            <View style={styles.itemIconWrap}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.itemLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <TouchableOpacity
          onPress={() => navigation.closeDrawer()}
          style={styles.item}
          activeOpacity={0.6}>
          <View style={styles.itemIconWrap}>
            <Text style={styles.itemIcon}>↪</Text>
          </View>
          <Text style={styles.itemLabel}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#6D2BD9',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 32,
  },
  avatar: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  avatarIcon: { fontSize: 30 },
  appName: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  tagline: { color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 20 },
  itemsContainer: { flex: 1, paddingTop: 8 },
  item: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16, paddingHorizontal: 24,
  },
  itemIconWrap: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 16,
  },
  itemIcon: { fontSize: 16, color: '#111B27' },
  itemLabel: { color: '#111B27', fontSize: 16, fontWeight: '500' },
  footer: { paddingBottom: 32 },
  footerDivider: { height: 1, backgroundColor: '#F3F4F6', marginBottom: 4 },
});

export default CustomDrawerContent;
