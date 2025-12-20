import AuthContextProvider from "@/provider/auth-context-provider";
import CartContextProvider from "@/provider/cart-context-provider";
import ReactQueryProvider from "@/provider/react-query-provider";
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <ReactQueryProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <KeyboardProvider>
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
              </Stack>
            </KeyboardProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </ReactQueryProvider>
    </>
  );
}
