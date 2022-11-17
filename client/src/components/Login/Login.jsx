import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
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

    for (const error in errors) {
      if (errors[error].length) {
        setTrigger(true);
        return setMessage("All fields must be filled");
      }
    }

    try {
      const res = await axios.post("http://localhost:3001/login", data);

      setLoading(false);

      if (res.status === 200) {
        document.cookie =
          "userId=" +
          res.data.userId +
          "; path=/;expires=" +
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
          );

        document.cookie =
          "username=" +
          res.data.username +
          "; path=/;expires=" +
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
          );

        navigate("/home");
      } else {
        setLoading(false);
        setTrigger(true);
        setMessage("Email or password are incorrect!");
      }
    } catch {
      setLoading(false);
      setTrigger(true);
      setMessage("Email or password are incorrect!");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="loginContainer">
        {loading ? (
          <div className="innerLoginContainer">
            <Loader />
          </div>
        ) : (
          <div className="innerLoginContainer">
            <h1 className="loginTitle">Login</h1>
            <hr className="loginHr" />
            <form onSubmit={onSubmit}>
              <div className="loginText">
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
                <div className="loginBtnContainer">
                  <input
                    className="pageBtn loginBtn"
                    type="submit"
                    value="Login"
                  />
                  <hr className="loginHr" />
                  <button
                    className="pageBtn loginBtn"
                    onClick={() => navigate("/register")}
                  >
                    Create account
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
      <Popup trigger={trigger} setTrigger={setTrigger}>
        <h4>{message}</h4>
      </Popup>
    </div>
  );
}

export function validate(data) {
  let errors = { ...data };

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  } else {
    errors.email = "";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else {
    errors.password = "";
  }

  return errors;
}

export default Login;
