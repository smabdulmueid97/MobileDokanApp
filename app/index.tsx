import { Link } from 'expo-router'; // <-- We import Link here!
import React, { useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// --- TYPESCRIPT SETUP ---
// This tells TypeScript exactly what a "Phone" should look like
interface Phone {
  id: string;
  name: string;
  price: string;
  image: string;
}

// --- MOCK DATA ---
const MOCK_PHONES: Phone[] = [
  { id: '1', name: 'Samsung Galaxy S24 Ultra', price: '৳ 150,000', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'iPhone 15 Pro Max', price: '৳ 180,000', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Google Pixel 8 Pro', price: '৳ 120,000', image: 'https://via.placeholder.com/100' }
];

export default function Home() {
  const [phones, setPhones] = useState<Phone[]>(MOCK_PHONES);

  // --- UI COMPONENTS ---
  const renderPhoneItem = ({ item }: { item: Phone }) => (
    // Link tells the app to navigate to the details page, passing the specific phone's ID
    <Link href={`/details/${item.id}`} asChild>
      <Pressable style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.phoneName}>{item.name}</Text>
          <Text style={styles.phonePrice}>{item.price}</Text>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>MobileDokan Catalog</Text>
      <FlatList
        data={phones}
        keyExtractor={(item) => item.id}
        renderItem={renderPhoneItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 10, color: '#333' },
  card: { flexDirection: 'row', backgroundColor: '#FFF', padding: 15, marginBottom: 15, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  image: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#E0E0E0' },
  info: { justifyContent: 'center', marginLeft: 15 },
  phoneName: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
  phonePrice: { fontSize: 16, color: '#E91E63', fontWeight: 'bold' },
});