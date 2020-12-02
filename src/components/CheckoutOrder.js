import React, { useContext, useEffect, useState } from 'react';
import { addToArray, firestore } from '../firebase';
import { UsersContext } from '../providers/UsersProviders';
import { useHistory } from 'react-router-dom';

const CheckoutOrder = () => {
  const history = useHistory();
  const user = useContext(UsersContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(user.orders);
    console.log(user);
  }, [user]);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );
  const checkoutOrder = async () => {
    console.log('test');
    const {
      displayName,
      email,
      telephoneNumber,
      address,
      deliveryLocation,
      uid,
    } = user;
    let order = {
      displayName,
      email,
      telephoneNumber,
      address,
      deliveryLocation,
      cart,
      uid,
      status: 'Pending',
    };
    ////////////////////////////let orders = user.orders || [];
    try {
      const docRef = await firestore.collection('orders').add(order);
      const orderDoc = await docRef.get();
      console.log(orderDoc.data());
      await firestore
        .collection('users')
        .doc(user.uid)
        .update({
          orders: addToArray(orderDoc.id),
        });
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem('cart');
      history.replace('/');
    }
    // } finally {
    //   history.push("/");
    // }
  };
  return (
    <div>
      <button
        onClick={() => {
          checkoutOrder();
        }}
      >
        Checkout Order
      </button>
    </div>
  );
};

export default CheckoutOrder;
