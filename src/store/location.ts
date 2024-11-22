// src/store/locations.ts
import { create } from 'zustand';
import { Location } from '@/types/models';

interface LocationState {
  locations: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
  error: string | null;
  setLocations: (locations: Location[]) => void;
  setSelectedLocation: (location: Location | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  locations: [],
  selectedLocation: null,
  isLoading: false,
  error: null,
  setLocations: (locations) => set({ locations }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));