import React, { useContext, useState, useEffect } from "react";
import { OrdersContext } from "../providers/OrdersProvider";
import { useLocation } from "react-router-dom";
import OrderCartItem from "../components/OrderCartItem";

const OrderInfoView = () => {
  console.log("yo");
  const orders = useContext(OrdersContext);
  const location = useLocation();
  const pathId = location.pathname.replace("/admin-dashboard/order/", "");

  const [order, setOrder] = useState([]);
  console.log(orders);
  // const [address, setAddress] = useState("")
  // const [cart, setCart] = useState([])
  // const [deliveryLocation, setDeliveryLocation] = useState("")
  // const [name, setName] = useState("")
  const [status, setStatus] = useState("");
  // const [tel, setTel] = useState("")

  useEffect(() => {
    for (let i of orders) {
      if (i.id === pathId) {
        setOrder(i);
      }
    }
  }, [orders]);

  return (
    <div>
      <p>Email: {order.email}</p>
      {console.log(order.email)}
      <h3>Cart</h3>
      {order &&
        order.cart.map((item) => <OrderCartItem key={item.id} item={item} />)}
    </div>
  );
};

export default OrderInfoView;
