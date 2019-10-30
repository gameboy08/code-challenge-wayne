import { FETCH_AIRPORTS_FAILURE } from "../actions/types";
export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_AIRPORTS_FAILURE: 
            return {
                isError: true,
                message: action.payload
            }
        default:
            return state;
    }
}