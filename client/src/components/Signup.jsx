import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // Pre-generate random values for bubbles to ensure they remain consistent
  const bubbleAnimations = [...Array(12)].map(() => ({
    size: Math.floor(Math.random() * 8) + 3,
    positionTop: Math.random() * 100,
    positionLeft: Math.random() * 100,
    moveY: Math.random() * 20 - 10,
    moveX: Math.random() * 20 - 10,
    duration: 5 + Math.random() * 5
  }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!fullName || !email || !password) {
      setIsLoading(false);
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setIsLoading(false);
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      navigate("/get-started/step1");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message.includes("email-already-in-use") 
        ? "This email is already registered. Please use a different email or login." 
        : "Failed to create account. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/get-started/step1");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-blue-50 px-6 py-12">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated bubbles with pre-computed values */}
        {bubbleAnimations.map((bubble, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-20"
            style={{ 
              width: `${bubble.size}rem`,
              height: `${bubble.size}rem`,
              top: `${bubble.positionTop}%`, 
              left: `${bubble.positionLeft}%`,
              filter: "blur(1px)" 
            }}
            animate={{
              y: [0, bubble.moveY],
              x: [0, bubble.moveX],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
        
        {/* Design accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      {/* Logo/Nav */}
      <Link to="/" className="absolute top-8 left-8 z-10">
        <motion.h1 
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          opport<span className="font-extrabold">UNITY</span>
        </motion.h1>
      </Link>

      {/* Signup Form */}
      <motion.div
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10 border border-gray-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </motion.div>

        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text">
          Create Account
        </motion.h2>
        
        <motion.p variants={itemVariants} className="text-gray-600 text-center mb-6">
          Join us to discover your perfect opportunities
        </motion.p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        <motion.form variants={containerVariants} className="space-y-5" onSubmit={handleSignup}>
          {/* Full Name */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Create My Account"
              )}
            </button>
          </motion.div>
        </motion.form>

        {/* Divider */}
        <motion.div variants={itemVariants} className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </motion.div>

        {/* Google Sign In */}
        <motion.div variants={itemVariants}>
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 border border-gray-300 rounded-xl shadow-sm flex items-center justify-center text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
              />
              <path
                fill="#34A853"
                d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z"
              />
              <path
                fill="#FBBC05"
                d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98c-.8 1.61-1.26 3.43-1.26 5.38s.46 3.77 1.26 5.38l3.98-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12.255 5.04c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            Sign up with Google
          </button>
        </motion.div>

        {/* Login Link */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium">
              Log in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;