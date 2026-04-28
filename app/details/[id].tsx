import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_PHONES } from '../data';

const { width } = Dimensions.get('window');

// --- MOCK DATA FOR NEW SECTIONS ---
const CATEGORIES = [
  { name: 'Phones', icon: 'phone-portrait-outline' },
  { name: 'Tablets', icon: 'tablet-landscape-outline' },
  { name: 'Laptops', icon: 'laptop-outline' },
  { name: 'Watches', icon: 'watch-outline' },
  { name: 'Cameras', icon: 'camera-outline' },
  { name: 'More', icon: 'grid-outline' }
];

const BUDGETS = ['Under 5,000', '5,000 - 10,000', '10,000 - 20,000', '20,000 - 30,000', '30k+ Premium'];

const BRANDS_DATA = [
  { name: 'Samsung', color: '#1428A0', letter: 'S' },
  { name: 'Apple', color: '#444444', icon: 'logo-apple' },
  { name: 'Xiaomi', color: '#FF6900', letter: 'X' },
  { name: 'Vivo', color: '#415FFF', letter: 'V' },
  { name: 'Realme', color: '#FFD700', letter: 'R' },
  { name: 'Oppo', color: '#1F8340', letter: 'O' }
];

const NEWS_DATA = [
  { id: 1, title: 'Samsung Galaxy S24 Ultra Camera Update Rolls Out', text: 'Samsung has officially released the massive April camera patch bringing huge improvements to low light and zoom clarity.', date: '2 hours ago', img: MOCK_PHONES[0]?.image },
  { id: 2, title: 'iPhone 16 Pro Leaks Reveal Larger Battery', text: 'New schematics show that Apple is finally pushing battery sizes up across the Pro lineup this year to compete with Android flagships.', date: '5 hours ago', img: MOCK_PHONES[1]?.image },
  { id: 3, title: 'Xiaomi Redmi Note 14 Dominates Budget Market', text: 'Sales figures show the new Redmi Note series breaking records in the mid-range sector across South Asia.', date: '1 day ago', img: MOCK_PHONES[2]?.image },
];

