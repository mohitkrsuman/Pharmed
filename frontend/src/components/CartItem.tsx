import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type cartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (CartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const cartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: cartItemProps) => {
  const { productId, photo, name, price, quantity, stock } = cartItem;
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default cartItem;
 