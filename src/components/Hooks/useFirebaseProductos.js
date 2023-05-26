import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8FJ0knyvwvBuGoAY_fCrcOABaAo-z4qg",
    authDomain: "istore-ecommerce-3beb3.firebaseapp.com",
    projectId: "istore-ecommerce-3beb3",
    storageBucket: "istore-ecommerce-3beb3.appspot.com",
    messagingSenderId: "868561232186",
    appId: "1:868561232186:web:b0ec3379f362828e513003"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function useFirebaseProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const data = querySnapshot.docs.map((doc) => doc.data());
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading };
}