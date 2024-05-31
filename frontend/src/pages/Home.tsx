import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../components/Loader";

const Home = () => {
  const addToCartHandler = () => {};

  const { data, isLoading, isError } = useLatestProductsQuery("");

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
        {isLoading ? (
          <SkeletonLoader width="80vw"/>
        ) : (
          data?.products.map((item) => (
            <ProductCard
              key={item._id}
              productId={item._id}
              name={item.name}
              price={item.price}
              stock={item.stock}
              handler={addToCartHandler}
              photo={item.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
