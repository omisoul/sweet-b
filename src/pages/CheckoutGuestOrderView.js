import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { firestore } from '../firebase';
import Navbar from '../components/Navbar';
import selfcheckout from '../res/selfcheckout.gif';
import OrderSummaryItem from '../components/OrderSummaryItem';

const CheckoutGuestOrderView = () => {
  const history = useHistory();
  const location = useLocation();
  const [cart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const getTotal = () => {
    let total = 0;
    for (let i of cart) {
      total += i.amount * i.price;
      console.log(total);
    }
    return total;
  };

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
      <Navbar />
      <div className="checkout-con">
        <div className="checkout-gif-con">
          <img src={selfcheckout} alt="" />
        </div>
        <div>
          <h2>Check your order</h2>
          <p>
            Hi, {location.state.updatedInfo.displayName}, let's do one final
            check to make sure your order is okay
          </p>

          <h4>Order Summary</h4>
          <div className="checkout-summary">
            <div className="cart-summary-items">
              {cart.length === 0 ? (
                <p>The cart is empty</p>
              ) : (
                cart.map((item) => (
                  <OrderSummaryItem key={item.name} item={item} />
                ))
              )}
            </div>
          </div>
          {cart.length !== 0 && (
            <div className="order-summary-item">
              <p>Total:</p>
              <p>${getTotal()}</p>
            </div>
          )}
          <button
            className="btn"
            onClick={() => {
              checkoutOrder();
            }}
          >
            Checkout Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutGuestOrderView;
