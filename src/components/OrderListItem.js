import React, { useContext, useEffect, useState } from 'react';
import { firestore } from '../firebase';
import xBtn from '../res/x-btn.svg';
import { Link } from 'react-router-dom';
import { OrdersContext } from '../providers/OrdersProvider';

const handleDelete = async (userID, orderID, user) => {
  await firestore
    .collection('users')
    .doc(userID)
    .update({
      orders: user.orders.filter((order) => order !== orderID),
    });
  await firestore.collection('orders').doc(orderID).delete();
};

const OrderListItem = ({ user, orderList }) => {
  const orders = useContext(OrdersContext);
  const [status, setStatus] = useState('');

  useEffect(() => {
    for (let i of orders) {
      if (i.id == orderList) {
        setStatus(i.status);
      }
    }
  }, [orders]);

  return (
    <div className="usersList">
      <div className="usernames">
        <Link
          to={{ pathname: `/admin-dashboard/order/${orderList}` }}
          className="username"
        >
          {orderList}
        </Link>
        <p className="user-order-status">{status}</p>
        <input
          type="image"
          src={xBtn}
          alt="remove"
          onClick={() => {
            handleDelete(user.id, orderList, user);
          }}
        />
      </div>
    </div>
  );
};

export default OrderListItem;
