import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ProductsProvider from "./providers/ProductsProvider";
import UsersListProvider from "./providers/UsersListProvider";
import UsersProviders from "./providers/UsersProviders";

ReactDOM.render(
  <React.StrictMode>
    <UsersListProvider>
      <UsersProviders>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </UsersProviders>
    </UsersListProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
