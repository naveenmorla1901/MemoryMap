// app/index.tsx (updated version)
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { styled } from 'nativewind';
import { Button } from '@/components/shared/Button';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Home() {
  return (
    <StyledView className="flex-1 bg-white">
      {/* Header */}
      <StyledView className="flex-row justify-between items-center p-6">
        <StyledText className="text-2xl font-bold text-blue-500">
          Memory Map
        </StyledText>
      </StyledView>

      {/* Main Content */}
      <StyledView className="flex-1 justify-center items-center px-6">
        <StyledView className="items-center mb-12">
          <StyledView className="w-24 h-24 bg-blue-500 rounded-2xl items-center justify-center mb-6">
            <StyledText className="text-white text-4xl font-bold">M</StyledText>
          </StyledView>
          <StyledText className="text-3xl font-bold text-center mb-2">
            Welcome to Memory Map
          </StyledText>
          <StyledText className="text-gray-600 text-center text-lg">
            Save and share your favorite places
          </StyledText>
        </StyledView>

        {/* Action Buttons */}
        <StyledView className="w-full space-y-4">
          <Button
            title="Sign In"
            variant="primary"
            onPress={() => router.push('/auth/login')}
          />
          <Button
            title="Create Account"
            variant="secondary"
            onPress={() => router.push('/auth/register')}
          />
        </StyledView>
      </StyledView>

      {/* Footer */}
      <StyledView className="p-6">
        <StyledText className="text-center text-gray-500">
          By continuing, you agree to our Terms of Service
        </StyledText>
      </StyledView>
    </StyledView>
  );
}