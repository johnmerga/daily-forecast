const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=38f9df2e676ddc6dcda6ea4a9c107a1e&query=" +
    encodeURIComponent(longitude) +
    "," +
    encodeURIComponent(latitude);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback("Unable to connect to Internet", undefined);
    } else if (body.error) {
      return callback(
        "your monthly limit has been reached. please update your API key with different Email address. contact backend developer: JohnMerga@yahoo.com "
      );
    }

    const temperature = body.current.temperature;
    const precipitation = body.current.precip;
    const overCast = body.current.weather_descriptions[0];

    callback(
      undefined,

      overCast +
        ". it's currently " +
        temperature +
        " degree out there. there is " +
        precipitation +
        "% of chance of rain."
    );
  });
};

// check request
// forecast(11.343, 23.455, (error, data) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log(data);
// });
//

module.exports = forecast;
