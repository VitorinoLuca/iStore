import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { useFirebaseProducts } from "../components/Hooks/useFirebaseProductos";

export const Search = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { productName } = useParams();
  const { products } = useFirebaseProducts();

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((product) => {
        return product.title.toLowerCase().includes(productName.toLowerCase());
      });
      setFilteredProducts(filtered);
    }
  }, [productName, products]);

  return (
    <>
      <section className="search-page-container">
        <h1>Search results for: {productName}</h1>
        <div className="item-list-container">
          {filteredProducts.length === 0 ? (
            <p>
              Sorry, no matches were found. Try a new search or use our
              suggestions.
            </p>
          ) : (
            filteredProducts.map((product) => {
              return <ProductCard key={product.title} product={product} />;
            })
          )}
        </div>
      </section>
    </>
  );
};
