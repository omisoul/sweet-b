import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebase";
import { UsersContext } from "../providers/UsersProviders";
const Navbar = () => {
  const user = useContext(UsersContext);
  return (
    <nav>
      <div>Sweet B's</div>
      <div>
        <Link to="/">Catalogue</Link>
        <Link to="/cart" className="nav-btn">
          Cart
        </Link>
        {user ? (
          <button className="nav-btn" onClick={signOut}>
            <span className="btn-text"></span>Sign Out
          </button>
        ) : (
          <button className="nav-btn" onClick={signInWithGoogle}>
            <span className="btn-text">Login</span>
          </button>
        )}
        {user ? (
          user.role == "admin" && (
            <Link to="/admin-dashboard" className="nav-btn">
              Admin Dashboard
            </Link>
          )
        ) : (
          <p></p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
