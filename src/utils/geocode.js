const request = require('request');




const geocode = (address, callback) => {

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFqdXR1c2giLCJhIjoiY2t5OXB3Yzd2MDhwZTJvbzNnMnVvb2dyaiJ9.T3KnJAFuBNflBQxoEVZwAw&limit=1'

	request({ url, json: true }, (error, {body})=>{
		if(error){
			callback('Check your network connection')
		}
		else if (body.features.length === 0){

			callback('You entered an invalid address. Please try again')
		}else{
			latitude = body.features[0].center[1]
			longitude = body.features[0].center[0]
			place = body.features[0].place_name
			const data = {latitude,longitude, place}
			callback(undefined, data)
		}
	})

}



module.exports = geocode;