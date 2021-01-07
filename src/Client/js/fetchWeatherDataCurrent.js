
const fetchWeatherDataCurrent = async (lat, lng) => {
    console.log("fetch Weather data current is running")
    const url = 'http://localhost:8081/weatherbit'
    const data = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
            lat: lat,
            lon: lng,
		}),
	})
		.then((resp) => resp.json())
		.then((data) => console.log(data))
    // const apikey = '15232fa7a4cc4f9daf72453c6c5453dc'
    // const url = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lng}&key=${apikey}`
    // const response = await fetch(url)
    // try {
    //     let data = await response.json()
    //     weatherData = {weather: data}
    //     console.log(data.data, "fetch coords data")
    // } catch (error){
    //     console.log(error, "error from weatherbit api")
    // }
    // return weatherData
    

}

export {fetchWeatherDataCurrent}