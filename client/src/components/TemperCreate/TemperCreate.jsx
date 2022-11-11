import React from "react";

function Temper_Creation({ onClose, id, text }) {
  return (
    <div>
      <button onClick={() => onClose(id)}>X</button>
      <label htmlFor="">{text}</label>
    </div>
  );
}

export default Temper_Creation;
