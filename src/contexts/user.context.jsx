import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const stateValue = { currentUser, setCurrentUser };

  //signOutUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={stateValue}>{children}</UserContext.Provider>
  );
};
