// app/index.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(TouchableOpacity);

export default function Home() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <StyledText className="text-2xl font-bold mb-8">
        Welcome to Memory Map
      </StyledText>
      
      <StyledView className="space-y-4">
        <Link href="/auth/login" asChild>
          <StyledButton className="bg-blue-500 px-8 py-3 rounded-lg">
            <StyledText className="text-white font-semibold text-lg">
              Login
            </StyledText>
          </StyledButton>
        </Link>

        <Link href="/auth/register" asChild>
          <StyledButton className="bg-gray-200 px-8 py-3 rounded-lg">
            <StyledText className="text-gray-800 font-semibold text-lg">
              Register
            </StyledText>
          </StyledButton>
        </Link>
      </StyledView>
    </StyledView>
  );
}