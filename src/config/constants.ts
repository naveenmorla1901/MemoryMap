// src/config/constants.ts
export const APP_CONSTANTS = {
    MAP: {
      INITIAL_REGION: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      DEFAULT_ZOOM: 15,
      CLUSTER_RADIUS: 50,
    },
    STORAGE_KEYS: {
      AUTH_TOKEN: '@auth_token',
      USER_DATA: '@user_data',
      LOCATIONS: '@locations',
      SETTINGS: '@settings',
    },
    API: {
      TIMEOUT: 10000,
      RETRY_ATTEMPTS: 3,
    },
  };