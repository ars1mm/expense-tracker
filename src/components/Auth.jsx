import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import PropTypes from 'prop-types';

const Auth = ({ user, setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAndLogToken = async (user) => {
    if (user) {
      try {
        const token = await user.getIdToken();
        console.log('Firebase JWT Token:', token);
        const tokenResult = await user.getIdTokenResult();
        console.log('Token Data:', tokenResult);
      } catch (err) {
        console.error('Error getting token:', err);
      }
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const authFunction = isSignUp ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
      const result = await authFunction(auth, email, password);
      setUser(result.user);
      await getAndLogToken(result.user);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Auth error:', err);
      let errorMessage = 'An error occurred during authentication';
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please sign in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Please choose a stronger password.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password.';
          break;
        default:
          errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      await getAndLogToken(result.user);
    } catch (err) {
      console.error('Google sign-in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setError('');
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formProps = {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleEmailAuth,
    signInWithGoogle,
    setIsSignUp,
    loading,
    error
  };

  return (
    <>
      {user ? (
        <div className="bg-white dark:bg-gray-800 shadow-md transition-colors">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Expense Dashboard</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <span className="text-gray-700 dark:text-gray-200">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    loading ? 'animate-pulse' : ''
                  }`}
                >
                  {loading ? 'Signing out...' : 'Sign Out'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-screen min-h-screen bg-[#4169E1] dark:bg-gray-900 flex items-center justify-center transition-colors">
            <div className="w-full max-w-[500px] mx-4 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg transition-all duration-300 transform scale-100">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                Login
              </h2>
              <LoginForm {...formProps} />
            </div>

            <div className="w-full max-w-[500px] mx-4 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg transition-all duration-300 transform scale-0 absolute">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                Signup
              </h2>
              <SignupForm {...formProps} />
            </div>
          </div>

          <p className="text-center text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              data-testid={isSignUp ? 'login-button' : 'signup-button'}
              className="text-blue-500 hover:text-blue-600"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Login' : 'Signup'}
            </button>
          </p>

          {error && (
            <div className="fixed bottom-4 right-4 max-w-md p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={() => setError('')}
                    className="inline-flex text-red-400 hover:text-red-500"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

Auth.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
};

export default Auth;
