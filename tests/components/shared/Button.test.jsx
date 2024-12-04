import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../src/components/shared/Button';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Test Button',
    onClick: jest.fn(),
  };

  it('renders children correctly', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    expect(getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    fireEvent.click(getByText('Test Button'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('applies variant styles correctly', () => {
    const { container } = render(<Button {...defaultProps} variant="black" />);
    const button = container.firstChild;
    expect(button).toHaveClass('bg-gray-900', 'text-white');
    expect(button).toHaveClass('dark:bg-gray-800');
  });

  it('renders with correct default styles', () => {
    const { container } = render(<Button {...defaultProps} />);
    const button = container.firstChild;
    expect(button).toHaveClass(
      'w-full',
      'py-3',
      'rounded-lg',
      'transition-colors',
      'bg-blue-600',
      'text-white'
    );
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    const { container } = render(<Button {...defaultProps} className={customClass} />);
    const button = container.firstChild;
    expect(button).toHaveClass(customClass);
  });

  it('applies disabled styles when disabled', () => {
    const { container } = render(<Button {...defaultProps} disabled />);
    const button = container.firstChild;
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
  });
});
