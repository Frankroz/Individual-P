import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import icon from "../img/icon.png";
import "./NavBar.css";
import {removeAllFavs} from "../../store/actions"

function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  return (
    <div className="navBarContainer">
      <div className="leftNavBar">
        <img
          onClick={() => navigate("/")}
          className="logo"
          src={icon}
          alt="logo"
        />
        <h2 onClick={() => navigate("/")} className="navBarTitle">
          Monster Dog
        </h2>
        <button className="logBtn" onClick={() => navigate("/home")}>
          Home
        </button>
      </div>
      {document.cookie ? (
        <div className="rightNavBar">
          <button
            className="logBtn"
            onClick={() => {
              var cookies = document.cookie.split(";");

              for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie =
                  name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                navigate("/login");
              }

              dispatch(removeAllFavs())
            }}
          >
            Logout
          </button>
          <button className="logBtn" onClick={() => navigate("/favorites")}>
            Favorites
          </button>
        </div>
      ) : (
        <div className="rightNavBar">
          <button className="logBtn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="logBtn" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
