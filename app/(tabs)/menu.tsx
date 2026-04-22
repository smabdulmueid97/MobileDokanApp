import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';

const MENU_ITEMS = [
  { id: '1', title: 'All Brands', icon: 'grid-outline' },
  { id: '2', title: 'Latest Reviews', icon: 'star-outline' },
  { id: '3', title: 'Smartwatches', icon: 'watch-outline' },
  { id: '4', title: 'Gadgets & Accessories', icon: 'headset-outline' },
  { id: '5', title: 'Tech News', icon: 'newspaper-outline' },
  { id: '6', title: 'About Us', icon: 'information-circle-outline' },
  { id: '7', title: 'Contact Support', icon: 'mail-outline' },
];

export default function MenuScreen() {
  const renderItem = ({ item }: { item: any }) => (
    <Pressable style={styles.menuItem}>
      <Ionicons name={item.icon as any} size={24} color="#E91E63" style={styles.icon} />
      <Text style={styles.menuText}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>More</Text>
      <FlatList
        data={MENU_ITEMS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#FFF', paddingHorizontal: 16, paddingTop: 40, paddingBottom: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 18, marginBottom: 10, borderRadius: 12 },
  icon: { marginRight: 15 },
  menuText: { flex: 1, color: '#FFF', fontSize: 16, fontWeight: '500' },
});