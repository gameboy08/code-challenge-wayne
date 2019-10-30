import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import "./AirportBrief.scss";
import { Link } from "react-router-dom";
export default function AirportBrief({airport, handleClick, selectAirport}) {
  return (
    <div className="airport-brief-wrapper">
      <div>
        <div className="info-text">Name: {airport.airportName}</div>
        <div className="info-text">Country: {airport.country.countryName}</div>
      </div>
      <div className="arrow-wrapper">
        <Link onClick={() => {
          selectAirport(airport);
          handleClick('sliding-left')
        }} to={`/airport/${airport.airportCode}`}><IoIosArrowForward /></Link>
      </div>
    </div>
  );
}
