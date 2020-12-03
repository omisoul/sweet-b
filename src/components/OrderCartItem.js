import React from 'react';

const OrderCartItem = ({ item }) => {
  return (
    <div className="order-view-cart">
      <h4 className="h4-cart-summary">{item.name}</h4>
      <p>{item.amount}</p>
      <p>{item.price * item.amount}</p>
    </div>
  );
};

export default OrderCartItem;
