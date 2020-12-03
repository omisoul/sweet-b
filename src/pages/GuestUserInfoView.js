import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UsersContext } from '../providers/UsersProviders';

const GuestUserInfoView = () => {
  const user = useContext(UsersContext);
  const history = useHistory();
  const [displayName, setName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('Kingston');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [cart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    emptyCart();
  }, []);
  const updateUserInfo = async () => {
    let updatedInfo = {
      displayName,
      deliveryLocation,
      telephoneNumber,
      address,
      updatedInfo: true,
    };
    history.push({
      pathname: '/checkout/guest',
      state: {
        updatedInfo,
      },
    });
  };
  const emptyCart = () => {
    if (cart.length == 0) {
      history.replace('/cart');
    }
  };

  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          updateUserInfo();
        }}
      >
        <input
          type="text"
          value={displayName}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="tel"
          value={telephoneNumber}
          required
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          onChange={(e) => setTelephoneNumber(e.target.value)}
        />
        <select
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
        >
          <option value="Kingston">Kingston</option>
          <option value="Portmore">Portmore</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default GuestUserInfoView;
