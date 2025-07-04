import { SplashScreen, Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import * as QuickActions from 'expo-quick-actions';
import { I18nManager, Platform } from 'react-native';
import { useQuickActionRouting } from 'expo-quick-actions/router';
import * as Expo from 'expo';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useQuickActionRouting();

  useEffect(() => {
    // This is a hack to force the app to reload when the language is changed to English
    // This is because the app is not properly handling the language change
    if (I18nManager.isRTL) {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
      Expo.reloadAppAsync();
    }
  }, []);

  useEffect(() => {
    QuickActions.setItems([
      {
        title: 'Add a plant',
        icon: Platform.OS === 'ios' ? 'symbol:leaf' : 'leaf',
        id: '0',
        params: { href: '/new' },
      },
    ]);
  }, []);

  useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('white');
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen
        name="onboarding"
        options={{
          presentation: 'modal',
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          presentation: 'modal',
          title: 'New plant',
        }}
      />
    </Stack>
  );
}
