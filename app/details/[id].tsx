import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MOCK_PHONES } from '../data';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const phone = MOCK_PHONES.find(p => p.id === id);

  if (!phone) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ title: 'Error' }} />
        <Text style={styles.errorText}>Phone not found!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: phone.brand }} />
      <ScrollView>
        <View style={styles.imageBox}>
          <Image source={{ uri: phone.image }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{phone.name}</Text>
          <Text style={styles.price}>{phone.price}</Text>
          
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specBox}>
            <Text style={styles.specText}><Text style={styles.bold}>Display:</Text> {phone.display}</Text>
            <Text style={styles.specText}><Text style={styles.bold}>Processor:</Text> {phone.processor}</Text>
            <Text style={styles.specText}><Text style={styles.bold}>RAM:</Text> {phone.ram}</Text>
            <Text style={styles.specText}><Text style={styles.bold}>Storage:</Text> {phone.storage}</Text>
            <Text style={styles.specText}><Text style={styles.bold}>Camera:</Text> {phone.camera}</Text>
            <Text style={styles.specText}><Text style={styles.bold}>Battery:</Text> {phone.battery}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  errorContainer: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#FFF', fontSize: 18 },
  imageBox: { width: '100%', height: 350, backgroundColor: '#FFF', padding: 20 },
  image: { width: '100%', height: '100%' },
  content: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFF', marginBottom: 10 },
  price: { fontSize: 24, color: '#E91E63', fontWeight: 'bold', marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 15 },
  specBox: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12 },
  specText: { color: '#CCC', fontSize: 16, marginBottom: 10 },
  bold: { fontWeight: 'bold', color: '#FFF' }
});