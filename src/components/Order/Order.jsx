import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./Order.css";
import loader from "../../assets/loader.gif";

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

export const Order = ({ name, phone, email }) => {
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const order = {
          name,
          phone,
          email,
          createdAt: new Date(),
        };

        const docRef = await addDoc(collection(db, "orders"), order);
        console.log("Order created with ID: ", docRef.id);
        setOrderId(docRef.id);
      } catch (error) {
        console.error("Error creating order: ", error);
      }
    };

    createOrder();
  }, [name, phone, email]);

  return (
    <>
      {orderId == null ? (
        <div className="loader-container">
          <img className="loader" src={loader} alt="" />
        </div>
      ) : (
        <div className="order-container">
          <div className="order-content">
            <h2 className="order-title">Order Confirmation</h2>
            <p className="order-info">
              Your order with ID: <span className="order-id">{orderId}</span>{" "}
              has been successfully placed.
            </p>
            <p className="order-message">Thank you for your purchase!</p>
          </div>
        </div>
      )}
    </>
  );
};
