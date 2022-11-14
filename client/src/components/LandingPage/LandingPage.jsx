import React from "react";
import landingImg from "../img/landingImg.jpg";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landingContainer">
      <div className="imageContainer">
        <img src={landingImg} alt="landingImg" className="landingImg" />
      </div>
      <div className="innerLandingContainer">
        <div className="innerInnerText">
          <div className="textContainer">
            <h1 className="landingTitle">Welcome to</h1>
            <h1 className="landingSecondTitle">Monster Dog</h1>
          </div>
          <div className="btnContainer">
            <button
              className="landingBtn"
              onClick={() => {
                navigate("/home");
              }}
            >
              Let's beginning
            </button>
            <button
              className="landingBtn"
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
