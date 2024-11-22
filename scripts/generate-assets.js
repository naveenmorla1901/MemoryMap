// scripts/generate-assets.js
const sharp = require('sharp');

const generateAssets = async () => {
  // Generate icon
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 37, g: 99, b: 235, alpha: 1 }
    }
  })
    .png()
    .toFile('assets/icon.png');

  // Generate splash
  await sharp({
    create: {
      width: 2048,
      height: 2048,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .png()
    .toFile('assets/splash.png');

  // Generate adaptive icon
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 37, g: 99, b: 235, alpha: 1 }
    }
  })
    .png()
    .toFile('assets/adaptive-icon.png');

  // Generate favicon
  await sharp({
    create: {
      width: 32,
      height: 32,
      channels: 4,
      background: { r: 37, g: 99, b: 235, alpha: 1 }
    }
  })
    .png()
    .toFile('assets/favicon.png');
};

generateAssets().catch(console.error);