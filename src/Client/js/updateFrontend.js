const updateFrontend = async () => {
	console.log("update frontend is running")
	const request = await fetch("http://localhost:3200/getData")
	try {
		const projectData = await request.json()
		entryHolder.appendChild(results);
		console.log('project data from the backend', projectData);
		const temp = document.getElementById('0');
		const date = document.getElementById('1');
		const content = document.getElementById('2');
		const clouds = document.getElementById('3');
		const place = document.getElementById('4');
		const time = document.getElementById('5');
		const sunset = document.getElementById('6')
		const minMaxTemp = document.getElementById('7')
		const newDiv = document.createElement('div');
		const innerDiv = document.createElement('div');
		innerDiv.id = 'inner';
		const placeDiv = document.createElement('div');
		const tempDiv = document.createElement('div');
		results.appendChild(newDiv);
		newDiv.appendChild(innerDiv);
		innerDiv.appendChild(placeDiv);
		innerDiv.appendChild(tempDiv)
		placeDiv.appendChild(place);
		placeDiv.appendChild(date);
		placeDiv.appendChild(time);
		innerDiv.appendChild(clouds);
		tempDiv.appendChild(temp);
		tempDiv.appendChild(minMaxTemp);
		tempDiv.appendChild(content)
		place.innerHTML = projectData.place;
		date.innerHTML = changeDate(projectData.time);
		time.innerHTML = changeTime(projectData.time);
		temp.innerHTML = projectData.temp + '°';
		minMaxTemp.innerHTML = projectData.min + '°' +'/' + projectData.max + '°' ;
		content.innerText = "Mood today: " + projectData.feelings;
		temp.id = 'temp';
		clouds.id = 'clouds';
		date.id = 'date';
		content.id = 'content';
		newDiv.id = 'container';
		place.id = 'place';
		time.id = 'time';
		sunset.id = "sunset"
		minMaxTemp.id = "minMaxTemp"
	
	} catch (error){
		console.log(error)
	}

}

export {updateFrontend}