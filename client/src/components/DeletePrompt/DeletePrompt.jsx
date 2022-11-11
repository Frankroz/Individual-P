import React from "react";

function DeletePrompt({ trigger, setTrigger, handleOnDelete }) {
  return trigger ? (
    <div>
      <div>
        <button onClick={() => setTrigger(false)}>X</button>
        <h2>Are you sure you want to delete this info?</h2>
        <div>
          <button onClick={() => setTrigger(false)}>No</button>
          <button onClick={handleOnDelete}>Ok</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DeletePrompt;
