import React from "react";
import MasterPage from "./MasterPage";
import { MasterPageDisconnected } from "./MasterPage";
import DetailsPage from "./DetailsPage";
import ErrorContent from "../ui/ErrorContent";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router, MemoryRouter, Link } from "react-router-dom";
import configureStore from "../configureStore";
import { airport } from "../utils/mockData";
import moxios from "moxios";


const rootPathname = "/"
describe("when request api successfully", () => {
  let wrapped;
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("https://api.qantas.com/flight/refData/airport", {
      status: 200,
      response: [airport]
    });
  });
  afterEach(() => {
    moxios.uninstall();
    wrapped.unmount();
  });

  describe("MasterPage component", () => {
    beforeEach(() => {
      wrapped = mount(
        <Provider store={configureStore()}>
          <Router>
            <MasterPage location={{pathname: rootPathname}}/>
          </Router>
        </Provider>
      );
    });

    it("render loading properly", done => {
      expect(wrapped.find(".loading-icon").length).toEqual(1);
      moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find(".loading-icon").length).toEqual(0);
        done();
      });
    });

    it("render list items", done => {
      moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find("div.airport-brief-wrapper").length).toEqual(1);
        done();
      });
    });
  });

  it("test fetchNext handleClick", () => {
    const props = {
      airports: [airport, airport],
      loading: false,
      errorStatus: {
        isError: false,
        message: ""
      },
      fetchAirports: jest.fn(),
      selectAirport: jest.fn(),
      location: {
        pathname: '/'
      }
    };
    wrapped = shallow(
      <MasterPageDisconnected
        airports={props.airports}
        loading={props.loading}
        errorStatus={props.errorStatus}
        fetchAirports={props.fetchAirports}
        selectAirport={props.selectAirport}
        location={{pathname: rootPathname}}
      />
    );

    const instance = wrapped.instance()
    wrapped.setState({size: 1})
    expect(wrapped.state('displayedAirports').length).toEqual(0)
    instance.fetchNext()
    expect(wrapped.state('offset')).toEqual(1)
    expect(wrapped.state('displayedAirports').length).toEqual(1)

    instance.handleClick('sliding-right');
    expect(wrapped.state('slidingClass')).toEqual('sliding-right')
    
  });

  describe("show correct component in specific route", () => {
    beforeEach(() => {
      wrapped = mount(
        <Provider store={configureStore()}>
          <MemoryRouter initialEntries={["/airport/AAA"]}>
            <MasterPage location={{pathname: rootPathname}}/>
          </MemoryRouter>
        </Provider>
      );
    });
    it("find DetailsPage component", () => {
      expect(wrapped.find(DetailsPage)).toHaveLength(1);
    });
  });
});

describe("when fail to request api", () => {
  let wrapped;
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest("https://api.qantas.com/flight/refData/airport", {
      status: 400,
      response: { message: "invalid data" }
    });
    wrapped = mount(
      <Provider store={configureStore()}>
        <Router>
          <MasterPage location={{pathname: rootPathname}}/>
        </Router>
      </Provider>
    );
  });
  afterEach(() => {
    moxios.uninstall();
    wrapped.unmount();
  });
  it("show ErrorContent component", done => {
    moxios.wait(() => {
      wrapped.update();
      expect(wrapped.find(ErrorContent)).toHaveLength(1);
      done();
    });
  });
});
