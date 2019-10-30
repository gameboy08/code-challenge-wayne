import React from "react";
import { mount } from "enzyme";
import DetailsPage from "./DetailsPage";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import { airport } from "../utils/mockData";
import MapComponent from "../ui/MapComponent";
import ErrorContent from "../ui/ErrorContent";


const props = {
  history: {push: jest.fn()},
  handleClick: jest.fn(),
  airport
};

let wrapped = null;
describe("DetailsPage component", () => {
  afterEach(() => {
    wrapped.unmount();
  });
  it("when passing airport as prop", () => {
    wrapped = mount(
      <Provider
        store={configureStore({
          details: props.airport
        })}
      >
        <DetailsPage history={props.history} handleClick={props.handleClick} />
      </Provider>
    );
    //   console.log("wrapped.find('.info-wrapper').get(0).props", wrapped.find('.info-wrapper').get(2).props)

    expect(wrapped.find(".info-wrapper").length).toEqual(4);
    expect(wrapped.render().text()).toContain(airport.airportName);
    expect(wrapped.render().text()).toContain(airport.country.countryName);
    expect(wrapped.find(MapComponent)).toHaveLength(1);
    
    wrapped.find('button').simulate('click');
    expect(props.handleClick.mock.calls.length).toBe(1)
    expect(props.history.push.mock.calls.length).toBe(1)
  });

  it("when airport port is missing", () => {
    wrapped = mount(
      <Provider store={configureStore({})}>
        <DetailsPage history={props.history} handleClick={props.handleClick} />
      </Provider>
    );
    expect(wrapped.find(ErrorContent)).toHaveLength(1);
  });

  it("hide map when there is no location", () => {
      const newMockData = {...airport};
      newMockData.location = {
        latitude: 0,
        longitude: 0,
        latitudeDirection: null,
        longitudeDirection: null
      }
      wrapped = mount(
        <Provider
          store={configureStore({
            details: newMockData
          })}
        >
          <DetailsPage history={props.history} handleClick={props.handleClick} />
        </Provider>
      );

      expect(wrapped.find(MapComponent)).toHaveLength(0)
  })
});
