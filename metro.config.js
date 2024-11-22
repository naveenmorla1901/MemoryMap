// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

// Modify the config
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json', 'cjs', 'mjs'];
config.resolver.assetExts = ['png', 'jpg', 'jpeg', 'gif', 'svg'];

// Add additional module directories
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;