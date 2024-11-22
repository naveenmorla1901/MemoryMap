// src/components/shared/GenerateAssets.tsx
// You can use this component temporarily to generate placeholder assets
import React from 'react';
import Svg, { Rect, Circle, Text } from 'react-native-svg';

export const IconImage = () => (
  <Svg width="1024" height="1024" viewBox="0 0 1024 1024">
    <Rect width="1024" height="1024" fill="#2563EB" />
    <Circle cx="512" cy="512" r="256" fill="white" />
    <Text
      x="512"
      y="512"
      fontSize="400"
      fill="#2563EB"
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      M
    </Text>
  </Svg>
);

export const SplashImage = () => (
  <Svg width="2048" height="2048" viewBox="0 0 2048 2048">
    <Rect width="2048" height="2048" fill="white" />
    <Circle cx="1024" cy="1024" r="512" fill="#2563EB" />
    <Text
      x="1024"
      y="1024"
      fontSize="800"
      fill="white"
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      M
    </Text>
  </Svg>
);