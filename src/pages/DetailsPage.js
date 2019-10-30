import React from "react";
import { connect } from "react-redux";
import MapComponent from "../ui/MapComponent";
import getCurrency from "../utils/getCurrency";
import getLocation from "../utils/getLocation";
import ErrorContent from "../ui/ErrorContent";
import DisplayTime from "../ui/DisplayTime";
import isEmpty from "../utils/isEmpty";
import "./DetailsPage.scss";

function DetailsPage({ history, handleClick, airport }) {
  if (!isEmpty(airport) || localStorage.currentDetails) {
    let info = {};
    if (!isEmpty(airport)) {
      info = {
        country: airport.country,
        city: airport.city,
        location: airport.location,
        airportName: airport.airportName
      };
    } else {
      const currentDetails = JSON.parse(
        localStorage.getItem("currentDetails")
      );
      info = {
        country: currentDetails.country,
        city: currentDetails.city,
        location: currentDetails.location,
        airportName: currentDetails.airportName
      };
    }
    const { country, city, location, airportName } = info;
    const {
      latitude,
      longitude,
      latitudeDirection,
      longitudeDirection
    } = location;
    let lat = null, lng = null; 
    if (latitudeDirection && longitudeDirection) {
      const location = getLocation(
        latitude,
        longitude,
        latitudeDirection,
        longitudeDirection
      );
      lat = location.lat
      lng = location.lng
    }

    const currency = getCurrency(country.countryCode);

    return (
      <div className="airport-details-container">
        <div className="sub-header">Airport Details:</div>
        <div className="info-wrapper">Airport: {airportName}</div>
        <div className="info-wrapper">Country: {country.countryName}</div>
        <div className="info-wrapper">
          {currency &&
            `Currency: ${currency.currencyName} ${currency.currencySymbol}`}
        </div>
        <div className="info-wrapper">
          Timezone: <DisplayTime timeZoneName={city.timeZoneName} />
        </div>
        {lat && lng && <MapComponent latitude={lat} longitude={lng} />}
        <button
          className="red-button"
          onClick={() => {
            handleClick("sliding-right");
            history.push("/");
          }}
        >
          Back
        </button>
      </div>
    );
  } else {
    return <ErrorContent>Haven't got any data</ErrorContent>;
  }
}

// class DetailsPage extends Component {
//   render() {
//     const { history, handleClick, airport } = this.props;

//   }
// }

const mapStateToProps = state => {
  return {
    airport: state.details
  };
};

export default connect(mapStateToProps)(DetailsPage);
