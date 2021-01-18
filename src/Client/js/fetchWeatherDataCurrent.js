const fetchWeatherDataCurrent = async (lon, lat, lengthTrip) => {
	console.log('fetch Weather data current is running');
	const url = 'http://localhost:8081/weatherbitcurrent';
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
		Client.updateFrontend(weatherData, lengthTrip);
	} catch (error) {
		console.log(error);
	}
};

export { fetchWeatherDataCurrent };
