import React, { useContext, useState, useEffect } from 'react';
import { OrdersContext } from '../providers/OrdersProvider';
import { useLocation } from 'react-router-dom';
import OrderCartItem from '../components/OrderCartItem';
import { firestore } from '../firebase';

const OrderInfoView = () => {
  const orders = useContext(OrdersContext);
  const location = useLocation();
  const pathId = location.pathname.replace('/admin-dashboard/order/', '');

  const [order, setOrder] = useState([]);
  console.log(orders);
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    for (let i of orders) {
      if (i.id === pathId) {
        setOrder(i);
        setCart(i.cart);
        setStatus(i.status);
      }
    }
  }, [orders]);

  const getTotal = () => {
    let total = 0;
    for (let i of cart) {
      total += i.amount * i.price;
      console.log(total);
    }
    return total;
  };

  const update = async () => {
    try {
      let docRef = await firestore.collection('orders').doc(order.id);
      docRef.update({ status: status });
    } catch (e) {}
  };

  useEffect(() => {
    update();
  }, [status]);

  return (
    <div className="order-summary">
      <h1>Order Summary</h1>
      <h3>Cart</h3>
      <div className="order-view-cart">
        <h4 className="h4-cart-summary">Item</h4>
        <h4>Amt</h4>
        <h4>Total</h4>
      </div>
      {order &&
        cart.map((item) => <OrderCartItem key={item.name} item={item} />)}
      <div className="order-view-cart">
        <h4 className="order-view-t">Total</h4>
        <p className="order-view-total">{getTotal()}</p>
      </div>
      <br />
      <br />
      <p>Email: {order.email}</p>
      <p>Name: {order.displayName}</p>
      <p>Telephone Number: {order.telephoneNumber}</p>
      <p>Address: {order.address}</p>
      <label htmlFor="status">Status: </label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Canceled">Canceled</option>
      </select>
    </div>
  );
};

export default OrderInfoView;
