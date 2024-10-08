import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [incorrect, setIncorrect] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const auth = useAuth();
  const navigate = useNavigate()

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    //console.log(input)
    if (input.email !== "" && input.password !== "") {
      auth.loginAction(input)
        .then((response) => {
          console.log(response)
          if (response){
            navigate("/dashboard")
          } else{
            setIncorrect(true)
            setInput((prev) => ({...prev,  password: "",}))
          }
        }
        )

      
      return;
    }
    alert("please provide a valid input");
  };

  const handleTogglePassword= (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }


  const handleInput = (e) => {
    const { name, value } = e.target;
    
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <form onSubmit={handleSubmitEvent} id="login-form">
        <label htmlFor='user-email'>Email: </label>
        <input
          id='user-email'
          placeholder="example@yahoo.com"
          aria-label='email address'
          type='email'
          name='email'
          onChange={handleInput}
        />
        <div>
          <label htmlFor='user-password'>Password:</label>
          <input
            id='user-password'
            aria-label='user password'
            type={showPassword ? "text" : "password"}
            name='password'
            value={input.password}
            onChange={handleInput}
          />
          <button onClick={handleTogglePassword}>{showPassword ? "Hide" : "Show"}</button>
         </div>
        <button type="submit">Log In</button>
      </form>
      <button onClick={auth.logoutAction}>Logout</button>
      <p hidden={!incorrect}>Incorrect sign on information. Try again</p>
    </div>
  )
}

export default Login