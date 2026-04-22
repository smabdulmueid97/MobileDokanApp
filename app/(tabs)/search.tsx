import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MOCK_PHONES } from '../data';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  // Filter phones based on what the user types
  const searchResults = MOCK_PHONES.filter(phone => 
    phone.name.toLowerCase().includes(query.toLowerCase())
  );

  const renderResult = ({ item }: { item: any }) => (
    <Link href={`/details/${item.id}`} asChild>
      <Pressable style={styles.resultItem}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search phones, brands..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id}
        renderItem={renderResult}
        ListEmptyComponent={<Text style={styles.emptyText}>No phones found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { padding: 16, backgroundColor: '#1E1E1E', paddingTop: 40 },
  searchInput: { backgroundColor: '#333', color: '#FFF', padding: 15, borderRadius: 10, fontSize: 16 },
  resultItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 15, marginTop: 10, marginHorizontal: 16, borderRadius: 10 },
  image: { width: 50, height: 50, marginRight: 15 },
  info: { flex: 1 },
  name: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  price: { color: '#E91E63', marginTop: 4 },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 50, fontSize: 16 }
});