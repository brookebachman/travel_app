const express = require('express');
const app = express();
// Initialize the main project folder
app.use(express.static('dist'));
// Setup empty JS object to act as endpoint for all routes
;
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



const port = 8081;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

app.get('/', function(){
  res.sendFile('dist/index.html')
})

app.post('/test', async function (req, res) {
	
	const apikey = process.env.API_KEY_GEONAMES;

	const Url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${req.body.zipcode}&maxRows=10&username=${apikey}&country=${req.body.country}`;
	
	try {
    let response = await fetch(Url);
    let data = await response.json();
    console.log(data)
	} catch (error) {
    console.log(error);
    res.status(400).end()
	}
});

app.post('/weatherbitcurrent', async function(req, res){
  console.log(req)
  console.log("hit weatherbit current forecast")
  const apikey ='15232fa7a4cc4f9daf72453c6c5453dc'
  const url = `https://api.weatherbit.io/v2.0/current?&lat=${req.body.lat}&lon=${req.body.lon}&key=${apikey}`
  let response = await fetch(url)
  try{
    let result = await response.json()
    const data = result.data[0]
    console.log(data, "this is for current data weather")
    res.json(data)

  }catch (error){
    console.log(error)
  }
})
app.post('/weatherbitweek', async function(req, res){
  console.log(req.body.lon, "req body")
  console.log("hit weatherbit week weather api")
  const apikey ='15232fa7a4cc4f9daf72453c6c5453dc'
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.body.lat}&lon=${req.body.lon}&key=${apikey}`
  let response = await fetch(url)
  try{
    let data = await response.json()
    console.log(data, "this is week data")
   res.json(data)

  }catch (error){
    console.log(error)
  }
})



export {app}

