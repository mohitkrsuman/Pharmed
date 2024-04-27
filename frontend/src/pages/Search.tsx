import { useState } from "react";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandle = () => {
    console.log("Added to cart");
  };

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  return (
    <div className="searchPage">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort </h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price : {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={10000}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="asc">Personal HealthCare</option>
            <option value="dsc">Balms & Sprays</option>
            <option value="dsc">Healthy Drinks</option>
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="searchProductList">
          <ProductCard
            productId="sagfs"
            name="FaceWash"
            price={127}
            stock={20}
            handler={addToCartHandle}
            photo="https://www.netmeds.com/images/product-v1/150x150/1049383/cetaphil_moisturizing_lotion_normal_to_combination_sensitive_skin_100_ml_424186_0_4.jpg"
          />
        </div>

        <article>
           <button disabled={!isPrevPage} onClick={() => setPage(prev => prev-1)}>Prev</button>
           <span>{page} of {4}</span>
           <button disabled={!isNextPage} onClick={() => setPage(prev => prev+1)}>Next</button>
        </article>
      </main>
    </div>
  );
};

export default Search;
