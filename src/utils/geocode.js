const req = require('postman-request')

const mapboxurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapboxtoken = 'pk.eyJ1Ijoia2lsbGVybWVjaCIsImEiOiJja3RicnVpMjMxeXgwMm9vMDJuMndqdnprIn0.XDYhkqxJ_qAHUvXd4NcdIQ';
const options= '&limit=1';

exports.geocode = (address, callback) => {
    const finalURL = mapboxurl+encodeURIComponent(address)+'.json?access_token='+mapboxtoken+options
    req(finalURL, {json: true}, (error, {body}) => {
        if(error) {
            callback('Cannot connect to mapbox', undefined)
            // console.log('Cannot connect to mapbox')
        }else{
            const {features} = body;
            //if(response.body.features.length === 0){
            if(features.length === 0){
                callback('Location Not found', undefined)
                //console.log('Location Not found')
            }else{
                // const feature = response.body.features[0];
                // callback(undefined,{
                //     latitude:feature.geometry.coordinates[1],
                //     longitude:feature.geometry.coordinates[0],
                //     place_name:feature.place_name
                // })
                const {coordinates } = features[0].geometry;
                const {place_name } = features[0]
                callback(undefined,{
                    latitude:coordinates[1],
                    longitude:coordinates[0],
                    //latitude,
                    //longitude,
                    place_name
                })
            }
        }
    });
}
