import React from "react";
import renderer from "react-test-renderer";
import ErrorContent from "./ErrorContent";

it("ErrorContent renders correctly", () => {
  const tree = renderer.create(<ErrorContent>Network error</ErrorContent>).toJSON();
  expect(tree).toMatchSnapshot();
});
