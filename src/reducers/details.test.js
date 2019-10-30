import { SELECT_AIRPORT } from "../actions/types";
import details from "./details";
import { airport as mockAirportData } from "../utils/mockData";

it('handle actions of type SELECT_AIRPORT', () => {
    const action = {
        type: SELECT_AIRPORT,
        payload: mockAirportData
    }
    const newState = details({}, action);
    expect(newState).toEqual(mockAirportData)
})

it('handles actions with unkown type', () => {
    const newState = details({}, { type: 'unknown'});
    expect(newState).toEqual({});
})