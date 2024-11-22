// app.config.js
export default {
  expo: {
    name: 'Memory Map',
    slug: 'memory-map',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      "**/*"
    ],
    
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: 'com.anonymous.memorymap',
    },
    web: {
      bundler: 'metro',
      favicon: './assets/favicon.png'
    },
    experiments: {
      tsconfigPaths: true,
      typedRoutes: true
    }
  }
};