
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const weather = (address)=>{
	fetch('/weather?address='+address).then((response) => {
	response.json().then((data) => {
		if (data.error) {
			messageTwo.textContent = data.error
			messageOne.textContent = 'ERROR'
			return
		}
		messageOne.textContent = data.place
		console.log(data.temperature)
		messageTwo.textContent = data.forecastData
	})
})

}

const weatherForm = document.querySelector("form")
const search = document.querySelector('input')


// messageOne.textContent = 'message 1 from JS'
// messageTwo.textContent = 'message 2 from JS'



weatherForm.addEventListener('submit', (e)=>{
	e.preventDefault()
	const location = search.value
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''
	weather(location)

	
})