import fetch from 'node-fetch';

const updateFrontend = async (data, lengthTrip) => {
	console.log('update frontend is running', data);
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
	photo.innerHTML = `<img src=${await searchImages()}>`;

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

  
	highTemp.innerHTML = `It is ${data[0].temp + 32} degrees today`;
	uv.innerHTML = `It looks like there are ${data[0].weather.description} today`;
	if (data[0].snow) {
		 snow.innerHTML = `There is ${data[0].snow / 0.039} inches per hour falling. Make sure to dress warm! `;
	} else {
		 snow.innerHTML = 'Looks like you are going somewhere warm';
	}

	if (lengthTrip <= 1) {
		tripLength.innerHTML = `Your trip to ${data[0].city_name} is a day trip`;
	} else {
		tripLength.innerHTML = `Your trip to ${data[0].city_name} is ${lengthTrip} days long`;
	}
};


const searchImages = async () => {
	const element = 'yellow+flower';
	const apikey = '19614841-f24f6c26e68114f6eb3490d99';
	const url = `https://pixabay.com/api/?key=${apikey}&q=${element}&image_type=photo`;
	try {
		const data = await fetch(url);
		let response = await data.json();
		return response.hits[0].largeImageURL;
	} catch (error) {
		console.log(error);
	}
};

export { updateFrontend };
