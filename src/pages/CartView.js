import React, { useState } from "react";
import CartItem from "../components/CartItem";
import Navbar from "../components/Navbar";
import OrderSummaryItem from "../components/OrderSummaryItem";
import { Link } from "react-router-dom";

const CartView = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  console.log(cart)
  const getTotal = () => {
    let total = 0;
    for (let i of cart){
      total += i.amount*i.price
      console.log(total)
    }
    return total;
  }
  return (
      <div className="cart-con">
        <div className="cart-items">
        <Link to="/">back to catalog</Link>
        <h2>Sweet B's | My Cart</h2>
      {cart.length === 0
        ? <p>No items are in your cart</p>
        : cart.map((item) => <CartItem key={item.name} item={item} cart={[cart,setCart]}  />)}
        </div>
        <div className="cart-summary">
          <div className="cart-summary-items">
            <h3>Order Summary</h3>
          {cart.length === 0
          ? <p>The cart is empty</p>
          : cart.map((item) => <OrderSummaryItem key={item.name} item={item} />)}
    
          </div>
          <div className="vertical-flex">
            {cart.length !== 0 &&
            <div className="order-summary-item">
            <p>Total:</p>                                 
            <p>${getTotal()}</p>
            </div>}
          <button className="btn">Checkout</button>
          </div>
        </div>
      </div>
  );
};

export default CartView;
