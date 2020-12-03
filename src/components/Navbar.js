import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle, signOut } from '../firebase';
import { UsersContext } from '../providers/UsersProviders';
import shopping_cart from '../res/shopping_cart.svg';
const Navbar = () => {
  const user = useContext(UsersContext);

  return (
    <nav>
      <div>Sweet B's</div>
      <div className="nav-bar-items">
        <Link to="/">Catalogue</Link>
        <Link to="/cart" className="cart-btn">
          <img src={shopping_cart} alt="" className="cart-icon" />
        </Link>
        {user ? (
          user.role == 'admin' && (
            <Link to="/admin-dashboard" className="nav-btn">
              Admin Dashboard
            </Link>
          )
        ) : (
          <p></p>
        )}
        {user ? (
          <div className="nav-bar-item">
            <Link to={{ pathname: `/orders/${user.uid}` }} className="nav-btn">
              View Orders
            </Link>
            <button className="nav-btn" onClick={signOut}>
              <span className="btn-text"></span>Sign Out
            </button>
          </div>
        ) : (
          <button className="nav-btn" onClick={signInWithGoogle}>
            <span className="btn-text">Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
