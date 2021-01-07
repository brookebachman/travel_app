const express = require('express');
const app = express();
// Initialize the main project folder
app.use(express.static('dist'));
// Setup empty JS object to act as endpoint for all routes
let newData = {};
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv').config()
dotenv.config()
app.get('/getData', sendData)
function sendData (req, res) {
    res.send(newData);
    
  }

const port = 8081;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

app.get('/', function(){
  res.sendFile('dist/index.html')
})

app.post('/test', async function (req, res) {
	console.log('hit route post test route');
	const apiKey = process.env.API_KEY_GEO_NAMES;
	console.log(apiKey);
	const Url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${zipcode}&maxRows=10&username=${apikey}`;
	let response = await fetch(Url);
	try {
		let data = await response.json();
		console.log(data);
		const apiData = {};
		apiData.city = coordinates.postalCodes[0].placename;
		apiData.date = req.body.date;
		apiData.lat = coordinates.postalCodes[0].lat;
		apiData.lon = coordinates.postalCodes[0].lng;
		console.log(apiData);
		res.send(apiData);
	} catch (error) {
		console.log(error);
	}
});
