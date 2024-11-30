const Input = ({ type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      className={`w-full px-4 py-3 rounded-lg bg-black bg-opacity-5 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-400 ${className}`}
      {...props}
    />
  );
};

export default Input;
