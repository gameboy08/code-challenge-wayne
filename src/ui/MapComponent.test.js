import React from "react";
import { shallow } from "enzyme";
import MapComponent from "./MapComponent";
import { shallowToJson } from "enzyme-to-json";
import { airport } from "../utils/mockData";

const props = {
  lat: -airport.location.latitude,
  lng: -airport.location.longitude
};
it("MapComponent component", () => {

  const wrapped = shallow(
    <MapComponent latitude={props.lat} longitude={props.lng} />
  );
  let tree = shallowToJson(wrapped);
  expect(tree).toMatchSnapshot();
});
