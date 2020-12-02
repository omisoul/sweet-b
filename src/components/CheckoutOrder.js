import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../firebase';
import { UsersContext } from '../providers/UsersProviders';

const CheckoutOrder = () => {
  const history = useHistory();
  const user = useContext(UsersContext);
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
    } = user;
    let order = {
      displayName,
      email,
      telephoneNumber,
      address,
      deliveryLocation,
      cart,
    };
    let orders = user.orders || [];
    try {
      const docRef = await firestore.collection('orders').add(order);
      const orderDoc = await docRef.get();
      console.log(orderDoc.data());
      await firestore
        .collection('users')
        .doc(user.uid)
        .update({
          orders: [orderDoc.id, ...orders],
        });
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem('cart');
      history.replace('/');
    }
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
