const request = require("request");
//

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoiam9obm1lcmdhIiwiYSI6ImNrdmxkNDJxMjA2ajgzM3FmMGtkM2FvNXQifQ.8QYAGOqPZTT0wkf6QAjw3Q" +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("mapbox,Connection Lost", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find the given Search", undefined);
    } else {
      const longitude = body.features[0].center[0];
      const latitude = body.features[0].center[1];
      const location = body.features[0].place_name;
      callback(undefined, { longitude, latitude, location });
    }
  });
};

// exporting
module.exports = geoCode;
