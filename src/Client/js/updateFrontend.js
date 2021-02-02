import fetch from 'node-fetch';

const updateFrontend = async (results, lengthTrip)=> {
	const data = results.data
	const mainDiv = document.getElementById('main-container');
	const form = document.getElementById('form-container');
	const littleDiv = document.createElement('div');
	const tripLength = document.createElement('p');
	const highTemp = document.createElement('p');
	const clouds = document.createElement('p');
	const snow = document.createElement('p');
	const uv = document.createElement('p');
	const photo = document.getElementById('picture');
	mainDiv.appendChild(photo);
	mainDiv.removeChild(form);
	mainDiv.appendChild(littleDiv);
	littleDiv.id = 'entry-holder';
	littleDiv.appendChild(tripLength);
	tripLength.id = 'trip-length';
	littleDiv.appendChild(snow);
	snow.id = 'snow';
	littleDiv.appendChild(highTemp);
	littleDiv.appendChild(uv);
	highTemp.id = 'temp';
	uv.id = 'uv';

	console.log(data, 'update frontend weather');

	const lengthTripInfo = (lengthTrip) => {
		if (lengthTrip <= 1) {
			return `Your trip is a day trip`;
		} else {
			return `Your trip is ${lengthTrip} days long`;
		}
		
	};


	const returnSnow = (data) => {
		if (data[0].snow) {
			return `There is ${data[0].snow / 0.039} inches per hour falling. Make sure to dress warm!  `;
		} else {
			return 'Looks like you are going somewhere warm';
		}
	
	
	};

	const templateWeather = (data, lengthTrip) => {
		console.log(data, "template weather")
		return `<div class="card">
		  <div class="card-body">
			<h1>Weather Report: </h1>
			<p class="card-text">${calculateUVIndex(data)}</p>
			<p class="card-text"> ${data[0].weather.description} </p>
			<p class="card-text"> ${lengthTripInfo(lengthTrip)}.</p>
			<p class="card-text"> ${returnSnow(data)} </p>
		  </div>
		</div>`;
	};
	// const templateExtras = (data) => {
	// 	return `<div class="card" style="width: 18rem;">
	// 	  <div class="card-body">
			
	// 		<p class="card-text">It looks like there are ${data[0].weather.description} today.</p>
	// 		<p class="card-text">It looks like there are ${lengthTripInfo(lengthTrip)} today.</p>
	
	// 	  </div>
	// 	</div>`;
	// };

	// const returnIcon = (data) => {
	// 	if (data[0].snow > 1) {
	// 		return '<i class="far fa-snowflake"></i>'
	// 	} else if (data[0].precip > 3) {
	// 		return '<i class="fas fa-umbrella"></i>';
	// 	} else if (data[0].clouds > 50) {
	// 		return '<i class="fas fa-cloud"></i>';
	// 	} else {
	// 		return '<i class="fas fa-sun"></i>';
	// 	}
	// }


	const calculateUVIndex = (data) => {
		console.log("uv data" , data)
		if (data[0].uv > 8) {
			return `The UV index is ${data[0].uv.toFixed()} today which is really high today make sure to wear sunscreen, and reapply every 2 hours!`;
		} else if (data[0].uv > 6) {
			return `The UV index is ${data[0].uv.toFixed()} today which is pretty high today make sure to wear sunscreen!`;
		} else if (data[0].uv > 6) {
			return `The UV index is ${data[0].uv.toFixed()} today which is moderate make sure to wear sunscreen!`;
		} else {
			return `The UV index is ${data[0].uv.toFixed()} today which is pretty low.`;
		}
	};
	littleDiv.innerHTML += templateWeather(data);


	// highTemp.innerHTML = `It is ${data[0].temp + 32} degrees today`;
	// uv.innerHTML = `It looks like there are ${data[0].weather.description} today`;

	const imageSrc = await weatherType(data);
	photo.innerHTML = `<img class="card-img-top" src=${imageSrc} />`;
	}
	

// checkIfSnow = () => {
// 	if (data[0].snow) {
// 		snow.innerHTML = `There is ${data[0].snow / 0.039} inches per hour falling. Make sure to dress warm! `;
// 	} else {
// 		snow.innerHTML = 'Looks like you are going somewhere warm';
// 	}
// };
// // const checkTripLength = (lengthTrip) => {
// // 	if (lengthTrip <= 1) {
// // 		return (tripLength.innerHTML = `Your trip to ${data[0].city_name} is a day trip`);
// // 	} else {
// // 		return (tripLength.innerHTML = `Your trip to ${data[0].city_name} is ${lengthTrip} days long`);
// // 	}
// // };
const weatherType = async (data) => {
	if (data[0].snow > 1) {
		return await searchImages('snow');
	} else if (data[0].precip > 3) {
		return await searchImages('rain');
	} else if (data[0].clouds > 50) {
		return await searchImages('clouds');
	} else {
		return await searchImages('sun');
	}
};

const searchImages = async (element, second) => {
	const apikey = '19614841-f24f6c26e68114f6eb3490d99';
	const url = `https://pixabay.com/api/?key=${apikey}&q=${element}&image_type=photo`;
	try {
		const data = await fetch(url);
		let response = await data.json();
		console.log(response);
		let newResults = [];
		let array = response.hits;
		array.forEach((photoTag) => {
			let newTags = photoTag.tags.replace(/[^0-9a-zA-Z]/g, '');
			if (newTags.includes(element)) {
				newResults.push(photoTag.largeImageURL);
			}
		});
		console.log(typeof newResults[0]);

		return await newResults[0];

		
	} catch (error) {
		console.log(error);
	}
};

export { updateFrontend, searchImages };
