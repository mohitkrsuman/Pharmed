import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItem";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItems,
} from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) {
      toast.error("Cannot add more than available stock");
    } else {
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
      toast.success("Item added to cart");
    }
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) {
      toast.error("Cannot decrease quantity less than 1");
    } else {
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    }
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItems(productId));
  };

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      cartItems.length > 0
        ? axios
            .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
              cancelToken: token,
            })
            .then((res) => {
              dispatch(discountApplied(res.data.discount));
              setIsValidCouponCode(true);
              dispatch(calculatePrice());
            })
            .catch(() => {
              dispatch(discountApplied(0));
              setIsValidCouponCode(false);
              dispatch(calculatePrice());
            })
        : null;
      if (Math.random() * 1 > 0.5) {
        setIsValidCouponCode(true);
      } else {
        setIsValidCouponCode(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              key={idx}
              cartItem={i}
              decrementHandler={decrementHandler}
              incrementHandler={incrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <h1>No items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
