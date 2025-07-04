import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';

type UserState = {
  hasFinishedOnboarding: boolean;
  toggleHasOnboarded: () => void;
};

const persistConfig: PersistOptions<UserState> = {
  name: 'plantly-user-store',
  storage: createJSONStorage(() => AsyncStorage),
};

const userStore: StateCreator<UserState> = set => ({
  hasFinishedOnboarding: false,
  toggleHasOnboarded: () => {
    return set(state => {
      return {
        ...state,
        hasFinishedOnboarding: !state.hasFinishedOnboarding,
      };
    });
  },
});

export const useUserStore = create(persist<UserState>(userStore, persistConfig));
