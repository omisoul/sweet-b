import React, { useContext, useEffect, useState } from 'react';
import { addToArray, firestore } from '../firebase';
import { UsersContext } from '../providers/UsersProviders';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import selfcheckout from '../res/selfcheckout.gif';
import OrderSummaryItem from '../components/OrderSummaryItem';

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
      <Navbar />
      <div className="checkout-con">
        <div className="checkout-gif-con">
          <img src={selfcheckout} alt="" />
        </div>
        <div>
          <h2>Check your order</h2>
          <p>Let's take one final look at your order before you go.</p>
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

export default CheckoutOrder;
