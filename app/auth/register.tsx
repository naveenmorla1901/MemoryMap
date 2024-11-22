// app/(auth)/register.tsx
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
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

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  // app/(auth)/register.tsx
  const onSubmit = async (data: RegisterCredentials) => {
    try {
      setIsLoading(true);
      const user = await firebaseService.registerUser({
        email: data.email,
        password: data.password,
        name: data.name
      });
      
      const userCredential = await firebaseService.loginUser({
        email: data.email,
        password: data.password
      });
      
      const token = await userCredential.user.getIdToken();
      
      setUser(user);
      setToken(token);
      router.replace('/(app)');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledView className="flex-1 p-6">
      <StyledView className="items-center mb-10">
        <Logo />
        <StyledText className="text-2xl font-bold mt-4">Create Account</StyledText>
        <StyledText className="text-gray-500 mt-2">Sign up to get started</StyledText>
      </StyledView>

      {/* Name Input */}
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

      {/* Email Input */}
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

      {/* Password Inputs */}
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

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg mb-4"
        onPress={handleSubmit(onSubmit)}
      >
        <StyledText className="text-white text-center font-semibold text-lg">
          Create Account
        </StyledText>
      </TouchableOpacity>

      <StyledView className="flex-row justify-center">
        <StyledText className="text-gray-600">Already have an account? </StyledText>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <StyledText className="text-blue-500 font-semibold">Sign In</StyledText>
        </TouchableOpacity>
      </StyledView>
    </StyledView>
  );
}