import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import { ProductsContext } from '../providers/ProductsProvider';

const ItemView = ({ location }) => {
  const productsList = useContext(ProductsContext);
  const id = location.pathname.replace('/product/', '');
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState(location.state || {});
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );
  const [added, setAdded] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setProduct(() => {
      for (let i of productsList) {
        if (i.id === id) {
          return i;
        }
      }
      return {};
    });
  }, [productsList]);

  const addToCart = (product, amount) => {
    let oldCart = typeof cart == 'string' ? JSON.parse(cart) : cart;
    let found = false;
    for (let i of oldCart) {
      if (i.name == product.name) {
        i.amount += amount;
        found = true;
      }
    }
    if (found) {
      setCart([...oldCart]);
    } else {
      setCart([
        ...oldCart,
        {
          name: product.name,
          image: product.image,
          price: product.price,
          amount: amount,
        },
      ]);
    }
    setAdded(true);

    setTimeout(() => {
      setAmount(1);
      setAdded(false);
    }, 2000);
  };
  return (
    <div>
      <Navbar />
      <div className="item-con">
        <div>
          <h1>{product.name}</h1>
          <div>
            <p className="price">
              <span>Price:</span> {product.price}
            </p>
          </div>
          <p>{product.description}</p>
          <h3>Flavours</h3>
          <div className="flavour-con">{product.flavor}</div>
          <div>
            {added && (
              <p>
                Successfully {amount} {product.name}/s added to cart
              </p>
            )}
            <div className="flex-con">
              <div className="amount-con">
                <button
                  className="btn-minus"
                  onClick={() =>
                    setAmount(() => {
                      if (amount > 1) {
                        return amount - 1;
                      }
                      return 1;
                    })
                  }
                >
                  -
                </button>
                <p>{amount}</p>
                <button
                  className="btn-plus"
                  onClick={() => setAmount(amount + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="btn"
                onClick={() => {
                  addToCart(product, amount);
                }}
              >
                <span className="btn-text">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        <div className="product-con">
          <img src={product.image} alt="" className="product-image" />
        </div>
        <div className="other-products-con">
          <div className="other-product bg1"></div>
          <div className="other-product bg2"></div>
          <div className="other-product bg3"></div>
        </div>
      </div>
    </div>
  );
};

export default ItemView;
