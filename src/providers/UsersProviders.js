import React, { useState, useEffect, createContext } from "react";
import { auth } from "../firebase";
import { collectIdAndDocs } from "../utilities";

export const UsersContext = createContext();
const UsersProviders = (props) => {
  const [user,setUser] = useState("");
  useEffect(()=> {
    async function userLogin(){
      auth.onAuthStateChanged(user => {
        setUser(user)
      })
    } 
    userLogin()
    console.log(user);
  },[])
  return (
    <UsersContext.Provider value={[user,setUser]}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProviders;
