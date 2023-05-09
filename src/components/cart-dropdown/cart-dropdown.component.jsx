import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {
  const { cartItems, cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const checkoutNavigateHandler = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      {cartCount === 0 ? (
        <div>
          <h2>Your Cart is Empty !!</h2>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </div>
      )}
      <Button onClick={checkoutNavigateHandler}>Go To Checkout</Button>
    </div>
  );
};
export default CartDropdown;
