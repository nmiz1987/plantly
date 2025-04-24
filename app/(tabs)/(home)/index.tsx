import { FlatList, StyleSheet, View } from 'react-native';
import { theme } from '@/theme';
import { usePlantStore } from '@/store/plantsStore';
import { PlantlyButton } from '@/components/PlantlyButton';
import { useRouter } from 'expo-router';
import { PlantCard } from '@/components/PlantCard';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const router = useRouter();
  const plants = usePlantStore(state => state.plants);

  return (
    <>
      <StatusBar style="dark" />
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={plants}
        renderItem={({ item }) => <PlantCard plant={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <PlantlyButton
              title="Add your first plant"
              onPress={() => {
                router.navigate('/new');
              }}
            />
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: 12,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    padding: 12,
  },
});
