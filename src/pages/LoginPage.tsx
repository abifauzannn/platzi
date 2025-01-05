import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header";
import Footer from "../components/Footer";

const LoginPage = () => {
  const { login } = useAuth(); // Mengambil fungsi login dari AuthContext
  const [email, setEmail] = useState(""); // State untuk email
  const [password, setPassword] = useState(""); // State untuk password
  const [loading, setLoading] = useState(false); // State untuk loading indicator
  const [error, setError] = useState(""); // State untuk pesan kesalahan
  const navigate = useNavigate(); // Menginisialisasi useNavigate hook

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!email || !password) {
      setError("Email and password are required.");
      return; // Menghentikan pengiriman form jika validasi gagal
    }

    setError(""); // Menghapus pesan kesalahan sebelumnya
    setLoading(true); // Menampilkan loading indicator

    try {
      await login(email, password);
      console.log("Login successful");

      // Mengarahkan pengguna ke halaman utama setelah login berhasil
      navigate("/");
    } catch (error) {
      console.error("Login failed");
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false); // Menyembunyikan loading indicator setelah proses selesai
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      <main className="flex flex-1 items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 shadow-lg rounded-md w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome Back
          </h2>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email" // Menggunakan type email untuk validasi bawaan browser
              id="email"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Mengatur state email
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
              onChange={(e) => setPassword(e.target.value)} // Mengatur state password
            />
          </div>

          {/* Menampilkan pesan kesalahan jika ada */}
          {error && (
            <div className="mb-4 text-red-500 text-center font-semibold">
              {error}
            </div>
          )}

          {/* Tombol login */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
            disabled={loading} // Menonaktifkan tombol saat loading
          >
            {loading ? (
              <div className="text-center">
                <div className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-sm text-gray-600 text-center mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;
