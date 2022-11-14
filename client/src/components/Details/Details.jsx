import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NoPage from "../NoPage/NoPage";
import EditPopup from "../EditPopup/EditPopup";
import DeletePrompt from "../DeletePrompt/DeletePrompt";
import Popup from "../Popup/Popup";
import axios from "axios";
import { FaHeart, FaEdit, FaTrashAlt } from "react-icons/fa";
import { addToFav, remFromFav } from "../../store/actions";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./Details.css";

function Details() {
  const params = useParams();
  const favorites = useSelector((state) => state.favorites);
  const dogs = useSelector((state) => state.dogs);
  const dog = dogs.filter((dog) => parseInt(dog.id) === parseInt(params.id))[0];
  const [trigger, setTrigger] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleOnClick = () => {
    const button = document.getElementById(dog.name + dog.id);
    if (button.className === "addToFavsBtn") {
      button.className = "addedToFavs";
      dispatch(addToFav(dog));
    } else {
      button.className = "addToFavsBtn";
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
        <NavBar />
        <div className="detailContainer">
          <div className="innerDetailContainer">
            <div className="detailImgContainer">
              <img
                className="detailImg"
                src={dog.image.url ? dog.image.url : dog.image}
                alt={dog.name}
              />
            </div>
            <div className="detailTextContiner">
              <div className="detailHeader">
                <h2 className="detailTitle">{dog.name}</h2>

                {document.cookie ? (
                  <button
                    className={
                      favorites.includes(dog) ? "addedToFavs" : "addToFavsBtn"
                    }
                    onClick={handleOnClick}
                    id={dog.name + dog.id}
                  >
                    <FaHeart size={40} />
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="detailLabelContainer">
                <p className="detailLabel">Height:</p>
                <p>
                  {(dog.height.imperial ? dog.height.imperial : dog.height) +
                    " inch"}
                </p>
              </div>
              <div className="detailLabelContainer">
                <p className="detailLabel">Weight:</p>
                <p>
                  {(dog.weight.imperial ? dog.weight.imperial : dog.weight) +
                    " lbs"}
                </p>
              </div>
              <div className="detailLabelContainer">
                <p className="detailLabel">Life span:</p>
                <p className="detailDesc">
                  {dog.life_span.includes("years")
                    ? dog.life_span
                    : dog.life_span + " years"}
                </p>
              </div>
              <div className="detailLabelContainer">
                <p className="detailLabel">Life span:</p>
                <p className="detailDesc">{dog.temperament}</p>
              </div>
              <div>
                {dog.hasOwnProperty("temperaments") ? (
                  <div className="editDeleteBtnContainer">
                    <button
                      className="detailEditBtn"
                      onClick={() => setTrigger(true)}
                    >
                      Edit <FaEdit />
                    </button>
                    <button
                      className="detailDeleteBtn"
                      onClick={() => setDeleteTrigger(true)}
                    >
                      Delete
                      <FaTrashAlt />
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
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

        <Footer />
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
