import React, { useState, useEffect } from 'react';
import leftArrow from '../res/left-arrow.svg';
import rightArrow from '../res/right-arrow.svg';
import xBtn from '../res/x-btn.svg';

const CartItem = ({ item, cart }) => {
  const [amount, setAmount] = useState(item.amount);
  const [remove, setRemove] = useState(false);
  const [productsCart, setProductsCart] = cart;
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (let i of cart) {
      if (i.name === item.name) {
        i.amount = amount;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setProductsCart(cart);
  }, [amount]);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (remove) {
      let newCart = cart.filter((i) => i.name !== item.name);
      localStorage.setItem('cart', JSON.stringify(newCart));
      setProductsCart(newCart);
    }
  }, [remove]);
  return (
    <div className="cart-item">
      <div className="cart-img-con bg1">
        <img src={item.image} alt="item-img" className="cart-item-img" />
      </div>
      <div className="cart-desc-con">
        <h3>{item.name}</h3>
        <p>{item.price}</p>
      </div>
      <div className="cart-amount-con">
        <input
          type="image"
          src={leftArrow}
          alt="down"
          onClick={() => {
            if (amount > 1) {
              setAmount(amount - 1);
            }
          }}
        />
        <p>{amount}</p>
        <input
          type="image"
          src={rightArrow}
          alt="up"
          onClick={() => {
            setAmount(amount + 1);
          }}
        />
      </div>
      <input
        type="image"
        src={xBtn}
        alt="remove"
        onClick={() => {
          setRemove(true);
        }}
      />
    </div>
  );
};

export default CartItem;
