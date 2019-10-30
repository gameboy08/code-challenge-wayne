import { selectAirport } from "./index";
import { airport } from "../utils/mockData";
import {
  SELECT_AIRPORT
} from "./types";

describe("selectAirport", () => {
  it("has the correct type", () => {
    const action = selectAirport();

    expect(action.type).toEqual(SELECT_AIRPORT);
  });

  it("has the correct payload", () => {
    const action = selectAirport(airport);
    expect(action.payload.airportCode).toEqual("AAA");
  });
});


