import React, { useState, useEffect, createContext } from 'react';
import { auth, createUserProfileDoc } from '../firebase';
import { collectIdAndDocs } from '../utilities';

export const UsersContext = createContext();
const UsersProviders = (props) => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDoc(userAuth);
      setUser(user);
    });
    console.log('Test');
    return () => unsubcribe();
  }, [auth]);
  console.log(user);
  return (
    // <UsersContext.Provider value={[user, setUser]}>
    <UsersContext.Provider value={user}>{props.children}</UsersContext.Provider>
  );
};

export default UsersProviders;
