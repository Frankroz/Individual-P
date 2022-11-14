import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <div className="footerContainer">
      <h3 className="footerTitle">{"© " + new Date().getFullYear()}</h3>
      <span className="footerSep">•</span>
      <button
        onClick={() =>
          window.open("https://linkedin.com/in/francisco-rodriguez-793039248")
        }
        className="footerBtn"
      >
        <FaLinkedin />
      </button>
      <span className="footerSep">•</span>
      <button
        onClick={() => window.open("www.github.com/Frankroz")}
        className="footerBtn"
      >
        <FaGithub />
      </button>
    </div>
  );
}

export default Footer;
