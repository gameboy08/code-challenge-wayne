import getLocation from "./getLocation";

it("get minus latitude longitude for S W", () => {
  const props = {
    latitude: 17.25,
    longitude: 145.3,
    latitudeDirection: "S",
    longitudeDirection: "W"
  };
  expect(
    getLocation(
      props.latitude,
      props.longitude,
      props.latitudeDirection,
      props.longitudeDirection
    )
  ).toEqual({
    lat: -props.latitude,
    lng: -props.longitude
  });
});

it("get minus latitude longitude for N E", () => {
  const props = {
    latitude: 17.25,
    longitude: 145.3,
    latitudeDirection: "N",
    longitudeDirection: "E"
  };
  expect(
    getLocation(
      props.latitude,
      props.longitude,
      props.latitudeDirection,
      props.longitudeDirection
    )
  ).toEqual({
    lat: props.latitude,
    lng: props.longitude
  });
});
