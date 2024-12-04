import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../src/components/shared/Input';

describe('Input Component', () => {
  const defaultProps = {
    type: 'text',
    placeholder: 'Test Input',
    value: '',
    onChange: jest.fn(),
  };

  it('renders with correct default styles', () => {
    const { container } = render(<Input {...defaultProps} />);
    const input = container.querySelector('input');
    expect(input).toHaveClass(
      'w-full',
      'px-4',
      'py-3',
      'rounded-lg',
      'bg-white',
      'dark:bg-gray-700',
      'text-gray-900',
      'dark:text-white'
    );
  });

  it('renders with correct type', () => {
    const { container } = render(<Input {...defaultProps} type="password" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('handles onChange events', () => {
    const { container } = render(<Input {...defaultProps} />);
    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    const { container } = render(<Input {...defaultProps} className={customClass} />);
    const input = container.querySelector('input');
    expect(input).toHaveClass(customClass);
  });

  it('renders with placeholder text', () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} />);
    expect(getByPlaceholderText('Test Input')).toBeInTheDocument();
  });

  it('applies dark mode styles', () => {
    const { container } = render(<Input {...defaultProps} />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('dark:bg-gray-700', 'dark:text-white');
  });
});
