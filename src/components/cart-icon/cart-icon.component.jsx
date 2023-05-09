import "./cart-icon.styles.scss";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  const { cartItems } = useContext(CartContext);
  let totalItemCount = 0;

  cartItems.forEach((item) => {
    totalItemCount = totalItemCount + item.quantity;
  });

  return (
    // <div className="cart-icon-container" onClick={toggleIsCartOpen}>
    <div className="cart-icon-container" onMouseEnter={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalItemCount}</span>
    </div>
  );
};
export default CartIcon;
