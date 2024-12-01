import React from 'react';
import { render, screen } from '@testing-library/react';
import Auth from '../../src/components/Auth';

// Mock the LoginForm component
jest.mock('../../src/components/auth/LoginForm', () => {
  return function MockLoginForm() {
    return <div data-testid="login-form">Login Form</div>;
  };
});

// Mock Firebase config
jest.mock('../../src/config/firebase');

describe('Auth Component', () => {
  it('renders the auth container with correct styles', () => {
    const { container } = render(<Auth />);
    const authContainer = container.firstChild;
    expect(authContainer).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center');
  });

  it('renders with the correct card styles', () => {
    const { container } = render(<Auth />);
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

  it('renders the login form', () => {
    render(<Auth />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
