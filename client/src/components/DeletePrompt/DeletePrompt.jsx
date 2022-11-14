import React from "react";
import "./DeletePrompt.css"

function DeletePrompt({ trigger, setTrigger, handleOnDelete }) {
  return trigger ? (
    <div className="deletePromptContainer">
      <div className="deletePromptInnerContainer">
        <button className="popupCloseBtn" onClick={() => setTrigger(false)}>
          X
        </button>
        <h2>Are you sure you want to delete this info?</h2>
        <div className="deletePmtBtns">
          <button className="noBtn" onClick={() => setTrigger(false)}>No</button>
          <button className="okBtn" onClick={handleOnDelete}>Ok</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DeletePrompt;
