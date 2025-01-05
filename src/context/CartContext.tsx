import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem, quantity?: number) => void; // Tambahkan parameter quantity opsional
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void; // Fungsi baru untuk mengurangi quantity
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedCart = localStorage.getItem("cart");

    if (!token) {
      setCart([]); // Jika tidak ada token, set cart menjadi kosong
    } else {
      setCart(savedCart ? JSON.parse(savedCart) : []); // Jika ada token, ambil cart dari localStorage
    }
  }, []);

  const addToCart = (product: CartItem, quantity: number = 1) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity; // Tambahkan quantity jika item sudah ada
    } else {
      updatedCart.push({ ...product, quantity }); // Tambahkan item baru dengan quantity
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Simpan cart di localStorage
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === id);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1; // Kurangi quantity jika lebih dari 1
      } else {
        // Hapus item jika quantity 1
        const filteredCart = updatedCart.filter((item) => item.id !== id);
        setCart(filteredCart);
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        return;
      }

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update cart di localStorage
    }
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update cart di localStorage
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // Hapus cart di localStorage
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
