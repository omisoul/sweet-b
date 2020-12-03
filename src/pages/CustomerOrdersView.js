import React, { useContext, useEffect, useState } from 'react';
import CustomerOrder from '../components/CustomerOrder';
import Navbar from '../components/Navbar';
import { OrdersContext } from '../providers/OrdersProvider';
import { UsersContext } from '../providers/UsersProviders';

const CustomerOrdersView = () => {
  const orders = useContext(OrdersContext);
  const user = useContext(UsersContext);
  const [customerOrders, setCustomerOrders] = useState([]);
  const id = location.pathname.replace('/orders/', '');

  useEffect(() => {
    for (let i of orders) {
      if (i.uid == id) {
        setCustomerOrders((ords) => [...ords, i]);
        console.log(i);
      }
    }
    console.log(customerOrders);
    console.log('test');
  }, [orders]);

  return (
    <div>
      <Navbar />
      <h1 className="order-view-name">{user.displayName}</h1>
      {customerOrders.map((order) =>
        order ? <CustomerOrder key={order.id} order={order} /> : ''
      )}
      {console.log(customerOrders)}
    </div>
  );
};

export default CustomerOrdersView;
