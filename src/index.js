import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ProductsProvider from "./providers/ProductsProvider";
import UsersListProvider from "./providers/UsersListProvider";
import UsersProviders from "./providers/UsersProviders";
import "regenerator-runtime/runtime";
import OrdersProvider from "./providers/OrdersProvider";
ReactDOM.render(
  <React.StrictMode>
    <UsersListProvider>
      <UsersProviders>
        <ProductsProvider>
          <OrdersProvider>
            <App />
          </OrdersProvider>
        </ProductsProvider>
      </UsersProviders>
    </UsersListProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
