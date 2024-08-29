import { useState } from "react";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {generateToken} from './functions'
import db from './TestData'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    db.users.find(user => {
      return sessionStorage.getItem("userId") === user.id
    }) || null);
  const [token, setToken] = useState(sessionStorage.getItem("site") || "");
  const navigate = useNavigate();
  
  // call this function when you want to authenticate the user
  const loginAction = async (data) => {
    try{
      // find user based on email
      var activeUser = db.users.find(user => {
        if((user.email === data.email) && (user.password === data.password)){
          return user
        } else {
          throw new Error("Incorrect sign on information");
        }
      })
    }catch(err) {
      console.error(err)
      return false
    }

    console.log("Active user: "+ activeUser.name)
    
    if(activeUser){
      // set User
      setUser(activeUser)
      sessionStorage.setItem("userId", activeUser.id)

      // set token
      var token = generateToken(activeUser.email)
      setToken(token)
      sessionStorage.setItem("site", token)
      
      //console.log(sessionStorage.getItem("site"))

      // navigate away
      //navigate("/dashboard");
      return true
    }
  }

  // call this function to sign out logged in user
  const logoutAction = () => {
    setUser(null);
    setToken("");
    sessionStorage.removeItem("site");
    sessionStorage.removeItem("userId")
    console.log(user)
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loginAction,
      logoutAction,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};