import axios from "axios";
import { actions } from "../reducers";

export const getDogs = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/dogs");
    dispatch({ type: actions.GET_DOGS, payload: res.data });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getDetailedDog = (id) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/dogs/" + id);
    dispatch({ type: actions.GET_DOGS, payload: res.data });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getTempers = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/temperaments");
    dispatch({ type: actions.GET_TEMPERS, payload: res.data });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addToFav = (dog) => async (dispatch) => {
  if (document.cookie.length) {
    const cookies = document.cookie?.split("; ");
    const userId = cookies[0].split("=")[1];
    try {
      await axios.post("http://localhost:3001/favorites", {
        userId: parseInt(userId),
        dogId: dog.id,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    let saved_favorites = localStorage.getItem("favorites");
    if (saved_favorites) {
      saved_favorites = JSON.parse(saved_favorites);
      saved_favorites.push(dog);

      localStorage.setItem("favorites", JSON.stringify(saved_favorites));
    } else {
      localStorage.setItem("favorites", JSON.stringify([dog]));
    }
  }

  dispatch({ type: actions.ADD_FAV, payload: dog });
};

export const remFromFav = (dog) => async (dispatch) => {
  let saved_favorites = JSON.parse(localStorage.getItem("favorites"));

  saved_favorites = saved_favorites.filter(
    (saved_dog) => saved_dog.id !== dog.id
  );

  localStorage.setItem("favorites", JSON.stringify(saved_favorites));

  console.log(localStorage.getItem("favorites"));

  dispatch({ type: actions.REMOVE_FAV, payload: dog });
};

export const addToFavFromDB = (dog) => {
  return { type: actions.ADD_FAV, payload: dog };
};
