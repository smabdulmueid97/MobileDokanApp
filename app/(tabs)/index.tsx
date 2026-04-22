import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BRANDS, MOCK_PHONES } from '../data';

const { width } = Dimensions.get('window');

export default function Home() {
  const [activeBrand, setActiveBrand] = useState('All');
  
  // Filter phones based on selected brand
  const filteredPhones = activeBrand === 'All' ? MOCK_PHONES : MOCK_PHONES.filter(p => p.brand === activeBrand);

  // --- UI COMPONENTS ---

  const renderHeader = () => (
    <>
      {/* 1. Custom Dark Nav Bar */}
      <View style={styles.topNav}>
        <Ionicons name="menu-outline" size={32} color="#FFF" />
        <Text style={styles.logoText}>MobileDokan</Text>
        <Ionicons name="search-outline" size={28} color="#FFF" />
      </View>

      {/* 2. Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput placeholder="Search mobiles, brands..." placeholderTextColor="#888" style={styles.searchInput} editable={false} />
        </View>
      </View>

      {/* 3. Horizontal Brands */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {BRANDS.map((brand, index) => (
          <Pressable 
            key={index} 
            onPress={() => setActiveBrand(brand)} 
            style={[styles.categoryPill, activeBrand === brand && styles.activePill]}
          >
            <Text style={[styles.categoryText, activeBrand === brand && styles.activeText]}>{brand}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* 4. Latest Mobile Slider (Like the website) */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest Mobile</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sliderContainer}>
        {MOCK_PHONES.map(phone => (
          <Link href={`/details/${phone.id}`} asChild key={`latest-${phone.id}`}>
            <Pressable style={styles.sliderCard}>
              <View style={styles.imageBackgroundBox}>
                 <Image source={{ uri: phone.image }} style={styles.sliderImage} resizeMode="contain" />
              </View>
              <Text style={styles.sliderName} numberOfLines={2}>{phone.name}</Text>
              <Text style={styles.sliderPrice}>{phone.price}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>

      <View style={[styles.sectionHeader, {marginTop: 25}]}>
        <Text style={styles.sectionTitle}>Trending Phones</Text>
      </View>
    </>
  );

  // 5. Grid Items
  const renderPhoneItem = ({ item }: { item: any }) => (
    <Link href={`/details/${item.id}`} asChild>
      <Pressable style={styles.gridCard}>
        <View style={styles.discountBadge}><Text style={styles.discountText}>Official</Text></View>
        <View style={styles.imageBackgroundBoxGrid}>
            <Image source={{ uri: item.image }} style={styles.gridImage} resizeMode="contain" />
        </View>
        <Text style={styles.gridName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.gridSpecs}>{item.ram} / {item.storage}</Text>
        <Text style={styles.gridPrice}>{item.price}</Text>
      </Pressable>
    </Link>
  );

  // --- MAIN RENDER ---
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={filteredPhones}
        keyExtractor={item => item.id}
        renderItem={renderPhoneItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// --- STYLES (Professional Dark Theme) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' }, // True Dark Background
  
  // Nav & Header
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 15, paddingBottom: 15, backgroundColor: '#1A1A1A', borderBottomWidth: 1, borderBottomColor: '#333' },
  logoText: { fontSize: 22, fontWeight: '900', color: '#FFF', letterSpacing: 1 },
  searchContainer: { padding: 16, backgroundColor: '#121212' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#333', borderRadius: 10, paddingHorizontal: 12, height: 50 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#FFF' },
  
  // Categories
  categoryScroll: { paddingHorizontal: 16, paddingBottom: 15 },
  categoryPill: { backgroundColor: '#1E1E1E', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 25, marginRight: 12, borderWidth: 1, borderColor: '#333' },
  activePill: { backgroundColor: '#E91E63', borderColor: '#E91E63' },
  categoryText: { color: '#CCC', fontWeight: '600', fontSize: 14 },
  activeText: { color: '#FFF' },
  
  // Sections
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 15, marginTop: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  seeAll: { color: '#E91E63', fontWeight: '600', fontSize: 14 },
  
  // Slider Cards
  sliderContainer: { paddingBottom: 10 },
  sliderCard: { width: 150, marginLeft: 16, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#333' },
  imageBackgroundBox: { backgroundColor: '#FFF', borderRadius: 8, padding: 5, marginBottom: 12, height: 130, justifyContent: 'center' },
  sliderImage: { width: '100%', height: '100%' },
  sliderName: { fontSize: 14, fontWeight: '700', color: '#FFF', marginBottom: 5, height: 40 },
  sliderPrice: { fontSize: 15, fontWeight: 'bold', color: '#E91E63' },
  
  // Grid Layout
  listPadding: { paddingBottom: 40 },
  row: { paddingHorizontal: 12, justifyContent: 'space-between', marginBottom: 15 },
  gridCard: { width: (width / 2) - 20, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#333', position: 'relative' },
  discountBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: '#E91E63', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, zIndex: 1 },
  discountText: { color: '#FFF', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },
  imageBackgroundBoxGrid: { backgroundColor: '#FFF', borderRadius: 8, padding: 5, marginBottom: 12, height: 140, justifyContent: 'center' },
  gridImage: { width: '100%', height: '100%' },
  gridName: { fontSize: 14, fontWeight: '700', color: '#FFF', marginBottom: 6, height: 40 },
  gridSpecs: { fontSize: 12, color: '#888', marginBottom: 8 },
  gridPrice: { fontSize: 16, fontWeight: 'bold', color: '#E91E63' },
});