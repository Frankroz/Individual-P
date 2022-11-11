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

export const addToFav = (dog) => {
  return { type: actions.ADD_FAV, payload: dog };
};

export const remFromFav = (dog) => {
  return { type: actions.REMOVE_FAV, payload: dog };
};
