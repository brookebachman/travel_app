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
const dotenv = require('dotenv')
dotenv.config()
const fetch = require('node-fetch');

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
	console.log('hit route for geonames api');
	const apikey = 'bbachman';
	console.log(apikey);
	const Url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${req.body.zipcode}&maxRows=10&username=${apikey}`;
	let response = await fetch(Url);
	try {
		let data = await response.json();
	
		const apiData = {};
		apiData.city = data.postalCodes[0].placeName;
		apiData.date = req.body.date;
		apiData.lat = data.postalCodes[0].lat;
		apiData.lon = data.postalCodes[0].lng;
	
		res.send(apiData);
	} catch (error) {
		console.log(error);
	}
});

app.post('/weatherbit', async function(req, res){
  console.log(req)
  console.log("hit weatherbit")
  const apikey ='15232fa7a4cc4f9daf72453c6c5453dc'
  const url = `https://api.weatherbit.io/v2.0/current?&lat=${req.body.lat}&lon=${req.body.lon}&key=${apikey}`
  let response = await fetch(url)
  try{
    let data = await response.json()
    console.log(data)


  }catch (error){
    console.log(error)
  }
})
