import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";


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
    if (input.email !== "" && input.password !== "") {
      if (auth.loginAction(input)){
        navigate("/dashboard")
      } else{
        setIncorrect(true)
        setInput((prev) => ({...prev,  password: "",}))
      }
      return;
    }
    alert("pleae provide a valid input");
  };

  const handleHide = (e) => {
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
    <Form method="post" id="login-form">
      <div className="form_control">
        <label htmlFor="user-email">Email:</label>
        <input
          type="email"
          id="user-email"
          name="email"
          placeholder="example@yahoo.com"
          aria-describedby="user-email"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-email" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <button onClick={handleHide}>
          {showPassword ? "Hide" : "Show"}
        </button>
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
      {incorrect ? <p className="error">Incorrect information. Please try again</p> : ""}
    </Form>
  );
};

export default Login;