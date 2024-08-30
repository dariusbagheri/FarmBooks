import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="invoice" options={{ headerShown: false }} />
      <Stack.Screen name="farm" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
