// src/services/firebase.ts
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  UserCredential 
} from 'firebase/auth';
import { 
  doc, 
  setDoc,
  getDoc,
  Timestamp 
} from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { User, LoginCredentials, RegisterCredentials } from '@/types/auth';

export const firebaseService = {
  async loginUser(credentials: LoginCredentials): Promise<UserCredential> {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(auth, email, password);
  },

  async registerUser(credentials: RegisterCredentials): Promise<User> {
    const { email, password, name } = credentials;
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const user: User = {
      id: userCredential.user.uid,
      email: email,
      name: name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save user data to Firestore
    await setDoc(doc(db, 'users', user.id), {
      email: user.email,
      name: user.name,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date())
    });

    return user;
  },

  async getUserProfile(userId: string): Promise<User | null> {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const data = docSnap.data();
    return {
      id: userId,
      email: data.email,
      name: data.name,
      avatar: data.avatar,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString()
    };
  },

  async logout(): Promise<void> {
    return signOut(auth);
  }
};