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
    console.log(data, "postalcodes data")
    res.json(data)
	} catch (error) {
    console.log(error);
    res.status(400).end()
	}
});

app.post('/weatherbitcurrent', async function(req, res){
  console.log(req.body, "req.body")
  console.log("hit weatherbit current forecast")
  const apikey = process.env.API_KEY_WEATHERBIT
  const url = `https://api.weatherbit.io/v2.0/current?&lat=${req.body.lat}&lon=${req.body.lon}&key=${apikey}`
  
  try{
    let response = await fetch(url)
    let result = await response.json()
   
    const data = result.data
    
    console.log(result, "this is for current data weather")
    res.json(data)

  }catch (error){
    console.log(error)
  }
})
app.post('/weatherbitweek', async function(req, res){
  //console.log(req.body.lon, "req body")
  console.log("hit weatherbit week weather api")
  const apikey = process.env.API_KEY_WEATHERBIT
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.body.lat}&lon=${req.body.lon}&key=${apikey}`
  
  try{
    let response = await fetch(url)
    let result = await response.json()
   
    const data = result.data
   
    console.log(result, "this is week data")
   res.json(data)

  }catch (error){
    console.log(error)
  }
})



//export {app}

