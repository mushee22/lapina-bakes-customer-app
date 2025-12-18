import { toastConfig } from "@/components/ui/toast-config";
import { ALLOWED_ROLE } from "@/constants";
import { AuthContext } from "@/context/auth-context";
import { authService } from "@/service/auth";
import { User } from "@/type/user";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ReactNode, useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  const router = useRouter()


  const handleInvalidToken = async () => {
    setIsAuthenticated(false);
    setIsAuthenticating(false);
    setUser(undefined);
    setToken(undefined);
    await SecureStore.deleteItemAsync("token");
    router.replace("/login");
  }

  useEffect(() => {
    revalidateUserAuthToken();
  }, []);


  const revalidateUserAuthToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    console.log(token, "token");
    if (!token || !token.length) {
      handleInvalidToken();
      return;
    }
    try {
      const data = await authService.getUser();
      const user = data.data;

      if (!user) {
        handleInvalidToken();
        return;
      }
      setToken(token);
      setUser(user)
      setIsAuthenticated(true);
      setIsAuthenticating(false);
    } catch (error) {
      handleInvalidToken();
    }
  }


  const onSuccessFullyLogin = async (user?: User, token?: string) => {
    if (!token || !user) {
      handleInvalidToken();
      return;
    }
    await SecureStore.setItemAsync("token", token);
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
    setIsAuthenticating(false);
    handleGotoHomePage(user);
  };

  const handleGotoHomePage = useCallback((updatedUser?: User) => {
    const role = updatedUser?.roles[0];
    if (!role || role !== ALLOWED_ROLE) {
      router.replace("/login");
      return;
    }
    router.replace("/customer/(tabs)/home");
  }, [router, user])

  const onLogout = async () => {
    setIsAuthenticated(false);
    setIsAuthenticating(false);
    setUser(undefined);
    setToken(undefined);
    await SecureStore.deleteItemAsync("token");
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        user,
        token,
        onSuccessFullyLogin,
        onLogout,
        onGotoHomePage: handleGotoHomePage
      }}
    >
      {children}
      <Toast
        config={toastConfig}
        visibilityTime={3500}
        autoHide={true}
        topOffset={80}
        position="top"
        swipeable={true}
      />
    </AuthContext.Provider>
  );
}
