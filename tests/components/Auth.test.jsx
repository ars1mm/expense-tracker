import React from 'react'; // eslint-disable-line no-unused-vars
import { render, fireEvent, screen } from '@testing-library/react';
import Auth from '../../src/components/Auth';

// Mock the LoginForm component
// eslint-disable-next-line no-undef
jest.mock('../../src/components/auth/LoginForm', () => {
  return function MockLoginForm() {
    return <div data-testid="login-form">Login Form</div>;
  };
});

// Mock Firebase config
jest.mock('../../src/config/firebase');

describe('Auth Component', () => {
  const defaultProps = {
    user: null,
    setUser: jest.fn(),
  };

  it('renders the auth container with correct styles', () => {
    const { container } = render(<Auth {...defaultProps} />);
    const authContainer = container.firstChild;
    expect(authContainer).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center');
  });

  it('renders login form by default', () => {
    const { getByRole } = render(<Auth {...defaultProps} />);
    expect(getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('switches between login and signup forms', () => {
    const { getByRole, getByTestId } = render(<Auth {...defaultProps} />);
    
    // Click signup link
    fireEvent.click(getByTestId('signup-button'));
    expect(getByRole('heading', { name: 'Signup' })).toBeInTheDocument();
    
    // Click login link
    fireEvent.click(getByTestId('login-button'));
    expect(getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('renders user info when user is provided', () => {
    const user = {
      email: 'test@example.com',
      displayName: 'Test User',
    };
    const { getByText } = render(<Auth {...defaultProps} user={user} />);
    expect(getByText('Test User')).toBeInTheDocument();
  });

  it('renders sign out button when user is logged in', () => {
    const user = {
      email: 'test@example.com',
    };
    const { getByText } = render(<Auth {...defaultProps} user={user} />);
    expect(getByText('Sign Out')).toBeInTheDocument();
  });

  it('renders the login form', () => {
    render(<Auth {...defaultProps} />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('renders with the correct card styles', () => {
    const { container } = render(<Auth {...defaultProps} />);
    const card = container.querySelector('[class*="bg-white"]');
    expect(card).toHaveClass(
      'w-[500px]',
      'bg-white',
      'p-8',
      'rounded-lg',
      'shadow-lg',
      'transition-all',
      'duration-300',
      'transform',
      'scale-100'
    );
  });
});
