import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import "./About.css";

function About() {
  return (
    <div>
      <NavBar />
      <div className="aboutContainer">
        <h2 className="aboutTiltle">About</h2>
        <br />
        <p className="aboutP">
          This app was created thanks to Henry and the knowledge that they
          bring.
        </p>
        <br />
        <p className="aboutP">
          You will be able to check a lot of dog breeds, and if you cannot find
          the one you're looking for, add it to the database so other people can
          enjoy of having this information
        </p>
        <br />
        <h2 className="aboutTiltle">Author</h2>
        <p className="aboutP">
          This website was created by Francisco Rodriguez, you can check my
          social media info on the bottom of each page.
        </p>
        <p className="aboutP">Hope you enjoy this app</p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
