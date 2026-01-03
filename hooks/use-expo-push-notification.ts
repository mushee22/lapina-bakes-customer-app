import { notificationService } from '@/service/notification';
import { useMutation } from '@tanstack/react-query';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuthContext } from './use-auth-context';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function useExpoPushNotification() {

  const [token, setToken] = useState("")

  const { isAuthenticating } = useAuthContext();


  const { mutateAsync: onRegisterForPushNotificationsAsync } = useMutation({
    mutationKey: ['register-for-push-notifications'],
    mutationFn: (data: { token: string, platform: string, deviceId?: string }) => notificationService.registerForPushNotificationsAsync(data.token, data.platform, data.deviceId),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Push Notification Enabled',
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong on register for push notification',
      });
    }
  })



  useEffect(() => {

    if (isAuthenticating) return

    registerForPushNotificationsAsync().then((token) => {
      handleSavePushToken(token);
    });

    const notificationListener = Notifications
      .addNotificationReceivedListener(onRacievNotificationOnForground);
    const responseListener = Notifications
      .addNotificationResponseReceivedListener(onClickOnNotification);

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };

  }, [isAuthenticating])

  const handleSavePushToken = async (token?: string) => {
    if (!token) return
    onRegisterForPushNotificationsAsync({ token, platform: Platform.OS })
    setToken(token)
  }

  const onRacievNotificationOnForground = (notification: Notifications.Notification) => {
    console.log(notification);
  }

  const onClickOnNotification = (notification: Notifications.NotificationResponse) => {
    console.log(notification);
  }

}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return '';
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Something went wrong');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (e) {
      token = ``;
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  } else {
    Toast.show({
      type: 'error',
      text1: 'Must use physical device for Push Notifications',
    });
  }

  return token;
}