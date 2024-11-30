import Button from "../shared/Button";
import Input from "../shared/Input";

const SignupForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleEmailAuth,
  signInWithGoogle,
  setIsSignUp,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <Button onClick={handleEmailAuth}>Signup</Button>
      <p className="text-center text-gray-600">
        Already have an account?{' '}
        <button
          onClick={() => setIsSignUp(false)}
          className="text-blue-500 hover:text-blue-600"
        >
          Login
        </button>
      </p>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or</span>
        </div>
      </div>
      <Button onClick={signInWithGoogle} variant="black">
        <div className="flex items-center justify-center gap-2">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Login with Google</span>
        </div>
      </Button>
    </div>
  );
};

export default SignupForm;
