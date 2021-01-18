import fetch from "node-fetch"

const updateFrontend = async (data, lengthTrip) => {
	console.log("update frontend is running", data)
	const mainDiv = document.getElementById("main-container")
	const form = document.getElementById('form-container')
	const littleDiv = document.createElement('div')
	const location = document.createElement("p")
	const highTemp = document.createElement("p")
	const clouds = document.createElement("p")
	const snow = document.createElement("p")
	const uv = document.createElement("p")
	const photo = document.getElementById('picture')
	mainDiv.appendChild(littleDiv)
	mainDiv.removeChild(form)
	mainDiv.appendChild(photo)
	photo.style.backgroundImage = searchImages()
	
	littleDiv.id = "entry-holder"
	littleDiv.appendChild(location)
	
	if (lengthTrip <= 1){
		location.innerHTML = `Your trip to ${data[0].city_name} is a day trip`
	} else {
		location.innerHTML = `Your trip to ${data[0].city_name} is ${lengthTrip} days long`
	}
	
}

const searchImages = async () => {
	const element = 'yellow+flower'
	const apikey = "19614841-f24f6c26e68114f6eb3490d99"
	const url = `https://pixabay.com/api/?key=${apikey}&q=${element}&image_type=photo`
	try {
		const data = await fetch(url)
		let response = await data.json()
		return response.hits[0].pageURL

	}catch (error){
		console.log(error)
	}
	
}



export {updateFrontend}