const request = require('request')
const keys = require('./../config')

const geocode = (address, callback) => {
  const geourl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${keys.MAP_KEY}&limit=1`

  request({ url: geourl, json:true }, (error, response) => {
    if(error){
      callback("Unable to connect to the Geocoding app service :(", undefined)
    }else if(response.body.features.length===0){
      callback('Unable to find location. Try another search.', undefined)
    }else{
      const data = {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0]
      }
      callback(undefined, data)
    }  
  })
}

module.exports = geocode