const fetchCoordinates = async (event, defaultText, defaultDate) => {
	event.preventDefault();
	console.log('fetch coords running');
	const zipcode = defaultText || returnZipcode();
	const date = defaultDate || returnDate();
	const endDate = defaultDate || returnEndDate()
	const url = 'http://localhost:8081/test';
	const data = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			zipcode: zipcode,
			date: date,
			end: endDate,
			country: 'US'
		}),
	})
		.then((resp) => resp.json())
		.then((data) => {
			console.log(data, "fetch coords data")
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

};

function findOutHowFarAwayTheTripIs(currentDate, day, lon ,lat) {
	console.log("find out how far away")
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

function returnEndDate() {
	const date = document.getElementById('end-date').value;
	let array = date.split('-');
	let day = array.pop();
	array.unshift(day);
	let year = array.pop();
	array.unshift(year);
	return array;
}




export { fetchCoordinates };
