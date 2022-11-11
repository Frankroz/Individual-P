import React from "react";
import { useNavigate } from "react-router-dom";

function NoPage() {
  const navigate = useNavigate();
  return (
    <div>
      <br />
      <h2>Opps! Seems we don't have that info</h2>

      <button onClick={() => navigate("/home")}>Go back to home</button>
    </div>
  );
}

export default NoPage;
