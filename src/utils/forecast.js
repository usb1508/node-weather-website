const res = require('express/lib/response')
const request = require('request')

const forecast = (longitude, latitude, place, callback) => {

	const url = 'http://api.weatherstack.com/current?access_key=21967b07a5612e89ec1948a3a511fe73&query=' + longitude + ',' + latitude

	request({ url, json: true }, (error, response) => {
		if (error) {
			callback('There is some error in connecting the weather app', undefined)
		} else if (response.body.error) {
			callback('There is some issue with the query', undefined)
		}
		else {
			const temperature = response.body.current.temperature
			const feelslike = response.body.current.feelslike
			const data = {
				place,
				temperature,
				feelslike,
				forecastData: 'The temperature in ' + place + ' is ' + temperature + ' and feels like ' + feelslike
			}
			callback(undefined, data)
		}
	})
}


module.exports = forecast