import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { shallowToJson } from "enzyme-to-json";

it("render App", () => {
  const wrapped = shallow(<App />);
  let tree = shallowToJson(wrapped);
  expect(tree).toMatchSnapshot();
});
