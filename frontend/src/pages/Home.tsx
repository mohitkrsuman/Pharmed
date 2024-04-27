import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const addToCartHandler = () => {};

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
        <ProductCard
          productId="sagfs"
          name="FaceWash"
          price={127}
          stock={20}
          handler={addToCartHandler}
          photo="https://www.netmeds.com/images/product-v1/150x150/1049383/cetaphil_moisturizing_lotion_normal_to_combination_sensitive_skin_100_ml_424186_0_4.jpg"
        />
      </main>
    </div>
  );
};

export default Home;
