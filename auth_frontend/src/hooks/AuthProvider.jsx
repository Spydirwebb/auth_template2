import { useState } from "react";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import db from './TestData'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    db.users.find(user => {
      return localStorage.getItem("userId") === user.id
    }) || null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
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
      //console.log("Active user: "+ activeUser.name)
      
      // set User
      setUser(activeUser)
      localStorage.setItem("userId", activeUser.id)

      // set token
      var token = generateToken(activeUser.email)
      setToken(token)
      localStorage.setItem("site", token)
      
      //console.log(localStorage.getItem("site"))

      // navigate away
      //navigate("/dashboard");
      return true
    } catch(err) {
      console.error(err)
      return false
    }
  };

  // call this function to sign out logged in user
  const logoutAction = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
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