const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/d2aad9ed86c770dc8162608b6773051a/${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!!', undefined);
        } else {
            callback(undefined, {
                forecast: `${body.daily.data[0].summary} It is currently ${body.currently.temperature}`,
            });
        }
    });
};

module.exports = forecast;