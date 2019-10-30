import axios from "axios";
import {
  START_FETCH_AIRPORTS,
  FETCH_AIRPORTS_SUCCESS,
  FETCH_AIRPORTS_FAILURE,
  SELECT_AIRPORT
} from "./types";
export const fetchAirports = () => async dispatch => {
  try {
    dispatch({
      type: START_FETCH_AIRPORTS
    });
    const results = await axios.get(
      "https://api.qantas.com/flight/refData/airport"
    );
    // console.log("results", results);
    if (results.status === 200) {
      dispatch({
        type: FETCH_AIRPORTS_SUCCESS,
        payload: results.data
      });
    } else {
      dispatch({
        type: FETCH_AIRPORTS_FAILURE,
        payload: "Network error"
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_AIRPORTS_FAILURE,
      payload: "Network error"
    });
  }
};

export const selectAirport = airport => {
  if(airport) {
    localStorage.setItem("currentDetails", JSON.stringify(airport));
  }
  return {
    type: SELECT_AIRPORT,
    payload: airport
  }
};
