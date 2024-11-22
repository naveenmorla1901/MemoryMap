// src/store/slices/locationSlice.ts
import { create } from 'zustand';
import { Location } from '@/types/models';

interface LocationState {
  locations: Location[];
  selectedLocation: Location | null;
  setLocations: (locations: Location[]) => void;
  setSelectedLocation: (location: Location | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  locations: [],
  selectedLocation: null,
  setLocations: (locations) => set({ locations }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));