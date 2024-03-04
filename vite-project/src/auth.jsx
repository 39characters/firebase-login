import { app } from './firebase/config';
import 'firebase/auth';

export const signInWithEmailAndPassword = async (email, password) => {
  const auth = app.auth();

  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log('User signed in successfully.');
  } catch (error) {
    throw error;
  }
};