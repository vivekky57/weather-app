const request = require("request");

const geocode = (address, callback) => {
  //   const url =
  //     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  //     address +
  //     ".json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1";

  const url =
    "http://api.weatherstack.com/current?access_key=ce9dc84f38a7859e0201ddf0eac287d4&query=" +
    address;
  request({ url, json: true }, (error, { body }) => {
    console.log(body);
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.success === false) {
      callback(
        "code:" +
          body.error.code +
          "\ntype:" +
          body.error.type +
          "\ninfo: " +
          body.error.info +
          "\nUnable to find location. Try another search.",
        undefined
      );
    } else {
      callback(undefined, {
        // latitude: body.features[0].center[1],
        // longitude: body.features[0].center[0],
        // location: body.features[0].place_name,
        latitude: body.location.lat,
        longitude: body.location.lon,
        location: body.location.country,
      });
    }
  });
};

module.exports = geocode;
