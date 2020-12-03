import React, { useContext } from 'react';
import ProductListItem from '../components/ProductListItem';
import { ProductsContext } from '../providers/ProductsProvider';

const ProductView = ({ setProductID }) => {
  const products = useContext(ProductsContext);
  return (
    <div className="products-view-page">
      <h1 className="order-view-name">Products</h1>
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          setProductID={setProductID}
        />
      ))}
    </div>
  );
};

export default ProductView;
