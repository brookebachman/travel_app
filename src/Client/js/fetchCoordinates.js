const fetchCoordinates = async () => {
    const coordData = {}
    const zipcode = returnZipcode()
    const apikey = process.env.API_KEY_GEONAMES
    console.log(apikey)
    const url = `http://api.geonames.org/postalCodeSearch?postalcode=${zipcode}&maxRows=10&username=${apikey}`
    //this will return coordinates
	const response = await fetch(url);
	try {
		const data = await response.json();
		coordData = {coordinates: data}
		console.log(projectData, "zipcode project data")
	} catch (error) {
		console.log(error, 'error from geonames');
    }
    //if (date < 7 days away){
        Client.fetchWeatherDataCurrent(coordData)
    //}
    
    
	
};

export {fetchCoordinates}