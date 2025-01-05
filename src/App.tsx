import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import { useAuth } from "./context/AuthContext";
import ProductDetail from "./pages/ProductDetail";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default App;
