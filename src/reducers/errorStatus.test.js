import { FETCH_AIRPORTS_FAILURE } from "../actions/types";
import errorStatus from "./errorStatus";

it('handle actions of type FETCH_AIRPORTS_FAILURE', () => {
    const action = {
        type: FETCH_AIRPORTS_FAILURE,
        payload: "Network Error"
    }
    const newState = errorStatus({}, action);
    expect(newState).toEqual({
        isError: true,
        message: "Network Error"
    })
})

it('handles actions with unkown type', () => {
    const newState = errorStatus({}, { type: 'unknown'});
    expect(newState).toEqual({});
})