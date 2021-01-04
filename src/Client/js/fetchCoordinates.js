const fetchCoordinates = async (event) => {
    event.preventDefault()
    let coordData = {}
    const zipcode = returnZipcode()
    console.log(zipcode)
    const apikey = "bbachman"
    console.log(apikey)
    const url = `http://api.geonames.org/postalCodeSearch?postalcode=${zipcode}&maxRows=10&username=${apikey}`
    //this will return coordinates
	let response = await fetch(url);
	try {
		let data = response.json();
		coordData = {coordinates: data}
		console.log(coordData, "zipcode project data")
	} catch (error) {
		console.log(error, 'error from geonames');
    }
   
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
   
    let newA = today.split("/")
    console.log(newA)
    let day = newA[1]
    console.log(returnDate())
    let currentDate = returnDate()

     if (Math.abs(currentDate[1] - day) < 7){
         console.log("it is less than 7")
        //Client.fetchWeatherDataCurrent(coordData)
    } else {
        console.log("it is more than 7")
    }
	
};

function returnZipcode(){
    const zipcode = document.getElementById('zipcode').value;
	return zipcode
}

function returnDate(){
    const date = document.getElementById('date').value
    console.log(date)
    let array = date.split("-")
    let day = array.pop()
    array.unshift(day)
    let year = array.pop()
    array.unshift(year)
    console.log(array)
   
    return array
}

export {fetchCoordinates}