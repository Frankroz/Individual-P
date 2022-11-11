import React from "react";
import landingImg from "../img/landingImg.jpg";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <img src={landingImg} alt="landingImg" />
      <div>
        <h1>Welcome to MonsterDog</h1>
        <button
          onClick={() => {
            navigate("/home");
          }}
        >
          Let's beginning
        </button>
        <button
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
