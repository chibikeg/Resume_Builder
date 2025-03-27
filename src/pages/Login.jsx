import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen flex">
      
      {/* Left Section - Welcome Message */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center p-10">
        <img src="/logo.svg" alt="Logo" className="w-20 mb-6" />
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="text-lg text-gray-200 mt-4">Sign in to continue and access your professional tools.</p>
        <img src="https://source.unsplash.com/400x300/?team,work" alt="Welcome" className="mt-6 rounded-lg shadow-lg" />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Sign In</h2>
          <p className="text-center text-gray-600 text-sm mt-2">Welcome back! Please enter your details.</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mt-4 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center border rounded-md shadow-sm">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border-none focus:ring-0 focus:outline-none text-gray-900"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="px-3" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium shadow-md transition"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Social Login */}
            <div className="text-center text-gray-500 text-sm my-4">Or continue with</div>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 bg-white shadow-md hover:bg-gray-100">
                <FaGoogle className="text-red-500 mr-2" /> Google
              </button>
              <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 bg-white shadow-md hover:bg-gray-100">
                <FaFacebook className="text-blue-500 mr-2" /> Facebook
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-blue-600 font-medium hover:underline">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
