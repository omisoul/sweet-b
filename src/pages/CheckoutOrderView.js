import React, { useContext } from "react";
import CheckoutOrder from "../components/CheckoutOrder";
import { UsersContext } from "../providers/UsersProviders";
import UpdateUserInfoView from "./UpdateUserInfoView";

const CheckoutOrderView = () => {
  const user = useContext(UsersContext);
  return (
    <div>{user.updatedInfo ? <CheckoutOrder /> : <UpdateUserInfoView />}</div>
  );
};

export default CheckoutOrderView;
