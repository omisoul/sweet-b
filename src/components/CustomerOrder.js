import React from 'react';
import OrderCartItem from './OrderCartItem';

const CustomerOrder = ({ order }) => {
  let cart = order.cart;

  return (
    <div className="customer-order">
      <h4>Order ID: {order.id}</h4>
      <p>Status: {order.status}</p>
      <p>Address: {order.address}</p>
      <p>Location: {order.deliveryLocation}</p>
      {order &&
        cart.map((item) => <OrderCartItem key={item.name} item={item} />)}
    </div>
  );
};

export default CustomerOrder;
