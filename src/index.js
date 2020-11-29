import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ProductsProvider from "./providers/ProductsProvider";
import UsersProviders from "./providers/UsersProviders";


ReactDOM.render(
  <React.StrictMode>
    <UsersProviders>
    <ProductsProvider>
      <App />
    </ProductsProvider>
    </UsersProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
