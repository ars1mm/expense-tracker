import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../src/components/shared/Button';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Test Button',
    onClick: jest.fn(),
    variant: 'primary',
  };

  it('renders correctly with default props', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByText('Test Button');
    expect(button).toBeInTheDocument();
  });

  it('handles onClick events', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByText('Test Button');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('applies variant styles correctly', () => {
    const { container } = render(<Button {...defaultProps} variant="black" />);
    const button = container.firstChild;
    expect(button).toHaveClass('bg-black', 'text-white');
  });

  it('applies custom className correctly', () => {
    const { container } = render(
      <Button {...defaultProps} className="custom-class" />
    );
    const button = container.firstChild;
    expect(button).toHaveClass('custom-class');
  });

  it('renders with correct default styles', () => {
    const { container } = render(<Button {...defaultProps} />);
    const button = container.firstChild;
    expect(button).toHaveClass(
      'w-full',
      'py-3',
      'rounded-lg',
      'transition-colors',
      'bg-blue-500',
      'text-white'
    );
  });
});
