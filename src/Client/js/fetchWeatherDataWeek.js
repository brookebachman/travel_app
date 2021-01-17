const fetchWeatherDataWeek = async (lon, lat) => {
	console.log('fetch Weather data cweek is running');
	const url = 'http://localhost:8081/weatherbitweek';
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			lat: lat,
			lon: lon,
		})
	});
	try {
		const weatherData = await response.json();
		Client.updateFrontend(weatherData);
	} catch (error) {
		console.log(error);
	}
};

export { fetchWeatherDataWeek };
