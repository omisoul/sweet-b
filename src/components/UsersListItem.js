import React from "react";
import { firestore } from "../firebase";
import xBtn from "../res/x-btn.svg";
import { Link } from "react-router-dom";

const handleDelete = async (userID) => {
  await firestore.collection("users").doc(userID).delete();
};

const UsersListItem = ({ user }) => {
  return (
    <div className="usersList">
      <div className="usernames">
        <Link to={{ pathname: `/admin-dashboard/users-list/profile/${user.id}`}} className="username">{user.displayName}</Link>
        <p className="user-email">{user.email}</p>
        <input
          type="image"
          src={xBtn}
          alt="remove"
          onClick={() => {
            handleDelete(user.id);
          }}
        />
      </div>
    </div>
  );
};

export default UsersListItem;
