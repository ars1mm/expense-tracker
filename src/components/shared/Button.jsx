import PropTypes from 'prop-types'

const Button = ({ children, onClick, variant = "primary", className = "", ...props }) => {
  const baseStyles = `
    w-full py-3 rounded-lg transition-colors duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-blue-600 hover:bg-blue-700 
      text-white font-medium
      focus:ring-blue-500
      dark:bg-blue-500 dark:hover:bg-blue-600
    `,
    black: `
      bg-gray-900 hover:bg-gray-800 
      text-white font-medium
      focus:ring-gray-500
      dark:bg-gray-800 dark:hover:bg-gray-700
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'black']),
  className: PropTypes.string
};

export default Button;
