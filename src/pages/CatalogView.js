import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../providers/ProductsProvider";
import Navbar from "../components/Navbar";
import CatalogItem from "../components/CatalogItem";

const CatalogView = () => {
  const products = useContext(ProductsContext);
  console.log(products);
  return (
    <div>
      <Navbar />
      <div className="catalog-grid">
        {products.map((product) => (
          <CatalogItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CatalogView;
