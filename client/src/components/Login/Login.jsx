import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import { addToFav, addToFavFromDB } from "../../store/actions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
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
    if (document.cookie.includes("userId")) navigate("/home");
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    for (const error in errors) {
      if (errors[error].length) {
        setTrigger(true);
        return setMessage("All fields must be filled")
      }
    }
    
    try {
      const res = await axios.post("http://localhost:3001/login", data);
      if (res.status === 200) {
        console.log(
          "userId=" +
            res.data.userId +
            "; path=/; expires=" +
            new Date(
              new Date().getUTCFullYear(),
              new Date().getUTCMonth(),
              12,
              new Date().getUTCHours() + 1
            ).toUTCString()
        );
        document.cookie =
          "userId=" +
          res.data.userId +
          "; path=/; expires=" +
          new Date(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            12,
            new Date().getUTCHours() + 1
          ).toUTCString();

        document.cookie =
          "username=" +
          res.data.username +
          "; expires=" +
          new Date(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            12,
            new Date().getUTCHours() + 1
          ).toUTCString() +
          "; path=/";

        try {
          let saved_localStorage = localStorage.getItem("favorites");

          if (saved_localStorage) {
            saved_localStorage = JSON.parse(saved_localStorage);

            for (const dog of saved_localStorage) {
              dispatch(addToFav(dog));
            }
          }

          localStorage.removeItem("favorites");

          const saved_db = await axios.get("http://localhost:3001/favorites", {
            params: {
              userId: res.data.userId,
            },
          });

          if (saved_db.status === 200) {
            for (const dog of saved_db.data) {
              addToFavFromDB(dog)(dispatch);
            }
          }
        } catch (err) {
          console.log(err);
        }

        //navigate("/home");
      } else {
        setTrigger(true);
        setMessage("Email or password are incorrect!");
      }
    } catch {
      setTrigger(true);
      setMessage("Email or password are incorrect!");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
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
        <input type="submit" value="Login" />
      </form>
      <button onClick={() => navigate("/register")}>Register</button>
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
