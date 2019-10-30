import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import { shallow, mount } from "enzyme";
import DisplayTime from "./DisplayTime";

const timeZoneName = "Australia/Brisbane";
const anotherTimeZoneName = "Africa/Cairo";
// let useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());

describe("renders appropriate timezone", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  let wrapped = null;
  it("render Australia/Brisbane timezone", () => {
    wrapped = shallow(<DisplayTime timeZoneName={timeZoneName} />);
    expect(wrapped.state("dateTime")).toEqual("");
    wrapped.instance().updateTime();
    jest.advanceTimersByTime(2000);
    expect(wrapped.state("dateTime")).toContain("AEST");
  });

  it("update render Africa/Cairo timezone", () => {
    wrapped.setProps({ timeZoneName: anotherTimeZoneName });
    wrapped.instance().updateTime();
    jest.advanceTimersByTime(2000);
    expect(wrapped.state("dateTime")).toContain("EET");
  });
});
