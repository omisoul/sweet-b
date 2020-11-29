import React, { useState, useEffect, createContext } from "react";
import { firestore } from "../firebase";
import { collectIdAndDocs } from "../utilities";

export const ProductsContext = createContext();

const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const snapshot = await firestore.collection("products").get();
      const prods = await snapshot.docs.map(collectIdAndDocs);

      setProducts(prods);
    }

    fetchProducts();
  }, []);
  return (
    <ProductsContext.Provider value={products}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
