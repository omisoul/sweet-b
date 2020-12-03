import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CheckoutOrder from '../components/CheckoutOrder';
import { UsersContext } from '../providers/UsersProviders';
import GuestUserInfoView from './GuestUserInfoView';
import UpdateUserInfoView from './UpdateUserInfoView';

const CheckoutOrderView = () => {
  const history = useHistory();
  const user = useContext(UsersContext);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const returnToCart = () => history.replace('/cart');
  console.log(cart);
  return (
    <div>
      {user ? (
        user.updatedInfo ? (
          cart.length != 0 ? (
            <CheckoutOrder />
          ) : (
            returnToCart()
          )
        ) : (
          <UpdateUserInfoView />
        )
      ) : (
        <GuestUserInfoView />
      )}
    </div>
  );
};

export default CheckoutOrderView;
