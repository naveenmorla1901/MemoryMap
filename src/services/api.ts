// src/services/api.ts
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/api';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await api.get<ApiResponse<T>>(endpoint);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Network error');
      }
      throw error;
    }
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await api.post<ApiResponse<T>>(endpoint, data);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Network error');
      }
      throw error;
    }
  },
};

export default apiService;