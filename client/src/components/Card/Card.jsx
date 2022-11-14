import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, remFromFav } from "../../store/actions";
import "./Card.css";

function Card({ dog }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

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

  return (
    <div className="cardContainer">
      <Link className="cardInfo" to={"/dog/" + dog.id}>
        <div className="cardImgContainer">
          <img
            className="cardImg"
            src={dog.image.url ? dog.image.url : dog.image}
            alt={dog.name}
          />
          <h2 className="cardName">{dog.name}</h2>
        </div>
        <div className="cardText">
          <h4 className="cardWeight">
            {(dog.weight.imperial ? dog.weight.imperial : dog.weight) + " lbs"}
          </h4>
          <p className="cardTempers">{dog.temperament}</p>
        </div>
      </Link>
      <div className="loveBtn">
        {document.cookie ? (
          <button
            className={favorites.includes(dog) ? "addedToFavs" : "addToFavsBtn"}
            onClick={handleOnClick}
            id={dog.name + dog.id}
          >
            <FaHeart size={40} />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Card;
