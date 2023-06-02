import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import "./Checkout.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { Order } from "../Order/Order";
import { useNavigate } from "react-router-dom";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_apiKey,
  authDomain: import.meta.env.VITE_REACT_APP_authDomain,
  projectId: import.meta.env.VITE_REACT_APP_projectId,
  storageBucket: import.meta.env.VITE_REACT_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_REACT_APP_messagingSenderId,
  appId: import.meta.env.VITE_REACT_APP_appId,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const [cartPrice, setCartPrice] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [bought, setBought] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let totalPrice = 0;
    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    setCartPrice(totalPrice);
  }, [cart]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleConfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value);
    setEmailError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== confirmEmail || email.length === 0) {
      setEmailError(true);
      setError("Email addresses do not match");
    } else {
      setBought(true);
      setCart([]);
      localStorage.clear();
    }
  };

  const buscarProductoEnFirebase = async (product) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "products"), where("title", "==", product.title))
      );
    } catch (error) {
      console.error("Error al buscar el producto en Firebase:", error);
      setError("Error al buscar productos en Firebase");
    }
  };

  useEffect(() => {
    const promises = cart.map((product) => buscarProductoEnFirebase(product));
    Promise.all(promises)
      .then(() => {
        setError("");
      })
      .catch((error) => {
        console.error("Error al buscar productos en Firebase:", error);
        setError("Error al buscar productos en Firebase");
      });
  }, [cart]);

  if (bought) {
    return <Order name={name} phone={phone} email={email} />;
  }
  return (
    <>
      <div className="checkout-header">
        <h2>Checkout</h2>
        <p>Order Summary: ${cartPrice}</p>
      </div>
      <h1 className="checkout-title">Now fill out your pickup information.</h1>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-input-group">
            <input
              required
              type="text"
              value={name}
              onChange={handleNameChange}
            />
            <label>Full Name</label>
          </div>
          <div className="form-input-group">
            <input
              required
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <label>Email Address</label>
          </div>
          <div className="form-input-group">
            <input
              required
              type="email"
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
              className={emailError ? "error" : ""}
            />
            <label>Confirm Email Address</label>
          </div>
          {emailError && (
            <span className="error-message">Email addresses do not match</span>
          )}
          <div className="form-input-group">
            <input
              required
              type="text"
              value={phone}
              onChange={handlePhoneChange}
            />
            <label>Phone Number</label>
          </div>
          <button className="btn-add-cart">Finish Payment</button>
        </form>
      </div>
    </>
  );
};
