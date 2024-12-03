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

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setUser(result.user);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUser(result.user);
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
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
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-screen min-h-screen bg-[#4169E1] dark:bg-gray-900 flex items-center justify-center transition-colors">
            {/* Login/Signup Card */}
            <div className={`w-[500px] bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-all duration-300 transform ${isSignUp ? 'scale-0 absolute' : 'scale-100'}`}>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                Login
              </h2>
              <LoginForm {...formProps} />
            </div>

            <div className={`w-[500px] bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-all duration-300 transform ${!isSignUp ? 'scale-0 absolute' : 'scale-100'}`}>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                Signup
              </h2>
              <SignupForm {...formProps} />
            </div>
          </div>

          {error && (
            <div className="absolute bottom-4 right-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
              {error}
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
