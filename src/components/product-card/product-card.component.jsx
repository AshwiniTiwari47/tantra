import "./product-card.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(product);
  };

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === product.id
  );

  const removeItemHandler = () => {
    removeItemFromCart(product);
  };

  // console.log({ product });

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`}></img>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      {typeof existingCartItem === "undefined" ||
      existingCartItem.quantity === 0 ? (
        <Button buttonType="inverted" onClick={addProductToCart}>
          Add to cart
        </Button>
      ) : (
        <span className="quantity">
          <div className="arrow" onClick={removeItemHandler}>
            -
          </div>
          <span className="value">{existingCartItem.quantity}</span>
          <div className="arrow" onClick={addProductToCart}>
            +
          </div>
        </span>
      )}
    </div>
  );
};

export default ProductCard;

// {currentUser ? (
//   <span className="nav-link" onClick={signOutUser}>
//     SIGN OUT
//   </span>
// ) : (
//   <Link className="nav-link" to="/auth">
//     SIGN IN
//   </Link>
// )}
