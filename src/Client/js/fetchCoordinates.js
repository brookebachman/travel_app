const fetchCoordinates = async (event, defaultText, defaultDate) => {
	event.preventDefault();
	console.log('fetch coords running');
	const zipcode = defaultText || returnZipcode();
	const date = defaultDate || returnDate();
	const url = 'http://localhost:8081/test';
	const data = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			zipcode: zipcode,
			date: date
		}),
	})
		.then((resp) => resp.json())
		.then((data) => {
			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0');
			let yyyy = today.getFullYear();
			today = mm + '/' + dd + '/' + yyyy;
			let newA = today.split('/');
			let day = newA[1];
			let currentDate = returnDate();
			findOutHowFarAwayTheTripIs(currentDate, day, data.lon, data.lat);
		});

	// Client.postToFrontend(data);
	// return data
};

function findOutHowFarAwayTheTripIs(currentDate, day, lon ,lat) {
	if (Math.abs(currentDate[1] - day) < 7) {
		Client.fetchWeatherDataCurrent(lon, lat);
	} else {
		Client.fetchWeatherDataWeek(lon, lat);
	}
}

function returnZipcode() {
	const zipcode = document.getElementById('zipcode').value;
	return zipcode;
}

function returnDate() {
	const date = document.getElementById('date').value;
	let array = date.split('-');
	let day = array.pop();
	array.unshift(day);
	let year = array.pop();
	array.unshift(year);
	return array;
}
// let coordData = {};
// const zipcode = returnZipcode();
// const apikey = 'bbachman';
// const url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${zipcode}&maxRows=10&username=${apikey}`;
// //this will return coordinates
// let response = await fetch(url);
// try {
// 	let data = await response.json();
// 	coordData = { coordinates: data };
// 	console.log(coordData.coordinates)
// 	let lng = coordData.coordinates.postalCodes[0].lng
// 	let lat = coordData.coordinates.postalCodes[0].lat

// 	let today = new Date();
// 	let dd = String(today.getDate()).padStart(2, '0');
// 	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// 	let yyyy = today.getFullYear();
// 	today = mm + '/' + dd + '/' + yyyy;
// 	let newA = today.split('/');
// 	let day = newA[1];
// 	let currentDate = returnDate();
// 	findOutHowFarAwayTheTripIs(currentDate, day, lat, lng);

// } catch (error) {
// 	console.log(error, 'error from geonames');
// }

//};




export { fetchCoordinates };
