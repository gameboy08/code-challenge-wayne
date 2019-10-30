import React, { Component } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import { Route } from "react-router-dom";
import AirportBrief from "../ui/AirportBrief";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { fetchAirports, selectAirport } from "../actions";
import DetailsPage from "./DetailsPage";
import ErrorContent from "../ui/ErrorContent";
import "./MasterPage.scss";
class MasterPage extends Component {
  state = {
    displayedAirports: [],
    offset: 0,
    size: 30,
    slidingClass: ""
  };
  async componentDidMount() {
    try {
      const { fetchAirports } = this.props;
      await fetchAirports();
    } catch (error) {
      console.log("error", error);
    }
  }

  componentDidUpdate(prevProps) {
    const { airports } = this.props;
    if (prevProps.airports.length !== airports.length) {
      const { offset, size } = this.state;
      this.setState({
        displayedAirports: airports.slice(offset, size)
      });
    }
  }

  fetchNext = () => {
    const { offset, size } = this.state;
    const newAirports = this.props.airports.slice(
      offset + size,
      offset + size + size
    );
    this.setState({
      offset: offset + size,
      displayedAirports: [...this.state.displayedAirports, ...newAirports]
    });
  };

  handleClick = className => {
    this.setState({
      slidingClass: className
    });
  };
  displayAirportsList = airports => {
    const { displayedAirports } = this.state;
    const { selectAirport } = this.props;
    return displayedAirports.map(airport => (
      <CSSTransition
        key={airport.airportCode}
        timeout={500}
        classNames="airport-item"
      >
        <AirportBrief
          airport={airport}
          handleClick={this.handleClick}
          selectAirport={selectAirport}
        />
      </CSSTransition>
    ));
  };
  render() {
    const { airports, loading, errorStatus, history, location } = this.props;
    const { displayedAirports, slidingClass } = this.state;
    const onList = !location.pathname.includes("airport") ? "on-list" : "";
    const onDetails = location.pathname.includes("airport") ? "onDetails" : "";
    return (
      <div className="master-page-container">
        <div className={`left-content-container ${slidingClass} ${onDetails}`}>
          {loading && (
            <div className="loading-icon">
              <ReactLoading type="bars" color="#e40000" />
            </div>
          )}
          <div className="airports-list-header">Airports</div>
          <div className="airports-list" id="scrollableDiv">
            {errorStatus.isError ? (
              <ErrorContent>{errorStatus.message}</ErrorContent>
            ) : (
              <InfiniteScroll
                dataLength={this.state.displayedAirports.length}
                next={airports => this.fetchNext(airports)}
                hasMore={displayedAirports.length < airports.length}
                loader={<div>Loading...</div>}
                scrollableTarget="scrollableDiv"
                scrollThreshold={0.9}
              >
                <TransitionGroup className="todo-list">
                  {this.displayAirportsList(airports)}
                </TransitionGroup>
              </InfiniteScroll>
            )}
          </div>
        </div>
        <div className={`right-content-container ${slidingClass} ${onList}`}>
          <Route
            path={`/airport/:id`}
            exact
            render={() => (
              <DetailsPage history={history} handleClick={this.handleClick} />
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    airports: state.airports,
    loading: state.loading,
    errorStatus: state.errorStatus
  };
};

export { MasterPage as MasterPageDisconnected };

export default connect(
  mapStateToProps,
  {
    fetchAirports,
    selectAirport
  }
)(MasterPage);
