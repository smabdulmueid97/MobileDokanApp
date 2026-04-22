import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      {/* Makes the phone's top clock/battery icons white to contrast the dark app */}
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Stack screenOptions={{ 
        headerStyle: { backgroundColor: '#1E1E1E' }, // Dark header background
        headerTintColor: '#FFF', // White header text
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ title: 'Phone Details', headerBackTitle: 'Back' }} />
      </Stack>
    </>
  );
}