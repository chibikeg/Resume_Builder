import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/resumeLOgo.png"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) return setError("Passwords do not match.");
    if (!agreeTerms) return setError("You must agree to the Terms & Conditions.");

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/dashboard");
    } catch {
      setError("Failed to create an account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen flex">
      
      {/* Left Section - Welcome Message */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center p-10">
        <img src={logo} alt="Logo" className="w-20 mb-6" />
        <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
        <p className="text-lg text-gray-200 mt-4">Join us and create professional resumes & cover letters in minutes.</p>
        <img src="https://source.unsplash.com/400x300/?team,work" alt="Welcome" className="mt-6 rounded-lg shadow-lg" />
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Create Your Account</h2>
          <p className="text-center text-gray-600 text-sm mt-2">Join us and start your journey!</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mt-4 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center border rounded-md shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border-none focus:ring-0 focus:outline-none text-gray-900"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="px-3" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="flex items-center border rounded-md shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border-none focus:ring-0 focus:outline-none text-gray-900"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="button" className="px-3" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <label className="text-sm text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium shadow-md transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Social Signup */}
            <div className="text-center text-gray-500 text-sm my-4">Or sign up with</div>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 bg-white shadow-md hover:bg-gray-100">
                <FaGoogle className="text-red-500 mr-2" /> Google
              </button>
              <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 bg-white shadow-md hover:bg-gray-100">
                <FaFacebook className="text-blue-500 mr-2" /> Facebook
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
