import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';
import * as FileSystem from 'expo-file-system';

export type PlantType = {
  id: string;
  name: string;
  wateringFrequencyDays: number;
  lastWateredAtTimestamp?: number;
  imageUri?: string;
};

type PlantsState = {
  nextId: number;
  plants: PlantType[];
  addPlant: (name: string, wateringFrequencyDays: number, imageUri?: string) => Promise<void>;
  removePlant: (plantId: string) => void;
  waterPlant: (plantId: string) => void;
};

const persistConfig: PersistOptions<PlantsState> = {
  name: 'plantly-plants-store',
  storage: createJSONStorage(() => AsyncStorage),
};

const plantsStore: StateCreator<PlantsState> = set => ({
  plants: [],
  nextId: 1,
  addPlant: async (name: string, wateringFrequencyDays: number, imageUri?: string) => {
    const savedImageUri = FileSystem.documentDirectory + `${new Date().getTime()}-${imageUri?.split('/').slice(-1)[0]}`;

    if (imageUri) {
      await FileSystem.copyAsync({
        from: imageUri,
        to: savedImageUri,
      });
    }

    set(state => {
      return {
        ...state,
        nextId: state.nextId + 1,
        plants: [
          {
            id: String(state.nextId),
            name,
            wateringFrequencyDays,
            imageUri: imageUri ? savedImageUri : undefined,
          },
          ...state.plants,
        ],
      };
    });
  },
  removePlant: (plantId: string) => {
    set(state => {
      return {
        ...state,
        plants: state.plants.filter(plant => plant.id !== plantId),
      };
    });
  },
  waterPlant: (plantId: string) => {
    set(state => {
      return {
        ...state,
        plants: state.plants.map(plant => {
          if (plant.id === plantId) {
            return {
              ...plant,
              lastWateredAtTimestamp: Date.now(),
            };
          }
          return plant;
        }),
      };
    });
  },
});

export const usePlantStore = create(persist<PlantsState>(plantsStore, persistConfig));
