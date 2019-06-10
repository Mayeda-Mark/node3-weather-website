const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/3c732419bee008ffa765addb2d82a6d5/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long);
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unabe to access weather services.');
        }else if(body.error) {
            callback('Unable to find location');
        }else {
            callback(undefined, 'It is currently ' + body.currently.temperature + ' and ' + body.currently.summary + ' with a ' + body.currently.precipProbability + ' percent chance of percipitation.'
            );
        }
    });
}

module.exports = forecast;