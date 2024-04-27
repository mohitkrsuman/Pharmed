import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "aggerg",
    photo:
      "https://www.netmeds.com/images/product-v1/150x150/1049383/cetaphil_moisturizing_lotion_normal_to_combination_sensitive_skin_100_ml_424186_0_4.jpg",
    name: "Cetaphil",
    price: 127,
    quantity: 4,
    stock: 10,
  },
];
const subtotal = 4000;
const discount = 400;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const total = subtotal + tax + shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random()*1 > 0.5) {
        setIsValidCouponCode(true);
      } else {
        setIsValidCouponCode(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => <CartItem key={idx} cartItem={i} />)
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
