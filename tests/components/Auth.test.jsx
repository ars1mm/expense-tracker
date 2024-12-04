import React from 'react'; // eslint-disable-line no-unused-vars
import { render, fireEvent, screen } from '@testing-library/react';
import Auth from '../../src/components/Auth';

// Mock the LoginForm and SignupForm components
jest.mock('../../src/components/auth/LoginForm', () => {
  return function MockLoginForm() {
    return <div data-testid="login-form">Login Form</div>;
  };
});

jest.mock('../../src/components/auth/SignupForm', () => {
  return function MockSignupForm() {
    return <div data-testid="signup-form">Signup Form</div>;
  };
});

// Mock Firebase config and auth functions
jest.mock('../../src/config/firebase', () => ({
  auth: {},
  googleProvider: {}
}));

jest.mock('firebase/auth', () => ({
  signInWithPopup: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn()
}));

describe('Auth Component', () => {
  const defaultProps = {
    user: null,
    setUser: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the auth container with correct styles', () => {
    const { container } = render(<Auth {...defaultProps} />);
    const authContainer = container.querySelector('.min-h-screen');
    expect(authContainer).toHaveClass(
      'min-h-screen',
      'flex',
      'items-center',
      'justify-center',
      'p-4'
    );
  });

  it('renders login form by default', () => {
    render(<Auth {...defaultProps} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('renders signup button when in login mode', () => {
    render(<Auth {...defaultProps} />);
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  it('switches to signup form when signup button is clicked', () => {
    render(<Auth {...defaultProps} />);
    fireEvent.click(screen.getByTestId('signup-button'));
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('renders user info and sign out button when user is logged in', () => {
    const user = {
      email: 'test@example.com',
      displayName: 'Test User',
    };
    render(<Auth {...defaultProps} user={user} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByText('Expense Dashboard')).toBeInTheDocument();
  });

  it('renders email when displayName is not available', () => {
    const user = {
      email: 'test@example.com',
    };
    render(<Auth {...defaultProps} user={user} />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('renders user avatar when photoURL is available', () => {
    const user = {
      email: 'test@example.com',
      photoURL: 'https://example.com/avatar.jpg',
    };
    render(<Auth {...defaultProps} user={user} />);
    const avatar = screen.getByAltText('Profile');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders with the correct card styles', () => {
    const { container } = render(<Auth {...defaultProps} />);
    const card = container.querySelector('[class*="bg-white"]');
    expect(card).toHaveClass(
      'w-full',
      'max-w-[500px]',
      'mx-4',
      'bg-white',
      'dark:bg-gray-800',
      'p-6',
      'sm:p-8',
      'rounded-lg',
      'shadow-lg',
      'transition-all',
      'duration-300',
      'transform',
      'scale-100'
    );
  });
});
