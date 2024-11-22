// src/hooks/useAuth.ts
// src/hooks/useAuth.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useAuthStore } from '@/store/slices/authSlice';
import { View, Text } from 'react-native'; // Add View import

// Define the necessary types
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthApiResponse {
  user: User;
  token: string;
  message?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

interface MutationResult<T> {
  isLoading: boolean;
  error: Error | null;
  mutate: (variables: T) => Promise<void>;
}
export function useAuth() {
    const { setUser, setToken } = useAuthStore();
  
    const userQuery = useQuery({
      queryKey: ['user'],
      queryFn: async () => {
        try {
          const response = await apiService.get<AuthApiResponse>('/auth/me');
          if (response.user) {
            setUser(response.user);
          }
          return response;
        } catch (error) {
          setUser(null);
          throw error;
        }
      },
      enabled: false, // Only fetch when needed
      retry: false,
    });
  
    const loginMutation = useMutation({
      mutationFn: async (credentials: LoginCredentials) => {
        const response = await apiService.post<AuthApiResponse>('/auth/login', credentials);
        if (response.user && response.token) {
          setUser(response.user);
          setToken(response.token);
        }
        return response;
      },
    });

    const registerMutation = useMutation({
        mutationFn: async (credentials: RegisterCredentials) => {
          const response = await apiService.post<AuthApiResponse>('/auth/register', credentials);
          if (response.user && response.token) {
            setUser(response.user);
            setToken(response.token);
          }
          return response;
        },
      });
    
      const logout = async () => {
        try {
          await apiService.post('/auth/logout', {});
          setUser(null);
          setToken(null);
        } catch (error) {
          console.error('Logout error:', error);
          throw error;
        }
      };

      return {
        user: userQuery.data?.user ?? null,
        isLoading: userQuery.isLoading,
        error: userQuery.error,
        refetch: userQuery.refetch,
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout,
        isLoginLoading: loginMutation.isPending,
        isRegisterLoading: registerMutation.isPending,
        loginError: loginMutation.error,
        registerError: registerMutation.error,
      };
    }
