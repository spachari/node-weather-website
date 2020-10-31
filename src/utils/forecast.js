const request = require("request")

const forecast = (latitude, longitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=d7db3379904b714810f8d1c29dca10b0&query=" + latitude + "," + longitude + "&units=f"

  request({url , json : true}, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined)
    } else if (body.error) {
      callback("Unable to find location", undefined)
    } else {
      callback(undefined, {
       temparatureData : body.current.weather_descriptions + " It is currently " + body.current.temperature + " It feels like " + body.current.feelslike,
       humidity : "Humidity is " + body.current.humidity
      })
    }
  })
}

module.exports = forecast
