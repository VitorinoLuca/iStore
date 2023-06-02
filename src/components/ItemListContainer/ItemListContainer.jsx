import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import loader from "../../assets/loader.gif";
import { useFirebaseProducts } from "../Hooks/useFirebaseProductos";
import "./ItemListContainer.css";

const categories = ["Mac", "iPad", "iPhone", "Watch", "accessories"];

export const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filteredCategory = categories.find(
    (category) => category.toLowerCase() === categoryId
  );

  const { products } = useFirebaseProducts();

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === categoryId
    );
    setFilteredProducts(filtered);
  }, [categoryId, products]);

  const generateTitle = (category) => {
    if (["Mac", "iPad", "iPhone"].includes(category)) {
      return `Which ${category} is right for you?`;
    } else if (category === "accessories") {
      return `Find the ${category} you're looking for.`;
    } else {
      return `Which Apple ${category} is right for you?`;
    }
  };

  return (
    <>
      <h1 className="category-title">{generateTitle(filteredCategory)}</h1>
      <div className="item-list-container">
        {filteredProducts.length === 0 ? (
          <div className="loader-container">
            <img className="loader" src={loader} alt="" />
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.title} product={product} info={true} />
          ))
        )}
      </div>
    </>
  );
};
