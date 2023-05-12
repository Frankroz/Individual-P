import axios from "axios";
import { actions } from "../reducers";

export const getDogs = () => async (dispatch) => {
  try {
    const res = await axios.get("https://individual-pback-production.up.railway.app/dogs");
    dispatch({ type: actions.GET_DOGS, payload: res.data });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getDetailedDog = (id) => async (dispatch) => {
  try {
    const res = await axios.get("https://individual-pback-production.up.railway.app/dogs/" + id);
    dispatch({ type: actions.GET_DOGS, payload: res.data });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getTempers = () => async (dispatch) => {
  try {
    const res = await axios.get("https://individual-pback-production.up.railway.app/temperaments");
    dispatch({ type: actions.GET_TEMPERS, payload: res.data });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addToFav = (dog) => {
  return { type: actions.ADD_FAV, payload: dog };
};

export const remFromFav = (dog) => {
  return { type: actions.REMOVE_FAV, payload: dog };
};

export const removeAllFavs = () => {
  return { type: actions.REMOVE_ALL_FAV}
}
