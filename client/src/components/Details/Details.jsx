import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NoPage from "../NoPage/NoPage";
import EditPopup from "../EditPopup/EditPopup";
import DeletePrompt from "../DeletePrompt/DeletePrompt";
import Popup from "../Popup/Popup";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToFav, remFromFav } from "../../store/actions";

function Details() {
  const params = useParams();
  const dogs = useSelector((state) => state.dogs);
  const dog = dogs.filter((dog) => parseInt(dog.id) === parseInt(params.id))[0];
  const [trigger, setTrigger] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleOnClick = () => {
    const button = document.getElementById(dog.name + dog.id);
    if (!button.className) {
      button.className = "addedToFavs";
      dispatch(addToFav(dog));
    } else {
      button.className = "";
      dispatch(remFromFav(dog));
    }
  };

  const handleOnDelete = async () => {
    setDeleteTrigger(false);
    try {
      const res = await axios.delete("http://localhost:3001/dogs/" + dog.id);

      if (res.status === 204) {
        setPopupTrigger(true);
        setMessage("Successfully deleted");
      } else {
        setPopupTrigger(true);
        setMessage("There was an error during the process");
      }
    } catch (error) {
      setPopupTrigger(true);
      setMessage("There was an error during the process");
    }
  };

  if (dog) {
    return (
      <div>
        <img src={dog.image.url ? dog.image.url : dog.image} alt={dog.name} />
        <h2>{dog.name}</h2>
        <h4>
          {(dog.height.imperial ? dog.height.imperial : dog.height) + " inch"}
        </h4>
        <h4>
          {(dog.weight.imperial ? dog.weight.imperial : dog.weight) + " lbs"}
        </h4>
        <h3>
          {dog.life_span.includes("years")
            ? dog.life_span
            : dog.life_span + " years"}
        </h3>
        <button
          className={
            document.getElementById(dog.name + dog.id)
              ? document.getElementById(dog.name + dog.id).className
              : ""
          }
          onClick={handleOnClick}
          id={dog.name + dog.id}
        >
          <FaHeart size={49} />
        </button>
        <p>{dog.temperament}</p>
        <div>
          {dog.hasOwnProperty("temperaments") ? (
            <div>
              <button onClick={() => setTrigger(true)}>Edit</button>
              <button onClick={() => setDeleteTrigger(true)}>Delete</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <EditPopup dog={dog} trigger={trigger} setTrigger={setTrigger} />
        <DeletePrompt
          trigger={deleteTrigger}
          setTrigger={setDeleteTrigger}
          handleOnDelete={handleOnDelete}
        />
        <Popup trigger={popupTrigger} setTrigger={setPopupTrigger}>
          <h3>{message}</h3>
        </Popup>
      </div>
    );
  } else {
    return (
      <div>
        <NoPage />
      </div>
    );
  }
}

export default Details;
