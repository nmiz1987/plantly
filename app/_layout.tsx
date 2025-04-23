import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { useLayoutEffect } from 'react';

export default function RootLayout() {
  useLayoutEffect(() => {
    NavigationBar.setBackgroundColorAsync('white');
    NavigationBar.setButtonStyleAsync('dark');
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
