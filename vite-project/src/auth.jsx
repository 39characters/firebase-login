import { app } from './firebase/config';
import 'firebase/auth';

export const signInWithNameAndPassword = async (username, password) => {
  const auth = app.auth();

  try {
    await auth.signInWithNameAndPassword(`${username}@example.com`, password);
    console.log('User signed in successfully.');
  } catch (error) {
    throw error;
  }
};
