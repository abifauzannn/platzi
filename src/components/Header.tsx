import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import { useAuth } from "../context/AuthContext"; // Import useAuth

interface HeaderProps {
  title?: string;
  showCartIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = "ShopSmart", showCartIcon = true }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Akses status dan fungsi logout

  const handleLogout = () => {
    logout(); // Memanggil fungsi logout dari context
    navigate("/login"); // Arahkan pengguna ke halaman login setelah logout
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-3xl font-extrabold text-black">
          {title}
        </Link>
        <div className="flex gap-6 items-center">
          {/* Jika sudah login, tampilkan tombol Log Out */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-lg font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
          )}
          {showCartIcon && <CartIcon />}
        </div>
      </div>
    </header>
  );
};

export default Header;
