import React from "react";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";

const handleDelete = async (productId) => {
  await firestore.collection("products").doc(productId).delete();
};

const ProductList = ({ product, setProductID }) => {
  return (
    <div>
      <p>{product.name}</p>
      <Link
        to={{
          pathname: `/admin-dashboard/update-product/${product.id}`,
          state: product,
        }}
        onClick={() => {
          setProductID(product.id);
        }}
      >
        Update
      </Link>
      <button
        className="btn"
        onClick={() => {
          handleDelete(product.id);
        }}
      >
        <span className="btn-text">Delete</span>
      </button>
    </div>
  );
};

export default ProductList;
