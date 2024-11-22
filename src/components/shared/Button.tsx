// src/components/shared/Button.tsx
import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  buttonClassName?: string;
  textClassName?: string;
}

export function Button({
  title,
  variant = 'primary',
  isLoading = false,
  buttonClassName = '',
  textClassName = '',
  ...props
}: ButtonProps) {
  const baseButtonClass = variant === 'primary' 
    ? 'bg-blue-500 p-4 rounded-xl' 
    : 'bg-gray-100 p-4 rounded-xl';

  const baseTextClass = variant === 'primary'
    ? 'text-white text-center text-lg font-semibold'
    : 'text-gray-900 text-center text-lg font-semibold';

  return (
    <StyledPressable
      className={`${baseButtonClass} ${buttonClassName}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : 'black'} />
      ) : (
        <StyledText className={`${baseTextClass} ${textClassName}`}>
          {title}
        </StyledText>
      )}
    </StyledPressable>
  );
}