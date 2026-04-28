import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MOCK_PHONES } from '../data';

const { width } = Dimensions.get('window');

// Custom Mock Data for the new sections
const CATEGORIES = [
  { name: 'Phones', icon: 'phone-portrait-outline' },
  { name: 'Tablets', icon: 'tablet-landscape-outline' },
  { name: 'Laptops', icon: 'laptop-outline' },
  { name: 'Watches', icon: 'watch-outline' },
  { name: 'Cameras', icon: 'camera-outline' },
  { name: 'More', icon: 'grid-outline' }
];

const BUDGETS = ['Under 5,000', '5,000 - 10,000', '10,000 - 20,000', '20,000 - 30,000', '30k+ Premium'];

export default function Home() {
  
  // Reusable Section Header Component
  const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.viewMore}>View More</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* 1, 2, & 3. TOP MENU, LOGO, AND SEARCH */}
      <View style={styles.topNav}>
        <Ionicons name="menu-outline" size={32} color="#FFF" />
        <Text style={styles.logoText}>MobileDokan</Text>
        <Ionicons name="search-outline" size={28} color="#FFF" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 4. CATEGORIES CARD */}
        <View style={styles.categoryCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((cat, idx) => (
              <View key={idx} style={styles.categoryItem}>
                <View style={styles.categoryIconBox}>
                  <Ionicons name={cat.icon as any} size={24} color="#FFF" />
                </View>
                <Text style={styles.categoryText}>{cat.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 5. BUDGET RANGE */}
        <SectionHeader title="Choose Your Budget" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSlider}>
          {BUDGETS.map((budget, idx) => (
            <Pressable key={idx} style={styles.budgetCard}>
              <Text style={styles.budgetText}>৳ {budget}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* 6. LATEST MOBILE PHONES */}
        <SectionHeader title="Latest Mobile" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSlider}>
          {MOCK_PHONES.map(phone => (
            <View key={`latest-${phone.id}`} style={styles.phoneCard}>
              <View style={styles.imageBox}><Image source={{ uri: phone.image }} style={styles.image} resizeMode="contain" /></View>
              <Text style={styles.phoneName} numberOfLines={2}>{phone.name}</Text>
              <Text style={styles.phonePrice}>{phone.price}</Text>
              <Pressable style={styles.detailsBtn}><Text style={styles.detailsBtnText}>View Details</Text></Pressable>
            </View>
          ))}
        </ScrollView>

        {/* 7. POPULAR BRANDS */}
        <SectionHeader title="Popular Brands" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSlider}>
          {['Samsung', 'Apple', 'Xiaomi', 'Vivo', 'Realme', 'Oppo'].map((brand, idx) => (
            <View key={idx} style={styles.brandCard}>
              <Text style={styles.brandText}>{brand}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 8. PRODUCT NEWS */}
        <SectionHeader title="Product News" />
        <View style={styles.newsCard}>
          <Image source={{ uri: MOCK_PHONES[0].image }} style={styles.newsImage} resizeMode="contain" />
          <View style={styles.newsInfo}>
            <Text style={styles.newsTitle} numberOfLines={2}>Samsung Galaxy S24 Ultra Camera Test Breakdown</Text>
            <Text style={styles.newsDate}>2 hours ago</Text>
          </View>
        </View>

        {/* 9. UPCOMING PHONES */}
        <SectionHeader title="Upcoming Phones" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSlider}>
          {MOCK_PHONES.slice().reverse().map(phone => (
            <View key={`upcoming-${phone.id}`} style={styles.phoneCard}>
               <View style={styles.imageBox}><Image source={{ uri: phone.image }} style={styles.image} resizeMode="contain" /></View>
              <Text style={styles.phoneName} numberOfLines={2}>{phone.name}</Text>
              <Text style={styles.phonePrice}>Coming Soon</Text>
              <Pressable style={styles.detailsBtn}><Text style={styles.detailsBtnText}>View Details</Text></Pressable>
            </View>
          ))}
        </ScrollView>

        {/* 10. LATEST REVIEWS */}
        <SectionHeader title="Latest Reviews" />
        <View style={styles.reviewCard}>
          <View style={styles.reviewScoreBox}><Text style={styles.reviewScore}>8.5</Text></View>
          <Text style={styles.reviewTitle}>iPhone 16 Pro Max Review: Is the Titanium Worth It?</Text>
        </View>

        {/* 11. LATEST COMPARISON */}
        <SectionHeader title="Latest Comparisons" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSlider}>
           <View style={styles.compareCard}>
              <View style={styles.compareImages}>
                <Image source={{ uri: MOCK_PHONES[0].image }} style={styles.compareImg} resizeMode="contain" />
                <View style={styles.vsBadge}><Text style={styles.vsText}>VS</Text></View>
                <Image source={{ uri: MOCK_PHONES[1].image }} style={styles.compareImg} resizeMode="contain" />
              </View>
              <Text style={styles.compareNames} numberOfLines={1}>Galaxy S24 Ultra vs iPhone 16 Pro Max</Text>
           </View>
        </ScrollView>

        {/* 12. FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Subscribe for Updates</Text>
          <Text style={styles.footerSub}>Get stories and new launches in your inbox.</Text>
          <View style={styles.subscribeBox}>
            <TextInput placeholder="Email Address" placeholderTextColor="#888" style={styles.footerInput} />
            <Pressable style={styles.subscribeBtn}><Text style={styles.subscribeText}>Subscribe</Text></Pressable>
          </View>
          
          <View style={styles.footerLinks}>
            <Text style={styles.footerLinkText}>About Us</Text>
            <Text style={styles.footerLinkText}>Contact</Text>
            <Text style={styles.footerLinkText}>Privacy Policy</Text>
          </View>
          
          <Text style={styles.logoText}>MobileDokan</Text>
          <Text style={styles.copyright}>© 2026 MobileDokan. All Rights Reserved.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  scrollContent: { paddingBottom: 20 },
  
  // 1-3. Top Nav
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 15, paddingBottom: 15, backgroundColor: '#1A1A1A', borderBottomWidth: 1, borderBottomColor: '#333' },
  logoText: { fontSize: 22, fontWeight: '900', color: '#FFF', letterSpacing: 1, textAlign: 'center' },
  
  // Shared Headers
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  viewMore: { color: '#E91E63', fontWeight: '600', fontSize: 14 },
  horizontalSlider: { paddingLeft: 16, paddingBottom: 5 },

  // 4. Categories
  categoryCard: { backgroundColor: '#1E1E1E', margin: 16, borderRadius: 12, paddingVertical: 15, paddingLeft: 10, borderWidth: 1, borderColor: '#333' },
  categoryItem: { alignItems: 'center', marginRight: 20 },
  categoryIconBox: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#2A2A2A', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  categoryText: { color: '#CCC', fontSize: 12, fontWeight: '600' },

  // 5. Budgets
  budgetCard: { backgroundColor: '#1E1E1E', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, marginRight: 12, borderWidth: 1, borderColor: '#333' },
  budgetText: { color: '#FFF', fontWeight: 'bold' },

  // 6 & 9. Phone Cards
  phoneCard: { width: 160, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 12, marginRight: 15, borderWidth: 1, borderColor: '#333' },
  imageBox: { backgroundColor: '#FFF', borderRadius: 8, height: 120, padding: 5, marginBottom: 10, justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  phoneName: { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 4, height: 38 },
  phonePrice: { color: '#E91E63', fontWeight: 'bold', marginBottom: 10 },
  detailsBtn: { backgroundColor: '#333', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  detailsBtnText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  // 7. Brands
  brandCard: { backgroundColor: '#2A2A2A', paddingHorizontal: 25, paddingVertical: 15, borderRadius: 8, marginRight: 12 },
  brandText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  // 8. News
  newsCard: { flexDirection: 'row', backgroundColor: '#1E1E1E', marginHorizontal: 16, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#333', alignItems: 'center' },
  newsImage: { width: 70, height: 70, backgroundColor: '#FFF', borderRadius: 8, marginRight: 15 },
  newsInfo: { flex: 1 },
  newsTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  newsDate: { color: '#888', fontSize: 12 },

  // 10. Reviews
  reviewCard: { flexDirection: 'row', backgroundColor: '#1E1E1E', marginHorizontal: 16, borderRadius: 12, padding: 15, borderWidth: 1, borderColor: '#333', alignItems: 'center' },
  reviewScoreBox: { backgroundColor: '#4CAF50', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  reviewScore: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  reviewTitle: { flex: 1, color: '#FFF', fontSize: 15, fontWeight: 'bold', lineHeight: 22 },

  // 11. Comparisons
  compareCard: { width: width * 0.75, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 15, marginRight: 15, borderWidth: 1, borderColor: '#333' },
  compareImages: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  compareImg: { width: 80, height: 100, backgroundColor: '#FFF', borderRadius: 8 },
  vsBadge: { backgroundColor: '#E91E63', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  vsText: { color: '#FFF', fontWeight: '900', fontSize: 12 },
  compareNames: { color: '#FFF', fontWeight: 'bold', textAlign: 'center' },

  // 12. Footer
  footer: { backgroundColor: '#1A1A1A', marginTop: 40, padding: 25, borderTopWidth: 1, borderTopColor: '#333', alignItems: 'center' },
  footerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  footerSub: { color: '#AAA', fontSize: 14, marginBottom: 20 },
  subscribeBox: { flexDirection: 'row', width: '100%', marginBottom: 25 },
  footerInput: { flex: 1, backgroundColor: '#121212', borderWidth: 1, borderColor: '#333', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, paddingHorizontal: 15, color: '#FFF' },
  subscribeBtn: { backgroundColor: '#E91E63', paddingHorizontal: 20, justifyContent: 'center', borderTopRightRadius: 8, borderBottomRightRadius: 8 },
  subscribeText: { color: '#FFF', fontWeight: 'bold' },
  footerLinks: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 25, width: '100%' },
  footerLinkText: { color: '#888', fontSize: 14 },
  copyright: { color: '#555', fontSize: 12, marginTop: 10 }
});