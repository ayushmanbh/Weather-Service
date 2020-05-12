const request = require('request')
const keys = require('./../config')

const forecast = (lat,long, callback) => {

  const url = `http://api.weatherstack.com/current?access_key=${keys.API_KEY}&query=${lat},${long}`

  request({ url: url, json: true }, (error, response) => {
    if(error){
      callback("Unable to connect to the Weather app service :(", undefined)
    }else if(response.body.error){
      callback('Unable to find the location. ' + response.body.error.info, undefined)
    }else{
      const curr = response.body.current
      const loc = response.body.location
      callback(undefined, `${curr.weather_descriptions[0]}. It is ${curr.temperature} degrees out in ${loc.name}, ${loc.region}, ${loc.country} till ${curr.observation_time}. It feels like ${curr.feelslike} degrees. Probability of precipitation is ${curr.precip}`)
    }
  });
}

module.exports = forecast
