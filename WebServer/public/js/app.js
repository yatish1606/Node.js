
const weatherForm = document.querySelector('form')

const forecastTextArea = document.querySelector('#forecastTextArea')



weatherForm.addEventListener('submit', (event) => {

    event.preventDefault()

    const location = document.querySelector('input').value

    const fetchURL = 'http://localhost:3000/weather?address=' + location

    fetch(fetchURL)
    .then( (response) => {
        response.json()
            .then( (parsedForecast) => {

                if(parsedForecast.errorMessage) {
                    forecastTextArea.textContent(parsedForecast.errorMessage)
                } else {
                    forecastTextArea.textContent = parsedForecast.forecast.current.feelslike
                }
                
            })
    })

})