import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ path }) => {

  return (
    <div className="admin-sidebar">
        <h3>Menu</h3>
        
        <Link to="/admin-dashboard/">Dashboard</Link>
        <Link to="/admin-dashboard/add-product">Add Product</Link>
      <Link to="/admin-dashboard/view-products">View Products</Link>
      <Link to="/admin-dashboard/view-orders">View Orders</Link>
      <Link to="/">Back to Catalog</Link>
    </div>
  );
};

export default AdminSidebar;
