import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ItemView from './pages/ItemView';
import CatalogView from './pages/CatalogView';
import CartView from './pages/CartView';
import AdminDashboardView from './pages/AdminDashboardView';
import CheckoutOrderView from './pages/CheckoutOrderView';
import CheckoutGuestOrderView from './pages/CheckoutGuestOrderView';
import CustomerOrdersView from './pages/CustomerOrdersView';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <CatalogView exact path="/" />
          <CartView exact path="/cart" />
          <ItemView exact path="/product/:id" />
          <AdminDashboardView path="/admin-dashboard" />
          <CheckoutGuestOrderView exact path="/checkout/guest" />
          <CheckoutOrderView path="/checkout" />
          <CustomerOrdersView exact path="/orders/:id" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
