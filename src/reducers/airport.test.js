import { FETCH_AIRPORTS_SUCCESS } from "../actions/types";
import airports from "./airports";
import { airport as mockAirportData } from "../utils/mockData";

it('handle actions of type FETCH_AIRPORTS_SUCCESS', () => {
    const action = {
        type: FETCH_AIRPORTS_SUCCESS,
        payload: [mockAirportData]
    }
    const newState = airports([], action);
    expect(newState).toEqual([mockAirportData])
})

it('handles actions with unkown type', () => {
    const newState = airports([], { type: 'unknown'});
    expect(newState).toEqual([]);
})