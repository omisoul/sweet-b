import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle, auth } from "../firebase";
import { UsersContext } from "../providers/UsersProviders";
const Navbar = () => {
  const [user,setUser] = useContext(UsersContext)

  return (
    <nav>
      <div>Sweet B's</div>
      <div>
        <Link to="/">Catalogue</Link>
        <Link to="/cart" className="nav-btn">
          Cart
        </Link>
        <button className="nav-btn" onClick={signInWithGoogle}><span className="btn-text">Login</span></button>
      </div>
    </nav>
  );
};

export default Navbar;
