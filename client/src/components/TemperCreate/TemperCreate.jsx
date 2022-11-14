import React from "react";
import "./TemperCreate.css"

function Temper_Creation({ onClose, id, text }) {
  return (
    <div className="temperContainer">
      <button className="temperCloseBtn" onClick={() => onClose(id)}>X</button>
      <label className="temperDesc" htmlFor="">{text}</label>
    </div>
  );
}

export default Temper_Creation;
