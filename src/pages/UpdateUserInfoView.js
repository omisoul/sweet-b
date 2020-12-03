import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../firebase';
import { UsersContext } from '../providers/UsersProviders';

// Collects user information and updates the user
const UpdateUserInfoView = () => {
  const user = useContext(UsersContext);
  const history = useHistory();
  const [deliveryLocation, setDeliveryLocation] = useState('Kingston');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const updateUserInfo = async () => {
    let updatedInfo = {
      deliveryLocation,
      telephoneNumber,
      address,
      updatedInfo: true,
    };
    if (user) {
      try {
        let docRef = await firestore.collection('users').doc(user.uid);
        await docRef.update(updatedInfo);
      } catch (error) {
      } finally {
        history.go(0);
      }
    } else {
      history.push({
        pathname: '/checkout/guest',
        state: {
          updatedInfo,
        },
      });
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

export default UpdateUserInfoView;
