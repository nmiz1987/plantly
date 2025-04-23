import { SplashScreen, Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { useLayoutEffect } from 'react';
import { Platform } from 'react-native';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
