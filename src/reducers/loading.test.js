import { START_FETCH_AIRPORTS,
    FETCH_AIRPORTS_SUCCESS,
    FETCH_AIRPORTS_FAILURE } from "../actions/types";
import loading from "./loading";

it('handle actions of type START_FETCH_AIRPORTS', () => {
    const action = {
        type: START_FETCH_AIRPORTS,
    }
    const newState = loading(false, action);
    expect(newState).toEqual(true)
})

it('handle actions of type FETCH_AIRPORTS_SUCCESS', () => {
    const action = {
        type: FETCH_AIRPORTS_SUCCESS,
    }
    const newState = loading(true, action);
    expect(newState).toEqual(false)
})

it('handle actions of type FETCH_AIRPORTS_SUCCESS', () => {
    const action = {
        type: FETCH_AIRPORTS_FAILURE,
    }
    const newState = loading(true, action);
    expect(newState).toEqual(false)
})

it('handles actions with unkown type', () => {
    const newState = loading(false, { type: 'unknown'});
    expect(newState).toEqual(false);
})