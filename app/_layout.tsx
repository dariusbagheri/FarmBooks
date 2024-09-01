import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { tokenCache } from "@/lib/auth";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import {
  AppProvider,
  RealmProvider,
  UserProvider,
  useAuth,
} from "@realm/react";
import { Item } from "@/models/invoice";
import { Pressable, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <AppProvider id="fb_sync_service-acgyahn">
          <UserProvider fallback={LogIn}>
            <RealmProvider schema={[Item]}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(root)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </RealmProvider>
          </UserProvider>
        </AppProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const LogIn = () => {
  // Calling `useAuth()` requires AppProvider to be a parent
  const { logInWithAnonymous, result } = useAuth();
  return (
    <SafeAreaView>
      <Pressable onPress={logInWithAnonymous}>
        <Text>Log In</Text>
      </Pressable>
      {result.error && <Text>{result.error.message}</Text>}
    </SafeAreaView>
  );
};
