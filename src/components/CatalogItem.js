import React from "react";
import { Link } from "react-router-dom";
const CatalogItem = ({ product }) => {
  return (
    <Link
      to={{ pathname: `/product/${product.id}`, state: product }}
      className="link"
    >
      <div className="catalog-item">
        <img src={product.image} alt="Image" className="catalog-item-img" />
        <h3 className="catalog-item-title">{product.name}</h3>
        <p className="catalog-item-price">Price: {product.price}</p>
      </div>
    </Link>
  );
};

export default CatalogItem;
