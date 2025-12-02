import { useAuthContext } from '@/hooks/use-auth-context';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isAuthenticating, user, onGotoHomePage } = useAuthContext();

  useEffect(() => {
    if (isAuthenticating) return;
    if (isAuthenticated) {
      onGotoHomePage()
      return
    }
    router.replace('/login');
  }, [isAuthenticated, isAuthenticating, router, user?.roles, onGotoHomePage]);  

  return (
    <View className="flex-1 items-center justify-center bg-white">
     <Image 
      source={require('../assets/images/logo.jpg')}
     />
    </View>
  );
}


