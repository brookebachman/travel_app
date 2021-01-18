const updateFrontend = async (data, lengthTrip) => {
	console.log("update frontend is running", data)
	const mainDiv = document.getElementById("entry-holder")
	const date = document.createElement("p")
	const location = document.createElement("p")
	const highTemp = document.createElement("p")
	const clouds = document.createElement("p")
	const snow = document.createElement("p")
	const uv = document.createElement("p")
	const tripDate = document.createElement('p')
	mainDiv.appendChild(tripDate)
	tripDate.innerHTML = `Your trip is ${lengthTrip}`
	
}



export {updateFrontend}