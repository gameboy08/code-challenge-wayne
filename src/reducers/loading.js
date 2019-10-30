import {
  START_FETCH_AIRPORTS,
  FETCH_AIRPORTS_SUCCESS,
  FETCH_AIRPORTS_FAILURE
} from "../actions/types";
export default function(state = false, action) {
  switch (action.type) {
    case START_FETCH_AIRPORTS:
      return true;
    case FETCH_AIRPORTS_SUCCESS:
    case FETCH_AIRPORTS_FAILURE:
      return false;
    default:
      return state;
  }
}
