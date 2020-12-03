import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { firestore } from '../firebase';
import { UsersContext } from '../providers/UsersProviders';
import selfcheckout from '../res/selfcheckout.gif';

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
      <Navbar />
      <div className="checkout-con">
        <div className="checkout-gif-con">
          <img src={selfcheckout} alt="" />
        </div>
        <div>
          <h2>Hi {user.displayName}</h2>
          <p>
            Let's check out your tasty treats, but before we that just need a
            little more information to get your delivery ready
          </p>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              updateUserInfo();
            }}
          >
            <div className="flex-con">
              <div>
                <label htmlFor="address">Address</label>
                <br />
                <input
                  type="text"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Constant Spring Road"
                />
              </div>
              <div>
                <label htmlFor="tele">Phone Number</label>
                <br />
                <input
                  type="tel"
                  value={telephoneNumber}
                  required
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  onChange={(e) => setTelephoneNumber(e.target.value)}
                  placeholder="876-888-8888"
                />
              </div>
            </div>
            <label htmlFor="delivery">Delivery Location</label>
            <br />
            <select
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
            >
              <option value="Kingston">Kingston</option>
              <option value="Portmore">Portmore</option>
            </select>
            <br />
            <input type="submit" value="Continue Checkout" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserInfoView;
