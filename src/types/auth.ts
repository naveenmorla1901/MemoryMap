// src/types/auth.ts
export interface User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface FirebaseUserCredential {
    user: {
      uid: string;
      email: string;
      getIdToken(): Promise<string>;
    }
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    name: string;
  }