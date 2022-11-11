import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(data);
  const [trigger, setTrigger] = useState(false);
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  };

  useEffect(() => {
    console.log(document.cookie);
    if (document.cookie.includes("userId")) navigate("/home");
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const error in errors) {
        if (errors[error].length) {
          setTrigger(true);
          return setMessage("All fields must be filled correctly");
        }
      }

      const res = await axios.post("http://localhost:3001/register", data);

      if (res.status === 201) {
        setTrigger(true);
        setMessage("Welcome to the party");
      }
    } catch (error) {
      setTrigger(true);
      if (error.response.data.includes("username")) {
        setMessage("Username is already in use");
      } else if (error.response.data.includes("email")) {
        setMessage("Email is already in use");
      } else {
        setMessage("There was an error registering");
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <h3>Username:</h3>
        <input
          onChange={handleOnChange}
          type="username"
          name="username"
          placeholder="User"
          required
        />
        <p>{errors.username}</p>
        <h3>Email:</h3>
        <input
          onChange={handleOnChange}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <p>{errors.email}</p>
        <h3>Password:</h3>
        <input
          onChange={handleOnChange}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <p>{errors.password}</p>
        <input type="submit" value="Register" />
      </form>
      <button onClick={() => navigate("/login")}>Log in</button>
      <Popup trigger={trigger} setTrigger={setTrigger}>
        <h3>{message}</h3>
      </Popup>
    </div>
  );
}

export function validate(data) {
  let errors = { ...data };

  if (!data.username) errors.username = "Username is required";
  else errors.username = "";

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  } else {
    errors.email = "";
  }
  if (!data.password) {
    errors.password = "Password is required";
  } else if (!/\d/.test(data.password)) {
    errors.password = "Password must have a number";
  } else if (data.password.length < 8) {
    errors.password = "Password must be longer than 8 characters";
  } else {
    errors.password = "";
  }

  return errors;
}

export default Register;
