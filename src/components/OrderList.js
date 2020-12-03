import React, { useEffect, useContext, useState } from 'react';
import { firestore } from '../firebase';
import xBtn from '../res/x-btn.svg';
import { Link } from 'react-router-dom';
import { UsersListContext } from '../providers/UsersListProvider';

const OrderList = ({ order }) => {
  const users = useContext(UsersListContext);
  const [user, setUser] = useState([]);
  const [ords, setOrds] = useState([]);

  useEffect(() => {
    for (let i of users) {
      if (order.uid === i.id) {
        setUser(i);
        setOrds(i.orders);
      }
    }
  }, [users]);

  const handleDelete = async () => {
    try {
      setOrds(ords.splice(0, 1));
      await firestore.collection('users').doc(user.id).update({
        orders: ords,
      });
    } catch (e) {}
    await firestore.collection('orders').doc(order.id).delete();
  };

  return (
    <div className="order-list">
      <div className="order-items">
        <p>{order.displayName}</p>
        <Link
          to={{ pathname: `/admin-dashboard/order/${order.id}` }}
          className="username"
        >
          {order.id}
        </Link>
        <p className="order-status">{order.status}</p>
        <input
          type="image"
          src={xBtn}
          alt="remove"
          onClick={() => {
            handleDelete();
          }}
        />
      </div>
    </div>
  );
};

export default OrderList;