const REVIEWS_DATA = [
  { id: 1, title: 'Galaxy S24 Ultra Full Review: The Android King', text: 'Is the Titanium upgrade worth your money? We test the cameras, battery, and AI features.', type: 'YouTube', img: 'https://mobiledokan.space/media/samsung-galaxy-s24-ultra-titanium-gray-official-image.webp' },
  { id: 2, title: 'iPhone 16 Pro Max vs Pixel 8 Pro Camera Test', text: 'We took 500 photos to find the ultimate mobile camera champion for this year.', type: 'Article', img: 'https://mobiledokan.space/media/apple-iphone-16-pro-max-desert-titanium-official-image.webp' },
  { id: 3, title: 'Vivo V70 FE Gaming Performance Test', text: 'Does it overheat playing Genshin Impact on max settings? Watch to find out.', type: 'YouTube', img: 'https://mobiledokan.space/media/vivo-v70-fe-muse-purple-official-color-image.webp' }
];

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Grabs exact status bar height for Android & iOS

  // Reusable Section Header Component
  const SectionHeader = ({ title, hideViewMore }: { title: string, hideViewMore?: boolean }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {!hideViewMore && <Text style={styles.viewMore}>View More</Text>}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      
      {/* 1, 2, 3. TOP MENU, LOGO, AND SEARCH (Fixed Status Bar Overlap) */}
      <View style={[styles.topNav, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.push('/menu')} style={styles.iconButton}>
          <Ionicons name="menu-outline" size={30} color="#FFF" />
        </Pressable>
        <Text style={styles.logoText}>MobileDokan</Text>
        <Pressable onPress={() => router.push('/search')} style={styles.iconButton}>
          <Ionicons name="search-outline" size={26} color="#FFF" />
        </Pressable>
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

        {/* 5. BUDGET RANGE (No View More) */}
        <SectionHeader title="Choose Your Budget" hideViewMore />
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
            <Link href={`/details/${phone.id}`} asChild key={`latest-${phone.id}`}>
              <Pressable style={styles.phoneCard}>
                <View style={styles.imageBox}><Image source={{ uri: phone.image }} style={styles.image} resizeMode="contain" /></View>
                <Text style={styles.phoneName} numberOfLines={2}>{phone.name}</Text>
                <Text style={styles.phonePrice}>{phone.price}</Text>
                <View style={styles.detailsBtn}><Text style={styles.detailsBtnText}>View Details</Text></View>
              </Pressable>
            </Link>
          ))}
        </ScrollView>

        {/* 7. POPULAR BRANDS (Logo Colors) */}
        <SectionHeader title="Popular Brands" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSlider}>
          {BRANDS_DATA.map((brand, idx) => (
            <View key={idx} style={styles.brandCircleContainer}>
              <View style={[styles.brandCircle, { backgroundColor: brand.color }]}>
                {brand.icon ? (
                  <Ionicons name={brand.icon as any} size={32} color="#FFF" />
                ) : (
                  <Text style={styles.brandLetter}>{brand.letter}</Text>
                )}
              </View>
              <Text style={styles.brandText}>{brand.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 8. PRODUCT NEWS (3 Items with snippets) */}
        <SectionHeader title="Product News" />
        {NEWS_DATA.map(news => (
          <View key={news.id} style={styles.newsCard}>
            <Image source={{ uri: news.img }} style={styles.newsImage} resizeMode="contain" />
            <View style={styles.newsInfo}>
              <Text style={styles.newsTitle} numberOfLines={2}>{news.title}</Text>
              <Text style={styles.newsExcerpt} numberOfLines={2}>{news.text}</Text>
              <Text style={styles.newsDate}>{news.date}</Text>
            </View>
          </View>
        ))}

        {/* 9. UPCOMING PHONES (Price + Official Tag) */}
        <SectionHeader title="Upcoming Phones" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSlider}>
          {MOCK_PHONES.slice().reverse().map(phone => (
            <Link href={`/details/${phone.id}`} asChild key={`upcoming-${phone.id}`}>
              <Pressable style={styles.phoneCard}>
                <View style={styles.imageBox}><Image source={{ uri: phone.image }} style={styles.image} resizeMode="contain" /></View>
                <Text style={styles.phoneName} numberOfLines={2}>{phone.name}</Text>
                <Text style={styles.phonePrice}>৳ 1,20,000</Text>
                <Text style={styles.officialTag}>(Official)</Text>
                <View style={[styles.detailsBtn, {marginTop: 5}]}><Text style={styles.detailsBtnText}>View Details</Text></View>
              </Pressable>
            </Link>
          ))}
        </ScrollView>

        {/* 10. LATEST REVIEWS (Big Scrollable Cards) */}
        <SectionHeader title="Latest Reviews" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSlider}>
          {REVIEWS_DATA.map(review => (
            <View key={review.id} style={styles.reviewLargeCard}>
              <View style={styles.reviewImgContainer}>
                <Image source={{ uri: review.img }} style={styles.reviewImage} resizeMode="cover" />
                {review.type === 'YouTube' && (
                   <View style={styles.playButton}><Ionicons name="play" size={24} color="#FFF" /></View>
                )}
                <View style={styles.reviewBadge}><Text style={styles.reviewBadgeText}>{review.type}</Text></View>
              </View>
              <Text style={styles.reviewLargeTitle} numberOfLines={2}>{review.title}</Text>
              <Text style={styles.reviewExcerpt} numberOfLines={2}>{review.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 11. LATEST COMPARISONS (Smaller VS badge, Multiple items) */}
        <SectionHeader title="Latest Comparisons" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSlider}>
           {[1, 2, 3].map((item) => (
             <View key={item} style={styles.compareCard}>
                <View style={styles.compareImages}>
                  <Image source={{ uri: MOCK_PHONES[0].image }} style={styles.compareImg} resizeMode="contain" />
                  <View style={styles.vsSmallBadge}><Text style={styles.vsSmallText}>VS</Text></View>
                  <Image source={{ uri: MOCK_PHONES[item].image }} style={styles.compareImg} resizeMode="contain" />
                </View>
                <Text style={styles.compareNames} numberOfLines={1}>Galaxy S24 Ultra vs {MOCK_PHONES[item].name}</Text>
             </View>
           ))}
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
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#121212' }, 
  scrollContent: { paddingBottom: 80 }, // Large padding so bottom tab bar doesn't cover footer
  
  // Top Nav (SafeArea fixes Android status bar overlap)
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 15, backgroundColor: '#1A1A1A', borderBottomWidth: 1, borderBottomColor: '#333', zIndex: 10 },
  logoText: { fontSize: 22, fontWeight: '900', color: '#FFF', letterSpacing: 1, textAlign: 'center' },
  iconButton: { padding: 5 },
  
  // Shared Headers
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  viewMore: { color: '#E91E63', fontWeight: '600', fontSize: 14 },
  horizontalSlider: { paddingLeft: 16, paddingBottom: 10 },

  // Categories
  categoryCard: { backgroundColor: '#1E1E1E', margin: 16, borderRadius: 12, paddingVertical: 15, paddingLeft: 10, borderWidth: 1, borderColor: '#333' },
  categoryItem: { alignItems: 'center', marginRight: 20 },
  categoryIconBox: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#2A2A2A', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  categoryText: { color: '#CCC', fontSize: 12, fontWeight: '600' },

  // Budgets
  budgetCard: { backgroundColor: '#1E1E1E', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, marginRight: 12, borderWidth: 1, borderColor: '#333' },
  budgetText: { color: '#FFF', fontWeight: 'bold' },

  // Phone Cards
  phoneCard: { width: 160, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 12, marginRight: 15, borderWidth: 1, borderColor: '#333' },
  imageBox: { backgroundColor: '#FFF', borderRadius: 8, height: 120, padding: 5, marginBottom: 10, justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  phoneName: { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 4, height: 38 },
  phonePrice: { color: '#E91E63', fontWeight: 'bold', marginBottom: 2 },
  officialTag: { color: '#888', fontSize: 11, marginBottom: 10 },
  detailsBtn: { backgroundColor: '#333', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  detailsBtnText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  // Brands (Colorful Circles)
  brandCircleContainer: { alignItems: 'center', marginRight: 25 },
  brandCircle: { width: 65, height: 65, borderRadius: 32.5, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  brandLetter: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  brandText: { color: '#FFF', fontWeight: '600', fontSize: 13 },

  // Product News
  newsCard: { flexDirection: 'row', backgroundColor: '#1E1E1E', marginHorizontal: 16, marginBottom: 12, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#333', alignItems: 'center' },
  newsImage: { width: 80, height: 80, backgroundColor: '#FFF', borderRadius: 8, marginRight: 15 },
  newsInfo: { flex: 1 },
  newsTitle: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  newsExcerpt: { color: '#AAA', fontSize: 12, marginBottom: 6, lineHeight: 16 },
  newsDate: { color: '#666', fontSize: 11 },

  // Latest Reviews (Large Cards)
  reviewLargeCard: { width: 280, backgroundColor: '#1E1E1E', borderRadius: 12, marginRight: 15, borderWidth: 1, borderColor: '#333', overflow: 'hidden' },
  reviewImgContainer: { width: '100%', height: 150, backgroundColor: '#FFF', position: 'relative', justifyContent: 'center', alignItems: 'center' },
  reviewImage: { width: '100%', height: '100%', opacity: 0.9 },
  playButton: { position: 'absolute', backgroundColor: 'rgba(233, 30, 99, 0.8)', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  reviewBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: '#121212', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  reviewBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  reviewLargeTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold', paddingHorizontal: 15, paddingTop: 12, paddingBottom: 4 },
  reviewExcerpt: { color: '#888', fontSize: 13, paddingHorizontal: 15, paddingBottom: 15 },

  // Comparisons (Smaller VS)
  compareCard: { width: width * 0.70, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 15, marginRight: 15, borderWidth: 1, borderColor: '#333' },
  compareImages: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  compareImg: { width: 60, height: 80, backgroundColor: '#FFF', borderRadius: 8, marginHorizontal: 10 },
  vsSmallBadge: { backgroundColor: '#E91E63', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', zIndex: 5 },
  vsSmallText: { color: '#FFF', fontWeight: '900', fontSize: 10 },
  compareNames: { color: '#FFF', fontWeight: 'bold', textAlign: 'center', fontSize: 13 },

  // Footer
  footer: { backgroundColor: '#1A1A1A', marginTop: 40, padding: 25, borderTopWidth: 1, borderTopColor: '#333', alignItems: 'center' },
  footerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  footerSub: { color: '#AAA', fontSize: 14, marginBottom: 20, textAlign: 'center' },
  subscribeBox: { flexDirection: 'row', width: '100%', marginBottom: 25 },
  footerInput: { flex: 1, backgroundColor: '#121212', borderWidth: 1, borderColor: '#333', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, paddingHorizontal: 15, color: '#FFF', height: 45 },
  subscribeBtn: { backgroundColor: '#E91E63', paddingHorizontal: 20, justifyContent: 'center', borderTopRightRadius: 8, borderBottomRightRadius: 8 },
  subscribeText: { color: '#FFF', fontWeight: 'bold' },
  footerLinks: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 25, width: '100%' },
  footerLinkText: { color: '#888', fontSize: 14 },
  copyright: { color: '#555', fontSize: 12, marginTop: 10 }
});