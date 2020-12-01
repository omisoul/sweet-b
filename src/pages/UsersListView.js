import React, { useContext } from "react";
import UsersListItem from "../components/UsersListItem";
import { UsersListContext } from "../providers/UsersListProvider";

const UsersListView = () => {
  const users = useContext(UsersListContext);

  return (
    <div className="user-list-page">
      <h2 className="user-list-heading">Administration</h2>
      {users.map((user) =>
        user.role === "admin" ? <UsersListItem key={user.id} user={user} /> : ""
      )}

      <hr className="user-line"></hr>

      <h2 className="user-list-heading">Customers</h2>
      {users.map((user) =>
        user.role === "customer" ? (
          <UsersListItem key={user.id} user={user} />
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default UsersListView;
