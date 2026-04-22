import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#E91E63', // Pink accent
      tabBarInactiveTintColor: '#888',  // Dimmed unselected tabs
      tabBarStyle: { 
        backgroundColor: '#1E1E1E', // Dark bottom bar
        borderTopColor: '#333'      // Subtle dark border
      },
      headerShown: false,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="search" options={{ title: 'Search', tabBarIcon: ({color}) => <Ionicons name="search" size={24} color={color} /> }} />
      <Tabs.Screen name="menu" options={{ title: 'Menu', tabBarIcon: ({color}) => <Ionicons name="menu" size={24} color={color} /> }} />
    </Tabs>
  );
}