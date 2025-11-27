import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function Usecart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // <-- NEW

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// import React, { createContext, useContext, useState } from "react";

// // Create Context
// const CartContext = createContext();

// // Custom hook for easy usage
// export function Usecart() {
//   return useContext(CartContext);
// }

// // Provider component
// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   // Total count
//   const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   const addToCart = (product) => {
//     const existing = cartItems.find((item) => item.id === product.id);
//     if (existing) {
//       setCartItems(
//         cartItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (id) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, cartCount, addToCart, removeFromCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }
