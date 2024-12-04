import PropTypes from 'prop-types'

const Input = ({ type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      className={`
        w-full px-4 py-3 rounded-lg 
        bg-white dark:bg-gray-700 
        border border-gray-300 dark:border-gray-600
        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        text-gray-900 dark:text-white 
        placeholder-gray-500 dark:placeholder-gray-400
        ${className}
      `}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string
};

export default Input;
