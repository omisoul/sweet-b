import React, { useContext } from "react";
import AdminDashboard from "../components/AdminDashboard";
import { UsersContext } from "../providers/UsersProviders";

const AdminDashboardView = () => {
  const [user] = useContext(UsersContext);
  return (
    <div>
      {user ? (
        user.role == "admin" ? (
          <AdminDashboard />
        ) : (
          <p>It seems you've ended up on the wrong page</p>
        )
      ) : (
        <p>It seems you've ended up on the wrong page</p>
      )}
    </div>
  );
};

export default AdminDashboardView;
