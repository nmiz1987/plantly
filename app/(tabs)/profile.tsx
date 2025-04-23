import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme';
import { useUserStore } from '@/store/userStore';
import { PlantlyButton } from '@/components/PlantlyButton';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const toggleHasOnboarded = useUserStore(store => store.toggleHasOnboarded);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <PlantlyButton title="Back to onboarding" onPress={toggleHasOnboarded} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorWhite,
  },
});
