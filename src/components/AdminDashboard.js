import React, {useState} from "react";
import AdminSidebar from "./AdminSidebar";
import AddItemView from "../pages/AddItemView";
import ProductView from "../pages/ProductView"
import UpdateItemView from "../pages/UpdateItemView"
import DashboardView from "../pages/DashboardView";
import { useLocation } from "react-router-dom"

const AdminDashboard = () => {
    const location = useLocation();
    const [productID, setProductID] = useState("");
    console.log(location.pathname == "/admin-dashboard/update-product/:id");
    return (
    <div className="admin-dashboard">
      <AdminSidebar/>
      {location.pathname == "/admin-dashboard/" && <DashboardView /> }
      {location.pathname == "/admin-dashboard/add-product" && <AddItemView /> }
      {location.pathname == "/admin-dashboard/view-products" && <ProductView setProductID={setProductID}/> }
      {location.pathname == `/admin-dashboard/update-product/${productID}` && <UpdateItemView /> }
    </div>
  );
};

export default AdminDashboard;
