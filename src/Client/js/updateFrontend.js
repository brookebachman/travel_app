const updateFrontend = async (data, lengthTrip) => {
	console.log("update frontend is running", data)
	const mainDiv = document.getElementById("main-container")
	const littleDiv = document.createElement('div')
	const date = document.createElement("p")
	const location = document.createElement("p")
	const highTemp = document.createElement("p")
	const clouds = document.createElement("p")
	const snow = document.createElement("p")
	const uv = document.createElement("p")
	const tripDate = document.createElement('p')
	mainDiv.appendChild(littleDiv)
	littleDiv.appendChild(tripDate)
	littleDiv.id = "entry-holder"
	console.log(lengthTrip)
	if (lengthTrip <= 1){
		tripDate.innerHTML = `Your trip is a day trip`
	} else {
		tripDate.innerHTML = `Your trip is ${lengthTrip} days long`
	}
	
	
}



export {updateFrontend}