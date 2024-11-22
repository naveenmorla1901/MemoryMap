// app/(auth)/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/shared/Button';
import { useAuthStore } from '@/store/auth';
import { firebaseService } from '@/services/firebase';
import { Logo } from '@/components/shared/Logo';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);
const StyledPressable = styled(Pressable);

// Define the registration form schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Register the user
      const user = await firebaseService.registerUser({
        email: data.email,
        password: data.password,
        name: data.name
      });

      // Get auth token
      const userCredential = await firebaseService.loginUser({
        email: data.email,
        password: data.password
      });
      
      const token = await userCredential.user.getIdToken();
      
      setUser(user);
      setToken(token);
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledView className="flex-1 p-6 bg-white">
      <StyledView className="items-center mb-8">
        <Logo />
        <StyledText className="text-2xl font-bold mt-4">Create Account</StyledText>
        <StyledText className="text-gray-500 mt-2">Sign up to get started</StyledText>
      </StyledView>

      {error && (
        <StyledView className="mb-4 p-3 bg-red-50 rounded-lg">
          <StyledText className="text-red-500 text-center">{error}</StyledText>
        </StyledView>
      )}

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <StyledView className="mb-4">
            <StyledText className="text-gray-700 mb-2">Full Name</StyledText>
            <StyledInput
              className="bg-gray-100 p-4 rounded-lg"
              placeholder="Enter your full name"
              value={value}
              onChangeText={onChange}
            />
            {errors.name && (
              <StyledText className="text-red-500 mt-1">{errors.name.message}</StyledText>
            )}
          </StyledView>
        )}
      />

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
          <StyledView className="mb-4">
            <StyledText className="text-gray-700 mb-2">Password</StyledText>
            <StyledInput
              className="bg-gray-100 p-4 rounded-lg"
              placeholder="Create a password"
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <StyledView className="mb-6">
            <StyledText className="text-gray-700 mb-2">Confirm Password</StyledText>
            <StyledInput
              className="bg-gray-100 p-4 rounded-lg"
              placeholder="Confirm your password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
            {errors.confirmPassword && (
              <StyledText className="text-red-500 mt-1">
                {errors.confirmPassword.message}
              </StyledText>
            )}
          </StyledView>
        )}
      />

        <Button
      title="Sign In"
      onPress={handleSubmit(onSubmit)}
      isLoading={isLoading}
      style={{ marginBottom: 16 }} // Corrected from className to style
    />

      <StyledView className="flex-row justify-center">
        <StyledText className="text-gray-600">Already have an account? </StyledText>
        <StyledPressable onPress={() => router.push('/auth/login')}>
          <StyledText className="text-blue-500 font-semibold">Sign In</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
}