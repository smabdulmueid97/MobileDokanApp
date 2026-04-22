import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// We put our mock data here again with a little extra description text.
const MOCK_PHONES = [
  { id: '1', name: 'Samsung Galaxy S24 Ultra', price: '৳ 150,000', image: 'https://via.placeholder.com/100', description: 'The ultimate Android flagship with an S-Pen and incredible cameras.' },
  { id: '2', name: 'iPhone 15 Pro Max', price: '৳ 180,000', image: 'https://via.placeholder.com/100', description: 'Apple\'s best and brightest with a titanium build.' },
  { id: '3', name: 'Google Pixel 8 Pro', price: '৳ 120,000', image: 'https://via.placeholder.com/100', description: 'The smartest AI camera phone on the market.' }
];

export default function DetailsScreen() {
  // 1. Grab the ID from the URL that we passed from the Home screen
  const { id } = useLocalSearchParams();
  
  // 2. Find the specific phone in our mock data that matches this ID
  const phone = MOCK_PHONES.find(p => p.id === id);

  // 3. Fallback just in case something goes wrong
  if (!phone) {
    return <Text style={{marginTop: 50, textAlign: 'center'}}>Phone not found!</Text>;
  }

  // 4. Render the details!
  return (
    <SafeAreaView style={styles.container}>
      {/* Stack.Screen lets us dynamically set the top header title to the phone's name */}
      <Stack.Screen options={{ title: phone.name }} />
      
      <Image source={{ uri: phone.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{phone.name}</Text>
        <Text style={styles.price}>{phone.price}</Text>
        <Text style={styles.description}>{phone.description}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  image: { width: '100%', height: 300, backgroundColor: '#E0E0E0' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 22, color: '#E91E63', fontWeight: 'bold', marginBottom: 20 },
  description: { fontSize: 16, color: '#666', lineHeight: 24 }
});