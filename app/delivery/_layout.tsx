import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="order"
        options={{ title: "Order", headerShown: false }}
      />
    </Stack>
  );
}
