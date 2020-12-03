import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AddItemView from "../pages/AddItemView";
import ProductView from "../pages/ProductView";
import UpdateItemView from "../pages/UpdateItemView";
import DashboardView from "../pages/DashboardView";
import { useLocation } from "react-router-dom";
import UsersListView from "../pages/UsersListView";
import UserInfoView from "../pages/UserInfoView";
import OrdersView from "../pages/OrdersView";
import OrderInfoView from "../pages/OrderInfoView";

const AdminDashboard = () => {
  const location = useLocation();
  const [productID, setProductID] = useState("");
  console.log(location.pathname == "/admin-dashboard/update-product/:id");
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      {location.pathname == "/admin-dashboard" && <DashboardView />}
      {location.pathname == "/admin-dashboard/add-product" && <AddItemView />}
      {location.pathname == "/admin-dashboard/view-products" && (
        <ProductView setProductID={setProductID} />
      )}
      {location.pathname.includes("/admin-dashboard/update-product") && (
        <UpdateItemView />
      )}
      {location.pathname.includes("/admin-dashboard/users-list/profile") && (
        <UserInfoView />
      )}
      {location.pathname == "/admin-dashboard/users-list" && <UsersListView />}
      {location.pathname == "/admin-dashboard/view-orders" && <OrdersView />}
      {location.pathname.includes("/admin-dashboard/order") && (
        <OrderInfoView />
      )}
    </div>
  );
};

export default AdminDashboard;
