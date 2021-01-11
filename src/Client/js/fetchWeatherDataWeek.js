import { updateFrontend } from "./updateFrontend";

const fetchWeatherDataWeek = async (lat, lng) => {
	console.log('fetch Weather data current is running');
	const url = 'http://localhost:8081/weatherbitweek';
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
		.then((data) => 
		Cleint.updateFrontend(data)
		);
	// console.log("fetch weather data week is running")
	// let weatherWeekData = {}
	// const apikey = process.env.API_KEY_WEATHERBIT
	// const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&key=${apikey}`
	// const response = await fetch(url)
	// try {
	//     const data = await response.json()
	//     weatherWeekData = {weather: data}
	//     console.log(data, "weather week data")
	// } catch (error){
	//     console.log(error, "error from weatherbit api")
	// }
	// return weatherWeekData
};

export { fetchWeatherDataWeek };
