import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import '../styles/auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEmailAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
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
    setIsSignUp
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="mountains absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-purple-900 opacity-30">
            <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,266.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Auth Forms */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-[400px] backdrop-blur-lg bg-white/10 p-8 rounded-3xl shadow-lg transition-all duration-300 transform ${!isSignUp ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} border border-white/20`}>
          <LoginForm {...formProps} />
        </div>

        <div className={`absolute w-full max-w-[400px] backdrop-blur-lg bg-white/10 p-8 rounded-3xl shadow-lg transition-all duration-300 transform ${isSignUp ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} border border-white/20`}>
          <SignupForm {...formProps} />
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 max-w-md p-4 bg-red-500/10 backdrop-blur-lg border border-red-500/20 text-white rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
