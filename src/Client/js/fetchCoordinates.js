const fetchCoordinates = async (event) => {
	event.preventDefault();
	let coordData = {};
	const zipcode = returnZipcode();
	const apikey = 'bbachman';
	const url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${zipcode}&maxRows=10&username=${apikey}`;
	//this will return coordinates
	let response = await fetch(url);
	try {
		let data = await response.json();
		coordData = { coordinates: data };
		console.log(coordData.data, 'zipcode project data');
	
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;
		let newA = today.split('/');
		let day = newA[1];
		let currentDate = returnDate();
		findOutHowFarAwayTheTripIs(currentDate, day, coordData);
		
	} catch (error) {
		console.log(error, 'error from geonames');
	}
	
};

function findOutHowFarAwayTheTripIs(currentDate, day, coordData) {
	if (Math.abs(currentDate[1] - day) < 7) {
		Client.fetchWeatherDataCurrent(coordData, date);
	} else {
		Client.fetchWeatherDataWeek(coordData);
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

export { fetchCoordinates };
