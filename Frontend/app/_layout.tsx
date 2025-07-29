import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomNavBar from '../components/BottomNavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  // Always call hooks in the same order
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuth(!!token);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setIsReady(true);
      }
    };
    
    checkAuth();
  }, []);

  // Separate effect for navigation
  useEffect(() => {
    if (isReady && isAuth === false) {
      router.push("/splash");
    }
  }, [isReady, isAuth, router]);

  // Always render children, but conditionally show loading
  return (
    <>
      {!isReady ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      ) : (
        children
      )}
    </>
  );
}

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00C853',   // Your custom primary color (green in this case)
    accent: '#FFD600',    // Optional accent color
    background: '#fff',
    text: '#000000',
  },
};

export default function RootLayout() {
  const pathname = usePathname();
  const hideNav = pathname === '/auth' || pathname === '/splash' || pathname === '/camerascreen';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={customTheme}>
        <SafeAreaProvider>
          <RouteGuard>
            <View style={{ flex: 1 }}>
              <Stack>
                <Stack.Screen name="splash" options={{ headerShown: false }} />
                <Stack.Screen name="auth" options={{ headerShown: false }} />
                <Stack.Screen name="home" options={{ headerShown: false }} />
                <Stack.Screen name="search" options={{ headerShown: false }} />
                <Stack.Screen name="report" options={{ headerShown: false }} />
                <Stack.Screen name="marketplace" options={{ headerShown: false }} />
                <Stack.Screen name="adopt" options={{ headerShown: false }} />
                <Stack.Screen name="leaderboard" options={{ headerShown: false }} />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
                <Stack.Screen name="camerascreen" options={{ headerShown: false }} />
                <Stack.Screen name="reportdump" options={{
                  headerTitle: 'Report Dump',
                  headerShown: true,
                  headerStyle: { backgroundColor: '#4CC075' },
                  headerShadowVisible: false,
                  headerTintColor: 'white',
                  headerBackButtonDisplayMode: 'minimal',
                  headerRight: () => (
                    <TouchableOpacity>
                      <View style={{ padding: 8, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', marginRight: 4 }}>Submit</Text>
                        <Ionicons name="send" size={22} color="#fff" />
                      </View>
                    </TouchableOpacity>
                  )
                }} />
                <Stack.Screen name="settings" options={{ headerTitle: 'Settings', headerShown: true, headerStyle: { backgroundColor: '#4CC075' }, headerShadowVisible: false, headerTintColor: 'white', headerBackButtonDisplayMode: 'minimal' }} />
                <Stack.Screen name="thankscreen" options={{ headerTitle: 'Thank You!', headerShown: true, headerStyle: { backgroundColor: '#4CC075' }, headerShadowVisible: false, headerTintColor: 'white', headerBackButtonDisplayMode: 'minimal' }} />
                <Stack.Screen name="aboutus" options={{ headerTitle: 'About Us', headerShown: true, headerStyle: { backgroundColor: '#4CC075' }, headerShadowVisible: false, headerTintColor: 'white', headerBackButtonDisplayMode: 'minimal' }} />
              </Stack>
              <BottomNavBar hideNav={hideNav} />
            </View>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const style = StyleSheet.create({
  edit: {
    flexDirection: 'row',
    gap: 4,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600'
  }
})
