import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// 1. COMPLEX DATA STRUCTURE
// We organize the client's exact list, adding icons and grouping sub-items.
const MENU_DATA = [
  { id: '1', title: 'Home', icon: 'home-outline' },
  { id: '2', title: 'Top 10', icon: 'trophy-outline' },
  { id: '3', title: 'Mobiles', icon: 'phone-portrait-outline', subItems: ['Brands', 'Price List', 'Compare', 'Comparison'] },
  { id: '4', title: 'Tablets', icon: 'tablet-portrait-outline', subItems: ['Brands', 'Price List', 'Compare', 'Comparison'] },
  { id: '5', title: 'Laptops', icon: 'laptop-outline', subItems: ['Brands', 'Price List', 'Compare', 'Comparison'] },
  { id: '6', title: 'Cameras', icon: 'camera-outline', subItems: ['Brands', 'Price List', 'Compare', 'Comparison'] },
  { id: '7', title: 'Watchs', icon: 'watch-outline', subItems: ['Brands', 'Price List', 'Compare', 'Comparison'] },
  { id: '8', title: 'Showrooms', icon: 'storefront-outline' },
  { id: '9', title: 'Service Centers', icon: 'build-outline' },
  { id: '10', title: 'Reviews', icon: 'star-half-outline' },
  { id: '11', title: 'News & Tips', icon: 'newspaper-outline' },
  { id: '12', title: 'Videos', icon: 'play-circle-outline' },
];

export default function MenuScreen() {
  // 2. STATE FOR ACCORDION
  // This remembers which category is currently "open"
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    // If clicking the same item that is already open, close it. Otherwise, open the new one.
    setExpandedId(expandedId === id ? null : id);
  };

  // 3. RENDER FUNCTION FOR EACH ITEM
  const renderItem = ({ item }: { item: any }) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedId === item.id;

    return (
      <View style={styles.menuWrapper}>
        {/* Main Menu Button */}
        <Pressable 
          style={styles.menuItem} 
          onPress={() => hasSubItems ? toggleExpand(item.id) : console.log(`Navigating to ${item.title}`)}
        >
          <Ionicons name={item.icon as any} size={22} color="#E91E63" style={styles.icon} />
          <Text style={styles.menuText}>{item.title}</Text>
          
          {/* If it has sub-items, show a down/up arrow. Otherwise, show a forward arrow. */}
          {hasSubItems ? (
            <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#888" />
          ) : (
             <Ionicons name="chevron-forward" size={20} color="#555" />
          )}
        </Pressable>

        {/* The Dropdown Sub-Items */}
        {hasSubItems && isExpanded && (
          <View style={styles.subContainer}>
            {item.subItems.map((sub: string, index: number) => (
              <Pressable key={index} style={styles.subItem}>
                <View style={styles.subItemDot} />
                <Text style={styles.subItemText}>{sub}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
         <Text style={styles.header}>Menu</Text>
      </View>
      <FlatList
        data={MENU_DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  headerContainer: { paddingHorizontal: 16, paddingTop: 40, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#222' },
  header: { fontSize: 28, fontWeight: '900', color: '#FFF' },
  
  menuWrapper: { marginBottom: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A' },
  icon: { marginRight: 15 },
  menuText: { flex: 1, color: '#FFF', fontSize: 16, fontWeight: '600' },
  
  subContainer: { backgroundColor: '#181818', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, paddingVertical: 10, paddingHorizontal: 20, marginTop: -5, borderWidth: 1, borderColor: '#2A2A2A', borderTopWidth: 0 },
  subItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#222' },
  subItemDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#E91E63', marginRight: 12 },
  subItemText: { color: '#AAA', fontSize: 15, fontWeight: '500' },
});