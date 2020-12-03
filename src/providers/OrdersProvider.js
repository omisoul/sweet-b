import React, { useState, useEffect, createContext } from 'react';
import { firestore } from '../firebase';
import { collectIdAndDocs } from '../utilities';

export const OrdersContext = createContext();
let ordersRef = firestore.collection('orders');
ordersRef.orderBy('status', 'desc');

const OrdersProvider = (props) => {
  const [orders, setOrders] = useState([]);
  let unsubscribe = null;
  useEffect(() => {
    async function fetchOrders() {
      unsubscribe = firestore.collection('orders').onSnapshot((snapshot) => {
        const order = snapshot.docs.map(collectIdAndDocs);
        setOrders(order);
      });
    }

    fetchOrders();
    return () => {
      unsubscribe();
    };
  }, [firestore]);
  return (
    <OrdersContext.Provider value={orders}>
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
