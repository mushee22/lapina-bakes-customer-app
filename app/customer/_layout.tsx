import { StackHeader } from "@/components/elements/stack-header";
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
        name="cart"
        options={{
          title: "Cart",
          headerShown: true,
          header: () => (
            <StackHeader
              title="Cart"
              isCart={false}
              isBackButtonVisible={true}
            />
          ),
        }}
      />
    </Stack>
  );
}
