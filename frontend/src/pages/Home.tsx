import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { CartItem, Product } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if(cartItem.stock < 1){
       return toast.error("Out of Stock");
    }
  
    dispatch(addToCart(cartItem));
  };

  const { data, isError } = useLatestProductsQuery("");

  if (isError) {
    toast.error("Cannot fetch the products");
  }

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findMore">
          More
        </Link>
      </h1>
      <main> 
          {data?.products.map((item: Product) => (
            <ProductCard
              key={item._id}
              productId={item._id}
              name={item.name}
              price={item.price}
              stock={item.stock}
              handler={addToCartHandler}
              photo={item.photo}
            />
          ))}
      </main>
    </div>
  );
};

export default Home;
