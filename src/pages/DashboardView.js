import React, { useContext, useEffect, useState } from 'react';
import { UsersListContext } from '../providers/UsersListProvider';
import { ProductsContext } from '../providers/ProductsProvider';
import { OrdersContext } from '../providers/OrdersProvider';
import dashboard from '../res/dashboard.gif';

const DashboardView = () => {
  const users = useContext(UsersListContext);
  const products = useContext(ProductsContext);
  const orders = useContext(OrdersContext);

  const [numUsers, setNumUsers] = useState(0);
  const [numOrders, setNumOrders] = useState(0);
  const [numPending, setNumPending] = useState(0);
  const [numDelivered, setNumDelivered] = useState(0);
  const [numCanceled, setNumCanceled] = useState(0);
  const [numProducts, setNumProducts] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let i of users) {
      total += 1;
    }
    setNumUsers(total);
  }, [users]);

  useEffect(() => {
    let total = 0;
    for (let i of products) {
      total += 1;
    }
    setNumProducts(total);
  }, [products]);

  useEffect(() => {
    let total = 0;
    let totPending = 0;
    let totDelivered = 0;
    let totCanceled = 0;

    for (let i of orders) {
      total += 1;
      if (i.status == 'Pending') {
        totPending += 1;
      } else if (i.status == 'Delivered') {
        totDelivered += 1;
      } else {
        totCanceled += 1;
      }
    }
    setNumOrders(total);
    setNumCanceled(totCanceled);
    setNumDelivered(totDelivered);
    setNumPending(totPending);
  }, [orders]);

  return (
    <div className="user-list-page">
      <h1 className="dashboard-title">Administrative Dashboard</h1>

      <div className="flex-con">
        <img src={dashboard} alt="dashboard" />

        <div className="dashboard-items">
          <div className="dashboard-card">
            <h4>Users</h4>
            <p>{numUsers}</p>
          </div>

          <div className="dashboard-card">
            <h4>Products</h4>
            <p>{numProducts}</p>
          </div>

          <div className="dashboard-card">
            <h4>Orders</h4>
            <p>{numOrders}</p>
          </div>

          <div className="dashboard-card">
            <h4>Pending Orders</h4>
            <p>{numPending}</p>
          </div>

          <div className="dashboard-card">
            <h4>Delivered Orders</h4>
            <p>{numDelivered}</p>
          </div>

          <div className="dashboard-card">
            <h4>Canceled Orders</h4>
            <p>{numCanceled}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
