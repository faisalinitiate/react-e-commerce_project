import React from "react";
import { Usecart } from "../common/Usecart.jsx";
import { X } from "lucide-react";

export default function CartSidebar() {
  const { cartItems, isCartOpen, toggleCart, removeFromCart } = Usecart();

  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50
        transform ${isCartOpen ? "translate-x-0" : "translate-x-full"}
        transition-transform duration-300
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-5 py-4 border-b">
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
        <button onClick={toggleCart}>
          <X size={22} />
        </button>
      </div>

      {/* ITEMS */}
      <div className="p-4 space-y-4 overflow-y-auto h-[80vh]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <img src={item.image} className="w-16 h-16 object-cover rounded" />
              
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price}</p>
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <button className="w-full bg-emerald-600 text-white py-2 rounded-lg">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
