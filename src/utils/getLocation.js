export default function getLocation(
  latitude,
  longitude,
  latitudeDirection,
  longitudeDirection
) {
  let lat,
    lng = null;

  switch (latitudeDirection.toUpperCase()) {
    case "S":
      lat = -latitude;
      break;
    case "N":
      lat = latitude;
      break;
    default:
      break;
  }
  switch (longitudeDirection.toUpperCase()) {
    case "W":
      lng = -longitude;
      break;
    case "E":
      lng = longitude;
      break;
    default:
      break;
  }
  return {
    lat,
    lng
  };
}
