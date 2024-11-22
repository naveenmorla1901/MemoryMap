// webpack.config.js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['react-hook-form']
    },
  }, argv);

  // Add custom configs
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      ...config.resolve.fallback,
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
    }
  };

  return config;
};