import React from "react";

const OrderCartItem = (item) => {
  return (
    <div className="order-view-cart">
      <h4>{item.name}</h4>
      <p>{item.amunt}</p>
      <p>{item.price}</p>
    </div>
  );
};

export default OrderCartItem;
