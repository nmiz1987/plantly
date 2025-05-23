import { Text, StyleSheet, TextInput, Alert, TouchableOpacity, Platform } from 'react-native';
import { theme } from '@/theme';
import { PlantlyButton } from '@/components/PlantlyButton';
import { useState } from 'react';
import { PlantlyImage } from '@/components/PlantlyImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { usePlantStore } from '@/store/plantsStore';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

export default function NewScreen() {
  const router = useRouter();
  const addPlant = usePlantStore(state => state.addPlant);
  const [name, setName] = useState<string>();
  const [days, setDays] = useState<string>();
  const [imageUri, setImageUri] = useState<string>();

  const handleChooseImage = async () => {
    if (Platform.OS === 'web') {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert('Validation Error', 'Give your plant a name');
    }

    if (!days) {
      return Alert.alert('Validation Error', `How often does ${name} need to be watered?`);
    }

    if (Number.isNaN(Number(days))) {
      return Alert.alert('Validation Error', 'Watering frequency must be a be a number');
    }

    addPlant(name, Number(days), imageUri);
    router.back();
  };

  return (
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
      <StatusBar style="dark" />
      <TouchableOpacity style={styles.centered} onPress={handleChooseImage} activeOpacity={0.8}>
        <PlantlyImage imageUri={imageUri} />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="E.g. Casper the Cactus" autoCapitalize="words" />
      <Text style={styles.label}>Watering Frequency (every x days)</Text>
      <TextInput value={days} onChangeText={setDays} style={styles.input} placeholder="E.g. 6" keyboardType="number-pad" />
      <PlantlyButton title="Add plant" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  centered: {
    alignItems: 'center',
    marginBottom: 24,
  },
});
