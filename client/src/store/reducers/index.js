const GET_DOGS = "GET_DOGS";
const DETAILED_DOG = "DETAILED_DOG";
const GET_TEMPERS = "GET_TEMPERS";
const ADD_FAV = "ADD_FAV";
const REMOVE_FAV = "REMOVE_FAV";
const GET_GROUPS = "GET_GROUPS";
const GET_BREDFOR = "GET_BREDFOR";

export const actions = {
  GET_DOGS,
  DETAILED_DOG,
  GET_TEMPERS,
  GET_GROUPS,
  GET_BREDFOR,
  REMOVE_FAV,
  ADD_FAV,
};

const initialState = {
  dogs: [],
  detailed_dog: [],
  tempers: [],
  favorites: [],
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DOGS:
      return { ...state, dogs: payload };
    case DETAILED_DOG:
      return { ...state, detailed_dog: payload };
    case GET_TEMPERS:
      return { ...state, tempers: payload };
    case ADD_FAV:
      return { ...state, favorites: state.favorites.concat(payload) };
    case REMOVE_FAV:
      return {
        ...state,
        favorites: state.favorites.filter((dog) => dog.id !== payload.id),
      };

    default:
      return { ...state };
  }
}

export default reducer;
