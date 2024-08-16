import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateToken } from "./functions";
import db from './TestData.json'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    db.users.find(user => {
      return localStorage.getItem("userId") === user.id
    }) || null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  
  const loginAction = (data) => {
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

  }
  /*
  const loginAction = async (data) => {
    try {
      console.log("form loginAction")
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };
  */

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("userId")
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};