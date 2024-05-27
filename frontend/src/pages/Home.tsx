import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";

const Home = () => {
  const addToCartHandler = () => {};

  const { data } = useLatestProductsQuery("");

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
        {data?.products.map((item) => (
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
