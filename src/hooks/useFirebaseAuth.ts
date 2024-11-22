// src/hooks/useFirebaseAuth.ts
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/store/auth';
import { firebaseService } from '@/services/firebase';
import { User } from '@/types/auth';  // Import User type from auth types

export function useFirebaseAuth() {
  const { setUser, setToken, setLoading, setError } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    
    const unsubscribe = onAuthStateChanged(auth, 
      async (firebaseUser) => {
        try {
          if (firebaseUser) {
            const token = await firebaseUser.getIdToken();
            const userProfile = await firebaseService.getUserProfile(firebaseUser.uid);
            
            if (userProfile) {
                const user: User = {
                  id: firebaseUser.uid,
                  email: userProfile.email,
                  name: userProfile.name,
                  avatar: userProfile.avatar,
                  createdAt: userProfile.createdAt,
                  updatedAt: userProfile.updatedAt || userProfile.createdAt, // Added updatedAt property
                };
              setToken(token);
              setUser(user);
            }
          } else {
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Authentication error');
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);
}