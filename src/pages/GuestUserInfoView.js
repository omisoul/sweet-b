import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UsersContext } from '../providers/UsersProviders';
import Navbar from '../components/Navbar';
import selfcheckout from '../res/selfcheckout.gif';

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
      <Navbar />
      <div className="checkout-con">
        <div className="checkout-gif-con">
          <img src={selfcheckout} alt="" />
        </div>
        <div>
          <h2>Hey there!</h2>
          <p>
            We just need a little more information before you can check out your
            items. If you don't want to have to do this again, sign up for a
            Sweet B's account.
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
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  value={displayName}
                  required
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <br />
                <input
                  type="text"
                  value={address}
                  required
                  placeholder="Constant Spring Road"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-con">
              <div>
                <label htmlFor="tele">Phone Number</label>
                <br />
                <input
                  type="tel"
                  value={telephoneNumber}
                  required
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="876-888-8888"
                  onChange={(e) => setTelephoneNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="delivery">Delivery Location</label>
                <br />
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                >
                  <option value="Kingston">Kingston</option>
                  <option value="Portmore">Portmore</option>
                </select>
              </div>
            </div>
            <input type="submit" value="Continue to Checkout" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuestUserInfoView;
