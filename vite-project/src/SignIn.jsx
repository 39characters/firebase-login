import './App.css'
import React, { useState } from 'react';
import { signInWithNameAndPassword } from './auth';
import 'firebase/auth';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithNameAndPassword(username, password);
      
      setUsername('');
      setPassword('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">SignIn to Your Account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          {/* Form inputs and button */}
        </form>
      </div>
    </div>
  );
};

export default SignIn;