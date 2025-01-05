// index.tsx or entry point
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App"; // Main App component
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
