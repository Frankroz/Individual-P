import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import "./Register.css"

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
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
    if (document.cookie.includes("userId")) navigate("/home");
  }, [navigate]);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      for (const error in errors) {
        if (errors[error].length) {
          setTrigger(true);
          return setMessage("All fields must be filled correctly");
        }
      }

      const res = await axios.post("http://localhost:3001/register", data);

      setLoading(false);
      if (res.status === 201) {
        console.log(res.data)
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
      setLoading(false)
    }
  };

  return (
    <div>
      <NavBar />
      <div className="loginContainer">
        {loading ? (
          <div className="innerRegisterContainer">
            <Loader />
          </div>
        ) : (
          <div className="innerRegisterContainer">
            <h1 className="loginTitle">Register</h1>
            <hr className="loginHr" />
            <form onSubmit={onSubmit}>
              <div className="loginText">
                <div className="detailLabelContainer">
                  <h3 className="detailLabel">Username:</h3>
                  <input
                    className="detailDesc"
                    onChange={handleOnChange}
                    type="username"
                    name="username"
                    placeholder="User"
                    required
                  />
                </div>
                <p className="errorMsg">{errors.username}</p>
                <div className="detailLabelContainer">
                  <h3 className="detailLabel">Email:</h3>
                  <input
                    className="detailDesc"
                    onChange={handleOnChange}
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <p className="errorMsg">{errors.email}</p>
                <div className="detailLabelContainer">
                  <h3 className="detailLabel">Password:</h3>
                  <input
                    className="detailDesc"
                    onChange={handleOnChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <p className="errorMsg">{errors.password}</p>
                <input className="pageBtn loginBtn" type="submit" value="Register" />
              </div>
            </form>
            <hr className="loginHr" />
            <button className="pageBtn loginBtn" onClick={() => navigate("/login")}>Log in</button>
          </div>
        )}
      </div>
      <Footer />
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
