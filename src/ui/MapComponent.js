import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  GoogleMap,
  Marker,
  withGoogleMap
} from "react-google-maps";

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHudbqXHhHW-wtM_N5wWEOwWbLH3vVm2g&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(({ latitude, longitude }) => {
  return (
    <GoogleMap
      defaultZoom={8}
      center={{ lat: latitude, lng: longitude }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
});

export default MapComponent;
