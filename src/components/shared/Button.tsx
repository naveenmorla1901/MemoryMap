// src/components/shared/Button.tsx
import React from 'react';
import { Pressable, Text, ActivityIndicator, PressableProps, ViewStyle, TextStyle, View } from 'react-native';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

interface ButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = React.forwardRef<typeof Pressable, ButtonProps>(({
  title,
  isLoading = false,
  variant = 'primary',
  style,
  textStyle,
  ...props
}, ref) => {
  const baseClassName = `p-4 rounded-lg ${variant === 'primary' ? 'bg-blue-500' : 'bg-gray-200'}`;
  const textClassName = `text-center font-semibold ${variant === 'primary' ? 'text-white' : 'text-gray-800'}`;

  return (
    <StyledPressable
      ref={ref as React.Ref<View>} // Change ref type to Ref<View>
      className={baseClassName}
      style={style}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : 'black'} />
      ) : (
        <StyledText className={textClassName} style={textStyle}>
          {title}
        </StyledText>
      )}
    </StyledPressable>
  );
});

Button.displayName = 'Button';