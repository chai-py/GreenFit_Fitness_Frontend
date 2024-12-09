import React, { createContext, useState, useContext } from 'react';

// Create a Context for the Cart
const CartContext = createContext();

// CartProvider component to provide the cart state and functions
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addItemToCart = (name, price, category, image, title) => {
    const newItem = { name, price, category, image, title };
    setCart((prevCart) => [...prevCart, newItem]); // Add the item to the cart
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};