import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, remFromFav } from "../../store/actions";

function Card({ dog }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const handleOnClick = () => {
    const button = document.getElementById(dog.name + dog.id);
    if (!button.className) {
      button.className = "addedToFavs";
      addToFav(dog)(dispatch);
    } else {
      button.className = "";
      dispatch(remFromFav(dog));
    }
  };

  return (
    <div>
      <Link to={"/dog/" + dog.id}>
        <img src={dog.image.url ? dog.image.url : dog.image} alt={dog.name} />
        <h2>{dog.name}</h2>
        <h4>
          {(dog.weight.imperial ? dog.weight.imperial : dog.weight) + " lbs"}
        </h4>
        <p>{dog.temperament}</p>
      </Link>
      <button
        className={favorites.includes(dog) ? "addedToFavs" : ""}
        onClick={handleOnClick}
        id={dog.name + dog.id}
      >
        <FaHeart size={49} />
      </button>
    </div>
  );
}

export default Card;
