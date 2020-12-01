import React, { useState, useEffect, createContext } from "react";
import { firestore } from "../firebase";
import { collectIdAndDocs } from "../utilities";

export const UsersListContext = createContext();

const UsersListProvider = (props) => {
  const [usersList, setUsersList] = useState([]);
  let unsubscribe = null;
  useEffect(() => {
    async function fetchProducts() {
      unsubscribe = firestore.collection("users").onSnapshot((snapshot) => {
        const users = snapshot.docs.map(collectIdAndDocs);
        setUsersList(users);
        console.log(users);
      });
    }

    fetchProducts();
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <UsersListContext.Provider value={usersList}>
      {props.children}
    </UsersListContext.Provider>
  );
};

export default UsersListProvider;
