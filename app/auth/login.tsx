// app/(auth)/login.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/auth';
import { firebaseService } from '@/services/firebase';
import { Logo } from '@/components/shared/Logo';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);
const StyledPressable = styled(Pressable);

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
    const router = useRouter();
    const { setUser, setToken } = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

    const onSubmit = async (data: LoginForm) => {
        try {
        setIsLoading(true);
        const userCredential = await firebaseService.loginUser({
            email: data.email,
            password: data.password
        });
        
        const token = await userCredential.user.getIdToken();
        const userProfile = await firebaseService.getUserProfile(userCredential.user.uid);
        
        if (userProfile) {
            setUser(userProfile);
            setToken(token);
            router.replace('/(app)');
        }
        } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed';
        console.error(errorMessage);
        } finally {
        setIsLoading(false);
        }
    };

  return (
    <StyledView className="flex-1 p-6">
      <StyledView className="items-center mb-10">
        <Logo />
        <StyledText className="text-2xl font-bold mt-4">Welcome Back</StyledText>
        <StyledText className="text-gray-500 mt-2">Sign in to continue</StyledText>
      </StyledView>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <StyledView className="mb-4">
            <StyledText className="text-gray-700 mb-2">Email</StyledText>
            <StyledInput
              className="bg-gray-100 p-4 rounded-lg"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
            {errors.email && (
              <StyledText className="text-red-500 mt-1">{errors.email.message}</StyledText>
            )}
          </StyledView>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <StyledView className="mb-6">
            <StyledText className="text-gray-700 mb-2">Password</StyledText>
            <StyledInput
              className="bg-gray-100 p-4 rounded-lg"
              placeholder="Enter your password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
            {errors.password && (
              <StyledText className="text-red-500 mt-1">{errors.password.message}</StyledText>
            )}
          </StyledView>
        )}
      />

      {/* ... form fields ... */}

      <StyledPressable
        className="bg-blue-500 p-4 rounded-lg mb-4"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <StyledText className="text-white text-center font-semibold text-lg">
            Sign In
          </StyledText>
        )}
      </StyledPressable>

      <StyledPressable
        onPress={() => router.push('/auth/forgot-password')}
        className="mb-6"
      >
        <StyledText className="text-blue-500 text-center">
          Forgot Password?
        </StyledText>
      </StyledPressable>

      <StyledView className="flex-row justify-center">
        <StyledText className="text-gray-600">Don't have an account? </StyledText>
        <StyledPressable onPress={() => router.push('/auth/register')}>
          <StyledText className="text-blue-500 font-semibold">Sign Up</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
}