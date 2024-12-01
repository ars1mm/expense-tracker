import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../../../src/components/auth/LoginForm';

describe('LoginForm Component', () => {
  const mockProps = {
    email: '',
    setEmail: jest.fn(),
    password: '',
    setPassword: jest.fn(),
    showPassword: false,
    setShowPassword: jest.fn(),
    handleEmailAuth: jest.fn(),
    signInWithGoogle: jest.fn(),
    setIsSignUp: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form elements', () => {
    render(<LoginForm {...mockProps} />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/^Login$/)).toBeInTheDocument();
  });

  it('handles email input change', () => {
    render(<LoginForm {...mockProps} />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(mockProps.setEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('handles password input change', () => {
    render(<LoginForm {...mockProps} />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(mockProps.setPassword).toHaveBeenCalledWith('password123');
  });

  it('handles Google sign in button click', () => {
    render(<LoginForm {...mockProps} />);
    const googleButton = screen.getByText(/Login with Google/i);
    fireEvent.click(googleButton);
    expect(mockProps.signInWithGoogle).toHaveBeenCalled();
  });

  it('toggles to signup mode', () => {
    render(<LoginForm {...mockProps} />);
    const signupLink = screen.getByText(/^Signup$/);
    fireEvent.click(signupLink);
    expect(mockProps.setIsSignUp).toHaveBeenCalledWith(true);
  });

  it('renders with correct styles', () => {
    const { container } = render(<LoginForm {...mockProps} />);
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('space-y-6');
  });
});
