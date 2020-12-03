import React, { useContext } from 'react';
import OrderList from '../components/OrderList';
import { OrdersContext } from '../providers/OrdersProvider';

const OrdersView = () => {
  const orders = useContext(OrdersContext);
  console.log(orders);
  console.log('hello');

  return (
    <div className="user-list-page">
      <h2 className="user-list-heading">Orders</h2>
      {orders.map((order) =>
        order.status == 'Pending' ? (
          <OrderList key={order.id} order={order} />
        ) : (
          ''
        )
      )}
      {orders.map((order) =>
        order.status == 'Delivered' ? (
          <OrderList key={order.id} order={order} />
        ) : (
          ''
        )
      )}
      {orders.map((order) =>
        order.status == 'Canceled' ? (
          <OrderList key={order.id} order={order} />
        ) : (
          ''
        )
      )}
    </div>
  );
};

export default OrdersView;
