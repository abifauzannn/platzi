import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";

const CartIcon = () => {
  const { cart } = useCart();
  const [itemCount, setItemCount] = useState(0);

  // Cek jika cart ada di localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      // Jika ada cart di localStorage, hitung jumlah item
      const cartItems = JSON.parse(savedCart);
      const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setItemCount(totalItems);
    } else {
      // Jika tidak ada cart, set itemCount ke 0
      setItemCount(0);
    }
  }, [cart]); // Memastikan pengecekan dilakukan setiap kali cart berubah

  return (
    <Link to="/cart" className="relative">
      <CiShoppingCart size={30} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
