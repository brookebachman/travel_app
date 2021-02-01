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
// 	littleDiv.innerHTML = `
// 	<div class="card" style="width: 18rem;">
//   <img class="card-img-top" src=${searchImages()} alt="Card image cap">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
// 	<p class="card-text">It is ${data[0].temp + 32} degrees today.</p>
// 	<p class="card-text">It looks like there are ${data[0].weather.description} today.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>`;

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
	//photo.innerHTML = `<img src=${searchImages()} />`;
	if (lengthTrip <= 1) {
		 (tripLength.innerHTML = `Your trip to ${data[0].city_name} is a day trip`);
	} else {
		 (tripLength.innerHTML = `Your trip to ${data[0].city_name} is ${lengthTrip} days long`);
	}
	if (data[0].snow) {
		snow.innerHTML = `There is ${data[0].snow / 0.039} inches per hour falling. Make sure to dress warm! `;
	} else {
		snow.innerHTML = 'Looks like you are going somewhere warm';
	}
	const imageSrc = await weatherType(data)
	photo.innerHTML = `<img class="card-img-top" src=${imageSrc} />`
	
};

const template = (data) => {
	return `<div class="card" style="width: 18rem;">
	  <img class="card-img-top" src=${searchImages()} alt="Card image cap">
	  <div class="card-body">
	    <h5 class="card-title">Card title</h5>
		<p class="card-text">It is ${data[0].temp + 32} degrees today.</p>
		<p class="card-text">It looks like there are ${data[0].weather.description} today.</p>
	    <a href="#" class="btn btn-primary">Go somewhere</a>
	  </div>
	</div>`
	
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
		return await searchImages('sun')
	}

};

const searchImages = async (element, second) => {
	//const element = element;
	// if (second){
	// 	element = element + second
	// } else {
	// 	element = element;
	// }

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

		//return response.hits[0].largeImageURL;
	} catch (error) {
		console.log(error);
	}
};

export { updateFrontend, template, searchImages };
