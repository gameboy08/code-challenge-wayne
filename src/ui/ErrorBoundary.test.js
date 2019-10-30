import React from "react";
import { mount } from "enzyme";
import ErrorBoundary from "./ErrorBoundary";
import ErrorContent from "./ErrorContent";

function Something() {
  // this is just a placeholder
  return null;
}

describe("ErrorBoundary component", () => {
  let wrapped = null;
  beforeEach(() => {
    wrapped = mount(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    );
  });
  afterEach(() => {
    wrapped.unmount();
  });
  it("render differently depends on whether error exists", () => {
    const error = new Error("test");
    expect(wrapped.find(ErrorContent).length).toBe(0);
    wrapped.find(Something).simulateError(error);
    expect(wrapped.state()).toHaveProperty('hasError', true)
    expect(wrapped.find(ErrorContent).length).toBe(1);
  });
});
