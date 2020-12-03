import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { firestore } from '../firebase';

const CheckoutGuestOrderView = () => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const [cart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const checkoutOrder = async () => {
    console.log('test');
    const {
      displayName,
      telephoneNumber,
      address,
      deliveryLocation,
    } = location.state.updatedInfo;

    let order = {
      displayName,
      telephoneNumber,
      address,
      deliveryLocation,
      cart,
      status: 'Pending',
    };
    ////////////////////////////let orders = user.orders || [];
    try {
      const docRef = await firestore.collection('orders').add(order);
      const orderDoc = await docRef.get();
      console.log(orderDoc.data());
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

export default CheckoutGuestOrderView;
