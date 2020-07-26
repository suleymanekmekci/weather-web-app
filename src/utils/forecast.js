const request = require('request');

const forecast = (latitude, longitude, unit, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e8a58a72cd5ad4e1116163bb3a88832a&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=' + unit;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect weather services.', undefined);
        }
        else if (response.body.error) {
            callback('Unable to find location.', undefined);
        }
        else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
        }
    })

}

module.exports = forecast;