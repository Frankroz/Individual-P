import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div>
          <img src="../img/icon.png" alt="logo" />
          <button onClick={() => navigate("/home")}>Home</button>
        </div>
      </div>
      {document.cookie ? (
        <div>
          <button onClick={() => (document.cookie = "")}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
