import React from "react";

function Popup(props) {
  return props.trigger ? (
    <div>
      <div>
        <button onClick={() => props.setTrigger(false)}>X</button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
