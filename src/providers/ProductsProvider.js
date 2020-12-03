import React, { useState, useEffect, createContext } from 'react';
import { firestore } from '../firebase';
import { collectIdAndDocs } from '../utilities';

export const ProductsContext = createContext();

const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);
  let unsubscribe = null;
  useEffect(() => {
    async function fetchProducts() {
      unsubscribe = firestore.collection('products').onSnapshot((snapshot) => {
        const prods = snapshot.docs.map(collectIdAndDocs);
        setProducts(prods);
      });
    }

    fetchProducts();
    return () => {
      unsubscribe();
    };
  }, [firestore]);
  return (
    <ProductsContext.Provider value={products}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
