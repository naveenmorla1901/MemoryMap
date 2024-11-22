// src/hooks/useLocation.ts
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export interface LocationState {
  latitude: number;
  longitude: number;
  error: string | null;
}

export function useLocation() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { data: location, isLoading } = useQuery({
    queryKey: ['location'],
    queryFn: async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return null;
        }

        const location = await Location.getCurrentPositionAsync({});
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      } catch (error) {
        setErrorMsg('Error getting location');
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    location,
    isLoading,
    error: errorMsg,
  };
}