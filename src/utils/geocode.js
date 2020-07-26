const request = require('request');

const geocode = (address, callback) => {
    let url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VsZXltYW4xIiwiYSI6ImNrYmc2bGtrZzBqODUyeWtjdXgwNjhqbmkifQ.TXUNipkj1p2AeC4vS6LaDg'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect location services.', undefined);
        }
        else if (response.body.features.length == 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                place: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode;