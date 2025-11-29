import AuthContextProvider from "@/provider/auth-context-provider";
import CartContextProvider from "@/provider/cart-context-provider";
import ReactQueryProvider from "@/provider/react-query-provider";

import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <ReactQueryProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="index"
                options={{ title: "Home", headerShown: false }}
              />
              <Stack.Screen
                name="customer"
                options={{ title: "Home", headerShown: false }}
              />
              <Stack.Screen
                name="delivery"
                options={{ title: "Home", headerShown: false }}
              />
            </Stack>
          </CartContextProvider>
        </AuthContextProvider>
      </ReactQueryProvider>
    </>
  );
}
