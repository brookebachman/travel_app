// If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. 

//We want a function to capture the zipcode and also the date that the user entered
function performAction(event) {
    event.preventDefault();
    const zipcode = returnZipcode()
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
    const apiKey = process.env.API_KEY_WEATHERBIT
	getZipode(baseURL, zipcode, apiKey)
	.then(function (projectData) {
		postData('/addData', {
			zipcode: zipcode,
			place: projectData.newData.name,
			weather: projectData.newData.clouds.all,
			temp: projectData.newData.main.temp.toFixed(),
			min: projectData.newData.main.temp_min.toFixed(),
			max: projectData.newData.main.temp_max.toFixed(),
			date: projectData.newData.dt,
			time: projectData.newData.dt
		});
		return projectData;
	})
	.then(function (projectData) {
		updateFrontend();
	});
}

//Weatherbit API for you to see how another API accomplishes the same goals. Weatherbit API has one problem, it only takes in coordinates for weather data -- it’s that specific. So, we’ll need to get those coordinates from the Geonames API. Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the Pixabay API.







export {performAction}