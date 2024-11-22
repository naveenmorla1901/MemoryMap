// src/services/auth.ts
import { apiService } from './api';
import { LoginCredentials, RegisterCredentials, User } from '@/types/auth';

export const authService = {
  async login(credentials: LoginCredentials) {
    return apiService.post<{ user: User; token: string }>('/auth/login', credentials);
  },

  async register(credentials: RegisterCredentials) {
    return apiService.post<{ user: User; token: string }>('/auth/register', credentials);
  },

  async logout() {
    return apiService.post('/auth/logout', {});
  },

  async getProfile() {
    return apiService.get<User>('/auth/profile');
  },
};