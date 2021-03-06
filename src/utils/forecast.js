const request = require('request');

const forecast = ({lat, long}={}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=cdfb59aae5c06d56fd070221303e28f9&query=${lat},${long}`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service! ', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body);

        }
    })
}

module.exports = forecast;