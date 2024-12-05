import PropTypes from 'prop-types';

const SignupForm = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  showPassword, 
  setShowPassword, 
  handleEmailAuth, 
  signInWithGoogle, 
  setIsSignUp 
}) => {
  return (
    <div>
      {/* Empty signup form template */}
    </div>
  );
};

SignupForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
  handleEmailAuth: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  setIsSignUp: PropTypes.func.isRequired,
};

export default SignupForm;
