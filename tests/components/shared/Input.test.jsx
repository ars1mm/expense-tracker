import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../src/components/shared/Input';

describe('Input Component', () => {
  const defaultProps = {
    placeholder: 'Test Placeholder',
    type: 'text',
    value: '',
    onChange: jest.fn(),
    name: 'testInput'
  };

  it('renders correctly with default props', () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByPlaceholderText('Test Placeholder');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('handles onChange events', () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByPlaceholderText('Test Placeholder');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('applies className prop correctly', () => {
    const { container } = render(
      <Input {...defaultProps} className="custom-class" />
    );
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });

  it('renders with correct default styles', () => {
    const { container } = render(<Input {...defaultProps} />);
    const input = container.querySelector('input');
    expect(input).toHaveClass(
      'w-full',
      'px-4',
      'py-3',
      'rounded-lg',
      'bg-black',
      'bg-opacity-5',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:border-transparent',
      'text-black',
      'placeholder-gray-400'
    );
  });
});
