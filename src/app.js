const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define Paths for express config
const pubicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPatch = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(pubicDirectoryPath))

//setup handle bar engines and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPatch)


app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Utkarsh Bajaj'
	})

})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Utkarsh Bajaj'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		message: 'I NEEED HELP, SAVE ME',
		title: 'Help',
		name: 'Utkarsh Bajaj'
	})
})
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please enter an address to know the weather'
		})
	}
	geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
		if (error) {
			return res.send({ error })
		} else if (latitude === undefined) {
			return res.send({
				error: 'Enter a correct location'
			})
		} else {

			forecast(latitude, longitude, place, (error, { place, temperature, feelslike, forecastData} = {}) => {
				const data = {
					place,
					temperature,
					feelslike, 
					forecastData
				}
				res.send(data)
			})
		}
	})

})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send('Please add a search query')
	}
	console.log(req.query.search)
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		message: 'Help article not found',
		name: 'Utkarsh Bajaj',
		title: '404'
	})

})

app.get('*', (req, res) => {
	res.render('404', {
		message: 'Page not found',
		name: 'Utkarsh Bajaj',
		title: '404'
	})
})


app.listen(port, () => {
	console.log('the server is up on ' + port)
})