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
	mainDiv.appendChild(littleDiv)
	mainDiv.removeChild(form)
	littleDiv.id = "entry-holder"
	littleDiv.appendChild(location)
	
	if (lengthTrip <= 1){
		location.innerHTML = `Your trip to ${data[0].city_name} is a day trip`
	} else {
		location.innerHTML = `Your trip to ${data[0].city_name} is ${lengthTrip} days long`
	}
	
	
}

//function 



export {updateFrontend}