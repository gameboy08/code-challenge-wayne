import { SELECT_AIRPORT } from "../actions/types";
export default function (state = {}, action) {
    switch (action.type) {
        case SELECT_AIRPORT: 
            return action.payload
        default:
            return state;
    }
}