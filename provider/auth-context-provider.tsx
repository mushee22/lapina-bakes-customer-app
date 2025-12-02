import { toastConfig } from "@/components/ui/toast-config";
import { ALLOWED_ROLE } from "@/constants";
import { AuthContext } from "@/context/auth-context";
import { authService } from "@/service/auth";
import { User } from "@/type/user";
import { useQuery } from "@tanstack/react-query";
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

  const router = useRouter();

  useEffect(() => {
    getToken();
  }, []);


  const  { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getUser(),
    enabled: !!token,
  })


  const updateUserData = useCallback(async(user?:User, isError?:boolean) => {
    if(isError) {
      setIsAuthenticated(false);
      setIsAuthenticating(false);
      setUser(undefined);
      setToken(undefined);
      await SecureStore.deleteItemAsync("token");
      router.replace("/login");
      return;
    }
    setIsAuthenticated(true);
    setIsAuthenticating(false);
    setUser(user);
  }, []);


  useEffect(() => {
    if (data && data.data && !isLoading && !isError) {
      updateUserData(data.data);
    }

    if(!isLoading && isError) {
      updateUserData(undefined, true);
    }
  }, [data, isLoading, isError, updateUserData]);
  


  async function getToken() {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      setIsAuthenticated(false);
      setIsAuthenticating(false);
      setUser(undefined);
      setToken(undefined);
      return;
    }
    setToken(token);
  }

  async function saveToken(value: string) {
    await SecureStore.setItemAsync("token", value);
  }

  const onSuccessFullyLogin = async (user?: User, token?: string) => {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
    setIsAuthenticating(false);
    await saveToken(token || "");
    handleGotoHomePage(user)
  };

  const handleGotoHomePage = useCallback((user?: User) => {
    const role = user?.roles[0];
    console.log(role, "role is updated")
    if (!role || role !== ALLOWED_ROLE) {
      router.replace("/login");
      return;
    }
    router.replace("/customer/(tabs)/home");
  },[router])

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
