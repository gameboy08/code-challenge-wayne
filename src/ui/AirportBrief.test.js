import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AirportBrief from "./AirportBrief";
// import { Provider } from "react-redux";
// import configureStore from "../configureStore";
import { airport } from "../utils/mockData";

const props = {
  selectAirport: jest.fn(),
  handleClick: jest.fn(),
  airport
};
let wrapped = null;

describe("AirportBrief component", () => {
  beforeEach(() => {
    wrapped = mount(
      <Router>
        <AirportBrief
          selectAirport={props.selectAirport}
          handleClick={props.handleClick}
          airport={props.airport}
        />
      </Router>
    );
  });
  afterEach(() => {
    wrapped.unmount();
  });

  it("render airport name and country", () => {
    expect(wrapped.render().text()).toContain(airport.airportName);
    expect(wrapped.render().text()).toContain(airport.country.countryName);
  });

  it('click link', () => {
      wrapped.find(Link).simulate('click')
      expect(props.handleClick.mock.calls.length).toBe(1)
      expect(props.selectAirport.mock.calls.length).toBe(1)
      expect(wrapped.find(Link).props().to).toEqual(`/airport/${props.airport.airportCode}`)
  })
});
