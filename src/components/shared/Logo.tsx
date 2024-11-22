// src/components/shared/Logo.tsx
import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface LogoProps {
  style?: ViewStyle;
}

export function Logo({ style }: LogoProps) {
  return (
    <StyledView className="w-20 h-20 bg-blue-500 rounded-2xl items-center justify-center" style={style}>
      <StyledText className="text-white text-3xl font-bold">M</StyledText>
    </StyledView>
  );
}