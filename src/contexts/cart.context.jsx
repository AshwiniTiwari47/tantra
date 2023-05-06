import { createContext, useContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartOpenValue = { isCartOpen, setIsCartOpen };
  return (
    <CartContext.Provider value={cartOpenValue}>
      {children}
    </CartContext.Provider>
  );
};
