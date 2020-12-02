import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrderListItem from '../components/OrderListItem';
import { firestore } from '../firebase';
import { UsersListContext } from '../providers/UsersListProvider';

const UserInfoView = () => {
  const id = location.pathname.replace(
    '/admin-dashboard/users-list/profile/',
    ''
  );
  const users = useContext(UsersListContext);

  const [user, setUser] = useState([]);
  const [telephoneNumber, setTele] = useState('');
  const [displayName, setName] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [edit, setEdit] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    for (let i of users) {
      if (i.id === id) {
        setUser(i);
        setOrderList(i.orders);
      }
    }
  }, [users]);

  useEffect(() => {
    setTele(user.telephoneNumber);
    setName(user.displayName);
    setAddress(user.address);
    setDeliveryLocation(user.deliveryLocation);
  }, [user]);

  const updateUser = async () => {
    let updatedUser = {
      address,
      deliveryLocation,
      displayName,
      telephoneNumber,
    };
    let docRef = await firestore.collection('users').doc(user.id);
    docRef.update(updatedUser);
  };

  console.log(orderList);

  return (
    <div className="edit-user">
      <h1>User Information</h1>
      <h2>Overview</h2>
      <form className="edit-user-form">
        <input disabled={true} className="edit-user-input" value={user.email} />
        <input
          className="edit-user-input"
          value={displayName}
          onChange={(e) => {
            setName(e.target.value);
          }}
          disabled={!edit}
        />
        <input
          className="edit-user-input"
          value={telephoneNumber}
          onChange={(e) => {
            setTele(e.target.value);
          }}
          disabled={!edit}
        />
        <input
          className="edit-user-input"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          disabled={!edit}
        />
        <select
          disabled={!edit}
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
        >
          <option value="Kingston">Kingston</option>
          <option value="Portmore">Portmore</option>
        </select>
      </form>

      <button
        className="btn"
        hidden={isHidden}
        onClick={() => {
          setEdit(true);
          setIsHidden(!isHidden);
        }}
      >
        <span className="btn-text">Edit Info</span>
      </button>
      <button
        className="btn"
        hidden={!isHidden}
        onClick={() => {
          setEdit(false);
          setIsHidden(!isHidden);
          updateUser();
        }}
      >
        <span className="btn-text">Update</span>
      </button>

      <h2>Orders</h2>
      {user.orders &&
        orderList.map((order) => (
          <OrderListItem key={order} user={user} orderList={order} />
        ))}
    </div>
  );
};

export default UserInfoView;
