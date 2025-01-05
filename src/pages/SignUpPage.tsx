import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validasi form
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
  
    setError(""); // Clear previous error message
    setLoading(true); // Show loading indicator
  
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar: "https://picsum.photos/800", // Default avatar value
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
  
      setSuccess("Account created successfully!"); // Show success message
      setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      console.error("Sign up failed:", error);
      setError("Sign up failed. Please try again.");
    } finally {
      setLoading(false); // Hide loading indicator after process
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-1 items-center justify-center mt-10">
        <form
          onSubmit={handleSignUp}
          className="bg-white p-8 shadow-lg rounded-md w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Create Account
          </h2>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-center font-semibold">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 text-green-500 text-center font-semibold">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
            disabled={loading}
          >
            {loading ? (
              <div className="text-center">
                <div className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
