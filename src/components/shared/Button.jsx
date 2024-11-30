const Button = ({ children, onClick, variant = "primary", className = "", ...props }) => {
  const baseStyles = "w-full py-3 rounded-lg transition-colors";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    black: "bg-black text-white hover:bg-opacity-90",
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

export default Button;
