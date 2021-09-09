const req = require('postman-request')

const url = 'http://api.weatherstack.com/current?access_key='
const forecastToken ='d8b49b9c166114926c0c70351508ce12';

exports.forecast = (lat, lon, unit='m', callback) => {
    let finalURL = url + forecastToken + '&query=' + lat+','+lon
    //console.log(finalURL)
    if(unit != 'm')
        finalURL += '&units='+unit
        
    req(finalURL, {json: true}, (error, {body}) => {
        if(error) {
            callback(error, undefined);
            //console.log('Cannot connect to weatherstack')
        }else if(body.error)
        {
            const {error} = body.error;
            callback(error.info, undefined);
            //console.log(response.body.error.info)
        }
        else{
            const {temperature, feelslike, weather_descriptions} = body.current;
            //console.log( currernt.weather_descriptions[0] + `. It is currently ${currernt.temperature} kelvin and feels like ${currernt.feelslike} kelvin`)
            callback(undefined, { weather_descriptions , temperature ,feelslike})
        }
    });
}