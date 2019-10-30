import { FETCH_AIRPORTS_SUCCESS } from "../actions/types";
export default function (state = [], action) {
    switch (action.type) {
        case FETCH_AIRPORTS_SUCCESS: 
            return [...state, ...action.payload]
        default:
            return state;
    }
}