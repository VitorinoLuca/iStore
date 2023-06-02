import bag from "../../../assets/bag.svg";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
export const CartWidget = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const goCart = () => {
    navigate("/cart");
  };
  const totalQuantity = cart
    .map((item) => item.quantity)
    .reduce((total, quantity) => total + quantity, 0);
  return (
    <button onClick={goCart} className="nav-button cartWidget">
      <img src={bag} alt="" />
      {totalQuantity == 0 ? "" : <span>{totalQuantity}</span>}
    </button>
  );
};
