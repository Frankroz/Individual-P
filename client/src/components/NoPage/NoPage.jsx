import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./NoPage.css";

function NoPage() {
  return (
    <div>
      <NavBar />
      <div className="noPageContainer">
        <div className="innerNoPageContainer">
          <h1 className="noPageTitle">404</h1>
          <h2 className="noPageMsg">Opps! Seems we don't have that info</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NoPage;
