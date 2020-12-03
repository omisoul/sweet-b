import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle, signOut } from '../firebase';
import { UsersContext } from '../providers/UsersProviders';

const Navbar = () => {
  const user = useContext(UsersContext);
  return (
    <nav>
      <div>Sweet B's</div>
      <div className="nav-bar-items">
        <Link to="/">Catalogue</Link>
        <Link to="/cart" className="nav-btn">
          Cart
        </Link>
        {user ? (
          <div className="nav-bar-item">
            <button className="nav-btn" onClick={signOut}>
              <span className="btn-text"></span>Sign Out
            </button>
            <Link to={{ pathname: `/orders/${user.uid}` }} className="nav-btn">
              View Orders
            </Link>
          </div>
        ) : (
          <button className="nav-btn" onClick={signInWithGoogle}>
            <span className="btn-text">Login</span>
          </button>
        )}
        {user ? (
          user.role == 'admin' && (
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
