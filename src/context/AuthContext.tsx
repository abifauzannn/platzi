import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axioxInstance"; // Sesuaikan dengan instance axios Anda
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Memastikan kita tahu kapan autentikasi sedang diproses
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    console.log("Token di localStorage:", token); // Debug: Cek token di localStorage

    if (token) {
      setIsAuthenticated(true); // Jika token ada, set authenticated menjadi true
    } else {
      setIsAuthenticated(false); // Jika tidak ada token, set authenticated menjadi false
    }

    setIsLoading(false); // Setelah pengecekan selesai, update loading state
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { access_token, refresh_token } = response.data;

      if (access_token && refresh_token) {
        // Simpan token di localStorage jika login berhasil
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        setIsAuthenticated(true);
        navigate("/"); // Redirect ke halaman utama setelah login
      } else {
        console.error("Tokens tidak diterima");
      }
    } catch (error) {
      console.error("Login gagal", error);
    }
  };

  const logout = () => {
    // Hapus token dan cart saat logout
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("cart"); // Hapus cart dari localStorage
    setIsAuthenticated(false);
    navigate("/login");
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};
